"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import { ArrowRight, X, Phone, Mail, MapPin, Package, CreditCard, CheckCircle, Clock } from "lucide-react"

interface Order {
  id: string
  first_name: string
  last_name: string
  phone: string
  email: string | null
  state: string
  address: string
  package_name: string
  total_amount: number
  payment_method: string
  status: string
  created_at: string
}

export function OrdersTable({ 
  orders, 
  title, 
  viewAllLink,
  hidePagination 
}: { 
  orders: Order[]
  title: string
  viewAllLink?: string 
  hidePagination?: boolean
}) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [updating, setUpdating] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  
  const [searchTerm, setSearchTerm] = useState("")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [packageFilter, setPackageFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  
  const router = useRouter()

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, paymentFilter, packageFilter, statusFilter, pageSize])

  const uniquePackages = useMemo(() => {
    return Array.from(new Set(orders.map(o => o.package_name.split('(')[0].trim())))
  }, [orders])

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch = 
        searchTerm === "" || 
        order.first_name.toLowerCase().includes(searchLower) ||
        order.last_name.toLowerCase().includes(searchLower) ||
        order.phone.includes(searchTerm) ||
        order.id.toLowerCase().includes(searchLower)

      const matchesPayment = paymentFilter === "all" || order.payment_method === paymentFilter

      const packageName = order.package_name.split('(')[0].trim()
      const matchesPackage = packageFilter === "all" || packageName === packageFilter

      let orderStatusStr = "pending"
      if (order.status === "shipped" || order.status === "delivered") orderStatusStr = "shipped"
      if (order.status === "test") orderStatusStr = "test"
      const matchesStatus = statusFilter === "all" || orderStatusStr === statusFilter

      return matchesSearch && matchesPayment && matchesPackage && matchesStatus
    })
  }, [orders, searchTerm, paymentFilter, packageFilter, statusFilter])

  const totalPages = Math.ceil(filteredOrders.length / pageSize)
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const displayedOrders = hidePagination ? filteredOrders : paginatedOrders

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(displayedOrders.map(o => o.id))
    } else {
      setSelectedIds([])
    }
  }

  const handleSelectRow = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    e.stopPropagation()
    if (e.target.checked) {
      setSelectedIds(prev => [...prev, id])
    } else {
      setSelectedIds(prev => prev.filter(i => i !== id))
    }
  }

  const handleBulkUpdate = async (newStatus: string) => {
    setUpdating(true)
    try {
      const res = await fetch('/api/admin/orders/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderIds: selectedIds, status: newStatus })
      })
      if (res.ok) {
        setSelectedIds([])
        router.refresh()
      }
    } catch (e) {
      console.error(e)
    } finally {
      setUpdating(false)
    }
  }

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    setUpdating(true)
    try {
      const res = await fetch('/api/admin/orders/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus })
      })
      if (res.ok) {
        if (selectedOrder) setSelectedOrder({ ...selectedOrder, status: newStatus })
        router.refresh()
      }
    } catch (e) {
      console.error(e)
    } finally {
      setUpdating(false)
    }
  }

  return (
    <>
      <div className="bg-white border border-neutral-200 shadow-sm rounded-xl overflow-hidden">
        <div className="bg-neutral-50/50 border-b border-neutral-100 p-6 flex items-center justify-between min-h-[80px]">
          {selectedIds.length > 0 ? (
            <div className="flex items-center space-x-4 w-full">
              <span className="text-sm font-medium text-brand-dark bg-brand-gold/20 px-3 py-1 rounded-full">{selectedIds.length} selected</span>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleBulkUpdate("shipped")} 
                  disabled={updating}
                  className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded shadow-sm transition-colors cursor-pointer disabled:opacity-50 flex items-center"
                >
                  {updating ? "..." : <><CheckCircle className="w-3 h-3 mr-1" /> Mark Shipped</>}
                </button>
                <button 
                  onClick={() => handleBulkUpdate("pending")} 
                  disabled={updating}
                  className="px-3 py-1.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs font-bold rounded shadow-sm transition-colors cursor-pointer disabled:opacity-50 flex items-center"
                >
                  {updating ? "..." : <><Clock className="w-3 h-3 mr-1" /> Mark Pending</>}
                </button>
                <button 
                  onClick={() => handleBulkUpdate("test")} 
                  disabled={updating}
                  className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-800 text-xs font-bold rounded shadow-sm transition-colors cursor-pointer disabled:opacity-50 flex items-center border border-red-200"
                >
                  {updating ? "..." : "Mark as Test"}
                </button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-serif font-bold text-brand-dark">{title}</h3>
              {viewAllLink && (
                <Link 
                  href={viewAllLink}
                  className="text-sm font-medium text-brand-gold hover:text-brand-gold-light flex items-center transition-colors cursor-pointer"
                >
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              )}
            </>
          )}
        </div>

        {/* Filters Section */}
        {!hidePagination && (
          <div className="bg-neutral-50/30 p-4 border-b border-neutral-100 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-1/3">
              <input 
                type="text" 
                placeholder="Search name, phone, or ID..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent bg-white"
              />
            </div>
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <select 
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold cursor-pointer"
              >
                <option value="all">All Payments</option>
                <option value="paystack">Paystack</option>
                <option value="pay_on_delivery">Pay on Delivery</option>
              </select>
              
              <select 
                value={packageFilter}
                onChange={(e) => setPackageFilter(e.target.value)}
                className="px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold cursor-pointer"
              >
                <option value="all">All Packages</option>
                {uniquePackages.map(pkg => (
                  <option key={pkg} value={pkg}>{pkg}</option>
                ))}
              </select>

              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="test">Test Data</option>
              </select>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-neutral-600">
            <thead className="text-xs text-neutral-700 uppercase bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4 w-12 text-center">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.length === displayedOrders.length && displayedOrders.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-neutral-300 text-brand-gold focus:ring-brand-gold cursor-pointer"
                  />
                </th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Location</th>
                <th className="px-6 py-4 font-semibold">Package</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Payment</th>
                <th className="px-6 py-4 font-semibold">Shipping Status</th>
                <th className="px-6 py-4 font-semibold">Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-neutral-500">
                    No orders found yet.
                  </td>
                </tr>
              ) : (
                displayedOrders.map((order) => (
                  <tr 
                    key={order.id} 
                    onClick={() => setSelectedOrder(order)}
                    className={`border-b border-neutral-100 hover:bg-neutral-50 transition-colors cursor-pointer ${selectedIds.includes(order.id) ? 'bg-brand-gold/5' : ''}`}
                  >
                    <td className="px-6 py-4 text-center" onClick={e => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(order.id)}
                        onChange={(e) => handleSelectRow(e, order.id)}
                        className="rounded border-neutral-300 text-brand-gold focus:ring-brand-gold cursor-pointer"
                      />
                    </td>
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
                    <td className="px-6 py-4">
                      {order.status === "test" ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Test Data
                        </span>
                      ) : order.status === "shipped" || order.status === "delivered" ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Shipped
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                          Pending
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
        
        {/* Pagination Controls */}
        {!hidePagination && (
          <div className="p-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between text-sm text-neutral-600 bg-neutral-50/30 gap-4">
            <div className="flex items-center space-x-2">
              <span>Show</span>
              <select 
                value={pageSize} 
                onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1) }}
                className="border border-neutral-300 rounded p-1 bg-white cursor-pointer"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span>of {filteredOrders.length} entries</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Page {currentPage} of {totalPages || 1}</span>
              <div className="flex space-x-1">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-neutral-300 bg-white rounded hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                  Prev
                </button>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="px-3 py-1 border border-neutral-300 bg-white rounded hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-brand-dark p-6 flex items-center justify-between text-white">
              <h3 className="font-serif font-bold text-xl">Order Details</h3>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-neutral-500 mb-1">Order ID</p>
                  <p className="font-mono text-xs text-brand-dark bg-neutral-100 p-2 rounded">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-1">Order Date</p>
                  <p className="text-sm font-medium text-brand-dark">
                    {new Date(selectedOrder.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="border-t border-neutral-100 pt-4">
                <h4 className="font-bold text-brand-dark mb-3 flex items-center">
                  Customer Info
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <span className="w-8 flex justify-center"><Phone className="w-4 h-4 text-neutral-400" /></span>
                    <span className="font-medium">{selectedOrder.first_name} {selectedOrder.last_name} ({selectedOrder.phone})</span>
                  </div>
                  {selectedOrder.email && (
                    <div className="flex items-center text-sm">
                      <span className="w-8 flex justify-center"><Mail className="w-4 h-4 text-neutral-400" /></span>
                      <span>{selectedOrder.email}</span>
                    </div>
                  )}
                  <div className="flex items-start text-sm">
                    <span className="w-8 flex justify-center mt-0.5"><MapPin className="w-4 h-4 text-neutral-400" /></span>
                    <span>{selectedOrder.address}, <br/><strong>{selectedOrder.state}</strong></span>
                  </div>
                </div>
              </div>

              <div className="border-t border-neutral-100 pt-4">
                <h4 className="font-bold text-brand-dark mb-3 flex items-center">
                  Purchase Summary
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <span className="w-8 flex justify-center"><Package className="w-4 h-4 text-neutral-400" /></span>
                    <span className="font-medium text-brand-dark">{selectedOrder.package_name}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="w-8 flex justify-center"><CreditCard className="w-4 h-4 text-neutral-400" /></span>
                    <span>
                      {selectedOrder.payment_method === "paystack" ? "Paid Online (Paystack)" : "Payment on Delivery"} 
                      <span className="mx-2 text-neutral-300">•</span>
                      <strong className="text-brand-dark text-base">₦{selectedOrder.total_amount.toLocaleString()}</strong>
                    </span>
                  </div>
                </div>
              </div>

            </div>
            <div className="p-4 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
              <div className="flex space-x-2">
                {selectedOrder.status !== "shipped" && selectedOrder.status !== "delivered" && selectedOrder.status !== "test" ? (
                  <button 
                    onClick={() => handleUpdateStatus(selectedOrder.id, "shipped")}
                    disabled={updating}
                    className="flex items-center px-4 py-2 bg-brand-dark hover:bg-neutral-800 text-brand-gold rounded-lg text-sm font-bold transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {updating ? "Updating..." : <><CheckCircle className="w-4 h-4 mr-2" /> Mark as Shipped</>}
                  </button>
                ) : selectedOrder.status === "shipped" || selectedOrder.status === "delivered" ? (
                  <button 
                    onClick={() => handleUpdateStatus(selectedOrder.id, "pending")}
                    disabled={updating}
                    className="flex items-center px-4 py-2 bg-white border border-neutral-300 hover:bg-neutral-100 text-neutral-700 rounded-lg text-sm font-bold transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {updating ? "Updating..." : <><Clock className="w-4 h-4 mr-2" /> Revert to Pending</>}
                  </button>
                ) : null}

                {selectedOrder.status !== "test" ? (
                  <button 
                    onClick={() => handleUpdateStatus(selectedOrder.id, "test")}
                    disabled={updating}
                    className="flex items-center px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-sm font-bold transition-colors disabled:opacity-50 cursor-pointer border border-red-200"
                  >
                    {updating ? "..." : "Mark as Test"}
                  </button>
                ) : (
                  <button 
                    onClick={() => handleUpdateStatus(selectedOrder.id, "pending")}
                    disabled={updating}
                    className="flex items-center px-4 py-2 bg-white border border-neutral-300 hover:bg-neutral-100 text-neutral-700 rounded-lg text-sm font-bold transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {updating ? "..." : "Unmark Test"}
                  </button>
                )}
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 rounded-lg text-sm font-medium transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
