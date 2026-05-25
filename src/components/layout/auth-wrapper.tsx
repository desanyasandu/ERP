"use client"

import React, { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Loader2, Package } from "lucide-react"

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = localStorage.getItem("the_erp_auth")

    if (pathname === "/login") {
      setIsAuthenticated(false)
      setLoading(false)
      return
    }

    if (auth === "true") {
      setIsAuthenticated(true)
      setLoading(false)
    } else {
      setIsAuthenticated(false)
      setLoading(true)
      router.replace("/login")
    }
  }, [pathname, router])

  if (pathname === "/login") {
    return <>{children}</>
  }

  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-650 text-white shadow-md animate-pulse">
            <Package className="w-6 h-6 animate-spin" />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2 flex items-center gap-1.5">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-500" />
            පද්ධතිය සක්‍රීය කෙරේ...
          </span>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
