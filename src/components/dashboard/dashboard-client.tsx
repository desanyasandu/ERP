"use client"

import React, { useState } from "react"
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
  Truck,
  Boxes,
  CircleDollarSign,
  Calendar,
  MapPin,
  Tag,
  ToggleLeft
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface DashboardClientProps {
  initialMetrics: {
    totalSales: number
    activeVehicles: number
    stockLevels: number
    rawMaterialsCount: number
    finishedGoodsCount: number
  }
}

// Interfaces for Recharts Custom Tooltips
interface TooltipPayloadItem {
  name: string
  value: number
  stroke?: string
  color?: string
  payload: Record<string, unknown>
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayloadItem[]
  label?: string
}

// Colors for Infographics
const ALLOCATION_COLORS = ["#6366f1", "#f59e0b", "#10b981", "#8b5cf6", "#0ea5e9"]
const REGIONAL_COLORS = ["#4f46e5", "#6366f1", "#818cf8", "#a5b4fc", "#c7d2fe"]

// Donut Tooltip
const DonutTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const item = payload[0]
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl shadow-md text-xs font-medium">
        <p className="flex justify-between items-center gap-4">
          <span className="text-slate-500 dark:text-slate-400">{item.name}:</span>
          <span className="font-bold text-slate-900 dark:text-white">
            {item.value}% වෙන්කිරීම් (Allocation)
          </span>
        </p>
      </div>
    )
  }
  return null
}

// Pie Tooltip
const PieTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const item = payload[0]
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl shadow-md text-xs font-medium">
        <p className="flex justify-between items-center gap-4">
          <span className="text-slate-500 dark:text-slate-400">{item.name}:</span>
          <span className="font-bold text-slate-900 dark:text-white">
            {item.value}% කලාපීය කොටස (Market Share)
          </span>
        </p>
      </div>
    )
  }
  return null
}

// Bar Tooltip
const BarTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const utilityValue = payload[0]?.value ?? 0
    const maintenanceValue = payload[1]?.value ?? 0
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-xl shadow-lg text-xs">
        <p className="font-bold text-slate-800 dark:text-slate-200 mb-1.5">{label}</p>
        <div className="space-y-1">
          <p className="flex justify-between items-center gap-6">
            <span className="text-amber-500 font-medium">විදුලි/ජල බිල්පත්:</span>
            <span className="font-bold text-slate-900 dark:text-white">
              Rs. {Number(utilityValue).toLocaleString()}
            </span>
          </p>
          <p className="flex justify-between items-center gap-6">
            <span className="text-indigo-500 font-medium">නඩත්තු පිරිවැය:</span>
            <span className="font-bold text-slate-900 dark:text-white">
              Rs. {Number(maintenanceValue).toLocaleString()}
            </span>
          </p>
          <div className="pt-1 border-t border-slate-100 dark:border-slate-855 mt-1 flex justify-between items-center gap-6 text-[10px] font-bold text-slate-400">
            <span>එකතුව (Total):</span>
            <span>
              Rs. {(Number(utilityValue) + Number(maintenanceValue)).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default function DashboardClient({ initialMetrics }: DashboardClientProps) {
  // Filter States
  const [region, setRegion] = useState("All Regions")
  const [category, setCategory] = useState("All Materials")
  const [startDate, setStartDate] = useState("2026-05-01")
  const [endDate, setEndDate] = useState("2026-05-30")
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
    { name: "බස්නාහිර කලාපය (Western)", value: 38 },
    { name: "මධ්‍යම කලාපය (Central)", value: 27 },
    { name: "දකුණු කලාපය (Southern)", value: 18 },
    { name: "වයඹ කලාපය (Wayamba)", value: 12 },
    { name: "නැගෙනහිර කලාපය (Eastern)", value: 5 }
  ])

  // Monthly Expenses in Sri Lankan Rupees
  const [expenseData] = useState([
    { month: "ජන (Jan)", utility: 45000, maintenance: 32000 },
    { month: "පෙබ (Feb)", utility: 52000, maintenance: 38000 },
    { month: "මාර් (Mar)", utility: 49000, maintenance: 41000 },
    { month: "අප්‍රේ (Apr)", utility: 61000, maintenance: 35000 },
    { month: "මැයි (May)", utility: 58000, maintenance: 49000 },
    { month: "ජූනි (Jun)", utility: 64000, maintenance: 52000 }
  ])

  // Simulate filter triggers
  const handleFilterChange = (type: string, val: string) => {
    if (type === "region") {
      setRegion(val)
      const multiplier = val === "Western" ? 1.25 : val === "Central" ? 0.85 : 1.0
      setDistributorSales([
        { name: "බස්නාහිර කලාපය (Western)", value: Math.round(38 * multiplier) },
        { name: "මධ්‍යම කලාපය (Central)", value: Math.round(27 / multiplier) },
        { name: "දකුණු කලාපය (Southern)", value: 18 },
        { name: "වයඹ කලාපය (Wayamba)", value: 12 },
        { name: "නැගෙනහිර කලාපය (Eastern)", value: 5 }
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
    <div className="space-y-6">
      
      {/* 2. Form & Filter Design Panel in Sinhala */}
      <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-4">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5 items-end">
          
          {/* Region Select */}
          <div className="space-y-1">
            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              බෙදාහැරීමේ කලාපය (Region)
            </label>
            <select
              value={region}
              onChange={(e) => handleFilterChange("region", e.target.value)}
              className="w-full px-3 py-1.5 h-9 text-xs rounded-xl border border-slate-200 dark:border-slate-855 bg-slate-50 dark:bg-slate-900 focus-visible:ring-1 focus-visible:ring-indigo-500 font-medium text-slate-700 dark:text-slate-350 outline-none transition cursor-pointer"
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
            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500 flex items-center gap-1">
              <Tag className="w-3 h-3 text-slate-400" />
              අමුද්‍රව්‍ය කාණ්ඩය (Category)
            </label>
            <select
              value={category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="w-full px-3 py-1.5 h-9 text-xs rounded-xl border border-slate-200 dark:border-slate-855 bg-slate-50 dark:bg-slate-900 focus-visible:ring-1 focus-visible:ring-indigo-500 font-medium text-slate-700 dark:text-slate-350 outline-none transition cursor-pointer"
            >
              <option value="All Materials">සියලුම අමුද්‍රව්‍ය (All)</option>
              <option value="Soya">සෝයා අමුද්‍රව්‍ය (Soya)</option>
              <option value="Coconut">පොල්තෙල් අමුද්‍රව්‍ය (Coconut)</option>
              <option value="Paddy">වී නිෂ්පාදන (Paddy/Rice)</option>
            </select>
          </div>

          {/* Start Date Picker */}
          <div className="space-y-1">
            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              ආරම්භක දිනය (Start)
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-1.5 h-9 text-xs rounded-xl border border-slate-200 dark:border-slate-855 bg-slate-50 dark:bg-slate-900 focus-visible:ring-1 focus-visible:ring-indigo-500 font-medium text-slate-700 dark:text-slate-355 outline-none transition cursor-pointer"
            />
          </div>

          {/* End Date Picker */}
          <div className="space-y-1">
            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              අවසන් දිනය (End)
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-1.5 h-9 text-xs rounded-xl border border-slate-200 dark:border-slate-855 bg-slate-50 dark:bg-slate-900 focus-visible:ring-1 focus-visible:ring-indigo-500 font-medium text-slate-700 dark:text-slate-355 outline-none transition cursor-pointer"
            />
          </div>

          {/* Toggle Switch */}
          <div className="space-y-1.5 pb-0.5 flex flex-col justify-end">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500 mb-1 flex items-center gap-1">
              <ToggleLeft className="w-3.5 h-3.5 text-slate-400" />
              සජීවී දත්ත යාවත්කාලීන (Live Feed)
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsLive(!isLive)}
                className={cn(
                  "relative inline-flex h-5.5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out focus:outline-none",
                  isLive ? "bg-indigo-600" : "bg-slate-200 dark:bg-slate-800"
                )}
              >
                <span
                  className={cn(
                    "pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow transition duration-250 ease-in-out",
                    isLive ? "translate-x-4.5" : "translate-x-0"
                  )}
                />
              </button>
              <span className="text-[11px] font-semibold text-slate-550">
                {isLive ? "සජීවී (Live Active)" : "ස්ථාවර (Static Overview)"}
              </span>
            </div>
          </div>

        </div>
      </Card>

      {/* 3. Infographic KPI Cards Section in Sinhala */}
      <div className="grid gap-6 md:grid-cols-3">
        
        {/* Total Sales KPI */}
        <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden relative transition-all duration-300 hover:shadow-md">
          <div className="absolute top-0 left-0 h-1.5 w-full bg-indigo-500" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-5">
            <div>
              <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-450 dark:text-slate-500">
                මුළු විකුණුම් ආදායම (Total Sales)
              </CardDescription>
              <CardTitle className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                Rs. {initialMetrics.totalSales.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </CardTitle>
            </div>
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400">
              <CircleDollarSign className="w-5.5 h-5.5" />
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+12.4% පසුගිය වාරයට සාපේක්ෂව</span>
            </div>
          </CardContent>
        </Card>

        {/* Active Vehicles KPI */}
        <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden relative transition-all duration-300 hover:shadow-md">
          <div className="absolute top-0 left-0 h-1.5 w-full bg-amber-500" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-5">
            <div>
              <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-450 dark:text-slate-500">
                ලොරි රථ ධාවනය (Active Fleet dispatches)
              </CardDescription>
              <CardTitle className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                WP-TRK ලොරි රථ {initialMetrics.activeVehicles}ක්
              </CardTitle>
            </div>
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400">
              <Truck className="w-5.5 h-5.5" />
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
              භාණ්ඩ බෙදාහැරීම සඳහා දැනට ධාවනයේ යෙදෙන වාහන සංඛ්‍යාව
            </div>
          </CardContent>
        </Card>

        {/* Stock Levels KPI */}
        <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden relative transition-all duration-300 hover:shadow-md">
          <div className="absolute top-0 left-0 h-1.5 w-full bg-emerald-500" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-5">
            <div>
              <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-450 dark:text-slate-500">
                මුළු ගබඩා තොග මට්ටම (Stock Levels)
              </CardDescription>
              <CardTitle className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                ඒකක {initialMetrics.stockLevels.toLocaleString()} ක්
              </CardTitle>
            </div>
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
              <Boxes className="w-5.5 h-5.5" />
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1 flex items-center justify-between">
              <span>අමුද්‍රව්‍ය වර්ග {initialMetrics.rawMaterialsCount} ක්</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>නිමි භාණ්ඩ කාණ්ඩ {initialMetrics.finishedGoodsCount} ක්</span>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* 3. Infographic Recharts Visualizations Grid in Sinhala */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        {/* Donut Chart: Raw Material Allocation */}
        <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-5 flex flex-col justify-between">
          <CardHeader className="p-0 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-base font-bold text-slate-900 dark:text-white">අමුද්‍රව්‍ය වෙන්කිරීම් (Material Allocation)</CardTitle>
                <CardDescription className="text-xs">ගබඩාවේ පවතින අමුද්‍රව්‍ය ප්‍රතිශත මට්ටම්</CardDescription>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-700 bg-indigo-50 dark:bg-indigo-950/20 px-2 py-0.5 rounded-full border border-indigo-100 dark:border-indigo-900/40">
                තොග
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex flex-col items-center justify-center min-h-[260px]">
            <div className="h-[220px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<DonutTooltip />} />
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
                    wrapperStyle={{ fontSize: "10px", fontWeight: "600" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Central absolute metric text to build perfect Donut summary */}
              <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <span className="text-2xl font-black text-slate-900 dark:text-white">5</span>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold">කාණ්ඩ</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart: Sales by Distributor Area */}
        <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-5 flex flex-col justify-between">
          <CardHeader className="p-0 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-base font-bold text-slate-900 dark:text-white">ප්‍රාදේශීය විකුණුම් අනුපාතය (Regional Sales)</CardTitle>
                <CardDescription className="text-xs">කලාපීය වශයෙන් අලෙවි ප්‍රමාණයන් බෙදී යාම</CardDescription>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-700 bg-sky-50 dark:bg-sky-950/20 px-2 py-0.5 rounded-full border border-sky-100 dark:border-sky-900/40">
                කලාපීය
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex flex-col items-center justify-center min-h-[260px]">
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<PieTooltip />} />
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
                    wrapperStyle={{ fontSize: "10px", fontWeight: "600" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bar Chart: Monthly Expenses */}
        <Card className="md:col-span-2 lg:col-span-1 rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-5 flex flex-col justify-between">
          <CardHeader className="p-0 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-base font-bold text-slate-900 dark:text-white">මාසික විදුලි/නඩත්තු පිරිවැය (Expenses)</CardTitle>
                <CardDescription className="text-xs">පසුගිය මාස 6ක නඩත්තු සහ බිල්පත් පිරිවැය</CardDescription>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-900/40">
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
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.922 0 0 / 50%)" className="dark:stroke-slate-800/50" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} dy={6} />
                  <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} dx={-6} tickFormatter={(v) => `Rs.${v}`} />
                  <Tooltip content={<BarTooltip />} cursor={{ fill: "rgba(148, 163, 184, 0.05)", radius: 6 }} />
                  <Legend
                    verticalAlign="top"
                    height={30}
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: "10px", fontWeight: "600" }}
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
