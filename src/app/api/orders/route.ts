import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { isPodAvailable } from "@/lib/states"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { packageDetails, values } = body

    // Validate request
    if (!packageDetails || !values) {
      return NextResponse.json(
        { error: "Invalid order data" },
        { status: 400 }
      )
    }

    // Determine payment method
    const podAvailable = isPodAvailable(values.state)
    const paymentMethod = podAvailable ? "pay_on_delivery" : "flutterwave"

    // Prepare order data
    const orderData = {
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
      // If it's POD, status is pending. If Flutterwave, status is pending until payment is confirmed
      status: "pending",
      is_paid: false
    }

    // Save to Supabase
    const { data: order, error: dbError } = await supabase
      .from("orders")
      .insert([orderData])
      .select()
      .single()

    if (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.json(
        { error: "Failed to save order" },
        { status: 500 }
      )
    }

    // TODO: Phase 7 - Trigger Email via Resend

    return NextResponse.json({ 
      success: true, 
      orderId: order.id,
      paymentMethod,
      amount: order.total_amount
    })

  } catch (error) {
    console.error("Order processing error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
