import { adminSupabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, ShoppingBag, CreditCard, Wallet, TrendingUp, Clock, PackageCheck } from "lucide-react"
import { OrdersTable } from "@/components/admin/OrdersTable"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function AdminDashboard() {
  // Fetch orders directly from Supabase on the server
  const { data: orders, error } = await adminSupabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return <div className="p-4 text-red-500">Failed to load dashboard data: {error.message}</div>
  }

  const safeOrders = orders || []

  // Calculate Metrics
  // Filter out test transactions for KPIs
  const realOrders = safeOrders.filter(o => o.status !== "test")

  const totalRevenue = realOrders.reduce((sum, order) => sum + (order.total_amount || 0), 0)
  const totalOrders = realOrders.length
  
  const paystackOrders = realOrders.filter(o => o.payment_method === "paystack").length
  const podOrders = realOrders.filter(o => o.payment_method === "pay_on_delivery").length

  // Status counts
  const pendingOrders = realOrders.filter(o => o.status === "pending" || !o.status).length
  const shippedOrders = realOrders.filter(o => o.status === "shipped" || o.status === "delivered").length

  // Recent Orders (top 10)
  const recentOrders = safeOrders.slice(0, 10)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-brand-dark">Dashboard Overview</h1>
        <p className="text-neutral-500 mt-1">Real-time VigorBOLD sales data and metrics.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
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

        <Card className="border-neutral-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 bg-neutral-50/50 border-b border-neutral-100">
            <CardTitle className="text-sm font-medium text-neutral-600">Pending</CardTitle>
            <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center">
              <Clock className="w-4 h-4 text-neutral-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-brand-dark">{pendingOrders}</div>
            <p className="text-xs text-neutral-500 mt-1">Awaiting fulfillment</p>
          </CardContent>
        </Card>

        <Card className="border-neutral-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 bg-neutral-50/50 border-b border-neutral-100">
            <CardTitle className="text-sm font-medium text-neutral-600">Shipped</CardTitle>
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <PackageCheck className="w-4 h-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-brand-dark">{shippedOrders}</div>
            <p className="text-xs text-neutral-500 mt-1">Sent to customers</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <OrdersTable 
        orders={recentOrders} 
        title="Recent Orders" 
        viewAllLink="/admin/orders" 
        hidePagination={true}
      />
    </div>
  )
}
