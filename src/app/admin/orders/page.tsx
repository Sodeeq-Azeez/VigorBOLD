import { adminSupabase } from "@/lib/supabase"
import { formatDistanceToNow } from "date-fns"
import { OrdersTable } from "@/components/admin/OrdersTable"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function AllOrdersPage() {
  const { data: orders, error } = await adminSupabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return <div className="p-4 text-red-500">Failed to load orders: {error.message}</div>
  }

  const safeOrders = orders || []

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-brand-dark">All Orders</h1>
        <p className="text-neutral-500 mt-1">A complete history of all VigorBOLD sales.</p>
      </div>

      <OrdersTable 
        orders={safeOrders} 
        title={`Order Database (${safeOrders.length})`} 
      />
    </div>
  )
}
