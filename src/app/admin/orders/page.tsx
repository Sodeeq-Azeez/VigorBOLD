import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function AllOrdersPage() {
  const { data: orders, error } = await supabase
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

      <Card className="border-neutral-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-neutral-50/50 border-b border-neutral-100">
          <CardTitle className="text-lg font-serif text-brand-dark">Order Database ({safeOrders.length})</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-neutral-600">
            <thead className="text-xs text-neutral-700 uppercase bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Contact</th>
                <th className="px-6 py-4 font-semibold">Location</th>
                <th className="px-6 py-4 font-semibold">Package</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Payment</th>
                <th className="px-6 py-4 font-semibold">Time</th>
              </tr>
            </thead>
            <tbody>
              {safeOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-neutral-500">
                    No orders found yet.
                  </td>
                </tr>
              ) : (
                safeOrders.map((order) => (
                  <tr key={order.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-neutral-400">
                      {order.id.slice(0, 8)}...
                    </td>
                    <td className="px-6 py-4 font-medium text-brand-dark">
                      {order.first_name} {order.last_name}
                    </td>
                    <td className="px-6 py-4">
                      <div>{order.phone}</div>
                      {order.email && <div className="text-xs text-neutral-500">{order.email}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{order.state}</div>
                      <div className="text-xs text-neutral-500 truncate max-w-[150px]" title={order.address}>{order.address}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-gold/10 text-brand-dark">
                        {order.package_name.split('(')[0].trim()}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-brand-dark">
                      ₦{order.total_amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      {order.payment_method === "paystack" ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Paystack
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          POD
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs whitespace-nowrap text-neutral-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
