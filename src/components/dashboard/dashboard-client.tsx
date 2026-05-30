"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"
import {
  TrendingUp,
  Boxes,
  CircleDollarSign,
  FileBarChart2,
  Calendar,
  MapPin,
  Tag,
  ToggleLeft,
  User,
  Package,
  TrendingDown,
  Info,
  Scale,
  Award
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

interface DashboardClientProps {
  initialMetrics: {
    totalSales: number
    activeVehicles: number
    stockLevels: number
    rawMaterialsCount: number
    finishedGoodsCount: number
  }
}

// Colors for Infographics
const ALLOCATION_COLORS = ["#6366f1", "#f59e0b", "#10b981", "#8b5cf6", "#0ea5e9"]
const REGIONAL_COLORS = ["#4f46e5", "#6366f1", "#818cf8", "#a5b4fc", "#c7d2fe"]

export default function DashboardClient({ initialMetrics }: DashboardClientProps) {
  const router = useRouter()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === "dark"

  // Filter States
  const [region, setRegion] = useState("All Regions")
  const [category, setCategory] = useState("All Materials")
  const [isLive, setIsLive] = useState(true)

  // Customized Sri Lankan Grocery Raw Materials Donut Allocation
  const [rawMaterialAllocation, setRawMaterialAllocation] = useState([
    { name: "සෝයා පිටි (Soya Flour)", value: 35 },
    { name: "පොල්තෙල් (Coconut Oil)", value: 25 },
    { name: "සම්බා වී (Samba Paddy)", value: 15 },
    { name: "රතු පරිප්පු (Red Dhal)", value: 15 },
    { name: "අමු සීනි (Raw Sugar)", value: 10 }
  ])

  // Distributor Regions Pie Sales
  const [distributorSales, setDistributorSales] = useState([
    { name: "බස්නාහිර (Western)", value: 38 },
    { name: "මධ්‍යම (Central)", value: 27 },
    { name: "දකුණු (Southern)", value: 18 },
    { name: "වයඹ (Wayamba)", value: 12 },
    { name: "නැගෙනහිර (Eastern)", value: 5 }
  ])

  // Monthly Expenses in Sri Lankan Rupees
  const [expenseData] = useState([
    { month: "ජන", utility: 45000, maintenance: 32000 },
    { month: "පෙබ", utility: 52000, maintenance: 38000 },
    { month: "මාර්", utility: 49000, maintenance: 41000 },
    { month: "අප්‍රේ", utility: 61000, maintenance: 35000 },
    { month: "මැයි", utility: 58000, maintenance: 49000 },
    { month: "ජූනි", utility: 64000, maintenance: 52000 }
  ])

  // Quick Action Buttons list
  const quickActions = [
    { label: "ගනුදෙනුකරුවන් (Clients)", url: "/operations?view=client", icon: User, color: "text-indigo-650 bg-indigo-50 border-indigo-100 dark:text-indigo-400 dark:bg-indigo-950/30 dark:border-indigo-900/50" },
    { label: "අලෙවි ලෙජරය (Sales)", url: "/operations?view=sales", icon: CircleDollarSign, color: "text-emerald-700 bg-emerald-50 border-emerald-100 dark:text-emerald-400 dark:bg-emerald-950/30 dark:border-emerald-900/50" },
    { label: "අයකරගැනීම් (Recovery)", url: "/operations?view=recovery", icon: TrendingUp, color: "text-violet-700 bg-violet-50 border-violet-100 dark:text-violet-400 dark:bg-violet-950/30 dark:border-violet-900/50" },
    { label: "තොග පාලනය (Stock)", url: "/operations?view=stock", icon: Boxes, color: "text-amber-700 bg-amber-50 border-amber-100 dark:text-amber-400 dark:bg-amber-950/30 dark:border-amber-900/50" },
    { label: "සැපයුම්කරුවන් (Suppliers)", url: "/operations?view=supplier", icon: Package, color: "text-sky-700 bg-sky-50 border-sky-100 dark:text-sky-400 dark:bg-sky-950/30 dark:border-sky-900/50" },
    { label: "වියදම් පාලනය (Expenses)", url: "/operations?view=expenses", icon: TrendingDown, color: "text-rose-700 bg-rose-50 border-rose-100 dark:text-rose-400 dark:bg-rose-950/30 dark:border-rose-900/50" },
    { label: "මුදල් පොත් (Cash Books)", url: "/finance?view=cashbook", icon: Scale, color: "text-indigo-700 bg-indigo-50 border-indigo-100 dark:text-indigo-400 dark:bg-indigo-950/30 dark:border-indigo-900/50" },
    { label: "ලාභ/අලාභ (Profit & Loss)", url: "/finance?view=pandl", icon: CircleDollarSign, color: "text-emerald-700 bg-emerald-50 border-emerald-100 dark:text-emerald-400 dark:bg-emerald-950/30 dark:border-emerald-900/50" },
    { label: "ශේෂ පත්‍රය (Balance Sheet)", url: "/finance?view=balancesheet", icon: FileBarChart2, color: "text-violet-700 bg-violet-50 border-violet-100 dark:text-violet-400 dark:bg-violet-950/30 dark:border-violet-900/50" },
    { label: "කළමනාකාර මණ්ඩලය", url: "/operations?view=managers", icon: Award, color: "text-amber-700 bg-amber-50 border-amber-100 dark:text-amber-400 dark:bg-amber-950/30 dark:border-amber-900/50" }
  ]

  // Simulate filter triggers
  const handleFilterChange = (type: string, val: string) => {
    if (type === "region") {
      setRegion(val)
      const multiplier = val === "Western" ? 1.25 : val === "Central" ? 0.85 : 1.0
      setDistributorSales([
        { name: "බස්නාහිර (Western)", value: Math.round(38 * multiplier) },
        { name: "මධ්‍යම (Central)", value: Math.round(27 / multiplier) },
        { name: "දකුණු (Southern)", value: 18 },
        { name: "වයඹ (Wayamba)", value: 12 },
        { name: "නැගෙනහිර (Eastern)", value: 5 }
      ])
    } else if (type === "category") {
      setCategory(val)
      const multiplier = val === "Coconut" ? 1.4 : 1.0
      setRawMaterialAllocation([
        { name: "සෝයා පිටි (Soya Flour)", value: val === "Coconut" ? 20 : 35 },
        { name: "පොල්තෙල් (Coconut Oil)", value: Math.round(25 * multiplier) },
        { name: "සම්බා වී (Samba Paddy)", value: 15 },
        { name: "රතු පරිප්පු (Red Dhal)", value: 15 },
        { name: "අමු සීනි (Raw Sugar)", value: 10 }
      ])
    }
  }

  return (
    <div className="space-y-8">
      
      {/* 1. Form & Filter Design Panel */}
      <Card className="rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-4 animate-fade-in text-slate-900 dark:text-white">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5 items-end">
          
          {/* Region Select */}
          <div className="space-y-1">
            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400 dark:text-slate-500" />
              බෙදාහැරීමේ කලාපය (Region)
            </label>
            <select
              value={region}
              onChange={(e) => handleFilterChange("region", e.target.value)}
              className="w-full px-3 py-1.5 h-9 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 focus-visible:ring-1 focus-visible:ring-indigo-500 font-medium text-slate-700 dark:text-slate-200 outline-none transition cursor-pointer"
            >
              <option value="All Regions">සියලුම කලාප (All Regions)</option>
              <option value="Western">බස්නාහිර කලාපය (Western)</option>
              <option value="Central">මධ්‍යම කලාපය (Central)</option>
              <option value="Southern">දකුණු කලාපය (Southern)</option>
              <option value="Wayamba">වයඹ කලාපය (Wayamba)</option>
            </select>
          </div>

          {/* Category Select */}
          <div className="space-y-1">
            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400 flex items-center gap-1">
              <Tag className="w-3 h-3 text-slate-400 dark:text-slate-500" />
              අමුද්‍රව්‍ය කාණ්ඩය (Category)
            </label>
            <select
              value={category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="w-full px-3 py-1.5 h-9 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 focus-visible:ring-1 focus-visible:ring-indigo-500 font-medium text-slate-700 dark:text-slate-200 outline-none transition cursor-pointer"
            >
              <option value="All Materials">සියලුම අමුද්‍රව්‍ය (All)</option>
              <option value="Soya">සෝයා අමුද්‍රව්‍ය (Soya)</option>
              <option value="Coconut">පොල්තෙල් අමුද්‍රව්‍ය (Coconut)</option>
              <option value="Paddy">වී නිෂ්පාදන (Paddy/Rice)</option>
            </select>
          </div>

          {/* Start Date Picker */}
          <div className="space-y-1">
            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400 dark:text-slate-500" />
              දිනය සිට (From Date)
            </label>
            <input
              type="date"
              defaultValue="2026-05-01"
              className="w-full px-3 py-1.5 h-9 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 focus-visible:ring-1 focus-visible:ring-indigo-500 font-medium text-slate-700 dark:text-slate-200 outline-none transition cursor-pointer"
            />
          </div>

          {/* End Date Picker */}
          <div className="space-y-1">
            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-455 dark:text-slate-400 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400 dark:text-slate-500" />
              දිනය දක්වා (To Date)
            </label>
            <input
              type="date"
              defaultValue="2026-05-30"
              className="w-full px-3 py-1.5 h-9 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 focus-visible:ring-1 focus-visible:ring-indigo-500 font-medium text-slate-700 dark:text-slate-200 outline-none transition cursor-pointer"
            />
          </div>

          {/* Toggle Switch */}
          <div className="space-y-1.5 pb-0.5 flex flex-col justify-end">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400 mb-1 flex items-center gap-1">
              <ToggleLeft className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              සජීවී දත්ත යාවත්කාලීන (Live Feed)
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsLive(!isLive)}
                className={cn(
                  "relative inline-flex h-5.5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out focus:outline-none",
                  isLive ? "bg-indigo-650" : "bg-slate-200 dark:bg-slate-700"
                )}
              >
                <span
                  className={cn(
                    "pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-white dark:bg-slate-300 shadow transition duration-250 ease-in-out",
                    isLive ? "translate-x-4.5" : "translate-x-0"
                  )}
                />
              </button>
              <span className="text-[11px] font-semibold text-slate-550 dark:text-slate-350">
                {isLive ? "සජීවී (Live Feed)" : "ස්ථාවර (Static)"}
              </span>
            </div>
          </div>

        </div>

        {/* Real-time system diagnostics line */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>සජීවී දත්ත ගොනු සම්බන්ධතාවය: </span>
            <span className="font-bold text-slate-700 dark:text-slate-350">Active DB Connection OK</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>අමුද්‍රව්‍ය වර්ග: <strong className="text-slate-800 dark:text-white font-extrabold">{initialMetrics.rawMaterialsCount}</strong></span>
            <span>නිමි භාණ්ඩ SKU: <strong className="text-slate-800 dark:text-white font-extrabold">{initialMetrics.finishedGoodsCount}</strong></span>
            <span>මුළු තොගය: <strong className="text-slate-800 dark:text-white font-extrabold">{initialMetrics.stockLevels.toLocaleString()} kg/Pkts</strong></span>
            <span>සක්‍රීය බෙදාහැරීම්: <strong className="text-slate-800 dark:text-white font-extrabold">{initialMetrics.activeVehicles}</strong></span>
            <span>ලියාපදිංචි මුළු විකුණුම්: <strong className="text-slate-800 dark:text-white font-extrabold">Rs. {initialMetrics.totalSales.toLocaleString()}</strong></span>
          </div>
        </div>
      </Card>

      {/* 2. Stunning Grid of Live Financial & Operational Balances */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in">
        
        {/* Today's Sales */}
        <Card className="rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden relative transition-all duration-300 hover:shadow-md">
          <div className="absolute top-0 left-0 h-1.5 w-full bg-emerald-500" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-5">
            <div>
              <CardDescription className="text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400">අද විකුණුම් (Today&apos;s Sales)</CardDescription>
              <CardTitle className="text-xl font-black text-slate-900 dark:text-white mt-1">Rs. 185,000.00</CardTitle>
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
              <CircleDollarSign className="w-5 h-5" />
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +8.5% ඊයේ දිනට වඩා
            </span>
          </CardContent>
        </Card>

        {/* Total Recoveries */}
        <Card className="rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden relative transition-all duration-300 hover:shadow-md">
          <div className="absolute top-0 left-0 h-1.5 w-full bg-violet-500" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-5">
            <div>
              <CardDescription className="text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400">ණය අයකරගැනීම් (Total Recoveries)</CardDescription>
              <CardTitle className="text-xl font-black text-slate-900 dark:text-white mt-1">Rs. 105,000.00</CardTitle>
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">BOC/Sampath චෙක්පත් ඇතුළුව</span>
          </CardContent>
        </Card>

        {/* Cash Balance */}
        <Card className="rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden relative transition-all duration-300 hover:shadow-md">
          <div className="absolute top-0 left-0 h-1.5 w-full bg-indigo-500" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-5">
            <div>
              <CardDescription className="text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400">පවතින මුදල් ශේෂය (Cash Balance)</CardDescription>
              <CardTitle className="text-xl font-black text-slate-900 dark:text-white mt-1">Rs. 890,200.00</CardTitle>
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
              <Scale className="w-5 h-5" />
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">ශේෂය තුලනය වී ඇත</span>
          </CardContent>
        </Card>

        {/* Debtors & Creditors */}
        <Card className="rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden relative transition-all duration-300 hover:shadow-md">
          <div className="absolute top-0 left-0 h-1.5 w-full bg-amber-500" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-5">
            <div>
              <CardDescription className="text-[10px] font-bold uppercase tracking-wider text-slate-455 dark:text-slate-400">ණයහිමි/ණයගැති පාලනය</CardDescription>
              <CardTitle className="text-xl font-black text-slate-900 dark:text-white mt-1">Rs. 465k / Rs. 250k</CardTitle>
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
              <Info className="w-5 h-5" />
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <span className="text-[10px] text-rose-600 dark:text-rose-400 font-bold">BOC සංවර්ධන ණය Rs. 1.2M</span>
          </CardContent>
        </Card>

      </div>

      {/* 3. QUICK ACTION DIRECTORY CENTER */}
      <Card className="rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6 animate-fade-in">
        <CardHeader className="p-0 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
          <CardTitle className="text-sm font-extrabold text-slate-800 dark:text-white">ක්‍රියාකාරී සබැඳි මධ්‍යස්ථානය (Quick Launch Control Center)</CardTitle>
          <CardDescription className="text-xs">TheERP පද්ධතියේ ප්‍රධාන මොඩියුලයන් 10 වෙත මෙතැනින් ක්ෂණිකව පිවිසෙන්න.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
            {quickActions.map((qa, index) => {
              const Icon = qa.icon
              return (
                <button
                  key={index}
                  onClick={() => router.push(qa.url)}
                  className={cn(
                    "flex flex-col items-center justify-center text-center p-4 border rounded-xl hover:shadow-md transition-all duration-300 gap-2 font-bold text-xs group",
                    qa.color
                  )}
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>{qa.label}</span>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* 4. Infographic Recharts Visualizations Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        {/* Donut Chart: Raw Material Allocation */}
        <Card className="rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-5 flex flex-col justify-between">
          <CardHeader className="p-0 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-base font-bold text-slate-900 dark:text-white">අමුද්‍රව්‍ය වෙන්කිරීම් (Material Allocation)</CardTitle>
                <CardDescription className="text-xs">ගබඩාවේ පවතින අමුද්‍රව්‍ය ප්‍රතිශත මට්ටම්</CardDescription>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-700 bg-indigo-50 border-indigo-100 dark:text-indigo-400 dark:bg-indigo-950/30 dark:border-indigo-900/50 px-2 py-0.5 rounded-full">
                තොග
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex flex-col items-center justify-center min-h-[260px]">
            <div className="h-[220px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={rawMaterialAllocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {rawMaterialAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={ALLOCATION_COLORS[index % ALLOCATION_COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: "10px", fontWeight: "600", color: isDark ? "#cbd5e1" : "#475569" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <span className="text-2xl font-black text-slate-900 dark:text-white">5</span>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-extrabold">අමුද්‍රව්‍ය</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart: Sales by Distributor Area */}
        <Card className="rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-5 flex flex-col justify-between">
          <CardHeader className="p-0 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-base font-bold text-slate-900 dark:text-white">ප්‍රාදේශීය විකුණුම් අනුපාතය (Regional Sales)</CardTitle>
                <CardDescription className="text-xs">කලාපීය වශයෙන් අලෙවි ප්‍රමාණයන් බෙදී යාම</CardDescription>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-700 bg-sky-50 border-sky-100 dark:text-sky-400 dark:bg-sky-950/30 dark:border-sky-900/50 px-2 py-0.5 rounded-full">
                කලාපීය
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex flex-col items-center justify-center min-h-[260px]">
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributorSales}
                    cx="50%"
                    cy="50%"
                    outerRadius={75}
                    dataKey="value"
                  >
                    {distributorSales.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={REGIONAL_COLORS[index % REGIONAL_COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: "10px", fontWeight: "600", color: isDark ? "#cbd5e1" : "#475569" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bar Chart: Monthly Expenses */}
        <Card className="md:col-span-2 lg:col-span-1 rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-5 flex flex-col justify-between">
          <CardHeader className="p-0 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-base font-bold text-slate-900 dark:text-white">මාසික විදුලි/නඩත්තු පිරිවැය (Expenses)</CardTitle>
                <CardDescription className="text-xs">නඩත්තු සහ බිල්පත් පිරිවැය ප්‍රමුඛතාව</CardDescription>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-50 border-rose-100 dark:text-rose-400 dark:bg-rose-950/30 dark:border-rose-900/50 px-2 py-0.5 rounded-full">
                වියදම්
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex flex-col justify-between min-h-[260px]">
            <div className="h-[230px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={expenseData}
                  margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                  barGap={4}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#334155" : "#f1f5f9"} />
                  <XAxis dataKey="month" stroke={isDark ? "#94a3b8" : "#64748b"} fontSize={10} tickLine={false} axisLine={false} dy={6} />
                  <YAxis stroke={isDark ? "#94a3b8" : "#64748b"} fontSize={10} tickLine={false} axisLine={false} dx={-6} tickFormatter={(v) => `Rs.${v}`} />
                  <Tooltip cursor={{ fill: "rgba(148, 163, 184, 0.05)", radius: 6 }} contentStyle={{ backgroundColor: isDark ? "#0f172a" : "#ffffff", borderColor: isDark ? "#334155" : "#e2e8f0", color: isDark ? "#f8fafc" : "#0f172a" }} />
                  <Legend
                    verticalAlign="top"
                    height={30}
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: "10px", fontWeight: "600", color: isDark ? "#cbd5e1" : "#475569" }}
                  />
                  <Bar name="විදුලි/ජල බිල (Utility)" dataKey="utility" fill="#f59e0b" radius={[3, 3, 0, 0]} maxBarSize={16} />
                  <Bar name="යන්ත්‍ර නඩත්තුව (Maintenance)" dataKey="maintenance" fill="#6366f1" radius={[3, 3, 0, 0]} maxBarSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

      </div>

    </div>
  )
}
