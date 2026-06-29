import { NextResponse } from 'next/server'
import { adminSupabase } from '@/lib/supabase'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    // Basic auth check
    const cookieStore = await cookies()
    const adminAuth = cookieStore.get('admin_auth')
    if (!adminAuth || adminAuth.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { orderId, status } = await request.json()

    if (!orderId || !status) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
    }

    // Update the status in Supabase
    const { error } = await adminSupabase
      .from('orders')
      .update({ status: status })
      .eq('id', orderId)

    if (error) {
      console.error("Supabase update error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, status })
  } catch (error) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}
