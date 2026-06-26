import { NextResponse } from "next/server"
import crypto from "crypto"
import { supabase } from "@/lib/supabase"
import { Resend } from "resend"
import { OrderConfirmationEmail } from "@/emails/order-confirmation"

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "orders@vigorbold.com"

export async function POST(req: Request) {
  try {
    // Read the body as text because we need it for signature verification
    const bodyText = await req.text()
    
    // Verify Paystack signature
    const signature = req.headers.get("x-paystack-signature")
    const secretKey = process.env.PAYSTACK_SECRET_KEY || ""
    
    const hash = crypto.createHmac("sha512", secretKey).update(bodyText).digest("hex")
    
    if (hash !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }
    
    const event = JSON.parse(bodyText)

    // Handle successful payment
    if (event.event === "charge.success") {
      const orderId = event.data.reference // We passed order.id as the reference
      
      // Update Supabase order
      const { data: order, error } = await supabase
        .from("orders")
        .update({ 
          status: "paid", 
          is_paid: true,
          payment_reference: event.data.reference 
        })
        .eq("id", orderId)
        .select()
        .single()

      if (error) {
        console.error("Failed to update order in webhook:", error)
        return NextResponse.json({ error: "Database error" }, { status: 500 })
      }

      // Send Order Confirmation Email to Customer
      if (order.email && !order.email.endsWith("@vigorbold-customer.com")) {
        try {
          const { data, error: emailErrorObj } = await resend.emails.send({
            from: `Zeenu Enterprises <${FROM_EMAIL}>`,
            to: order.email,
            subject: "Your VigorBOLD Order Confirmation",
            react: OrderConfirmationEmail({
              firstName: order.first_name,
              orderId: order.id,
              packageName: order.package_name,
              totalAmount: order.total_amount,
              paymentMethod: "paystack",
              address: order.address,
              state: order.state
            })
          })
          if (emailErrorObj) {
            console.error("Resend customer email error in webhook:", emailErrorObj)
          } else {
            console.log("Customer email sent successfully in webhook:", data)
          }
        } catch (emailException) {
          console.error("Failed to send customer email in webhook (exception):", emailException)
        }
      }

      // Send Admin Notification
      const adminEmail = process.env.ADMIN_EMAIL
      if (adminEmail) {
        try {
          const { AdminNotificationEmail } = await import("@/emails/admin-notification")
          const { data, error: adminErrorObj } = await resend.emails.send({
            from: `Zeenu Enterprises System <${FROM_EMAIL}>`,
            to: adminEmail,
            subject: `🚨 New Order (Paid): ${order.package_name}`,
            react: AdminNotificationEmail({
              orderId: order.id,
              customerName: `${order.first_name} ${order.last_name}`,
              phone: order.phone,
              state: order.state,
              address: order.address,
              packageName: order.package_name,
              totalAmount: order.total_amount,
              paymentMethod: "paystack"
            })
          })
          if (adminErrorObj) {
            console.error("Resend admin email error in webhook:", adminErrorObj)
          } else {
            console.log("Admin email sent successfully in webhook:", data)
          }
        } catch (adminEmailException) {
          console.error("Failed to send admin email in webhook (exception):", adminEmailException)
        }
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
