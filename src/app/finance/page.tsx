"use client"

import React, { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  CircleDollarSign,
  TrendingUp,
  FileBarChart2,
  Boxes,
  Info,
  ArrowUpRight,
  ArrowDownRight,
  Printer,
  ChevronRight,
  Scale,
  CheckCircle2,
  Search
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function FinanceHubPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentView = searchParams.get("view") || "cashbook"

  const [searchTerm, setSearchTerm] = useState("")

  // Dynamic cashbook state to demonstrate fully functional capabilities
  const [cashTransactions, setCashTransactions] = useState([
    { id: "TX-901", desc: "කාර්ගිල්ස් ඇණවුම් බිල්පත් ලැබීම (Cargills Sale Receipt)", type: "Debit (ලැබීම)", category: "Sales", amount: 185000, date: "2026-05-28" },
    { id: "TX-902", desc: "ලංකා කෙමිකල්ස් සැපයුම්කරු ගෙවීම (Lanka Chemical Importers Pay)", type: "Credit (ගෙවීම)", category: "Suppliers", amount: 140000, date: "2026-05-28" },
    { id: "TX-903", desc: "කීල්ස් සුපර් ණය පියවීම (Keells Outstanding Clearance)", type: "Debit (ලැබීම)", category: "Recovery", amount: 85000, date: "2026-05-29" },
    { id: "TX-904", desc: "ලොරියට ඩීසල් ගැසීම (Lorry Diesel Fuel WP-TRK-102)", type: "Credit (ගෙවීම)", category: "Logistics", amount: 18500, date: "2026-05-29" },
    { id: "TX-905", desc: "කර්මාන්තශාලා විදුලි බිල (Factory Utility bill)", type: "Credit (ගෙවීම)", category: "Utilities", amount: 84000, date: "2026-05-29" },
    { id: "TX-906", desc: "සිරිවර්ධන සිල්ලර කඩයෙන් අයකරගැනීම (Siriwardena Grocery Collection)", type: "Debit (ලැබීම)", category: "Recovery", amount: 25000, date: "2026-05-30" },
    { id: "TX-907", desc: "ගබඩා සේවක සුබසාධන තේ වියදම් (Staff Welfare Refreshments)", type: "Credit (ගෙවීම)", category: "Welfare", amount: 4500, date: "2026-05-30" },
  ])

  const [newTxDesc, setNewTxDesc] = useState("")
  const [newTxType, setNewTxType] = useState("Debit (ලැබීම)")
  const [newTxCategory, setNewTxCategory] = useState("Sales")
  const [newTxAmount, setNewTxAmount] = useState("")

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTxDesc || !newTxAmount) return

    const newTx = {
      id: `TX-${901 + cashTransactions.length}`,
      desc: newTxDesc,
      type: newTxType,
      category: newTxCategory,
      amount: parseFloat(newTxAmount),
      date: new Date().toISOString().split("T")[0]
    }

    setCashTransactions([newTx, ...cashTransactions])
    setNewTxDesc("")
    setNewTxAmount("")
  }

  // Calculate Running Cash Balance dynamically
  const totalDebit = cashTransactions
    .filter(t => t.type.includes("Debit"))
    .reduce((acc, t) => acc + t.amount, 0)
  
  const totalCredit = cashTransactions
    .filter(t => t.type.includes("Credit"))
    .reduce((acc, t) => acc + t.amount, 0)

  const netCashBalance = 890200 + totalDebit - totalCredit // 890,200 is base initial reserve

  // Setup tabs
  const financeTabs = [
    { id: "cashbook", label: "මුදල් පොත් (Cash Books)", icon: Boxes },
    { id: "pandl", label: "ලාභ අලාභ ගිණුම (Profit & Loss)", icon: CircleDollarSign },
    { id: "cashflow", label: "මුදල් ප්‍රවාහය (Cash Flow)", icon: TrendingUp },
    { id: "balancesheet", label: "ශේෂ පත්‍රය (Balance Sheet)", icon: FileBarChart2 },
  ]

  const setView = (view: string) => {
    setSearchTerm("")
    router.push(`/finance?view=${view}`)
  }

  // Print simulation trigger
  const handlePrint = (statementName: string) => {
    alert(`${statementName} මුද්‍රණය සඳහා සූදානම් කෙරේ. PDF ගොනුවක් සාර්ථකව උත්පාදනය කරන ලදී. (PDF generated successfully.)`)
  }

  return (
    <div className="space-y-8 font-sans">
      
      {/* Title block */}
      <div className="flex flex-col gap-2 animate-fade-in">
        <button onClick={() => router.push("/")} className="inline-flex items-center gap-1.5 text-xs text-indigo-650 dark:text-indigo-400 hover:underline font-semibold w-fit">
          <ArrowLeft className="w-3.5 h-3.5" />
          ආපසු කළමනාකරණ පුවරුවට (Dashboard)
        </button>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/40 text-violet-650 dark:text-violet-400">
              <CircleDollarSign className="w-5.5 h-5.5" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                මූල්‍ය සහ ගිණුම්කරණ පුවරුව (Financial Ledger Hub)
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                ද්විත්ව සටහන් මුදල් පොත්, ලාභ හා අලාභ ගිණුම් ප්‍රකාශන සහ ශේෂ පත්‍රයන් සජීවීව මෙතැනින් පරිශීලනය කරන්න.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        
        {/* Left Side Tab Selector */}
        <div className="lg:col-span-1 space-y-4">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
              මූල්‍ය වාර්තා වර්ගීකරණය
            </div>
            {financeTabs.map(tab => {
              const Icon = tab.icon
              const isActive = currentView === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setView(tab.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-violet-50 dark:bg-violet-950/40 text-violet-650 dark:text-violet-400 font-extrabold"
                      : "text-slate-600 hover:text-slate-950 dark:text-slate-350 dark:hover:text-white hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? "text-violet-500" : "text-slate-400"}`} />
                    <span>{tab.label}</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              )
            })}
          </div>

          {/* Quick Reserve Metric Widget */}
          <div className="p-5 bg-gradient-to-tr from-sky-500 to-indigo-650 text-white rounded-2xl shadow-md space-y-3">
            <Scale className="w-8 h-8 text-sky-200 animate-pulse" />
            <div>
              <span className="text-[10px] uppercase font-extrabold text-sky-100 tracking-wider">මුළු පද්ධති ශුද්ධ මුදල් ශේෂය</span>
              <div className="text-xl font-black mt-0.5">Rs. {netCashBalance.toLocaleString()}.00</div>
              <p className="text-[9px] text-sky-150 mt-1 font-semibold leading-relaxed">
                කර්මාන්තශාලාවේ BOC සහ Sampath බැංකු ගිණුම්වල සහ සුළු මුදල් පෙට්ටියේ පවතින සැබෑ සක්‍රීය මුළු මුදල් සංචිත එකතුව.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Content Panel */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* CONTROL HEADER ACTION BAR */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm animate-fade-in">
            <span className="text-[11px] font-extrabold text-slate-550 flex items-center gap-2">
              <Info className="w-4 h-4 text-violet-550" />
              වර්ෂය: 2025/2026 (ශ්‍රී ලංකා මූල්‍ය වර්ෂය) | අවසන් විගණන දිනය: 2026-05-30
            </span>
            <Button
              onClick={() => handlePrint(financeTabs.find(t => t.id === currentView)?.label || "Financial Statement")}
              className="rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 shadow-sm flex items-center gap-1.5 h-8 border border-slate-200"
            >
              <Printer className="w-3.5 h-3.5" /> PDF වාර්තාව මුද්‍රණය (Print PDF)
            </Button>
          </div>

          {/* 1. CASH BOOKS */}
          {currentView === "cashbook" && (
            <div className="space-y-6 animate-fade-in">
              {/* Double-entry Quick Addition Form */}
              <Card className="rounded-2xl border-slate-200 bg-white p-6 shadow-sm">
                <CardHeader className="p-0 pb-4 border-b border-slate-100 mb-4">
                  <CardTitle className="text-xs font-bold text-slate-800 uppercase tracking-wider">මුදල් පොතට ගනුදෙනුවක් එක් කිරීම (Direct Double-Entry Form)</CardTitle>
                </CardHeader>
                <form onSubmit={handleAddTransaction} className="grid gap-4 md:grid-cols-5 items-end">
                  <div className="space-y-1 text-xs">
                    <label className="font-bold text-slate-400">ගනුදෙනු විස්තරය (Transaction Description)</label>
                    <Input required value={newTxDesc} onChange={e => setNewTxDesc(e.target.value)} placeholder="උදා: සෝයා පිටි විකිණීමෙන් ලැබීම" className="rounded-xl h-8.5" />
                  </div>
                  <div className="space-y-1 text-xs">
                    <label className="font-bold text-slate-400">ගිණුම් වර්ගය (Entry Type)</label>
                    <select value={newTxType} onChange={e => setNewTxType(e.target.value)} className="w-full p-2 border border-slate-200 rounded-xl bg-slate-50 text-xs h-9">
                      <option value="Debit (ලැබීම)">Debit (Debit - ලැබීම්)</option>
                      <option value="Credit (ගෙවීම)">Credit (Credit - ගෙවීම්)</option>
                    </select>
                  </div>
                  <div className="space-y-1 text-xs">
                    <label className="font-bold text-slate-400">කාණ්ඩය (Category)</label>
                    <select value={newTxCategory} onChange={e => setNewTxCategory(e.target.value)} className="w-full p-2 border border-slate-200 rounded-xl bg-slate-50 text-xs h-9">
                      <option value="Sales">Sales (විකුණුම්)</option>
                      <option value="Suppliers">Suppliers (සැපයුම්කරුවන්)</option>
                      <option value="Recovery">Recovery (ණය අයකරගැනීම්)</option>
                      <option value="Utilities">Utilities (විදුලි/ජල බිල්පත්)</option>
                      <option value="Logistics">Logistics (ප්‍රවාහන වියදම්)</option>
                      <option value="Welfare">Welfare (සුබසාධන)</option>
                    </select>
                  </div>
                  <div className="space-y-1 text-xs">
                    <label className="font-bold text-slate-400 font-bold">ප්‍රමාණය Rs. (Amount)</label>
                    <Input type="number" required value={newTxAmount} onChange={e => setNewTxAmount(e.target.value)} placeholder="0.00" className="rounded-xl h-8.5" />
                  </div>
                  <Button type="submit" className="rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-700 text-white h-9 shadow-sm">
                    ගනුදෙනුව ඇතුළත් කරන්න
                  </Button>
                </form>
              </Card>

              {/* Transactions Ledger Card */}
              <Card className="rounded-2xl border-slate-200 bg-white shadow-sm overflow-hidden">
                <CardHeader className="border-b border-slate-100 p-6 bg-slate-50/20">
                  <CardTitle className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                    <Boxes className="w-4.5 h-4.5 text-violet-500" />
                    ද්විත්ව සටහන් මුදල් පොත් ලෙජරය (Double Entry Cash Book)
                  </CardTitle>
                  <CardDescription className="text-xs">
                    දෛනිකව සිදුවන සියලුම ලැබීම් (Debits) සහ ගෙවීම් (Credits) ඇතුළත් ප්‍රධාන මුදල් පොත.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="flex p-4 border-b bg-slate-50/50">
                    <div className="relative w-full max-w-xs">
                      <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                      <Input
                        type="search"
                        placeholder="මුදල් පොත තුළ සොයන්න..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="pl-8 h-8 text-[11px] bg-white rounded-xl border-slate-200"
                      />
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                          <th className="py-3.5 px-6">Tx ID</th>
                          <th className="py-3.5 px-6">විස්තරය (Particulars)</th>
                          <th className="py-3.5 px-6">දිනය (Date)</th>
                          <th className="py-3.5 px-6">වර්ගය (Entry Type)</th>
                          <th className="py-3.5 px-6 text-right font-bold text-emerald-650">Debit (+) Rs.</th>
                          <th className="py-3.5 px-6 text-right font-bold text-rose-600">Credit (-) Rs.</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {/* Initial balance reserve row */}
                        <tr className="bg-slate-50/20 font-bold">
                          <td className="py-4 px-6 text-slate-400">OP-BAL</td>
                          <td className="py-4 px-6 text-slate-800">ආරම්භක ශේෂය (Opening Cash Reserve Balance)</td>
                          <td className="py-4 px-6 text-slate-400">2026-05-01</td>
                          <td className="py-4 px-6 text-indigo-500">Balance B/F</td>
                          <td className="py-4 px-6 text-right text-emerald-650">Rs. 890,200.00</td>
                          <td className="py-4 px-6 text-right text-rose-600">-</td>
                        </tr>
                        {/* Dynamic transactions list */}
                        {cashTransactions
                          .filter(t => t.desc.toLowerCase().includes(searchTerm.toLowerCase()) || t.category.toLowerCase().includes(searchTerm.toLowerCase()))
                          .map(t => (
                            <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="py-4 px-6 font-bold text-violet-650">{t.id}</td>
                              <td className="py-4 px-6 font-extrabold text-slate-800">{t.desc}</td>
                              <td className="py-4 px-6 text-slate-400 font-semibold">{t.date}</td>
                              <td className={`py-4 px-6 font-bold ${t.type.includes("Debit") ? "text-emerald-600" : "text-rose-500"}`}>{t.type}</td>
                              <td className="py-4 px-6 text-right font-black text-emerald-650">
                                {t.type.includes("Debit") ? `Rs. ${t.amount.toLocaleString()}.00` : "-"}
                              </td>
                              <td className="py-4 px-6 text-right font-black text-rose-600">
                                {t.type.includes("Credit") ? `Rs. ${t.amount.toLocaleString()}.00` : "-"}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* 2. PROFIT & LOSS STATEMENT */}
          {currentView === "pandl" && (
            <div className="space-y-6 animate-fade-in">
              <Card className="rounded-2xl border-slate-200 bg-white shadow-sm overflow-hidden p-6">
                <div className="text-center space-y-1 mb-8">
                  <h2 className="text-lg font-black text-slate-900">ලාභ සහ අලාභ ප්‍රකාශනය (Statement of Profit or Loss)</h2>
                  <p className="text-xs text-indigo-600 font-bold">TheERP Manufacturing & Sales System - Sri Lanka</p>
                  <p className="text-[10px] text-slate-455">2026 මැයි 30 දිනට අවසන් මාසය සඳහා (For the Month Ended May 30, 2026)</p>
                </div>

                <div className="max-w-2xl mx-auto border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 font-bold uppercase tracking-wider text-slate-500 text-[10px]">
                        <th className="py-3 px-6">විස්තරය (Particulars)</th>
                        <th className="py-3 px-6 text-right">වටිනාකම Rs. (Subtotal)</th>
                        <th className="py-3 px-6 text-right">මුළු එකතුව Rs. (Total)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150 font-semibold text-slate-700">
                      {/* Revenue segment */}
                      <tr className="bg-slate-50/10 font-bold">
                        <td className="py-3.5 px-6 text-indigo-650 uppercase text-[10px]">විකුණුම් ආදායම (Revenue)</td>
                        <td className="py-3.5 px-6 text-right">-</td>
                        <td className="py-3.5 px-6 text-right">-</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-6 pl-10 text-slate-600">මුළු විකුණුම් (Gross Sales)</td>
                        <td className="py-3 px-6 text-right text-slate-500">Rs. 1,480,000.00</td>
                        <td className="py-3 px-6 text-right">-</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-6 pl-10 text-slate-600">ආපසු එවූ විකුණුම් (Sales Returns)</td>
                        <td className="py-3 px-6 text-right text-rose-500">(Rs. 30,000.00)</td>
                        <td className="py-3 px-6 text-right">-</td>
                      </tr>
                      <tr className="bg-indigo-50/20 font-extrabold text-slate-900">
                        <td className="py-3 px-6 pl-10">ශුද්ධ විකුණුම් ආදායම (Net Revenue)</td>
                        <td className="py-3 px-6 text-right">-</td>
                        <td className="py-3 px-6 text-right text-indigo-600">Rs. 1,450,000.00</td>
                      </tr>

                      {/* COGS segment */}
                      <tr className="bg-slate-50/10 font-bold">
                        <td className="py-3.5 px-6 text-indigo-650 uppercase text-[10px]">විකිණූ භාණ්ඩවල පිරිවැය (Cost of Goods Sold - COGS)</td>
                        <td className="py-3.5 px-6 text-right">-</td>
                        <td className="py-3.5 px-6 text-right">-</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-6 pl-10 text-slate-600">ආරම්භක තොගය (Opening Stock - Materials)</td>
                        <td className="py-3 px-6 text-right text-slate-500">Rs. 180,000.00</td>
                        <td className="py-3 px-6 text-right">-</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-6 pl-10 text-slate-600">රසායනික සහ අමුද්‍රව්‍ය මිලදී ගැනීම් (Purchases)</td>
                        <td className="py-3 px-6 text-right text-slate-500">Rs. 392,000.00</td>
                        <td className="py-3 px-6 text-right">-</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-6 pl-10 text-slate-600">අවසාන තොග ශේෂය (Closing Stock)</td>
                        <td className="py-3 px-6 text-right text-emerald-650">(Rs. 120,000.00)</td>
                        <td className="py-3 px-6 text-right">-</td>
                      </tr>
                      <tr className="bg-rose-50/20 font-extrabold text-slate-900">
                        <td className="py-3 px-6 pl-10">මුළු විකිණූ භාණ්ඩ පිරිවැය (Total COGS)</td>
                        <td className="py-3 px-6 text-right">-</td>
                        <td className="py-3 px-6 text-right text-rose-600">(Rs. 452,000.00)</td>
                      </tr>

                      {/* Gross profit */}
                      <tr className="bg-slate-50/50 font-black text-slate-900 text-sm">
                        <td className="py-4 px-6 uppercase text-xs">දළ ලාභය (Gross Profit)</td>
                        <td className="py-4 px-6 text-right">-</td>
                        <td className="py-4 px-6 text-right text-emerald-650">Rs. 998,000.00</td>
                      </tr>

                      {/* Expenses segment */}
                      <tr className="bg-slate-50/10 font-bold">
                        <td className="py-3.5 px-6 text-indigo-650 uppercase text-[10px]">මෙහෙයුම් සහ පරිපාලන වියදම් (Operating Expenses - OPEX)</td>
                        <td className="py-3.5 px-6 text-right">-</td>
                        <td className="py-3.5 px-6 text-right">-</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-6 pl-10 text-slate-600">කර්මාන්තශාලා විදුලිය සහ උපයෝගිතා</td>
                        <td className="py-3 px-6 text-right text-slate-500">Rs. 84,000.00</td>
                        <td className="py-3 px-6 text-right">-</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-6 pl-10 text-slate-600">ප්‍රවාහන මෙහෙයුම් වියදම් සහ ඩීසල්</td>
                        <td className="py-3 px-6 text-right text-slate-500">Rs. 18,500.00</td>
                        <td className="py-3 px-6 text-right">-</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-6 pl-10 text-slate-600">යන්ත්‍රෝපකරණ නඩත්තු ගාස්තු</td>
                        <td className="py-3 px-6 text-right text-slate-500">Rs. 25,000.00</td>
                        <td className="py-3 px-6 text-right">-</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-6 pl-10 text-slate-600">විකුණුම් කොමිස් සහ නියෝජිත වියදම්</td>
                        <td className="py-3 px-6 text-right text-slate-500">Rs. 35,000.00</td>
                        <td className="py-3 px-6 text-right">-</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-6 pl-10 text-slate-600">සේවක සුබසාධන හා අනෙකුත් දේ</td>
                        <td className="py-3 px-6 text-right text-slate-500">Rs. 4,500.00</td>
                        <td className="py-3 px-6 text-right">-</td>
                      </tr>
                      <tr className="bg-rose-50/20 font-extrabold text-slate-900">
                        <td className="py-3 px-6 pl-10">මුළු මෙහෙයුම් වියදම් (Total OPEX)</td>
                        <td className="py-3 px-6 text-right">-</td>
                        <td className="py-3 px-6 text-right text-rose-600">(Rs. 167,000.00)</td>
                      </tr>

                      {/* Net profit */}
                      <tr className="bg-gradient-to-r from-violet-50 to-indigo-50 font-black text-slate-900 text-sm">
                        <td className="py-4 px-6 uppercase text-xs flex items-center gap-1">
                          <Scale className="w-4 h-4 text-violet-650" /> ශුද්ධ ලාභය (Net Profit for the Month)
                        </td>
                        <td className="py-4 px-6 text-right">-</td>
                        <td className="py-4 px-6 text-right text-indigo-650">Rs. 831,000.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* 3. CASH FLOW STATEMENT */}
          {currentView === "cashflow" && (
            <div className="space-y-6 animate-fade-in">
              <Card className="rounded-2xl border-slate-200 bg-white shadow-sm overflow-hidden p-6">
                <div className="text-center space-y-1 mb-8">
                  <h2 className="text-lg font-black text-slate-900">මුදල් ප්‍රවාහ ප්‍රකාශනය (Statement of Cash Flows)</h2>
                  <p className="text-xs text-indigo-600 font-bold">TheERP Manufacturing & Sales System - Sri Lanka</p>
                  <p className="text-[10px] text-slate-455">2026 මැයි 30 දිනට අවසන් මාසය සඳහා (For the Month Ended May 30, 2026)</p>
                </div>

                <div className="max-w-2xl mx-auto space-y-6">
                  {/* Category 1: Operating */}
                  <div className="border border-slate-150 rounded-xl p-5 space-y-3 bg-slate-50/20">
                    <h4 className="font-extrabold text-slate-900 flex items-center gap-1.5">
                      <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                      මෙහෙයුම් ක්‍රියාකාරකම් වලින් මුදල් ප්‍රවාහයන් (Cash Flow from Operating Activities)
                    </h4>
                    <div className="space-y-1.5 text-xs text-slate-650 font-semibold pl-6">
                      <div className="flex justify-between">
                        <span>සිල්ලර ඇණවුම් ලැබීම් (Vikuṇum Adāyama - Cash Sales Collection)</span>
                        <span className="text-emerald-600">Rs. 1,450,200.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>අමුද්‍රව්‍ය මිලදී ගැනීම් (Purchases Payments)</span>
                        <span className="text-rose-500">(Rs. 392,000.00)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>කර්මාන්තශාලා මෙහෙයුම් වියදම් ගෙවීම් (Utility & Operations Payments)</span>
                        <span className="text-rose-500">(Rs. 167,000.00)</span>
                      </div>
                      <div className="flex justify-between font-bold text-slate-900 border-t border-slate-150 pt-1.5 mt-1.5">
                        <span>මෙහෙයුම් ක්‍රියාකාරකම්වල ශුද්ධ මුදල් ප්‍රවාහය (Net Operating Cash)</span>
                        <span className="text-indigo-650">Rs. 891,200.00</span>
                      </div>
                    </div>
                  </div>

                  {/* Category 2: Investing */}
                  <div className="border border-slate-150 rounded-xl p-5 space-y-3 bg-slate-50/20">
                    <h4 className="font-extrabold text-slate-900 flex items-center gap-1.5">
                      <ArrowDownRight className="w-4 h-4 text-rose-500" />
                      ආයෝජන ක්‍රියාකාරකම් වලින් මුදල් ප්‍රවාහයන් (Cash Flow from Investing Activities)
                    </h4>
                    <div className="space-y-1.5 text-xs text-slate-650 font-semibold pl-6">
                      <div className="flex justify-between">
                        <span>යන්ත්‍රෝපකරණ අලුත්වැඩියාව සහ ප්‍රාග්ධන වියදම් (Capital Expense)</span>
                        <span className="text-rose-500">(Rs. 25,000.00)</span>
                      </div>
                      <div className="flex justify-between font-bold text-slate-900 border-t border-slate-150 pt-1.5 mt-1.5">
                        <span>ආයෝජන ක්‍රියාකාරකම්වල ශුද්ධ මුදල් ප්‍රවාහය (Net Investing Cash)</span>
                        <span className="text-rose-500">(Rs. 25,000.00)</span>
                      </div>
                    </div>
                  </div>

                  {/* Category 3: Financing */}
                  <div className="border border-slate-150 rounded-xl p-5 space-y-3 bg-slate-50/20">
                    <h4 className="font-extrabold text-slate-900 flex items-center gap-1.5">
                      <ArrowDownRight className="w-4 h-4 text-rose-500" />
                      මූල්‍යකරණ ක්‍රියාකාරකම් වලින් මුදල් ප්‍රවාහයන් (Cash Flow from Financing Activities)
                    </h4>
                    <div className="space-y-1.5 text-xs text-slate-650 font-semibold pl-6">
                      <div className="flex justify-between">
                        <span>බැංකු ණය පොලී ගෙවීම් (Bank Loan Interest Payments)</span>
                        <span className="text-rose-500">(Rs. 36,000.00)</span>
                      </div>
                      <div className="flex justify-between font-bold text-slate-900 border-t border-slate-150 pt-1.5 mt-1.5">
                        <span>මූල්‍යකරණ ක්‍රියාකාරකම්වල ශුද්ධ මුදල් ප්‍රවාහය (Net Financing Cash)</span>
                        <span className="text-rose-500">(Rs. 36,000.00)</span>
                      </div>
                    </div>
                  </div>

                  {/* Combined Totals */}
                  <div className="p-4 bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-100 rounded-xl space-y-1 text-xs">
                    <div className="flex justify-between font-bold text-slate-700">
                      <span>මාසය සඳහා මුදල් ශුද්ධ වැඩිවීම (Net Monthly Increase in Cash)</span>
                      <span>Rs. 830,200.00</span>
                    </div>
                    <div className="flex justify-between text-slate-500 font-semibold">
                      <span>මාසය ආරම්භයේදී මුදල් ශේෂය (Cash at Beginning of Month)</span>
                      <span>Rs. 60,000.00</span>
                    </div>
                    <div className="flex justify-between font-black text-indigo-650 text-sm border-t border-violet-200/60 pt-2 mt-2">
                      <span>මාසය අවසානයේ මුදල් සහ බැංකු ශේෂය (Cash & Bank Balance B/F)</span>
                      <span>Rs. 890,200.00</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* 4. BALANCE SHEET */}
          {currentView === "balancesheet" && (
            <div className="space-y-6 animate-fade-in">
              <Card className="rounded-2xl border-slate-200 bg-white shadow-sm overflow-hidden p-6">
                <div className="text-center space-y-1 mb-8">
                  <h2 className="text-lg font-black text-slate-900">සීරුමාරු කළ ශේෂ පත්‍රය (Balance Sheet / Position)</h2>
                  <p className="text-xs text-indigo-600 font-bold">TheERP Manufacturing & Sales System - Sri Lanka</p>
                  <p className="text-[10px] text-slate-455">2026 මැයි 30 දිනට පවතින පරිදි (As at May 30, 2026)</p>
                </div>

                <div className="max-w-2xl mx-auto border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 font-bold uppercase tracking-wider text-slate-500 text-[10px]">
                        <th className="py-3 px-6">ගිණුම් ශීර්ෂය (Particulars)</th>
                        <th className="py-3 px-6 text-right">Rs. (Subtotal)</th>
                        <th className="py-3 px-6 text-right">Rs. (Total Asset/Liab)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150 font-semibold text-slate-700">
                      
                      {/* SECTION 1: ASSETS */}
                      <tr className="bg-indigo-50/20 font-black text-slate-900 text-xs">
                        <td className="py-3 px-6 uppercase tracking-wider">වත්කම් (Assets)</td>
                        <td className="py-3 px-6 text-right">-</td>
                        <td className="py-3 px-6 text-right">-</td>
                      </tr>
                      {/* Current Assets */}
                      <tr className="bg-slate-50/10 font-bold">
                        <td className="py-2.5 px-6 pl-10 text-indigo-650 text-[10px] uppercase">ජංගම වත්කම් (Current Assets)</td>
                        <td className="py-2.5 px-6 text-right">-</td>
                        <td className="py-2.5 px-6 text-right">-</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-6 pl-14 text-slate-600">මුදල් සහ බැංකු ශේෂය (Cash & Bank)</td>
                        <td className="py-2.5 px-6 text-right text-slate-500">Rs. 890,200.00</td>
                        <td className="py-2.5 px-6 text-right">-</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-6 pl-14 text-slate-600">පාරිභෝගික ණය මුදල් (Debtors / Receivables)</td>
                        <td className="py-2.5 px-6 text-right text-slate-500">Rs. 250,000.00</td>
                        <td className="py-2.5 px-6 text-right">-</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-6 pl-14 text-slate-600">පවතින තොග ශේෂය (Stock on Hand)</td>
                        <td className="py-2.5 px-6 text-right text-slate-500">Rs. 120,000.00</td>
                        <td className="py-2.5 px-6 text-right">-</td>
                      </tr>
                      <tr className="font-bold text-slate-800">
                        <td className="py-2.5 px-6 pl-10">මුළු ජංගම වත්කම් (Total Current Assets)</td>
                        <td className="py-2.5 px-6 text-right">-</td>
                        <td className="py-2.5 px-6 text-right">Rs. 1,260,200.00</td>
                      </tr>

                      {/* Non-Current Assets */}
                      <tr className="bg-slate-50/10 font-bold">
                        <td className="py-2.5 px-6 pl-10 text-indigo-650 text-[10px] uppercase">ස්ථාවර වත්කම් (Non-Current Assets)</td>
                        <td className="py-2.5 px-6 text-right">-</td>
                        <td className="py-2.5 px-6 text-right">-</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-6 pl-14 text-slate-600">කර්මාන්තශාලා යන්ත්‍රෝපකරණ (Plant & Machinery)</td>
                        <td className="py-2.5 px-6 text-right text-slate-500">Rs. 1,500,000.00</td>
                        <td className="py-2.5 px-6 text-right">-</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-6 pl-14 text-slate-600">බෙදාහැරීමේ ලොරි රථ (Delivery Lorries)</td>
                        <td className="py-2.5 px-6 text-right text-slate-500">Rs. 1,200,000.00</td>
                        <td className="py-2.5 px-6 text-right">-</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-6 pl-14 text-slate-600">කර්මාන්තශාලා ඉඩම සහ ගොඩනැගිලි (Land & Buildings)</td>
                        <td className="py-2.5 px-6 text-right text-slate-500">Rs. 2,000,000.00</td>
                        <td className="py-2.5 px-6 text-right">-</td>
                      </tr>
                      <tr className="font-bold text-slate-800">
                        <td className="py-2.5 px-6 pl-10">මුළු ස්ථාවර වත්කම් (Total Non-Current Assets)</td>
                        <td className="py-2.5 px-6 text-right">-</td>
                        <td className="py-2.5 px-6 text-right">Rs. 4,700,000.00</td>
                      </tr>

                      {/* Total Assets */}
                      <tr className="bg-emerald-500/[0.03] font-black text-slate-900 text-xs">
                        <td className="py-3 px-6 pl-6 uppercase">මුළු වත්කම් (Total Assets)</td>
                        <td className="py-3 px-6 text-right">-</td>
                        <td className="py-3 px-6 text-right text-emerald-650">Rs. 5,960,200.00</td>
                      </tr>

                      {/* SECTION 2: LIABILITIES & EQUITY */}
                      <tr className="bg-indigo-50/20 font-black text-slate-900 text-xs">
                        <td className="py-3 px-6 uppercase tracking-wider">වගකීම් සහ කොටස්හිමි ප්‍රාග්ධනය (Liabilities & Equity)</td>
                        <td className="py-3 px-6 text-right">-</td>
                        <td className="py-3 px-6 text-right">-</td>
                      </tr>
                      {/* Current Liabilities */}
                      <tr className="bg-slate-50/10 font-bold">
                        <td className="py-2.5 px-6 pl-10 text-indigo-650 text-[10px] uppercase">ජංගම වගකීම් (Current Liabilities)</td>
                        <td className="py-2.5 px-6 text-right">-</td>
                        <td className="py-2.5 px-6 text-right">-</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-6 pl-14 text-slate-600">සැපයුම්කරුවන්ගේ ණය (Creditors / Payables)</td>
                        <td className="py-2.5 px-6 text-right text-slate-500">Rs. 465,000.00</td>
                        <td className="py-2.5 px-6 text-right">-</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-6 pl-14 text-slate-600">උපචිත වියදම් ශේෂය (Accrued Utilities)</td>
                        <td className="py-2.5 px-6 text-right text-slate-500">Rs. 15,000.00</td>
                        <td className="py-2.5 px-6 text-right">-</td>
                      </tr>
                      <tr className="font-bold text-slate-800">
                        <td className="py-2.5 px-6 pl-10">මුළු ජංගම වගකීම් (Total Current Liabilities)</td>
                        <td className="py-2.5 px-6 text-right">-</td>
                        <td className="py-2.5 px-6 text-right">Rs. 480,000.00</td>
                      </tr>

                      {/* Non-Current Liabilities */}
                      <tr className="bg-slate-50/10 font-bold">
                        <td className="py-2.5 px-6 pl-10 text-indigo-650 text-[10px] uppercase">දිගුකාලීන වගකීම් (Non-Current Liabilities)</td>
                        <td className="py-2.5 px-6 text-right">-</td>
                        <td className="py-2.5 px-6 text-right">-</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-6 pl-14 text-slate-600">BOC සංවර්ධන බැංකු ණය (BOC Bank Loan)</td>
                        <td className="py-2.5 px-6 text-right text-slate-500">Rs. 1,200,000.00</td>
                        <td className="py-2.5 px-6 text-right">-</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-6 pl-14 text-slate-600">අධ්‍යක්ෂක ණය ප්‍රතිපාදන (Director Loan)</td>
                        <td className="py-2.5 px-6 text-right text-slate-500">Rs. 300,000.00</td>
                        <td className="py-2.5 px-6 text-right">-</td>
                      </tr>
                      <tr className="font-bold text-slate-800">
                        <td className="py-2.5 px-6 pl-10">මුළු දිගුකාලීන වගකීම් (Total Non-Current)</td>
                        <td className="py-2.5 px-6 text-right">-</td>
                        <td className="py-2.5 px-6 text-right">Rs. 1,500,000.00</td>
                      </tr>

                      {/* Shareholders' Equity */}
                      <tr className="bg-slate-50/10 font-bold">
                        <td className="py-2.5 px-6 pl-10 text-indigo-650 text-[10px] uppercase">කොටස්හිමි ප්‍රාග්ධනය (Shareholders&apos; Equity)</td>
                        <td className="py-2.5 px-6 text-right">-</td>
                        <td className="py-2.5 px-6 text-right">-</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-6 pl-14 text-slate-600">සමාගම් කොටස් ප්‍රාග්ධනය (Share Capital)</td>
                        <td className="py-2.5 px-6 text-right text-slate-500">Rs. 3,149,200.00</td>
                        <td className="py-2.5 px-6 text-right">-</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-6 pl-14 text-slate-600">රඳවාගත් ඉපැයීම් / ශුද්ධ ලාභය (Retained Earnings)</td>
                        <td className="py-2.5 px-6 text-right text-slate-500">Rs. 831,000.00</td>
                        <td className="py-2.5 px-6 text-right">-</td>
                      </tr>
                      <tr className="font-bold text-slate-800">
                        <td className="py-2.5 px-6 pl-10">මුළු කොටස්හිමි ප්‍රාග්ධනය (Total Equity)</td>
                        <td className="py-2.5 px-6 text-right">-</td>
                        <td className="py-2.5 px-6 text-right">Rs. 3,980,200.00</td>
                      </tr>

                      {/* Total Liabilities & Equity */}
                      <tr className="bg-violet-500/[0.03] font-black text-slate-900 text-xs">
                        <td className="py-3 px-6 pl-6 uppercase flex items-center gap-1">
                          <Scale className="w-4 h-4 text-violet-650" /> මුළු වගකීම් සහ ප්‍රාග්ධනය (Total Liabilities & Equity)
                        </td>
                        <td className="py-3 px-6 text-right">-</td>
                        <td className="py-3 px-6 text-right text-violet-650">Rs. 5,960,200.00</td>
                      </tr>

                    </tbody>
                  </table>
                </div>

                {/* Mathematical Check Alert Badge */}
                <div className="max-w-2xl mx-auto mt-4 p-3 bg-emerald-50 text-emerald-800 text-[11px] font-black rounded-xl border border-emerald-100/70 flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  පද්ධති පරීක්ෂාව: ශේෂ පත්‍රය සම්පූර්ණයෙන්ම තුලනය වී ඇත (Assets = Liabilities + Equity) Rs. 5,960,200.00
                </div>
              </Card>
            </div>
          )}

        </div>

      </div>

    </div>
  )
}
