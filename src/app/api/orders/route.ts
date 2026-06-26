import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { isPodAvailable } from "@/lib/states"
import { Resend } from "resend"
import { OrderConfirmationEmail } from "@/emails/order-confirmation"
import crypto from "crypto"

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "orders@vigorbold.com"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { packageDetails, values, originUrl } = body

    // Validate request
    if (!packageDetails || !values) {
      return NextResponse.json(
        { error: "Invalid order data" },
        { status: 400 }
      )
    }

    // Determine payment method
    const podAvailable = isPodAvailable(values.state)
    const paymentMethod = podAvailable ? "pay_on_delivery" : "paystack"
    
    // Generate Order ID manually to bypass Supabase RLS SELECT restrictions for anon users
    const orderId = crypto.randomUUID()

    // Prepare order data
    const orderData = {
      id: orderId,
      first_name: values.firstName,
      last_name: values.lastName,
      phone: values.phone,
      email: values.email || null,
      state: values.state,
      address: values.address,
      package_id: packageDetails.id,
      package_name: packageDetails.name,
      total_amount: packageDetails.price,
      payment_method: paymentMethod,
      status: "pending",
      is_paid: false
    }

    // Save to Supabase (without .select() because anon doesn't have SELECT permission)
    const { error: dbError } = await supabase
      .from("orders")
      .insert([orderData])

    if (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.json(
        { error: "Failed to save order" },
        { status: 500 }
      )
    }

    // Handle Paystack Payment Initialization
    if (paymentMethod === "paystack") {
      const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY
      
      // We must have an email for Paystack, if user didn't provide one, use a dummy one based on phone
      const customerEmail = values.email || `${values.phone}@vigorbold-customer.com`

      const response = await fetch("https://api.paystack.co/transaction/initialize", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${paystackSecretKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: customerEmail,
          amount: packageDetails.price * 100, // Paystack expects amount in kobo
          reference: orderId, // Use our generated order ID as the reference
          callback_url: `${originUrl || 'http://localhost:3000'}/order?status=success&reference=${orderId}`,
          metadata: {
            custom_fields: [
              { display_name: "Customer Name", variable_name: "customer_name", value: `${values.firstName} ${values.lastName}` },
              { display_name: "Phone", variable_name: "phone", value: values.phone }
            ]
          }
        })
      })

      const paystackData = await response.json()

      if (!paystackData.status) {
        return NextResponse.json({ error: "Failed to initialize payment gateway" }, { status: 500 })
      }

      return NextResponse.json({ 
        success: true, 
        orderId: orderId,
        paymentMethod,
        authorization_url: paystackData.data.authorization_url
      })
    }

    // If Payment on Delivery, send confirmation email immediately
    if (values.email) {
      try {
        await resend.emails.send({
          from: `VigorBOLD Orders <${FROM_EMAIL}>`,
          to: values.email,
          subject: "Your VigorBOLD Order Confirmation",
          react: OrderConfirmationEmail({
            firstName: values.firstName,
            orderId: orderId,
            packageName: packageDetails.name,
            totalAmount: packageDetails.price,
            paymentMethod: "pay_on_delivery",
            address: values.address,
            state: values.state
          })
        })
      } catch (emailError) {
        console.error("Failed to send email:", emailError)
        // We don't fail the order if the email fails
      }
    }

    return NextResponse.json({ 
      success: true, 
      orderId: orderId,
      paymentMethod,
      amount: orderData.total_amount
    })

  } catch (error) {
    console.error("Order processing error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
