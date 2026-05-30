"use client"

import React, { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import {
  FileBarChart2,
  ArrowLeft,
  CircleDollarSign,
  Factory,
  TrendingUp,
  TrendingDown,
  Info,
  Calendar,
  Search,
  User,
  ShieldAlert,
  Boxes,
  Package,
  Award
} from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Recharts components must be rendered client-side
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts"

export default function ReportsHubPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentView = searchParams.get("view") || "sales-report"

  const [searchTerm, setSearchTerm] = useState("")

  // Dynamic Date range filters
  const [fromDate, setFromDate] = useState("2026-05-01")
  const [toDate, setToDate] = useState("2026-05-30")

  // CSV export simulator
  const handleCSVExport = (reportName: string) => {
    alert(`CSV අපනයනය සාර්ථකයි: ${reportName} දත්ත ලේඛනය CSV ගොනුවක් ලෙස බාගත කරන ලදී. (CSV exported successfully.)`)
  }

  // Define 11 Reports with their Sinhala categories
  const reportTabs = [
    { id: "sales-report", label: "විකුණුම් වාර්තාව (Sales)", category: "අලෙවි සහ ණය" },
    { id: "recovery-report", label: "අයකරගැනීම් වාර්තාව (Recovery)", category: "අලෙවි සහ ණය" },
    { id: "creditors-report", label: "ණයහිමියන්ගේ වාර්තාව (Creditors)", category: "අලෙවි සහ ණය" },
    { id: "debtors-report", label: "ණයගැතියන්ගේ වාර්තාව (Debtors)", category: "අලෙවි සහ ණය" },
    
    { id: "chemical-stocks", label: "රසායනික තොග වාර්තාව (Chemicals)", category: "තොග සහ වත්කම්" },
    { id: "finished-goods", label: "නිමි භාණ්ඩ තොග වාර්තාව (Finished Goods)", category: "තොග සහ වත්කම්" },
    { id: "fixed-assets", label: "ස්ථාවර වත්කම් වාර්තාව (Assets)", category: "තොග සහ වත්කම්" },

    { id: "expenses-report", label: "වියදම් වාර්තාව (Expenses)", category: "වියදම්, ණය සහ සේවකයින්" },
    { id: "bank-loans", label: "බැංකු ණය වාර්තාව (Bank Loans)", category: "වියදම්, ණය සහ සේවකයින්" },
    { id: "other-loans", label: "අනෙකුත් ණය වාර්තාව (Other Loans)", category: "වියදම්, ණය සහ සේවකයින්" },
    { id: "staff-report", label: "සේවක මණ්ඩල වාර්තාව (Staff)", category: "වියදම්, ණය සහ සේවකයින්" },
  ]

  const setView = (view: string) => {
    setSearchTerm("")
    router.push(`/reports?view=${view}`)
  }

  // CURATED COLORS FOR CHARTS
  const COLORS = ["#6366f1", "#8b5cf6", "#10b981", "#f59e0b", "#f43f5e", "#06b6d4"]

  // REALISTIC DATA FOR THE GRAPHIC CHARTS
  const salesData = [
    { date: "05/15", sales: 85000, recovery: 60000 },
    { date: "05/18", sales: 120000, recovery: 95000 },
    { date: "05/21", sales: 98000, recovery: 70000 },
    { date: "05/24", sales: 145000, recovery: 110000 },
    { date: "05/27", sales: 185000, recovery: 130000 },
    { date: "05/30", sales: 215000, recovery: 180000 },
  ]

  const expensesData = [
    { name: "ප්‍රවාහන ඩීසල්", value: 18500 },
    { name: "විදුලිය/උපයෝගිතා", value: 84000 },
    { name: "කාර්ය මණ්ඩල සුබසාධන", value: 4500 },
    { name: "යන්ත්‍ර නඩත්තු", value: 25000 },
    { name: "නියෝජිත කොමිස්", value: 35000 },
  ]

  const debtAgingData = [
    { range: "දින 0-30", amount: 135000 },
    { range: "දින 30-60", amount: 70000 },
    { range: "දින 60+", amount: 45000 },
  ]

  const creditAgingData = [
    { range: "දින 0-30", amount: 280000 },
    { range: "දින 30-60", amount: 125000 },
    { range: "දින 60+", amount: 60000 },
  ]

  return (
    <div className="space-y-8 font-sans">
      
      {/* Top Title Bar */}
      <div className="flex flex-col gap-2 animate-fade-in">
        <button onClick={() => router.push("/")} className="inline-flex items-center gap-1.5 text-xs text-indigo-650 dark:text-indigo-400 hover:underline font-semibold w-fit">
          <ArrowLeft className="w-3.5 h-3.5" />
          ආපසු කළමනාකරණ පුවරුවට (Dashboard)
        </button>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
              <FileBarChart2 className="w-5.5 h-5.5" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                පද්ධති වාර්තා සහ විශ්ලේෂණ කේන්ද්‍රය (Analytical Hub)
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                පාරිභෝගිකයින්, විකුණුම්, තොග, ණය, වත්කම් සහ සේවක මණ්ඩලය ඇතුළු සමාගමේ සියලුම වාර්තා 11 මෙතැනින් ලබා ගන්න.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER CONTROL BAR */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between animate-fade-in">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-650 w-full sm:w-auto">
          <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-indigo-500" /> කාල සීමාව:</span>
          <Input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="h-8 text-xs rounded-xl bg-slate-50 border-slate-200" />
          <span>සිට</span>
          <Input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="h-8 text-xs rounded-xl bg-slate-50 border-slate-200" />
        </div>
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <div className="relative w-full sm:max-w-[200px]">
            <Search className="absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
            <Input
              type="search"
              placeholder="වාර්තා තුළ සොයන්න..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-7 h-8 text-[11px] rounded-xl bg-slate-50 border-slate-200"
            />
          </div>
          <Button
            onClick={() => handleCSVExport(reportTabs.find(t => t.id === currentView)?.label || "Report")}
            className="rounded-xl text-[10px] font-bold bg-indigo-650 hover:bg-indigo-700 text-white shadow-sm h-8"
          >
            Export CSV
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        
        {/* Left Sidebar Navigation Block with 11 Reports */}
        <div className="lg:col-span-1 space-y-4">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            
            {/* Category 1: Sales & Credit */}
            <div>
              <div className="px-3 text-[9px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                අලෙවි සහ ණය වාර්තා
              </div>
              <div className="space-y-0.5">
                {reportTabs.filter(t => t.category === "අලෙවි සහ ණය").map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setView(tab.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl transition-all duration-200 ${
                      currentView === tab.id
                        ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 font-extrabold"
                        : "text-slate-600 hover:text-slate-950 dark:text-slate-350 dark:hover:text-white hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                    }`}
                  >
                    <TrendingUp className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{tab.label.split(" (")[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Category 2: Stocks & Assets */}
            <div>
              <div className="px-3 text-[9px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                තොග සහ ස්ථාවර වත්කම්
              </div>
              <div className="space-y-0.5">
                {reportTabs.filter(t => t.category === "තොග සහ වත්කම්").map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setView(tab.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl transition-all duration-200 ${
                      currentView === tab.id
                        ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 font-extrabold"
                        : "text-slate-600 hover:text-slate-950 dark:text-slate-355 dark:hover:text-white hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                    }`}
                  >
                    <Boxes className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{tab.label.split(" (")[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Category 3: Expenses, Loans & Staff */}
            <div>
              <div className="px-3 text-[9px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                වියදම්, ණය සහ සේවකයින්
              </div>
              <div className="space-y-0.5">
                {reportTabs.filter(t => t.category === "වියදම්, ණය සහ සේවකයින්").map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setView(tab.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl transition-all duration-200 ${
                      currentView === tab.id
                        ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 font-extrabold"
                        : "text-slate-600 hover:text-slate-950 dark:text-slate-350 dark:hover:text-white hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                    }`}
                  >
                    <Factory className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{tab.label.split(" (")[0]}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right Content Block - Conditional Rendering of the 11 Reports */}
        <div className="lg:col-span-3">
          
          {/* 1. SALES REPORT */}
          {currentView === "sales-report" && (
            <Card className="rounded-2xl border-slate-200 bg-white p-6 shadow-sm space-y-6 animate-fade-in">
              <CardHeader className="p-0 pb-4 border-b border-slate-100">
                <CardTitle className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-500" />
                  විකුණුම් කාර්යසාධන වාර්තාව (Sales Performance Report)
                </CardTitle>
                <CardDescription className="text-xs">දිස්ත්‍රික් සහ සුපිරි වෙළඳසැල් මට්ටමේ මාසික විකුණුම් සංසන්දනාත්මක විශ්ලේෂණය.</CardDescription>
              </CardHeader>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="p-4 bg-indigo-50/40 rounded-2xl border border-indigo-100/60 text-xs">
                  <span className="font-bold text-slate-500 block uppercase text-[10px]">මුළු විකුණුම් වටිනාකම (Total Sales)</span>
                  <div className="text-2xl font-black text-indigo-650 mt-1">Rs. 1,480,000.00</div>
                  <span className="text-[9px] text-emerald-600 font-bold block mt-1">▲ පසුගිය සතියට වඩා 8.2% ක වර්ධනයක්</span>
                </div>
                <div className="p-4 bg-emerald-50/40 rounded-2xl border border-emerald-100/60 text-xs">
                  <span className="font-bold text-slate-500 block uppercase text-[10px]">සාමාන්‍ය දෛනික ඇණවුම (Avg Order Value)</span>
                  <div className="text-2xl font-black text-emerald-650 mt-1">Rs. 42,500.00</div>
                  <span className="text-[9px] text-slate-400 block mt-1">සජීවීව පද්ධතියෙන් ගණනය කෙරේ</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 text-xs">
                  <span className="font-bold text-slate-500 block uppercase text-[10px]">සම්පූර්ණ කළ ඉන්වොයිස් (Invoices Issued)</span>
                  <div className="text-2xl font-black text-slate-800 mt-1">42 Invoices</div>
                  <span className="text-[9px] text-slate-400 block mt-1">විගණන තත්ත්වය: අනුමතයි (Approved)</span>
                </div>
              </div>
              <div className="h-64 border border-slate-100 rounded-2xl p-4 bg-slate-50/20">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" stroke="#94a3b8" fontSize={10} />
                    <YAxis stroke="#94a3b8" fontSize={10} />
                    <Tooltip />
                    <Area type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" name="Sales (Rs.)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          )}

          {/* 2. RECOVERY REPORT */}
          {currentView === "recovery-report" && (
            <Card className="rounded-2xl border-slate-200 bg-white p-6 shadow-sm space-y-6 animate-fade-in">
              <CardHeader className="p-0 pb-4 border-b border-slate-100">
                <CardTitle className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-500" />
                  ණය අයකරගැනීම් ක්‍රියාකාරී වාර්තාව (Debt Recovery Efficiency Report)
                </CardTitle>
                <CardDescription className="text-xs">සුපිරි වෙළඳසැල් ජාල වලින් ලැබීමට ඇති ණය අයකරගැනීමේ වේගය සහ චෙක්පත් පියවීමේ මට්ටම.</CardDescription>
              </CardHeader>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-5 border border-slate-150 rounded-2xl bg-slate-50/20 space-y-3">
                  <h4 className="font-extrabold text-slate-900 text-xs flex items-center gap-1"><Award className="w-4 h-4 text-emerald-500" /> අයකරගැනීමේ කාර්යක්ෂමතාවය</h4>
                  <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path className="text-slate-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="text-emerald-500" strokeDasharray="88, 100" strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <span className="absolute text-base font-black text-slate-800">88%</span>
                  </div>
                  <p className="text-[10px] text-slate-500 text-center font-bold">චෙක්පත් පියවීමේ සාර්ථකත්වය (Cheque Clearance Success Rate)</p>
                </div>
                <div className="p-5 border border-slate-150 rounded-2xl bg-slate-50/20 text-xs space-y-3">
                  <h4 className="font-extrabold text-slate-900 flex items-center gap-1.5"><Info className="w-4 h-4 text-indigo-500" /> අයකරගත් මාධ්‍යයන්</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between font-bold mb-1">
                        <span>BOC/Sampath චෙක්පත් (Cheque)</span>
                        <span>Rs. 850,000 (72%)</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5"><div className="bg-indigo-600 h-full rounded-full" style={{ width: "72%" }} /></div>
                    </div>
                    <div>
                      <div className="flex justify-between font-bold mb-1">
                        <span>මුදල් ලබාගැනීම් (Cash)</span>
                        <span>Rs. 320,000 (28%)</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5"><div className="bg-emerald-500 h-full rounded-full" style={{ width: "28%" }} /></div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* 3. CREDITORS REPORT */}
          {currentView === "creditors-report" && (
            <Card className="rounded-2xl border-slate-200 bg-white p-6 shadow-sm space-y-6 animate-fade-in">
              <CardHeader className="p-0 pb-4 border-b border-slate-100">
                <CardTitle className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-500" />
                  ණයහිමියන්ගේ වයස් විශ්ලේෂණ වාර්තාව (Creditors Aging Report)
                </CardTitle>
                <CardDescription className="text-xs">සැපයුම්කරුවන් වෙත ගෙවීමට ඇති ණය සහ ප්‍රමාද කාල පරාසයන්.</CardDescription>
              </CardHeader>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="p-4 bg-rose-50/[0.04] rounded-2xl border border-rose-100 text-xs">
                  <span className="font-bold text-slate-500 block uppercase text-[10px]">මුළු ණයහිමි වගකීම (Total Payables)</span>
                  <div className="text-2xl font-black text-rose-600 mt-1">Rs. 465,000.00</div>
                  <span className="text-[9px] text-slate-400 block mt-1">කර්මාන්තශාලා අමුද්‍රව්‍ය හිඟ මුදල්</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 text-xs col-span-2">
                  <span className="font-bold text-slate-500 block uppercase text-[10px] mb-2">ප්‍රමාද කාල වයස් ව්‍යුහය (Creditors Aging)</span>
                  <div className="h-20">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={creditAgingData}>
                        <XAxis dataKey="range" stroke="#94a3b8" fontSize={9} />
                        <YAxis stroke="#94a3b8" fontSize={9} />
                        <Tooltip />
                        <Bar dataKey="amount" fill="#f43f5e" radius={[4, 4, 0, 0]} name="ණයහිමි Dues (Rs.)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* 4. DEBTORS REPORT */}
          {currentView === "debtors-report" && (
            <Card className="rounded-2xl border-slate-200 bg-white p-6 shadow-sm space-y-6 animate-fade-in">
              <CardHeader className="p-0 pb-4 border-b border-slate-100">
                <CardTitle className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-indigo-500" />
                  ණයගැතියන්ගේ වයස් විශ්ලේෂණ වාර්තාව (Debtors Aging Report)
                </CardTitle>
                <CardDescription className="text-xs">පාරිභෝගිකයින්ගෙන් සමාගමට ලැබීමට ඇති ණය සහ ඒවායේ ප්‍රමාද දින ගණන.</CardDescription>
              </CardHeader>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="p-4 bg-indigo-50/40 rounded-2xl border border-indigo-100 text-xs">
                  <span className="font-bold text-slate-500 block uppercase text-[10px]">මුළු ණයගැති හිඟය (Total Receivables)</span>
                  <div className="text-2xl font-black text-indigo-650 mt-1">Rs. 250,000.00</div>
                  <span className="text-[9px] text-rose-600 font-bold block mt-1">▲ දින 60 ඉක්මවූ ණය Rs. 45,000 ක් පවතී</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 text-xs col-span-2">
                  <span className="font-bold text-slate-500 block uppercase text-[10px] mb-2">ප්‍රමාද කාල වයස් ව්‍යුහය (Debtors Aging)</span>
                  <div className="h-20">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={debtAgingData}>
                        <XAxis dataKey="range" stroke="#94a3b8" fontSize={9} />
                        <YAxis stroke="#94a3b8" fontSize={9} />
                        <Tooltip />
                        <Bar dataKey="amount" fill="#6366f1" radius={[4, 4, 0, 0]} name="ණයගැති Dues (Rs.)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* 5. CHEMICAL STOCKS REPORT */}
          {currentView === "chemical-stocks" && (
            <Card className="rounded-2xl border-slate-200 bg-white p-6 shadow-sm space-y-6 animate-fade-in">
              <CardHeader className="p-0 pb-4 border-b border-slate-100">
                <CardTitle className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Boxes className="w-5 h-5 text-indigo-500" />
                  මූලික රසායනික ද්‍රව්‍ය තොග වාර්තාව (Raw Chemicals Inventory Status)
                </CardTitle>
                <CardDescription className="text-xs">සෝයා පිටි, පොල්තෙල් සහ නිෂ්පාදනයට අවශ්‍ය අනෙකුත් රසායනික අමුද්‍රව්‍ය සංචිත වාර්තාව.</CardDescription>
              </CardHeader>
              <div className="overflow-x-auto border border-slate-100 rounded-2xl">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-150 bg-slate-50/50 font-bold uppercase tracking-wider text-slate-500 text-[10px]">
                      <th className="py-3 px-6">රසායනික කේතය (Chemical ID)</th>
                      <th className="py-3 px-6">අමුද්‍රව්‍ය විස්තරය (Description)</th>
                      <th className="py-3 px-6">ආරක්ෂිත සීමාව (Safety Limit)</th>
                      <th className="py-3 px-6 font-bold text-slate-800">පවතින තොගය (Current Qty)</th>
                      <th className="py-3 px-6 text-right">තත්ත්වය (Safety Status)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    <tr>
                      <td className="py-3 px-6 text-indigo-650 font-bold">SOYA-FLR-01</td>
                      <td className="py-3 px-6 text-slate-800">සෝයා පිටි (Premium Soya Flour)</td>
                      <td className="py-3 px-6 text-slate-400">1,000 kg</td>
                      <td className="py-3 px-6 font-black">4,500 kg</td>
                      <td className="py-3 px-6 text-right"><span className="bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-xl px-2 py-0.5 font-bold">Stable</span></td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 text-indigo-650 font-bold">COCO-OIL-02</td>
                      <td className="py-3 px-6 text-slate-800">පිරිපහදු නොකළ පොල්තෙල් (Crude Coconut Oil)</td>
                      <td className="py-3 px-6 text-slate-400">500 L</td>
                      <td className="py-3 px-6 font-black">2,200 L</td>
                      <td className="py-3 px-6 text-right"><span className="bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-xl px-2 py-0.5 font-bold">Stable</span></td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 text-indigo-650 font-bold">CAUSTIC-S-03</td>
                      <td className="py-3 px-6 text-slate-800">Caustic Soda (රසායනික අමුද්‍රව්‍ය)</td>
                      <td className="py-3 px-6 text-slate-400">200 kg</td>
                      <td className="py-3 px-6 text-black">80 kg</td>
                      <td className="py-3 px-6 text-right"><span className="bg-rose-50 text-rose-700 border border-rose-100 rounded-xl px-2 py-0.5 font-bold animate-pulse">Low Reserve</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* 6. FINISHED GOODS REPORT */}
          {currentView === "finished-goods" && (
            <Card className="rounded-2xl border-slate-200 bg-white p-6 shadow-sm space-y-6 animate-fade-in">
              <CardHeader className="p-0 pb-4 border-b border-slate-100">
                <CardTitle className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Package className="w-5 h-5 text-indigo-500" />
                  නිමි භාණ්ඩ තොග වාර්තාව (Finished Goods Inventory Card)
                </CardTitle>
                <CardDescription className="text-xs">ඇසුරුම් කර අවසන් වූ සෝයාමීට් පැකට්, පොල්තෙල් බෝතල් සහ සම්බා සහල් මලු ගබඩා තොග ශේෂය.</CardDescription>
              </CardHeader>
              <div className="overflow-x-auto border border-slate-100 rounded-2xl">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-150 bg-slate-50/50 font-bold uppercase tracking-wider text-slate-500 text-[10px]">
                      <th className="py-3 px-6">භාණ්ඩ කේතය (SKU ID)</th>
                      <th className="py-3 px-6">නිෂ්පාදන නම (Description)</th>
                      <th className="py-3 px-6">කාණ්ඩ කේතය (Latest Batch)</th>
                      <th className="py-3 px-6 font-bold text-slate-800">නිමි තොග ප්‍රමාණය (Available Stock)</th>
                      <th className="py-3 px-6 text-right">Forecasting (තොග ප්‍රමාණවත් කාලය)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    <tr>
                      <td className="py-3 px-6 text-indigo-650 font-bold">SOYA-PKT-90g</td>
                      <td className="py-3 px-6 text-slate-800">සෝයාමීට් පැකට් (90g Soyameet)</td>
                      <td className="py-3 px-6 text-slate-500">ERP-S846</td>
                      <td className="py-3 px-6 font-black text-indigo-650">12,000 Packets</td>
                      <td className="py-3 px-6 text-right"><span className="text-emerald-600 font-bold">දින 45 ක් සපුරයි</span></td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 text-indigo-650 font-bold">COCO-BTL-1L</td>
                      <td className="py-3 px-6 text-slate-800">පොල්තෙල් බෝතල් (1L Coconut Oil Bottles)</td>
                      <td className="py-3 px-6 text-slate-500">ERP-C722</td>
                      <td className="py-3 px-6 font-black text-amber-600">850 Bottles</td>
                      <td className="py-3 px-6 text-right"><span className="text-rose-600 font-bold animate-pulse">දින 8 කින් අවසන් වේ</span></td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 text-indigo-650 font-bold">RICE-BAG-10kg</td>
                      <td className="py-3 px-6 text-slate-800">සම්බා සහල් මලු (10kg Samba Rice Bags)</td>
                      <td className="py-3 px-6 text-slate-500">ERP-R109</td>
                      <td className="py-3 px-6 font-black text-indigo-650">320 Bags</td>
                      <td className="py-3 px-6 text-right"><span className="text-emerald-600 font-bold">දින 20 ක් සපුරයි</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* 7. FIXED ASSETS REPORT */}
          {currentView === "fixed-assets" && (
            <Card className="rounded-2xl border-slate-200 bg-white p-6 shadow-sm space-y-6 animate-fade-in">
              <CardHeader className="p-0 pb-4 border-b border-slate-100">
                <CardTitle className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <FileBarChart2 className="w-5 h-5 text-indigo-500" />
                  ස්ථාවර වත්කම් සහ ක්ෂයවීම් වාර්තාව (Company Fixed Assets Ledger)
                </CardTitle>
                <CardDescription className="text-xs">සමාගමේ යන්ත්‍රෝපකරණ, ප්‍රවාහන වාහන සහ ඉඩම් ගොඩනැගිලිවල ඓතිහාසික පිරිවැය සහ වත්මන් පොත් වටිනාකම.</CardDescription>
              </CardHeader>
              <div className="overflow-x-auto border border-slate-100 rounded-2xl">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-150 bg-slate-50/50 font-bold uppercase tracking-wider text-slate-500 text-[10px]">
                      <th className="py-3 px-6">වත්කම් කාණ්ඩය (Asset Class)</th>
                      <th className="py-3 px-6">ඓතිහාසික පිරිවැය (Cost)</th>
                      <th className="py-3 px-6">ක්ෂයවීම් ප්‍රතිශතය (Rate)</th>
                      <th className="py-3 px-6 text-rose-650">එකතු වූ ක්ෂයවීම් (Accum. Depr.)</th>
                      <th className="py-3 px-6 text-right font-bold text-emerald-650">වත්මන් පොත් වටිනාකම (Net Book Value)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    <tr>
                      <td className="py-3.5 px-6 text-slate-800">කර්මාන්තශාලා යන්ත්‍රෝපකරණ (Plant & Machinery)</td>
                      <td className="py-3.5 px-6">Rs. 1,500,000.00</td>
                      <td className="py-3.5 px-6">10% per Annum</td>
                      <td className="py-3.5 px-6 text-rose-500">Rs. 150,000.00</td>
                      <td className="py-3.5 px-6 text-right font-black text-emerald-650">Rs. 1,350,000.00</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-6 text-slate-800">බෙදාහැරීමේ ලොරි රථ (Delivery Lorries)</td>
                      <td className="py-3.5 px-6">Rs. 1,200,000.00</td>
                      <td className="py-3.5 px-6">20% per Annum</td>
                      <td className="py-3.5 px-6 text-rose-500">Rs. 240,000.00</td>
                      <td className="py-3.5 px-6 text-right font-black text-emerald-650">Rs. 960,000.00</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-6 text-slate-800">කර්මාන්තශාලා ඉඩම සහ ගොඩනැගිලි (Land & Buildings)</td>
                      <td className="py-3.5 px-6">Rs. 2,000,000.00</td>
                      <td className="py-3.5 px-6">0% (Land appreciates)</td>
                      <td className="py-3.5 px-6 text-emerald-600">Rs. 0.00</td>
                      <td className="py-3.5 px-6 text-right font-black text-emerald-650">Rs. 2,000,000.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* 8. EXPENSES REPORT */}
          {currentView === "expenses-report" && (
            <Card className="rounded-2xl border-slate-200 bg-white p-6 shadow-sm space-y-6 animate-fade-in">
              <CardHeader className="p-0 pb-4 border-b border-slate-100">
                <CardTitle className="text-sm font-black text-rose-700 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-rose-500" />
                  වියදම් කාණ්ඩ විශ්ලේෂණ වාර්තාව (Expense Distribution Analysis)
                </CardTitle>
                <CardDescription className="text-xs">කර්මාන්තශාලා මෙහෙයුම් වියදම්, ප්‍රවාහන ඩීසල් ගාස්තු සහ QC වියදම් සංසන්දනාත්මක විශ්ලේෂණය.</CardDescription>
              </CardHeader>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="h-60 border border-slate-100 rounded-2xl p-4 bg-slate-50/20 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expensesData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {expensesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3 text-xs pl-4 flex flex-col justify-center">
                  <h4 className="font-extrabold text-slate-800">වියදම් කාණ්ඩ වෙන්කිරීම (Expense Cost Centers)</h4>
                  {expensesData.map((e, idx) => (
                    <div key={idx} className="flex justify-between items-center font-bold text-slate-600">
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                        {e.name}
                      </span>
                      <span>Rs. {e.value.toLocaleString()}.00</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* 9. BANK LOANS REPORT */}
          {currentView === "bank-loans" && (
            <Card className="rounded-2xl border-slate-200 bg-white p-6 shadow-sm space-y-6 animate-fade-in">
              <CardHeader className="p-0 pb-4 border-b border-slate-100">
                <CardTitle className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <CircleDollarSign className="w-5 h-5 text-indigo-500" />
                  බැංකු ණය සහ පොලී ගෙවීම් වාර්තාව (Bank Loans & Liability Statement)
                </CardTitle>
                <CardDescription className="text-xs">සමාගම විසින් මෙහෙයුම් කටයුතු පුළුල් කිරීමට ලංකා බැංකුව (BOC) වැනි රාජ්‍ය බැංකු වලින් ලබාගත් දිගුකාලීන ණය ලේඛනය.</CardDescription>
              </CardHeader>
              <div className="overflow-x-auto border border-slate-100 rounded-2xl">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-150 bg-slate-50/50 font-bold uppercase tracking-wider text-slate-500 text-[10px]">
                      <th className="py-3 px-6">ණය විස්තරය (Loan Class)</th>
                      <th className="py-3 px-6">බැංකුව (Banker)</th>
                      <th className="py-3 px-6">පොලී අනුපාතය (Rate)</th>
                      <th className="py-3 px-6 font-bold text-emerald-650">ගෙවා නිම කළ ප්‍රමාණය (Paid Dues)</th>
                      <th className="py-3 px-6 text-right font-bold text-rose-600">හිඟ මුදල් ප්‍රමාණය Rs. (Outstanding Principal)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    <tr>
                      <td className="py-3.5 px-6 text-slate-800">කර්මාන්තශාලා යන්ත්‍රෝපකරණ ණය (Machinery Loan)</td>
                      <td className="py-3.5 px-6">Bank of Ceylon (BOC)</td>
                      <td className="py-3.5 px-6">12.5% per Annum</td>
                      <td className="py-3.5 px-6 text-emerald-650 font-bold">Rs. 800,000.00</td>
                      <td className="py-3.5 px-6 text-right font-black text-rose-600">Rs. 1,200,000.00</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-6 text-slate-800">ලොරි රථ ලීසිං පහසුකම (Lorry Lease Finance)</td>
                      <td className="py-3.5 px-6">Sampath Bank PLC</td>
                      <td className="py-3.5 px-6">14.0% per Annum</td>
                      <td className="py-3.5 px-6 text-emerald-650 font-bold">Rs. 320,000.00</td>
                      <td className="py-3.5 px-6 text-right font-black text-rose-600">Rs. 680,000.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* 10. OTHER LOAN REPORT */}
          {currentView === "other-loans" && (
            <Card className="rounded-2xl border-slate-200 bg-white p-6 shadow-sm space-y-6 animate-fade-in">
              <CardHeader className="p-0 pb-4 border-b border-slate-100">
                <CardTitle className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <CircleDollarSign className="w-5 h-5 text-indigo-500" />
                  අනෙකුත් ණය සහ අධ්‍යක්ෂක ප්‍රතිපාදන වාර්තාව (Other Liabilities & Director Loans)
                </CardTitle>
                <CardDescription className="text-xs">අධ්‍යක්ෂක මණ්ඩල ප්‍රාග්ධන ණය, ආයතනික කෙටිකාලීන ණය සහ ව්‍යාපාරික හවුල්කාර ණය ප්‍රතිපාදන.</CardDescription>
              </CardHeader>
              <div className="overflow-x-auto border border-slate-100 rounded-2xl">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-150 bg-slate-50/50 font-bold uppercase tracking-wider text-slate-500 text-[10px]">
                      <th className="py-3 px-6">ණය හිමිකරු (Creditor Name)</th>
                      <th className="py-3 px-6">ණය වර්ගය (Type)</th>
                      <th className="py-3 px-6">ආරම්භක දිනය (Start Date)</th>
                      <th className="py-3 px-6 font-bold text-slate-800">ණය කොන්දේසි (Terms)</th>
                      <th className="py-3 px-6 text-right font-bold text-rose-600">හිඟ මුදල් ප්‍රමාණය Rs. (Outstanding Principal)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    <tr>
                      <td className="py-3.5 px-6 text-slate-800">Mr. S. Wijewardena (Director)</td>
                      <td className="py-3.5 px-6 text-indigo-650 font-bold">අධ්‍යක්ෂක ණය ප්‍රාග්ධනය (Director Loan)</td>
                      <td className="py-3.5 px-6">2025-01-15</td>
                      <td className="py-3.5 px-6 text-slate-400">0% Interest Rate (දිගුකාලීන)</td>
                      <td className="py-3.5 px-6 text-right font-black text-rose-600">Rs. 300,000.00</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-6 text-slate-800">Trade Credits - Raw Chem Ltd</td>
                      <td className="py-3.5 px-6 text-indigo-650 font-bold">සැපයුම් කෙටිකාලීන ණය (Supplier Trade Credit)</td>
                      <td className="py-3.5 px-6">2026-05-10</td>
                      <td className="py-3.5 px-6 text-slate-400">දින 60 ණය කාල සීමාව</td>
                      <td className="py-3.5 px-6 text-right font-black text-rose-600">Rs. 150,000.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* 11. STAFF REPORT */}
          {currentView === "staff-report" && (
            <Card className="rounded-2xl border-slate-200 bg-white p-6 shadow-sm space-y-6 animate-fade-in">
              <CardHeader className="p-0 pb-4 border-b border-slate-100">
                <CardTitle className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-indigo-500" />
                  සේවක මණ්ඩල ප්‍රගති සහ පැමිණීමේ වාර්තාව (Staff Attendance & Performance Report)
                </CardTitle>
                <CardDescription className="text-xs">කර්මාන්තශාලා සේවකයින්, රියදුරන් සහ කළමනාකාර මණ්ඩලයේ මාසික පැමිණීම සහ OEE ප්‍රගතිය.</CardDescription>
              </CardHeader>
              <div className="grid gap-6 md:grid-cols-4">
                <div className="p-4 bg-indigo-50/40 rounded-2xl border border-indigo-100 text-center text-xs">
                  <span className="font-bold text-slate-400 block">මුළු සේවක සංඛ්‍යාව</span>
                  <div className="text-2xl font-black text-indigo-650 mt-1">28 Staff Members</div>
                  <span className="text-[9px] text-slate-400 font-bold mt-1 block">කර්මාන්තශාලා, කාර්යාල හා රියදුරන්</span>
                </div>
                <div className="p-4 bg-emerald-50/40 rounded-2xl border border-emerald-100 text-center text-xs">
                  <span className="font-bold text-slate-400 block">සාමාන්‍ය පැමිණීම</span>
                  <div className="text-2xl font-black text-emerald-650 mt-1">96.8% Attendance</div>
                  <span className="text-[9px] text-slate-400 font-bold mt-1 block">මැයි මාසය සඳහා සජීවීව</span>
                </div>
                <div className="p-4 bg-indigo-50/40 rounded-2xl border border-indigo-100 text-center text-xs col-span-2">
                  <span className="font-bold text-slate-400 block">යන්ත්‍ර මෙහෙයුම් කාර්යක්ෂමතාව (Overall OEE Index)</span>
                  <div className="text-2xl font-black text-indigo-650 mt-1">92.4% Production OEE</div>
                  <span className="text-[9px] text-slate-400 font-bold mt-1 block">තත්ත්ව පාලන අංශයේ වාර්තාවට අනුව</span>
                </div>
              </div>
              <div className="overflow-x-auto border border-slate-100 rounded-2xl">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-150 bg-slate-50/50 font-bold uppercase tracking-wider text-slate-500 text-[10px]">
                      <th className="py-3 px-6">සේවකයා (Employee Name)</th>
                      <th className="py-3 px-6">අංශය (Department)</th>
                      <th className="py-3 px-6">පැමිණීම (Attendance)</th>
                      <th className="py-3 px-6">කාර්යසාධනය (Performance)</th>
                      <th className="py-3 px-6 text-right">OEE ශ්‍රේණිය (QC Level)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    <tr>
                      <td className="py-3 px-6 font-bold text-slate-900">Nimal Perera</td>
                      <td className="py-3 px-6 text-slate-500">ප්‍රවාහන (Logistics Lorry Driver)</td>
                      <td className="py-3 px-6 text-slate-500">98% (25 Days)</td>
                      <td className="py-3 px-6 text-emerald-600">විශිෂ්ටයි (Excellent)</td>
                      <td className="py-3 px-6 text-right"><span className="bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-xl px-2 py-0.5 font-bold">Grade A</span></td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 font-bold text-slate-900">Kamal Silva</td>
                      <td className="py-3 px-6 text-slate-500">යන්ත්‍ර ක්‍රියාකාරී (Factory Operator)</td>
                      <td className="py-3 px-6 text-slate-500">96% (24 Days)</td>
                      <td className="py-3 px-6 text-slate-600">ස්ථායී (Stable)</td>
                      <td className="py-3 px-6 text-right"><span className="bg-slate-50 text-slate-600 border border-slate-200 rounded-xl px-2 py-0.5 font-bold">Grade B</span></td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 font-bold text-slate-900">Ruwan Gunawardena</td>
                      <td className="py-3 px-6 text-slate-500">තත්ත්ව පාලන (QC Officer)</td>
                      <td className="py-3 px-6 text-slate-500">100% (26 Days)</td>
                      <td className="py-3 px-6 text-emerald-600">ඉහළම කාර්යක්ෂමතාව (Outstanding)</td>
                      <td className="py-3 px-6 text-right"><span className="bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-xl px-2 py-0.5 font-bold">Grade A+</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          )}

        </div>

      </div>

    </div>
  )
}
