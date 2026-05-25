"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Factory,
  Boxes,
  CircleDollarSign,
  ChevronLeft,
  ChevronRight,
  Package,
  Settings,
  HelpCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  className?: string
  onCollapseChange?: (collapsed: boolean) => void
}

const navItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    color: "text-slate-500 dark:text-slate-400 group-hover:text-sky-500 dark:group-hover:text-sky-400",
    activeColor: "bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 border-sky-500",
    accentColor: "border-sky-500"
  },
  {
    name: "Production",
    href: "/production",
    icon: Factory,
    color: "text-slate-500 dark:text-slate-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-400",
    activeColor: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-500",
    accentColor: "border-emerald-500"
  },
  {
    name: "Inventory",
    href: "/inventory",
    icon: Boxes,
    color: "text-slate-500 dark:text-slate-400 group-hover:text-amber-500 dark:group-hover:text-amber-400",
    activeColor: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-500",
    accentColor: "border-amber-500"
  },
  {
    name: "Sales",
    href: "/sales",
    icon: CircleDollarSign,
    color: "text-slate-500 dark:text-slate-400 group-hover:text-violet-500 dark:group-hover:text-violet-400",
    activeColor: "bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border-violet-500",
    accentColor: "border-violet-500"
  }
]

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div
      className={cn(
        "relative flex flex-col h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 z-30 shadow-sm",
        isCollapsed ? "w-20" : "w-64",
        className
      )}
    >
      {/* Brand Logo Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-100 dark:border-slate-800/80">
        <Link href="/" className="flex items-center gap-3 overflow-hidden">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none flex-shrink-0 animate-pulse">
            <Package className="w-5 h-5" />
          </div>
          {!isCollapsed && (
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-900 to-indigo-950 dark:from-white dark:to-indigo-200 bg-clip-text text-transparent truncate whitespace-nowrap">
              NexusERP
            </span>
          )}
        </Link>
        {!isCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="hidden md:flex h-8 w-8 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Main Nav Links */}
      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "group flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 border-l-2 cursor-pointer mb-1 border-transparent",
                  isActive
                    ? item.activeColor
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-950 dark:hover:text-white"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 transition-transform duration-200 group-hover:scale-110",
                    isActive ? "" : item.color
                  )}
                />
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </div>
            </Link>
          )
        })}
      </div>

      {/* Footer / Collapse Toggle for Collapsed State */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
        {isCollapsed ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="mx-auto flex h-8 w-8 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        ) : (
          <div className="space-y-1">
            <Link href="#">
              <div className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-950 dark:hover:text-white cursor-pointer transition-all duration-200">
                <Settings className="w-5 h-5 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white group-hover:rotate-45 transition-transform duration-300" />
                <span className="truncate">Settings</span>
              </div>
            </Link>
            <Link href="#">
              <div className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-950 dark:hover:text-white cursor-pointer transition-all duration-200">
                <HelpCircle className="w-5 h-5 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white group-hover:bounce transition-all" />
                <span className="truncate">Support Help</span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
