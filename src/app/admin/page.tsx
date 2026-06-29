import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, ShoppingBag, CreditCard, Wallet, TrendingUp } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function AdminDashboard() {
  // Fetch orders directly from Supabase on the server
  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return <div className="p-4 text-red-500">Failed to load dashboard data: {error.message}</div>
  }

  const safeOrders = orders || []

  // Calculate Metrics
  const totalOrders = safeOrders.length
  
  // Total Revenue (assuming we only count paid or pending, not cancelled)
  const totalRevenue = safeOrders.reduce((sum, order) => {
    return sum + (order.total_amount || 0)
  }, 0)

  // Payment Methods
  const paystackOrders = safeOrders.filter(o => o.payment_method === "paystack").length
  const podOrders = safeOrders.filter(o => o.payment_method === "pay_on_delivery").length

  // Recent Orders (top 10)
  const recentOrders = safeOrders.slice(0, 10)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-brand-dark">Dashboard Overview</h1>
        <p className="text-neutral-500 mt-1">Real-time VigorBOLD sales data and metrics.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-neutral-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 bg-neutral-50/50 border-b border-neutral-100">
            <CardTitle className="text-sm font-medium text-neutral-600">Total Revenue</CardTitle>
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-brand-dark">₦{totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-neutral-500 mt-1 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" /> All time generated
            </p>
          </CardContent>
        </Card>

        <Card className="border-neutral-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 bg-neutral-50/50 border-b border-neutral-100">
            <CardTitle className="text-sm font-medium text-neutral-600">Total Orders</CardTitle>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-brand-dark">{totalOrders}</div>
            <p className="text-xs text-neutral-500 mt-1">Total packages sold</p>
          </CardContent>
        </Card>

        <Card className="border-neutral-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 bg-neutral-50/50 border-b border-neutral-100">
            <CardTitle className="text-sm font-medium text-neutral-600">Pay Online (Paystack)</CardTitle>
            <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-brand-gold" />
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-brand-dark">{paystackOrders}</div>
            <p className="text-xs text-neutral-500 mt-1">Prepaid orders</p>
          </CardContent>
        </Card>

        <Card className="border-neutral-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 bg-neutral-50/50 border-b border-neutral-100">
            <CardTitle className="text-sm font-medium text-neutral-600">Pay on Delivery</CardTitle>
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
              <Wallet className="w-4 h-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-brand-dark">{podOrders}</div>
            <p className="text-xs text-neutral-500 mt-1">Payment upon arrival</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <Card className="border-neutral-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-neutral-50/50 border-b border-neutral-100">
          <CardTitle className="text-lg font-serif text-brand-dark">Recent Orders</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-neutral-600">
            <thead className="text-xs text-neutral-700 uppercase bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Location</th>
                <th className="px-6 py-4 font-semibold">Package</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Payment</th>
                <th className="px-6 py-4 font-semibold">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-neutral-500">
                    No orders found yet.
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-brand-dark">{order.first_name} {order.last_name}</div>
                      <div className="text-xs text-neutral-500">{order.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{order.state}</div>
                      <div className="text-xs text-neutral-500 truncate max-w-[150px]">{order.address}</div>
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
                    <td className="px-6 py-4 text-xs whitespace-nowrap">
                      {formatDistanceToNow(new Date(order.created_at), { addSuffix: true })}
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
