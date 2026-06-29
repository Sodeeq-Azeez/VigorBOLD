"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, ShoppingCart, LogOut, ShieldCheck } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  return (
    <div className="h-screen bg-neutral-50 flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-dark text-white hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <ShieldCheck className="w-6 h-6 text-brand-gold mr-2" />
          <span className="font-serif font-bold text-lg">VigorBOLD Admin</span>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          <Link 
            href="/admin" 
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${pathname === '/admin' ? 'bg-brand-gold text-brand-dark font-bold' : 'text-neutral-300 hover:bg-white/5 hover:text-white'}`}
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link 
            href="/admin/orders" 
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${pathname === '/admin/orders' ? 'bg-brand-gold text-brand-dark font-bold' : 'text-neutral-300 hover:bg-white/5 hover:text-white'}`}
          >
            <ShoppingCart className="w-5 h-5 mr-3" />
            All Orders
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-neutral-300 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Secure Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden h-16 bg-brand-dark flex items-center justify-between px-4">
          <div className="flex items-center">
            <ShieldCheck className="w-6 h-6 text-brand-gold mr-2" />
            <span className="font-serif font-bold text-white text-lg">VigorBOLD</span>
          </div>
          <button onClick={handleLogout} className="text-neutral-300">
            <LogOut className="w-6 h-6" />
          </button>
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
