"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import {
  Bell,
  Search,
  Sun,
  Moon,
  ChevronDown,
  ChevronRight,
  LogOut,
  User,
  Settings,
  Package,
  Sparkles,
  Info,
  TrendingUp,
  Boxes,
  Factory,
  CircleDollarSign,
  FileBarChart2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function TopNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  // Password modal states
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError(null)
    setPasswordSuccess(null)

    const storedPassword = localStorage.getItem("the_erp_auth_password") || "admin"

    if (currentPassword !== storedPassword) {
      setPasswordError("වත්මන් මුද්‍රණ පදය වැරදියි. (Current password is incorrect.)")
      return
    }

    if (newPassword.length < 4) {
      setPasswordError("නව මුද්‍රණ පදය අවම වශයෙන් අකුරු 4ක් විය යුතුය. (New password must be at least 4 characters.)")
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("නව මුද්‍රණ පදයන් එකිනෙක නොගැලපේ. (New passwords do not match.)")
      return
    }

    localStorage.setItem("the_erp_auth_password", newPassword)
    setPasswordSuccess("මුද්‍රණ පදය සාර්ථකව වෙනස් කරන ලදී! (Password successfully updated!)")
    
    // Clear fields
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    
    setTimeout(() => {
      setIsPasswordModalOpen(false)
      setPasswordSuccess(null)
    }, 1500)
  }

  if (!mounted) {
    return (
      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-6 dark:border-slate-800 dark:bg-slate-900 transition-colors duration-200">
        <div className="w-48 animate-pulse h-8 bg-slate-100 dark:bg-slate-800 rounded-md" />
        <div className="w-96 animate-pulse h-8 bg-slate-100 dark:bg-slate-800 rounded-md" />
        <div className="w-32 animate-pulse h-8 bg-slate-100 dark:bg-slate-800 rounded-md" />
      </header>
    )
  }

  // Hide TopNav on login page
  if (pathname === "/login") return null

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleSignOut = () => {
    localStorage.removeItem("the_erp_auth")
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-all duration-300">
      <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Left Side: Brand Logo and Main Nav Items */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 overflow-hidden flex-shrink-0">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none animate-pulse">
              <Package className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-900 to-indigo-950 dark:from-white dark:to-indigo-200 bg-clip-text text-transparent">
              TheERP
            </span>
          </Link>

          {/* Navigation Links in Sinhala with Hover Dropdowns */}
          <nav className="hidden lg:flex items-center gap-1.5 text-xs font-semibold">
            
            {/* Dashboard Link */}
            <Link
              href="/"
              className={cn(
                "px-3 py-2 rounded-xl transition-all duration-200",
                pathname === "/"
                  ? "bg-slate-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-bold"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-350 dark:hover:text-white hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
              )}
            >
              පුවරුව (Dashboard)
            </Link>

            {/* Production Menu */}
            <div className="relative group py-2">
              <Link
                href="/production"
                className={cn(
                  "px-3 py-2 rounded-xl flex items-center gap-1 transition-all duration-200",
                  pathname.startsWith("/production")
                    ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-350 dark:hover:text-white hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                )}
              >
                <span>නිෂ්පාදනය (Production)</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-250" />
              </Link>

              {/* Flyout Sub-menu */}
              <div className="absolute left-0 top-full pt-1 hidden group-hover:block w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-1.5 z-50 animate-fade-in">
                <Link
                  href="/production?view=queue"
                  className="flex items-center gap-2 px-3.5 py-2.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl transition"
                >
                  <Factory className="w-3.5 h-3.5" />
                  නිෂ්පාදන පෝලිම (Queue)
                </Link>
                <Link
                  href="/production?view=batches"
                  className="flex items-center gap-2 px-3.5 py-2.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl transition"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  කාණ්ඩ පාලනය (Batch Control)
                </Link>
                <Link
                  href="/production?view=history"
                  className="flex items-center gap-2 px-3.5 py-2.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl transition"
                >
                  <Info className="w-3.5 h-3.5" />
                  ක්‍රියාකාරී ඉතිහාසය (History)
                </Link>
              </div>
            </div>

            {/* Inventory Menu */}
            <div className="relative group py-2">
              <Link
                href="/inventory"
                className={cn(
                  "px-3 py-2 rounded-xl flex items-center gap-1 transition-all duration-200",
                  pathname.startsWith("/inventory")
                    ? "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-bold"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-350 dark:hover:text-white hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                )}
              >
                <span>තොග කළමනාකරණය (Inventory)</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-250" />
              </Link>

              {/* Flyout Sub-menu */}
              <div className="absolute left-0 top-full pt-1 hidden group-hover:block w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-1.5 z-50 animate-fade-in">
                <Link
                  href="/inventory?view=materials"
                  className="flex items-center gap-2 px-3.5 py-2.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-amber-50/50 dark:hover:bg-amber-950/20 hover:text-amber-600 dark:hover:text-amber-400 rounded-xl transition"
                >
                  <Boxes className="w-3.5 h-3.5" />
                  අමුද්‍රව්‍ය ලැයිස්තුව (Materials)
                </Link>
                <Link
                  href="/inventory?view=goods"
                  className="flex items-center gap-2 px-3.5 py-2.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-amber-50/50 dark:hover:bg-amber-950/20 hover:text-amber-600 dark:hover:text-amber-400 rounded-xl transition"
                >
                  <Package className="w-3.5 h-3.5" />
                  නිමි භාණ්ඩ ලෙජරය (Goods)
                </Link>
                <Link
                  href="/inventory?view=lorries"
                  className="flex items-center gap-2 px-3.5 py-2.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-amber-50/50 dark:hover:bg-amber-950/20 hover:text-amber-600 dark:hover:text-amber-400 rounded-xl transition"
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  ප්‍රවාහන ලොග් (Lorry Operations)
                </Link>
              </div>
            </div>

            {/* Sales Menu */}
            <div className="relative group py-2">
              <Link
                href="/sales"
                className={cn(
                  "px-3 py-2 rounded-xl flex items-center gap-1 transition-all duration-200",
                  pathname.startsWith("/sales")
                    ? "bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 font-bold"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-350 dark:hover:text-white hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                )}
              >
                <span>අලෙවිය (Sales)</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-250" />
              </Link>

              {/* Flyout Sub-menu */}
              <div className="absolute left-0 top-full pt-1 hidden group-hover:block w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-1.5 z-50 animate-fade-in">
                <Link
                  href="/sales?view=revenue"
                  className="flex items-center gap-2 px-3.5 py-2.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-violet-50/50 dark:hover:bg-violet-950/20 hover:text-violet-600 dark:hover:text-violet-400 rounded-xl transition"
                >
                  <CircleDollarSign className="w-3.5 h-3.5" />
                  දෛනික විකුණුම් ආදායම (Revenue)
                </Link>
                <Link
                  href="/sales?view=ledger"
                  className="flex items-center gap-2 px-3.5 py-2.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-violet-50/50 dark:hover:bg-violet-950/20 hover:text-violet-600 dark:hover:text-violet-400 rounded-xl transition"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  ඉන්වොයිස් ලෙජරය (Ledger)
                </Link>
                <Link
                  href="/sales?view=pettycash"
                  className="flex items-center gap-2 px-3.5 py-2.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-violet-50/50 dark:hover:bg-violet-950/20 hover:text-violet-600 dark:hover:text-violet-400 rounded-xl transition"
                >
                  <Info className="w-3.5 h-3.5" />
                  සුළු මුදල් අත්තිකාරම් (Petty Cash)
                </Link>
              </div>
            </div>

            {/* Reports Menu (Multi-Level) */}
            <div className="relative group py-2">
              <button
                className="px-3 py-2 rounded-xl flex items-center gap-1 text-slate-600 hover:text-slate-900 dark:text-slate-350 dark:hover:text-white hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all duration-200"
              >
                <span>වාර්තා (Reports)</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-250" />
              </button>

              {/* Flyout Sub-menu (First level) */}
              <div className="absolute left-0 top-full pt-1 hidden group-hover:block w-60 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-1.5 z-50 animate-fade-in">
                
                {/* 1. Outlet Base Report */}
                <div className="relative group/submenu">
                  <div className="flex items-center justify-between px-3.5 py-2.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl cursor-pointer transition">
                    <span className="flex items-center gap-2">
                      <FileBarChart2 className="w-3.5 h-3.5" />
                      අලෙවිසැල් විකුණුම් වාර්තා (Outlet Reports)
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  {/* Flyout Level 2 */}
                  <div className="absolute left-full top-0 ml-1.5 hidden group-hover/submenu:block w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-1.5 z-50">
                    <Link
                      href="/reports?view=outlet-summary"
                      className="block px-3.5 py-2 text-[10px] font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl transition"
                    >
                      විකුණුම් සාරාංශය (Summary)
                    </Link>
                    <Link
                      href="/reports?view=outlet-sales"
                      className="block px-3.5 py-2 text-[10px] font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl transition"
                    >
                      අලෙවිසැල් විකුණුම් (Sales)
                    </Link>
                    <Link
                      href="/reports?view=outlet-regional"
                      className="block px-3.5 py-2 text-[10px] font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl transition"
                    >
                      ප්‍රාදේශීය කාර්යසාධනය (Regional)
                    </Link>
                  </div>
                </div>

                {/* 2. Financial Statement */}
                <div className="relative group/submenu">
                  <div className="flex items-center justify-between px-3.5 py-2.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl cursor-pointer transition">
                    <span className="flex items-center gap-2">
                      <CircleDollarSign className="w-3.5 h-3.5" />
                      මූල්‍ය ප්‍රකාශන (Financial Statements)
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  {/* Flyout Level 2 */}
                  <div className="absolute left-full top-0 ml-1.5 hidden group-hover/submenu:block w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-1.5 z-50">
                    <Link
                      href="/reports?view=fin-cost"
                      className="block px-3.5 py-2 text-[10px] font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl transition"
                    >
                      පිරිවැය විශ්ලේෂණය (Cost Analysis)
                    </Link>
                    <Link
                      href="/reports?view=fin-cashflow"
                      className="block px-3.5 py-2 text-[10px] font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl transition"
                    >
                      මුදල් ප්‍රවාහ ලෙජරය (Cash Flow)
                    </Link>
                  </div>
                </div>

                {/* 3. Production Efficiency */}
                <div className="relative group/submenu">
                  <div className="flex items-center justify-between px-3.5 py-2.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl cursor-pointer transition">
                    <span className="flex items-center gap-2">
                      <Factory className="w-3.5 h-3.5" />
                      නිෂ්පාදන කාර්යක්ෂමතාව (Efficiency)
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  {/* Flyout Level 2 */}
                  <div className="absolute left-full top-0 ml-1.5 hidden group-hover/submenu:block w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-1.5 z-50">
                    <Link
                      href="/reports?view=eff-runtime"
                      className="block px-3.5 py-2 text-[10px] font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl transition"
                    >
                      මැෂින් ක්‍රියාකාරී කාලය (Runtime)
                    </Link>
                    <Link
                      href="/reports?view=eff-defect"
                      className="block px-3.5 py-2 text-[10px] font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl transition"
                    >
                      දෝෂ අනුපාතය (Defect Rate)
                    </Link>
                  </div>
                </div>

              </div>
            </div>

          </nav>
        </div>

        {/* Right Side: Search, Theme Toggle, Notification & User Avatar */}
        <div className="flex items-center gap-3">
          {/* Global Search Bar */}
          <div className="relative hidden md:flex max-w-[160px] lg:max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <Input
              type="search"
              placeholder="සොයන්න..."
              className="w-full pl-8 pr-3 py-1 h-8 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 focus-visible:bg-white dark:bg-slate-900/50 focus-visible:ring-1 focus-visible:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Theme Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-8 w-8 text-slate-500 hover:text-slate-950 dark:hover:text-white rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
            title="Theme switch"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-amber-500 transition-transform duration-300 hover:rotate-90" />
            ) : (
              <Moon className="h-4 w-4 text-indigo-600 transition-transform duration-300 hover:-rotate-12" />
            )}
          </Button>

          {/* Notifications Dropdown */}
          <DropdownMenu open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-8 w-8 text-slate-500 hover:text-slate-950 dark:hover:text-white rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-1 right-1 flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-450 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500"></span>
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-2 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-2">
              <DropdownMenuLabel className="flex justify-between items-center px-2 py-1.5 text-xs font-semibold text-slate-900 dark:text-white">
                <span>දැනුම්දීම් (Notifications)</span>
                <span className="text-[10px] font-normal text-indigo-650 dark:text-indigo-400 hover:underline cursor-pointer">සියල්ල කියවූ ලෙස සලකුණු කරන්න</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
              <div className="max-h-60 overflow-y-auto space-y-0.5 py-1 custom-scrollbar">
                <div className="flex gap-2.5 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition">
                  <div className="flex-shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full bg-emerald-500" />
                  <div className="flex-1 text-[11px]">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">නිෂ්පාදන කාණ්ඩය #846 අවසන්</p>
                    <p className="text-slate-500 dark:text-slate-450">කාණ්ඩය ERP-P846 තොගයට එක් කර ඇත.</p>
                    <span className="text-[9px] text-slate-400">මීට විනාඩි 5කට පෙර</span>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <span className="h-4 w-px bg-slate-200 dark:bg-slate-800 hidden sm:inline" />

          {/* User Account Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer group p-1 pr-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                <Avatar className="h-7 w-7 border border-indigo-50 dark:border-indigo-900 group-hover:scale-105 transition-transform duration-200">
                  <AvatarFallback className="bg-indigo-500 text-white text-xs">AD</AvatarFallback>
                </Avatar>
                <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-white transition hidden md:block" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-2 shadow-lg">
              <DropdownMenuLabel className="px-2 py-1 text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase">Mr. Admin</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
              <DropdownMenuItem className="flex gap-2 items-center px-2 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>ගිණුම් විස්තර (Profile)</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsPasswordModalOpen(true)}
                className="flex gap-2 items-center px-2 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition"
              >
                <Settings className="w-3.5 h-3.5 text-slate-400" />
                <span>මුද්‍රණ පදය වෙනස් කරන්න (Change Password)</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="flex gap-2 items-center px-2 py-1.5 rounded-lg text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>පද්ධතියෙන් ඉවත් වන්න (Sign Out)</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>

      {/* Change Password Dialog */}
      <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
        <DialogContent className="max-w-[400px] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl text-slate-900 dark:text-white">
          <DialogHeader>
            <DialogTitle className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-indigo-500" />
              මුද්‍රණ පදය වෙනස් කරන්න (Change Password)
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
              Mr. Admin, පද්ධතියේ ආරක්ෂාව තහවුරු කිරීම සඳහා ඔබේ මුද්‍රණ පදය මෙතැනින් යාවත්කාලීන කරන්න.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handlePasswordChange} className="space-y-4 my-2">
            {passwordError && (
              <div className="p-3 text-[11px] font-bold text-rose-700 dark:text-rose-300 bg-rose-50/70 dark:bg-rose-950/30 rounded-xl border border-rose-100 dark:border-rose-900/45">
                {passwordError}
              </div>
            )}
            
            {passwordSuccess && (
              <div className="p-3 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xl border border-emerald-100 dark:border-emerald-900/45">
                {passwordSuccess}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-455 dark:text-slate-450">
                වත්මන් මුද්‍රණ පදය (Current Password)
              </label>
              <Input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-455 dark:text-slate-450">
                නව මුද්‍රණ පදය (New Password)
              </label>
              <Input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-455 dark:text-slate-450">
                නව මුද්‍රණ පදය තහවුරු කරන්න (Confirm Password)
              </label>
              <Input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50"
              />
            </div>

            <DialogFooter className="pt-2 flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsPasswordModalOpen(false)}
                className="rounded-xl text-xs font-semibold"
              >
                අවලංගු කරන්න (Cancel)
              </Button>
              <Button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-sky-500 to-indigo-650 text-white text-xs font-bold shadow-md"
              >
                සුරකින්න (Save Change)
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </header>
  )
}
