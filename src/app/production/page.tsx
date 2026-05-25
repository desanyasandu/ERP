import React from "react"
import Link from "next/link"
import {
  Factory,
  ArrowLeft,
  Boxes,
  TrendingUp,
  AlertTriangle,
  Play,
  Cpu,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Info,
  Sparkles
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import ExpenseChart from "@/components/production/expense-chart"
import { cn } from "@/lib/utils"

export const revalidate = 0 // Disable cache to get fresh DB records

export default async function ProductionPage({ searchParams }: { searchParams?: { view?: string } }) {
  const view = searchParams?.view || "queue"

  // 1. Fetch KPI Metrics from Prisma SQLite DB
  const rawMaterialsStockAgg = await prisma.rawMaterial.aggregate({
    _sum: {
      stock: true
    }
  })
  const totalRawMaterialsStock = rawMaterialsStockAgg._sum.stock ?? 0
  const rawMaterialsCount = await prisma.rawMaterial.count()

  // Monthly Expenses (current month sum)
  const startOfCurrentMonth = new Date()
  startOfCurrentMonth.setDate(1)
  startOfCurrentMonth.setHours(0, 0, 0, 0)
  const monthlyExpensesAgg = await prisma.expense.aggregate({
    where: {
      date: {
        gte: startOfCurrentMonth
      }
    },
    _sum: {
      amount: true
    }
  })
  const monthlyExpenses = monthlyExpensesAgg._sum.amount ?? 0

  // Active Batches (count of FinishedGood records)
  const activeBatchesCount = await prisma.finishedGood.count()

  // 2. Fetch Raw Materials for the Data Table
  const rawMaterials = await prisma.rawMaterial.findMany({
    orderBy: {
      name: "asc"
    }
  })

  // 3. Fetch Expenses for the Recharts Bar Chart (Last 6 Months)
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5)
  sixMonthsAgo.setDate(1)
  sixMonthsAgo.setHours(0, 0, 0, 0)

  const expenses = await prisma.expense.findMany({
    where: {
      date: {
        gte: sixMonthsAgo
      }
    },
    orderBy: {
      date: "asc"
    }
  })

  // Group expenses by month for the chart
  const monthsData: { [key: string]: { month: string; utility: number; maintenance: number } } = {}

  // Initialize past 6 months to ensure labels render even if zero (Sinhala Labels)
  const monthNamesSinhala = ["ජන (Jan)", "පෙබ (Feb)", "මාර් (Mar)", "අප්‍රේ (Apr)", "මැයි (May)", "ජූනි (Jun)", "ජූලි (Jul)", "අගෝ (Aug)", "සැප් (Sep)", "ඔක් (Oct)", "නොවැ (Nov)", "දෙස (Dec)"]
  for (let i = 5; i >= 0; i--) {
    const d = new Date()
    d.setMonth(d.getMonth() - i)
    const label = monthNamesSinhala[d.getMonth()]
    const key = `${d.getFullYear()}-${d.getMonth()}`
    monthsData[key] = { month: label, utility: 0, maintenance: 0 }
  }

  // Populate data array
  expenses.forEach((exp) => {
    const d = new Date(exp.date)
    const key = `${d.getFullYear()}-${d.getMonth()}`
    if (monthsData[key]) {
      const isUtility = exp.type.toLowerCase().includes("utility") || exp.type.toLowerCase().includes("electrical") || exp.type.toLowerCase().includes("විදුලි")
      const isMaintenance = exp.type.toLowerCase().includes("maintenance") || exp.type.toLowerCase().includes("robotic") || exp.type.toLowerCase().includes("නඩත්තු")
      if (isUtility) {
        monthsData[key].utility += exp.amount
      } else if (isMaintenance) {
        monthsData[key].maintenance += exp.amount
      }
    }
  })

  const chartData = Object.values(monthsData)

  // 4. Expiry threshold dates
  const today = new Date()
  const thirtyDaysFromNow = new Date()
  thirtyDaysFromNow.setDate(today.getDate() + 30)

  return (
    <div className="space-y-8 font-sans">
      
      {/* Top Breadcrumb and Title */}
      <div className="flex flex-col gap-2 animate-fade-in">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-indigo-650 dark:text-indigo-400 hover:underline font-semibold">
          <ArrowLeft className="w-3.5 h-3.5" />
          ආපසු කළමනාකරණ පුවරුවට (Dashboard)
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
              <Factory className="w-5.5 h-5.5" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                නිෂ්පාදන පාලන මධ්‍යස්ථානය (Production Control)
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                ගබඩා දත්ත ගොනුව මඟින් නිෂ්පාදන ධාරිතාවය, අමුද්‍රව්‍ය ලෙජරය සහ පිරිවැය විශ්ලේෂණය මෙතැනින් බලන්න.
              </p>
            </div>
          </div>
          <Button className="rounded-xl bg-emerald-650 hover:bg-emerald-700 text-white shadow-sm text-sm font-semibold flex items-center gap-1.5">
            <Play className="w-3.5 h-3.5 fill-current" />
            නිෂ්පාදන ධාවනය අරඹන්න
          </Button>
        </div>
      </div>

      {/* Top 3 KPI Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        
        {/* Total Raw Materials */}
        <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden relative transition-all duration-300 hover:shadow-md">
          <div className="absolute top-0 left-0 h-1.5 w-full bg-emerald-500" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div>
              <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-455 dark:text-slate-500">
                මුළු අමුද්‍රව්‍ය ප්‍රමාණය (Raw Materials)
              </CardDescription>
              <CardTitle className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                {totalRawMaterialsStock.toLocaleString(undefined, { maximumFractionDigits: 1 })} ඒකක
              </CardTitle>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
              <Boxes className="w-6 h-6" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-slate-550 dark:text-slate-400 font-semibold">
              විශේෂිත අමුද්‍රව්‍ය වර්ග {rawMaterialsCount} ක් සඳහා සක්‍රීය තොග පවතී
            </p>
          </CardContent>
        </Card>

        {/* Monthly Expenses */}
        <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden relative transition-all duration-300 hover:shadow-md">
          <div className="absolute top-0 left-0 h-1.5 w-full bg-amber-500" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div>
              <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-455 dark:text-slate-500">
                මාසික පිරිවැය (Monthly Expenses)
              </CardDescription>
              <CardTitle className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                Rs. {monthlyExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </CardTitle>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400">
              <TrendingUp className="w-6 h-6" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              {startOfCurrentMonth.toLocaleDateString("en-US", { month: "long" })} මස ඇතුළත සිදු වූ සම්පූර්ණ මෙහෙයුම් වියදම් එකතුව
            </p>
          </CardContent>
        </Card>

        {/* Active Batches */}
        <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden relative transition-all duration-300 hover:shadow-md">
          <div className="absolute top-0 left-0 h-1.5 w-full bg-indigo-500" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div>
              <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-455 dark:text-slate-500">
                සක්‍රීය නිෂ්පාදන වාර (Active Runs)
              </CardDescription>
              <CardTitle className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                ධාවන වාර {activeBatchesCount} ක්
              </CardTitle>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400">
              <Cpu className="w-6 h-6" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-slate-550 dark:text-slate-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              සජීවී දත්ත විශ්ලේෂණය සක්‍රීයව පවතී
            </p>
          </CardContent>
        </Card>

      </div>

      {/* Dynamic Tab Switcher */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-1.5 pt-2">
        <Link
          href="/production?view=queue"
          className={cn(
            "pb-3.5 text-xs font-bold border-b-2 px-4 transition-all duration-200",
            view === "queue"
              ? "border-emerald-500 text-emerald-600 dark:text-emerald-400 font-extrabold"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
          )}
        >
          නිෂ්පාදන පෝලිම (Production Queue)
        </Link>
        <Link
          href="/production?view=batches"
          className={cn(
            "pb-3.5 text-xs font-bold border-b-2 px-4 transition-all duration-200",
            view === "batches"
              ? "border-emerald-500 text-emerald-600 dark:text-emerald-400 font-extrabold"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
          )}
        >
          කාණ්ඩ පාලනය (Batch Control)
        </Link>
        <Link
          href="/production?view=history"
          className={cn(
            "pb-3.5 text-xs font-bold border-b-2 px-4 transition-all duration-200",
            view === "history"
              ? "border-emerald-500 text-emerald-600 dark:text-emerald-400 font-extrabold"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
          )}
        >
          ක්‍රියාකාරී ඉතිහාසය (History)
        </Link>
      </div>

      {/* Conditional views render */}
      {view === "queue" && (
        <div className="space-y-6">
          <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100/60 dark:border-emerald-900/30 flex gap-2.5 text-xs text-emerald-850 dark:text-emerald-300 items-start">
            <Boxes className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">නිෂ්පාදන පෝලිම් සිමියුලේටරය:</span> දැනට ධාවනය වන නිෂ්පාදන කාණ්ඩ සහ යන්ත්‍ර ක්‍රියාකාරීත්වය මෙතැනින් සජීවීව පරීක්ෂා කළ හැක.
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Soya Extruder Machine Card */}
            <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden relative p-5">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500" />
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Factory className="w-4.5 h-4.5 text-emerald-500" />
                    සෝයා පිටි යන්ත්‍රය (Soya Extruder #1)
                  </h3>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">කර්මාන්තශාලා අංශය A</span>
                </div>
                <span className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-450 border border-emerald-100 dark:border-emerald-900/40 rounded-xl px-2 py-0.5 text-[9px] font-bold shadow-none">
                  ක්‍රියාකාරී (Active)
                </span>
              </div>
              
              <div className="my-5">
                <div className="flex justify-between text-[11px] font-bold mb-1.5 text-slate-650 dark:text-slate-400">
                  <span>කාණ්ඩය: #SOYA-B294 (සෝයාමීට් පැකට්)</span>
                  <span className="text-emerald-600 dark:text-emerald-400">92%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-full rounded-full animate-pulse" style={{ width: "92%" }} />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1 font-semibold"><Cpu className="w-3.5 h-3.5" /> ධාවන වේගය: 85Hz</span>
                <span className="font-bold">ඉතිරි කාලය: ~මිනි. 3</span>
              </div>
            </Card>

            {/* Coconut Oil Pressing Card */}
            <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden relative p-5">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500" />
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Factory className="w-4.5 h-4.5 text-emerald-500" />
                    තෙල් මිරිකන යන්ත්‍රය (Oil Press #2)
                  </h3>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">කර්මාන්තශාලා අංශය B</span>
                </div>
                <span className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-450 border border-emerald-100 dark:border-emerald-900/40 rounded-xl px-2 py-0.5 text-[9px] font-bold shadow-none">
                  ක්‍රියාකාරී (Active)
                </span>
              </div>
              
              <div className="my-5">
                <div className="flex justify-between text-[11px] font-bold mb-1.5 text-slate-650 dark:text-slate-400">
                  <span>කාණ්ඩය: #COCO-B412 (පොල්තෙල් බෝතල්)</span>
                  <span className="text-emerald-600 dark:text-emerald-400">54%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-full rounded-full animate-pulse" style={{ width: "54%" }} />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1 font-semibold"><Cpu className="w-3.5 h-3.5" /> ධාවන වේගය: 60Hz</span>
                <span className="font-bold">ඉතිරි කාලය: ~මිනි. 18</span>
              </div>
            </Card>

            {/* Samba Rice Miller Card */}
            <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden relative p-5">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500" />
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Factory className="w-4.5 h-4.5 text-amber-500" />
                    වී තලන යන්ත්‍රය (Rice Miller #3)
                  </h3>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">කර්මාන්තශාලා අංශය C</span>
                </div>
                <span className="bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-450 border border-amber-100 dark:border-amber-900/40 rounded-xl px-2 py-0.5 text-[9px] font-bold shadow-none">
                  නඩත්තු වෙමින් (Maintenance)
                </span>
              </div>
              
              <div className="my-5">
                <div className="flex justify-between text-[11px] font-bold mb-1.5 text-slate-650 dark:text-slate-400">
                  <span>යන්ත්‍ර ක්‍රමාංකනය සිදු කෙරේ (සම්බා සහල් මලු)</span>
                  <span className="text-amber-600 dark:text-amber-400">15%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-400 to-amber-600 h-full rounded-full" style={{ width: "15%" }} />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1 font-semibold"><Cpu className="w-3.5 h-3.5" /> ධාවන වේගය: 0Hz</span>
                <span className="font-bold">ඉතිරි කාලය: නොදනී</span>
              </div>
            </Card>
          </div>
        </div>
      )}

      {view === "batches" && (
        <div className="space-y-6">
          <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-2xl border border-indigo-100/60 dark:border-indigo-900/30 flex gap-2.5 text-xs text-indigo-850 dark:text-indigo-300 items-start">
            <Info className="w-4.5 h-4.5 text-indigo-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">කාණ්ඩ පාලන මධ්‍යස්ථානය:</span> කර්මාන්තශාලාවෙන් නිම වූ සහ දැනට තොගයට එක් කර ඇති මුළු නිමි භාණ්ඩ කාණ්ඩ මෙතැනින් පාලනය කෙරේ. (Finished Goods control panel)
            </div>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Batch Cards mock stats */}
            <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
              <div className="text-slate-455 dark:text-slate-500 text-[9px] font-bold uppercase tracking-wider">සම්පූර්ණ කළ කාණ්ඩ (Completed Batches)</div>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">කාණ්ඩ 84 ක්</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-1">පසුගිය දින 30 පුරා සක්‍රීයව නිම කළා</div>
            </Card>
            <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
              <div className="text-slate-455 dark:text-slate-500 text-[9px] font-bold uppercase tracking-wider">මුළු නිෂ්පාදිත ධාරිතාව (Production Capacity)</div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">85,200 ඒකක</div>
              <div className="text-[10px] text-emerald-605 dark:text-emerald-500 font-semibold mt-1">ඉලක්කය 92% කින් සපුරා ඇත</div>
            </Card>
            <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
              <div className="text-slate-455 dark:text-slate-500 text-[9px] font-bold uppercase tracking-wider">තත්ත්ව පාලන ශ්‍රේණිය (Quality Control Grade)</div>
              <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">Grade A+ (98.4%)</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-1">කිසිදු දෝෂ සහිත කාණ්ඩයක් නැත</div>
            </Card>
            <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
              <div className="text-slate-455 dark:text-slate-500 text-[9px] font-bold uppercase tracking-wider">යන්ත්‍ර සඵලතාවය (Overall Machine OEE)</div>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">88.5%</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-1">ශ්‍රී ලංකා ප්‍රමිතියට අනුකූලයි</div>
            </Card>
          </div>

          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden p-6 flex flex-col items-center justify-center text-center py-10">
            <Sparkles className="w-8 h-8 text-indigo-500 animate-pulse mb-3" />
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">සක්‍රීය කාණ්ඩ පාලන ක්‍රියාකාරීත්වය</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-1">
              කාණ්ඩ කළමනාකරණය සඳහා නව නිමි භාණ්ඩ වාර්තා සටහන් සහ තොග මාරු කිරීම් සිදු කිරීමට &ldquo;තොග කළමනාකරණය&rdquo; (Inventory) පිටුව වෙත පිවිසෙන්න.
            </p>
            <Link href="/inventory?view=goods" className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition">
              නිමි භාණ්ඩ ලෙජරයට යන්න (Finished Goods)
            </Link>
          </div>
        </div>
      )}

      {view === "history" && (
        <div className="grid gap-6 lg:grid-cols-3">
          
          {/* Expenses Bar Chart (last 6 months) */}
          <Card className="lg:col-span-1 rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-base font-bold text-slate-900 dark:text-white">මාසික විදුලි සහ නඩත්තු පිරිවැය</CardTitle>
              <CardDescription className="text-xs">පසුගිය මාස 6 ඇතුළත කර්මාන්තශාලා මෙහෙයුම් වියදම්</CardDescription>
            </CardHeader>
            <CardContent className="pb-6">
              <ExpenseChart data={chartData} />
            </CardContent>
          </Card>

          {/* Raw Materials Data Table */}
          <Card className="lg:col-span-2 rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 dark:border-slate-855">
              <div>
                <CardTitle className="text-base font-bold text-slate-900 dark:text-white">අමුද්‍රව්‍ය ලෙජරය (Raw Materials Ledger)</CardTitle>
                <CardDescription className="text-xs">
                  සක්‍රීය අමුද්‍රව්‍ය තොග තොරතුරු. <span className="text-rose-500 dark:text-rose-400 font-bold">රතු පැහැති පේළි</span> මඟින් දින 30ක් ඇතුළත කල් ඉකුත් වන අයිතම පෙන්වයි.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-855 bg-slate-50/50 dark:bg-slate-900/50 text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
                      <th className="py-3 px-6">අමුද්‍රව්‍ය කේතය (ID)</th>
                      <th className="py-3 px-6">අමුද්‍රව්‍ය නාමය (Designation)</th>
                      <th className="py-3 px-6">තොග මට්ටම (Stock)</th>
                      <th className="py-3 px-6">කල් ඉකුත් වන දිනය</th>
                      <th className="py-3 px-6 text-right">තත්ත්වය (Status)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-sm">
                    {rawMaterials.map((material) => {
                      const expiry = new Date(material.expiryDate)
                      const isExpiringSoon = expiry <= thirtyDaysFromNow && expiry >= today
                      const isExpired = expiry < today

                      return (
                        <tr
                          key={material.id}
                          className={cn(
                            "transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/20",
                            isExpiringSoon || isExpired
                              ? "bg-rose-50/70 border-rose-200 text-rose-950 dark:bg-rose-950/20 dark:border-rose-900/50 dark:text-rose-200 hover:bg-rose-100/50 dark:hover:bg-rose-900/30"
                              : ""
                          )}
                        >
                          <td className="py-4 px-6 font-semibold text-slate-500 dark:text-slate-400">
                            #{material.id.slice(-6).toUpperCase()}
                          </td>
                          <td className="py-4 px-6 font-bold">
                            {material.name}
                          </td>
                          <td className="py-4 px-6 font-semibold">
                            {material.stock.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                          </td>
                          <td className="py-4 px-6 text-slate-500 dark:text-slate-400">
                            <span className="inline-flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              {expiry.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            {isExpired ? (
                              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-rose-700 bg-rose-100/80 dark:bg-rose-950/40 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-900/40">
                                <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                                කල් ඉකුත් වී ඇත
                              </span>
                            ) : isExpiringSoon ? (
                              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-rose-700 bg-rose-100/80 dark:bg-rose-950/40 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-900/40">
                                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 animate-bounce" />
                                ඉක්මනින් කල් ඉකුත් වේ
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-900/40">
                                ස්ථාවරයි (Stable)
                              </span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                    {rawMaterials.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-400">
                          දත්ත ගොනුවේ කිසිදු අමුද්‍රව්‍යයක් සොයාගත නොහැක.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

        </div>
      )}

    </div>
  )
}
