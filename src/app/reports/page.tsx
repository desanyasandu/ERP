import React from "react"
import Link from "next/link"
import {
  FileBarChart2,
  ArrowLeft,
  CircleDollarSign,
  Factory,
  Sparkles,
  TrendingUp,
  MapPin,
  Layers,
  Percent,
  CheckCircle2,
  AlertCircle,
  TrendingDown,
  Info
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export const revalidate = 0 // Disable cache to get fresh live metrics

export default async function ReportsPage({ searchParams }: { searchParams?: { view?: string } }) {
  const view = searchParams?.view || "outlet-summary"

  // Report section definitions in Sinhala for navigation highlights
  const reportTabs = [
    { id: "outlet-summary", label: "විකුණුම් සාරාංශය (Summary)", category: "Outlet Reports" },
    { id: "outlet-sales", label: "අලෙවිසැල් විකුණුම් (Sales)", category: "Outlet Reports" },
    { id: "outlet-regional", label: "ප්‍රාදේශීය කාර්යසාධනය (Regional)", category: "Outlet Reports" },
    { id: "fin-cost", label: "පිරිවැය විශ්ලේෂණය (Cost Analysis)", category: "Financial" },
    { id: "fin-cashflow", label: "මුදල් ප්‍රවාහය (Cash Flow)", category: "Financial" },
    { id: "eff-runtime", label: "මැෂින් ක්‍රියාකාරී කාලය (Runtime)", category: "Efficiency" },
    { id: "eff-defect", label: "දෝෂ අනුපාතය (Defect Rate)", category: "Efficiency" }
  ]

  return (
    <div className="space-y-8 font-sans">
      
      {/* Top Title Bar */}
      <div className="flex flex-col gap-2 animate-fade-in">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-indigo-650 dark:text-indigo-400 hover:underline font-semibold">
          <ArrowLeft className="w-3.5 h-3.5" />
          ආපසු කළමනාකරණ පුවරුවට (Dashboard)
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
              <FileBarChart2 className="w-5.5 h-5.5" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                පද්ධති වාර්තා සහ විශ්ලේෂණ (System Reports Hub)
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                අලෙවිසැල් මට්ටමේ විකුණුම්, මූල්‍ය ප්‍රකාශන සහ නිෂ්පාදන කාර්යක්ෂමතාව පිළිබඳ සියලුම වාර්තා මෙතැනින් පරීක්ෂා කරන්න.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        
        {/* Left Sidebar Navigation Block */}
        <div className="lg:col-span-1 space-y-4">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            
            {/* Group 1: Outlet Base Reports */}
            <div>
              <div className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                අලෙවිසැල් වාර්තා (Outlet Reports)
              </div>
              <div className="space-y-1">
                {reportTabs.filter(t => t.category === "Outlet Reports").map(tab => (
                  <Link
                    key={tab.id}
                    href={`/reports?view=${tab.id}`}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl transition-all duration-200",
                      view === tab.id
                        ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-extrabold"
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-350 dark:hover:text-white hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                    )}
                  >
                    <TrendingUp className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{tab.label.split(" (")[0]}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Group 2: Financial Statements */}
            <div>
              <div className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                මූල්‍ය ප්‍රකාශන (Financial)
              </div>
              <div className="space-y-1">
                {reportTabs.filter(t => t.category === "Financial").map(tab => (
                  <Link
                    key={tab.id}
                    href={`/reports?view=${tab.id}`}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl transition-all duration-200",
                      view === tab.id
                        ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-extrabold"
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-350 dark:hover:text-white hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                    )}
                  >
                    <CircleDollarSign className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{tab.label.split(" (")[0]}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Group 3: Production Efficiency */}
            <div>
              <div className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                නිෂ්පාදන කාර්යක්ෂමතාව (OEE)
              </div>
              <div className="space-y-1">
                {reportTabs.filter(t => t.category === "Efficiency").map(tab => (
                  <Link
                    key={tab.id}
                    href={`/reports?view=${tab.id}`}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl transition-all duration-200",
                      view === tab.id
                        ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-extrabold"
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-350 dark:hover:text-white hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                    )}
                  >
                    <Factory className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{tab.label.split(" (")[0]}</span>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right Content Block */}
        <div className="lg:col-span-3">
          
          {/* 1. OUTLET SUMMARY VIEW */}
          {view === "outlet-summary" && (
            <div className="space-y-6 animate-fade-in">
              <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6">
                <CardHeader className="p-0 pb-6 border-b border-slate-100 dark:border-slate-800/85">
                  <CardTitle className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-500" />
                    අලෙවිසැල් විකුණුම් සාරාංශය (Summary Overview)
                  </CardTitle>
                  <CardDescription className="text-xs">
                    ශ්‍රී ලංකාවේ ප්‍රධාන සිල්ලර සහ සුපිරි වෙළඳසැල් ජාල සඳහා නිමි භාණ්ඩ බෙදාහැරීම් සාරාංශය.
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="p-0 pt-6 space-y-6">
                  {/* High Fidelity Visual SVG Ring Metrics */}
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-855 text-center flex flex-col items-center">
                      <div className="relative w-24 h-24 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <path className="text-slate-200 dark:text-slate-800" strokeWidth="2.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          <path className="text-indigo-550 dark:text-indigo-400" strokeDasharray="58, 100" strokeWidth="2.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                        <span className="absolute text-sm font-black text-slate-900 dark:text-white">58%</span>
                      </div>
                      <h4 className="font-bold text-xs mt-3 text-slate-800 dark:text-slate-200">කාර්ගිල්ස් ෆුඩ් සිටි (Cargills)</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">ප්‍රධාන බෙදාහැරීම් දායකත්වය</p>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-855 text-center flex flex-col items-center">
                      <div className="relative w-24 h-24 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <path className="text-slate-200 dark:text-slate-800" strokeWidth="2.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          <path className="text-violet-550 dark:text-violet-400" strokeDasharray="30, 100" strokeWidth="2.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                        <span className="absolute text-sm font-black text-slate-900 dark:text-white">30%</span>
                      </div>
                      <h4 className="font-bold text-xs mt-3 text-slate-800 dark:text-slate-200">කීල්ස් සුපර් (Keells Super)</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">කොළඹ/ගම්පහ නාගරික අලෙවිය</p>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-855 text-center flex flex-col items-center">
                      <div className="relative w-24 h-24 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <path className="text-slate-200 dark:text-slate-800" strokeWidth="2.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          <path className="text-emerald-550 dark:text-emerald-400" strokeDasharray="12, 100" strokeWidth="2.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                        <span className="absolute text-sm font-black text-slate-900 dark:text-white">12%</span>
                      </div>
                      <h4 className="font-bold text-xs mt-3 text-slate-800 dark:text-slate-200">ලංකා සතොස සහ සිල්ලර (Other)</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">ප්‍රාදේශීය සිල්ලර කඩ සහ සමුපකාර</p>
                    </div>
                  </div>

                  <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-2xl border border-indigo-100/60 dark:border-indigo-900/30 flex gap-2 text-xs text-indigo-900 dark:text-indigo-300">
                    <Info className="w-4 h-4 text-indigo-550 flex-shrink-0 mt-0.5" />
                    <span>
                      බෙදාහැරීමේ වාර්තා මඟින් කාර්ගිල්ස් ෆුඩ් සිටි ජාලය අපගේ විශාලතම ගැනුම්කරු ලෙස පෙන්නුම් කරන අතර, සෝයාමීට් පැකට් සහ පොල්තෙල් බෝතල් සඳහා වැඩිම ඉල්ලුමක් එහි පවතී.
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* 2. OUTLET SALES LEDGER VIEW */}
          {view === "outlet-sales" && (
            <div className="space-y-6 animate-fade-in">
              <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
                <CardHeader className="border-b border-slate-100 dark:border-slate-800/80 p-6">
                  <CardTitle className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-indigo-500" />
                    සිල්ලර අලෙවිසැල් විකුණුම් වාර්තාව (Sales by Shop Outlet)
                  </CardTitle>
                  <CardDescription className="text-xs">
                    එක් එක් අලෙවිසැල මට්ටමින් සපයන ලද ඇනවුම් ප්‍රමාණය සහ මුළු උපයාගත් ආදායම.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
                          <th className="py-3 px-6">අලෙවිසැල් ස්ථානය (Outlet)</th>
                          <th className="py-3 px-6">සැපයූ ඇනවුම් ප්‍රමාණය</th>
                          <th className="py-3 px-6">සාමාන්‍ය ඇනවුම් වටිනාකම</th>
                          <th className="py-3 px-6">මුළු විකුණුම් වටිනාකම</th>
                          <th className="py-3 px-6 text-right">අයිතම මට්ටම</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-sm">
                        <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                          <td className="py-4 px-6 font-bold flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                            Cargills Food City - Colombo 03
                          </td>
                          <td className="py-4 px-6 font-semibold">ඇනවුම් 14 ක්</td>
                          <td className="py-4 px-6 text-slate-500">Rs. 32,000.00</td>
                          <td className="py-4 px-6 font-extrabold text-indigo-600 dark:text-indigo-400">Rs. 448,000.00</td>
                          <td className="py-4 px-6 text-right">
                            <span className="text-[10px] bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-450 border border-emerald-100 dark:border-emerald-900/40 rounded-xl px-2 py-0.5 font-bold">
                              ඉතා ඉහළයි (High)
                            </span>
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                          <td className="py-4 px-6 font-bold flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                            Keells Super - Negombo
                          </td>
                          <td className="py-4 px-6 font-semibold">ඇනවුම් 8 ක්</td>
                          <td className="py-4 px-6 text-slate-500">Rs. 41,000.00</td>
                          <td className="py-4 px-6 font-extrabold text-indigo-600 dark:text-indigo-400">Rs. 328,000.00</td>
                          <td className="py-4 px-6 text-right">
                            <span className="text-[10px] bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-455 border border-emerald-100 dark:border-emerald-900/40 rounded-xl px-2 py-0.5 font-bold">
                              ඉහළයි (Medium-High)
                            </span>
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                          <td className="py-4 px-6 font-bold flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                            Lanka Sathosa - Galle
                          </td>
                          <td className="py-4 px-6 font-semibold">ඇනවුම් 18 ක්</td>
                          <td className="py-4 px-6 text-slate-500">Rs. 12,000.00</td>
                          <td className="py-4 px-6 font-extrabold text-indigo-600 dark:text-indigo-400">Rs. 216,000.00</td>
                          <td className="py-4 px-6 text-right">
                            <span className="text-[10px] bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-xl px-2 py-0.5 font-bold">
                              සාමාන්‍යයි (Stable)
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* 3. REGIONAL PERFORMANCE VIEW */}
          {view === "outlet-regional" && (
            <div className="space-y-6 animate-fade-in">
              <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6">
                <CardHeader className="p-0 pb-6 border-b border-slate-100 dark:border-slate-800/85">
                  <CardTitle className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-indigo-500" />
                    ප්‍රාදේශීය විකුණුම් කාර්යසාධනය (Regional Sales Distribution)
                  </CardTitle>
                  <CardDescription className="text-xs">
                    ශ්‍රී ලංකාවේ පළාත් මට්ටමින් බෙදාහැරීම් ප්‍රගතිය සහ විකුණුම් ප්‍රතිශතයන්.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 pt-6 space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Progress indicators for Provinces */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1.5 text-slate-650">
                          <span>බස්නාහිර පළාත (Western Province - Colombo, Gampaha)</span>
                          <span>68%</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                          <div className="bg-indigo-650 h-full rounded-full" style={{ width: "68%" }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1.5 text-slate-650">
                          <span>දකුණු පළාත (Southern Province - Galle, Matara)</span>
                          <span>18%</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                          <div className="bg-violet-600 h-full rounded-full" style={{ width: "18%" }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1.5 text-slate-650">
                          <span>මධ්‍යම පළාත (Central Province - Kandy)</span>
                          <span>14%</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                          <div className="bg-sky-500 h-full rounded-full" style={{ width: "14%" }} />
                        </div>
                      </div>
                    </div>

                    {/* Regional details card */}
                    <div className="p-4 bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-855 text-xs space-y-3">
                      <div className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                        ප්‍රාදේශීය විකුණුම් විශ්ලේෂණය
                      </div>
                      <p className="text-slate-500 leading-relaxed font-semibold">
                        අපගේ ප්‍රධාන බෙදාහැරීම් ජාලය කොළඹ, ගම්පහ සහ කළුතර යන දිස්ත්‍රික්කවල (Western province) බහුලව ස්ථාපනය වී ඇති අතර සමස්ත ආදායමෙන් 68% ක් උපයන්නේ එම ප්‍රදේශයෙනි.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* 4. FINANCIAL COST ANALYSIS */}
          {view === "fin-cost" && (
            <div className="space-y-6 animate-fade-in">
              <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6">
                <CardHeader className="p-0 pb-6 border-b border-slate-100 dark:border-slate-800/85">
                  <CardTitle className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <CircleDollarSign className="w-5 h-5 text-indigo-500" />
                    නිෂ්පාදන පිරිවැය විශ්ලේෂණය (Manufacturing Cost Structure)
                  </CardTitle>
                  <CardDescription className="text-xs">
                    අමුද්‍රව්‍ය මිලදී ගැනීම්, කර්මාන්තශාලා මෙහෙයුම් වියදම් සහ විදුලි බිල්පත් පිරිවැය ප්‍රමුඛතාව.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 pt-6 space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Cost allocation list */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1.5 text-slate-650">
                          <span>අමුද්‍රව්‍ය මිලදී ගැනීම (Raw Materials)</span>
                          <span>70% (Rs. 392,000)</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                          <div className="bg-amber-500 h-full rounded-full" style={{ width: "70%" }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1.5 text-slate-650">
                          <span>විදුලි බිල සහ උපයෝගිතා (Electricity & Utilities)</span>
                          <span>15% (Rs. 84,000)</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                          <div className="bg-indigo-600 h-full rounded-full" style={{ width: "15%" }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1.5 text-slate-650">
                          <span>යන්ත්‍රෝපකරණ නඩත්තුව (Maintenance & QC)</span>
                          <span>10% (Rs. 56,000)</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: "10%" }} />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-855 text-xs space-y-3">
                      <div className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <TrendingDown className="w-4 h-4 text-amber-500" />
                        පිරිවැය අවම කිරීමේ ඉඟි
                      </div>
                      <p className="text-slate-500 leading-relaxed font-semibold">
                        අමුද්‍රව්‍ය මිලදී ගැනීම් සඳහා වැඩිම වියදමක් (70%) වැය වන අතර, සැපයුම්කරුවන් සමඟ දිගුකාලීන ගිවිසුම්වලට එළඹීමෙන් සහ එකවර වැඩි ප්‍රමාණයක් මිලදී ගැනීමෙන් (bulk procurement) පිරිවැය 5% කින් පමණ අඩු කර ගත හැක.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* 5. FINANCIAL CASH FLOW VIEW */}
          {view === "fin-cashflow" && (
            <div className="space-y-6 animate-fade-in">
              <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6">
                <CardHeader className="p-0 pb-6 border-b border-slate-100 dark:border-slate-800/85">
                  <CardTitle className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <CircleDollarSign className="w-5 h-5 text-indigo-500" />
                    මුදල් ප්‍රවාහ ප්‍රකාශනය (Cash Flow Statement)
                  </CardTitle>
                  <CardDescription className="text-xs">
                    ලැබුණු විකුණුම් ආදායම් මුදල් සහ ගෙවන ලද මෙහෙයුම් වියදම්වල ශුද්ධ එකතුව.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 pt-6 space-y-6">
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="p-4 bg-emerald-500/[0.03] dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">මුළු මුදල් ලැබීම් (Cash Inflows)</span>
                      <div className="text-2xl font-black text-emerald-650 dark:text-emerald-400 mt-1">Rs. 1,450,200.00</div>
                      <span className="text-[9px] text-slate-400 mt-1 block">විකුණුම් ඉන්වොයිස් ලැබීම් එකතුව</span>
                    </div>

                    <div className="p-4 bg-rose-500/[0.03] dark:bg-rose-950/20 rounded-2xl border border-rose-100 dark:border-rose-900/30">
                      <span className="text-[10px] font-bold text-rose-600 dark:text-rose-455 uppercase tracking-wider">මුළු මුදල් ගෙවීම් (Cash Outflows)</span>
                      <div className="text-2xl font-black text-rose-650 dark:text-rose-455 mt-1">Rs. 560,000.00</div>
                      <span className="text-[9px] text-slate-400 mt-1 block">අමුද්‍රව්‍ය, විදුලි හා මෙහෙයුම් වියදම්</span>
                    </div>

                    <div className="p-4 bg-indigo-500/[0.03] dark:bg-indigo-950/20 rounded-2xl border border-indigo-100 dark:border-indigo-900/30">
                      <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">ශුද්ධ මුදල් ප්‍රවාහය (Net Profit)</span>
                      <div className="text-2xl font-black text-indigo-650 dark:text-indigo-400 mt-1">Rs. 890,200.00</div>
                      <span className="text-[9px] text-slate-400 mt-1 block font-bold text-emerald-600">ධනාත්මක ශේෂය (Surplus)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* 6. PRODUCTION EFFICIENCY RUNTIME */}
          {view === "eff-runtime" && (
            <div className="space-y-6 animate-fade-in">
              <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6">
                <CardHeader className="p-0 pb-6 border-b border-slate-100 dark:border-slate-800/85">
                  <CardTitle className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Factory className="w-5 h-5 text-indigo-500" />
                    මැෂින් ක්‍රියාකාරී කාලය (Machine Runtime & OEE)
                  </CardTitle>
                  <CardDescription className="text-xs">
                    කර්මාන්තශාලාවේ ඇති ප්‍රධාන යන්ත්‍ර 3 ක ක්‍රියාකාරී කාලය සහ OEE ප්‍රතිශතය.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 pt-6">
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-855 text-center">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">සෝයා පිටි යන්ත්‍රය (Extruder #1)</span>
                      <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1.5 block">පැය 22.5 / දින</span>
                      <p className="text-[10px] text-slate-500 mt-1">OEE මට්ටම: 94.5% (ඉතා විශිෂ්ටයි)</p>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-855 text-center">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">පොල්තෙල් මිරිකන යන්ත්‍රය (Oil Press #2)</span>
                      <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1.5 block">පැය 18.2 / දින</span>
                      <p className="text-[10px] text-slate-500 mt-1">OEE මට්ටම: 88.2% (ස්ථායී මට්ටම)</p>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-855 text-center">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">වී තලන යන්ත්‍රය (Rice Miller #3)</span>
                      <span className="text-2xl font-black text-amber-600 dark:text-amber-500 mt-1.5 block">පැය 14.5 / දින</span>
                      <p className="text-[10px] text-slate-500 mt-1">OEE මට්ටම: 72.4% (නඩත්තු ඇනවුම් පවතී)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* 7. PRODUCTION EFFICIENCY DEFECT RATE */}
          {view === "eff-defect" && (
            <div className="space-y-6 animate-fade-in">
              <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6">
                <CardHeader className="p-0 pb-6 border-b border-slate-100 dark:border-slate-800/85">
                  <CardTitle className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Percent className="w-5 h-5 text-indigo-500" />
                    නිෂ්පාදන දෝෂ අනුපාතය (Quality Control Defect Rate)
                  </CardTitle>
                  <CardDescription className="text-xs">
                    නිමි භාණ්ඩ ඇසුරුම් කිරීමේදී තත්ත්ව පාලන අංශයෙන් වාර්තා වන දෝෂ අනුපාත දළ විශ්ලේෂණය.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 pt-6 space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3.5 bg-emerald-500/[0.02] dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-900/30 text-xs">
                        <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          සෝයාමීට් පැකට් (Soyameet)
                        </div>
                        <span className="font-extrabold text-emerald-650 dark:text-emerald-400">0.45% දෝෂ අනුපාතය</span>
                      </div>
                      <div className="flex items-center justify-between p-3.5 bg-emerald-500/[0.02] dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-900/30 text-xs">
                        <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          පොල්තෙල් බෝතල් (Coconut Oil)
                        </div>
                        <span className="font-extrabold text-emerald-650 dark:text-emerald-400">0.25% දෝෂ අනුපාතය</span>
                      </div>
                      <div className="flex items-center justify-between p-3.5 bg-amber-500/[0.02] dark:bg-amber-950/20 rounded-xl border border-amber-100 dark:border-amber-900/30 text-xs">
                        <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
                          <AlertCircle className="w-4 h-4 text-amber-500" />
                          සම්බා සහල් මලු (Samba Rice)
                        </div>
                        <span className="font-extrabold text-amber-600 dark:text-amber-400">1.25% දෝෂ අනුපාතය</span>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-855 text-xs space-y-3">
                      <div className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        තත්ත්ව පාලන ප්‍රමිතීන්
                      </div>
                      <p className="text-slate-500 leading-relaxed font-semibold">
                        අපගේ ඉලක්කය වන්නේ සමස්ත නිෂ්පාදන දෝෂ අනුපාතය 1% ට වඩා අඩුවෙන් පවත්වා ගැනීමයි. දැනට සම්බා සහල් මලුවල ඇසුරුම් කිරීමේදී ඇති වන දූවිලි තත්ත්වයන් නිසා 1.25% ක දෝෂ අනුපාතයක් වාර්තා වන අතර එය හෙට දිනයේදී යාවත්කාලීන කිරීමට නියමිතයි.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

        </div>

      </div>

    </div>
  )
}
