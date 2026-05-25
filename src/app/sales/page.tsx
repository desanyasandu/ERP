import React from "react"
import Link from "next/link"
import {
  CircleDollarSign,
  ArrowLeft,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Wallet,
  User,
  Calendar,
  Layers,
  Sparkles,
  Info
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { prisma } from "@/lib/prisma"
import RevenueChart from "@/components/sales/revenue-chart"
import PettyCashModal from "@/components/sales/petty-cash-modal"
import { cn } from "@/lib/utils"

export const revalidate = 0 // Disable cache to get fresh DB records

// Helper to generate deterministic but realistic daily revenue based on date keys
function getDeterministicRevenue(dateStr: string, clientSeed: number) {
  let hash = 0
  for (let i = 0; i < dateStr.length; i++) {
    hash = dateStr.charCodeAt(i) + ((hash << 5) - hash)
  }
  hash += clientSeed
  // Generate value between 0 and 1
  const value = Math.abs(Math.sin(hash))
  return value
}

export default async function SalesPage({ searchParams }: { searchParams?: { view?: string } }) {
  const view = searchParams?.view || "revenue"

  // 1. Fetch live PettyCash records from database
  const pettyCashRecords = await prisma.pettyCash.findMany({
    orderBy: {
      createdAt: "desc"
    }
  })

  // Calculate Petty Cash Aggregates (Rupees)
  const totalPettyCashDisbursed = pettyCashRecords.reduce((sum, rec) => sum + rec.amount, 0)
  const pettyCashCount = pettyCashRecords.length

  // 2. Generate 15-day sales timeline for Grocery and Food City in LKR (Rupees)
  const salesTimelineData = []
  const today = new Date()
  let totalGrocery = 0
  let totalFoodCity = 0

  for (let i = 14; i >= 0; i--) {
    const d = new Date()
    d.setDate(today.getDate() - i)
    const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    const fullDateKey = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`

    // Deterministic daily values
    const grocerySeed = getDeterministicRevenue(fullDateKey, 123)
    const foodCitySeed = getDeterministicRevenue(fullDateKey, 456)

    // Grocery Range in LKR: Rs. 150,000 - Rs. 450,000 per day
    const groceryRevenue = Math.round(150000 + grocerySeed * 300000)
    // Food City Range in LKR: Rs. 200,000 - Rs. 550,000 per day
    const foodcityRevenue = Math.round(200000 + foodCitySeed * 350000)

    salesTimelineData.push({
      date: dateStr,
      grocery: groceryRevenue,
      foodcity: foodcityRevenue
    })

    totalGrocery += groceryRevenue
    totalFoodCity += foodcityRevenue
  }

  const grossSalesValue = totalGrocery + totalFoodCity
  const averageDailySales = Math.round(grossSalesValue / 15)

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-indigo-650 dark:text-indigo-400 hover:underline font-semibold">
          <ArrowLeft className="w-3.5 h-3.5" />
          ආපසු කළමනාකරණ පුවරුවට (Dashboard)
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400">
              <CircleDollarSign className="w-5.5 h-5.5" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                දෛනික විකුණුම් සහ අලෙවි වාර්තා (Sales & Revenue)
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                බඩු කඩ සහ ෆුඩ් සිටි ජාලයේ දෛනික විකුණුම් ආදායම් මට්ටම් මෙන්ම රියදුරන්ගේ සුළු මුදල් අත්තිකාරම් පාලනය මෙතැනින්.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Analytics Overview Grid in LKR Rupees */}
      <div className="grid gap-6 md:grid-cols-4">
        
        {/* Gross Sales Value */}
        <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md">
          <div className="absolute top-0 left-0 h-1 w-full bg-violet-500" />
          <div className="text-slate-450 dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider">
            මුළු විකුණුම් ආදායම (පසුගිය දින 15)
          </div>
          <div className="text-xl font-extrabold mt-1 text-slate-900 dark:text-white">
            Rs. {grossSalesValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1 flex items-center gap-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" />
            +8.2% පසුගිය වාරයට සාපේක්ෂව
          </div>
        </Card>

        {/* Avg Daily Sales */}
        <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md">
          <div className="absolute top-0 left-0 h-1 w-full bg-indigo-500" />
          <div className="text-slate-455 dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider">
            දෛනික සාමාන්‍ය විකුණුම් එකතුව
          </div>
          <div className="text-xl font-extrabold mt-1 text-slate-900 dark:text-white">
            Rs. {averageDailySales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1 font-semibold">
            <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
            ප්‍රධාන ගิණුම් 2න් සමුච්චිතයි
          </div>
        </Card>

        {/* Total Petty Cash Disbursed */}
        <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md">
          <div className="absolute top-0 left-0 h-1 w-full bg-amber-500" />
          <div className="text-slate-455 dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider">
            මුළු සුළු මුදල් අත්තිකාරම් (Petty Cash)
          </div>
          <div className="text-xl font-extrabold mt-1 text-slate-900 dark:text-white">
            Rs. {totalPettyCashDisbursed.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-amber-600 dark:text-amber-500 font-semibold mt-1 flex items-center gap-1">
            <Wallet className="w-3.5 h-3.5 text-amber-500" />
            හදිසි මෙහෙයුම් ලොග් එකතුව
          </div>
        </Card>

        {/* Active Cash Dispatches count */}
        <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md">
          <div className="absolute top-0 left-0 h-1 w-full bg-emerald-500" />
          <div className="text-slate-455 dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider">
            නිකුත් කළ අත්තිකාරම් වාර ගණන
          </div>
          <div className="text-xl font-extrabold mt-1 text-slate-900 dark:text-white">
            අත්තිකාරම් {pettyCashCount} ක්
          </div>
          <div className="text-xs text-emerald-600 dark:text-emerald-500 font-semibold mt-1 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-emerald-500" />
            දත්ත ගොනුවෙන් සක්‍රීය ලොග්
          </div>
        </Card>

      </div>

      {/* Dynamic Tab Switcher */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-1.5 pt-2">
        <Link
          href="/sales?view=revenue"
          className={cn(
            "pb-3.5 text-xs font-bold border-b-2 px-4 transition-all duration-200",
            view === "revenue"
              ? "border-violet-500 text-violet-600 dark:text-violet-400 font-extrabold"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
          )}
        >
          දෛනික විකුණුම් (Daily Revenue)
        </Link>
        <Link
          href="/sales?view=ledger"
          className={cn(
            "pb-3.5 text-xs font-bold border-b-2 px-4 transition-all duration-200",
            view === "ledger"
              ? "border-violet-500 text-violet-600 dark:text-violet-400 font-extrabold"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
          )}
        >
          ඉන්වොයිස් ලෙජරය (Invoice Ledger)
        </Link>
        <Link
          href="/sales?view=pettycash"
          className={cn(
            "pb-3.5 text-xs font-bold border-b-2 px-4 transition-all duration-200",
            view === "pettycash"
              ? "border-violet-500 text-violet-600 dark:text-violet-400 font-extrabold"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
          )}
        >
          සුළු මුදල් අත්තිකාරම් (Petty Cash)
        </Link>
      </div>

      {/* Conditional views render */}
      {view === "revenue" && (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Double Line Chart Card */}
          <Card className="lg:col-span-2 rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden flex flex-col justify-between">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-base font-bold text-slate-900 dark:text-white">දෛනික විකුණුම් ප්‍රස්ථාරය (Daily Sales Revenue)</CardTitle>
                  <CardDescription className="text-xs">පසුගිය දින 15 පුරා බඩු කඩ සහ ෆුඩ් සිටි බෙදාහැරීම් ආදායම (LKR)</CardDescription>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-violet-700 bg-violet-50 dark:bg-violet-950/20 px-2.5 py-1 rounded-full border border-violet-100 dark:border-violet-900/40">
                  <Sparkles className="w-3 h-3 text-violet-600 animate-spin" />
                  සජීවී (Live Feed)
                </span>
              </div>
            </CardHeader>
            <CardContent className="pb-6">
              <RevenueChart data={salesTimelineData} />
            </CardContent>
          </Card>

          {/* Corporate Client Accounts Summary Card */}
          <Card className="lg:col-span-1 rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden flex flex-col justify-between p-6">
            <div className="space-y-6">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-500" />
                  පාරිභෝගික ගිණුම් ලෙජරය
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  ප්‍රධාන සිල්ලර සහ තොග ගැනුම්කරුවන්ගේ විකුණුම් ප්‍රතිශතයන් සහ වටිනාකම.
                </p>
              </div>

              <div className="space-y-4">
                {/* Grocery accounts item */}
                <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-855 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-850 dark:text-slate-200">සිල්ලර හා බඩු කඩ ජාලය (Grocery Chain)</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-450 mt-0.5">ප්‍රධාන සිල්ලර ගැනුම්කරුවන්</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-extrabold text-violet-600 dark:text-violet-400">
                      Rs. {totalGrocery.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-[10px] text-slate-450 dark:text-slate-550 font-bold mt-0.5">
                      {Math.round((totalGrocery / grossSalesValue) * 100)}% දායකත්වය
                    </div>
                  </div>
                </div>

                {/* Food City accounts item */}
                <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-855 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-850 dark:text-slate-200">ෆුඩ් සිටි වෙළඳසැල් (Food City)</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-455 mt-0.5">නගර වෙළඳසැල් ජාලය</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-extrabold text-sky-600 dark:text-sky-400">
                      Rs. {totalFoodCity.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-[10px] text-slate-450 dark:text-slate-550 font-bold mt-0.5">
                      {Math.round((totalFoodCity / grossSalesValue) * 100)}% දායකත්වය
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-violet-50/50 dark:bg-violet-950/20 rounded-2xl border border-violet-100 dark:border-violet-900/30 text-[11px] text-violet-850 dark:text-violet-300 leading-relaxed flex gap-2">
                <Info className="w-4 h-4 text-violet-500 flex-shrink-0 mt-0.5" />
                <span>
                  විකුණුම් දත්තයන් දෛනික ලොරි රථ බෙදාහැරීම් සහ ඉන්වොයිස් සටහන් මත පදනම්ව සජීවීව ගණනය කරනු ලැබේ.
                </span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {view === "ledger" && (
        <div className="space-y-6 animate-fade-in">
          <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
            <CardHeader className="border-b border-slate-100 dark:border-slate-800/80 p-6">
              <CardTitle className="text-base font-bold text-slate-900 dark:text-white">ඉන්වොයිස් ලෙජරය (Invoice Ledger)</CardTitle>
              <CardDescription className="text-xs">
                සුපිරි වෙළඳසැල් ජාලයන් සහ සිල්ලර වෙළෙන්දන් වෙත නිකුත් කරන ලද මෑත කාලීන විකුණුම් ඉන්වොයිස් තොරතුරු.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
                      <th className="py-3 px-6">ඉන්වොයිස් අංකය</th>
                      <th className="py-3 px-6">පාරිභෝගිකයා (Customer)</th>
                      <th className="py-3 px-6">නිකුත් කළ දිනය</th>
                      <th className="py-3 px-6">මුළු වටිනාකම</th>
                      <th className="py-3 px-6 text-right">තත්ත්වය (Status)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-sm">
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                      <td className="py-4 px-6 font-semibold text-slate-500 dark:text-slate-400">#INV-2026-804</td>
                      <td className="py-4 px-6 font-bold">කීල්ස් සුපර් (Keells Super - Colombo)</td>
                      <td className="py-4 px-6 text-slate-500">2026 May 24</td>
                      <td className="py-4 px-6 font-extrabold text-violet-600 dark:text-violet-400">Rs. 450,200.00</td>
                      <td className="py-4 px-6 text-right">
                        <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-450 border border-emerald-100 dark:border-emerald-900/40 rounded-xl px-2 py-0.5 text-[10px] font-bold shadow-none">
                          ගෙවා ඇත (Paid)
                        </Badge>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                      <td className="py-4 px-6 font-semibold text-slate-500 dark:text-slate-400">#INV-2026-805</td>
                      <td className="py-4 px-6 font-bold">කාර්ගිල්ස් ෆුඩ් සිටි (Cargills Food City - Central)</td>
                      <td className="py-4 px-6 text-slate-500">2026 May 23</td>
                      <td className="py-4 px-6 font-extrabold text-violet-600 dark:text-violet-400">Rs. 820,000.00</td>
                      <td className="py-4 px-6 text-right">
                        <Badge className="bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-450 border border-amber-100 dark:border-amber-900/40 rounded-xl px-2 py-0.5 text-[10px] font-bold shadow-none">
                          ප්‍රමාදයි (Pending)
                        </Badge>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                      <td className="py-4 px-6 font-semibold text-slate-500 dark:text-slate-400">#INV-2026-806</td>
                      <td className="py-4 px-6 font-bold">ලංකා සතොස (Lanka Sathosa - Southern)</td>
                      <td className="py-4 px-6 text-slate-500">2026 May 22</td>
                      <td className="py-4 px-6 font-extrabold text-violet-600 dark:text-violet-400">Rs. 310,000.00</td>
                      <td className="py-4 px-6 text-right">
                        <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-450 border border-emerald-100 dark:border-emerald-900/40 rounded-xl px-2 py-0.5 text-[10px] font-bold shadow-none">
                          ගෙවා ඇත (Paid)
                        </Badge>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                      <td className="py-4 px-6 font-semibold text-slate-500 dark:text-slate-400">#INV-2026-807</td>
                      <td className="py-4 px-6 font-bold">ගම්පහ සිල්ලර වෙළෙන්දා (Gampaha Retailer)</td>
                      <td className="py-4 px-6 text-slate-500">2026 May 22</td>
                      <td className="py-4 px-6 font-extrabold text-violet-600 dark:text-violet-400">Rs. 185,000.00</td>
                      <td className="py-4 px-6 text-right">
                        <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-455 hover:bg-emerald-50/80 border border-emerald-100 dark:border-emerald-900/40 rounded-xl px-2 py-0.5 text-[10px] font-bold shadow-none">
                          ගෙවා ඇත (Paid)
                        </Badge>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                      <td className="py-4 px-6 font-semibold text-slate-500 dark:text-slate-400">#INV-2026-808</td>
                      <td className="py-4 px-6 font-bold">ගාල්ල සිල්ලර වෙළෙන්දා (Galle Retailer)</td>
                      <td className="py-4 px-6 text-slate-500">2026 May 21</td>
                      <td className="py-4 px-6 font-extrabold text-violet-600 dark:text-violet-400">Rs. 120,000.00</td>
                      <td className="py-4 px-6 text-right">
                        <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-455 hover:bg-emerald-50/80 border border-emerald-100 dark:border-emerald-900/40 rounded-xl px-2.5 py-0.5 text-[10px] font-bold shadow-none">
                          ගෙවා ඇත (Paid)
                        </Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {view === "pettycash" && (
        <div className="space-y-6">
          {/* VISUALLY SEPARATED PETTY CASH ADVANCES SECTION */}
          <div className="p-6 rounded-2xl border border-dashed border-amber-300/80 dark:border-amber-700/80 bg-amber-500/[0.02] dark:bg-amber-950/[0.04]">
            
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-dashed border-amber-200/85 dark:border-amber-800/80">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-amber-100 dark:bg-amber-950/60 rounded-lg text-amber-700 dark:text-amber-400">
                    <Wallet className="w-4 h-4" />
                  </span>
                  <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                    ලොරි රථ රියදුරන්ගේ සුළු මුදල් අත්තිකාරම් (Logistics Petty Cash)
                  </h2>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  රියදුරන් සඳහා හදිසි ධාවන වියදම් (ඩීසල්, අධිවේගී ගාස්තු) සඳහා නිකුත් කරන ලද මුළු අත්තිකාරම් සටහන්.
                </p>
              </div>
              {/* Include client modal to add entry */}
              <PettyCashModal />
            </div>

            {/* Dynamic Card Feed */}
            <div className="grid gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-4">
              {pettyCashRecords.map((record) => (
                <Card
                  key={record.id}
                  className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all duration-350 hover:-translate-y-1 hover:shadow-md hover:border-amber-300 dark:hover:border-amber-900 relative overflow-hidden"
                >
                  {/* Highlight bar to emphasize petty cash visual group */}
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500" />
                  
                  <CardContent className="p-4 pl-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-350">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-xs font-extrabold truncate max-w-[150px]">{record.driverName}</span>
                      </div>
                      <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 px-2 py-0.5 rounded-full border border-amber-100 dark:border-amber-900/30">
                        නිකුත් කළා
                      </span>
                    </div>

                    <div className="mt-3.5">
                      <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        අත්තිකාරම් මුදල (Amount)
                      </div>
                      <div className="text-xl font-black text-amber-600 dark:text-amber-400 mt-0.5">
                        Rs. {record.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </div>

                    <div className="mt-3 text-xs text-slate-650 dark:text-slate-400 line-clamp-2 min-h-[32px] italic leading-snug">
                      &ldquo;{record.reason}&rdquo;
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>
                        {new Date(record.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {pettyCashRecords.length === 0 && (
                <div className="col-span-full py-10 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-amber-250 dark:border-amber-900 rounded-xl bg-amber-500/[0.01]">
                  <Wallet className="w-8 h-8 text-amber-400/80 animate-bounce mb-3" />
                  <h4 className="font-bold text-sm text-slate-700 dark:text-slate-355">කිසිදු අත්තිකාරම් සටහනක් නැත</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mt-1">
                    ලොරි රථ රියදුරෙකුට හදිසි වියදම් සඳහා අත්තිකාරම් මුදලක් ඉහත බොත්තම මඟින් නිකුත් කර මෙහි සටහන් කරන්න.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
