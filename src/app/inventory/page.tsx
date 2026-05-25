import React from "react"
import Link from "next/link"
import {
  Boxes,
  ArrowLeft,
  Truck,
  Package,
  Calendar,
  RotateCcw,
  CheckCircle,
  FileSpreadsheet,
  Layers,
  Activity
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { prisma } from "@/lib/prisma"
import LorryModals from "@/components/inventory/lorry-modals"
import { cn } from "@/lib/utils"

export const revalidate = 0 // Disable Next static page caching to get fresh DB records on refresh

export default async function InventoryPage({ searchParams }: { searchParams?: { view?: string } }) {
  const view = searchParams?.view || "goods"

  // 1. Fetch FinishedGoods from DB
  const finishedGoods = await prisma.finishedGood.findMany({
    orderBy: {
      batchNumber: "asc"
    }
  })

  // Fetch Raw Materials for the Materials view
  const rawMaterials = await prisma.rawMaterial.findMany({
    orderBy: {
      name: "asc"
    }
  })

  // 2. Fetch LorryInventory logs from DB
  const lorryLogs = await prisma.lorryInventory.findMany({
    orderBy: {
      createdAt: "desc"
    }
  })

  // Group Finished Goods for selection in modals (only pick what is needed for types)
  const fgSelectionList = finishedGoods.map((fg) => ({
    id: fg.id,
    batchNumber: fg.batchNumber,
    stock: fg.stock
  }))

  // Filter in-transit lorry dispatches for selection in Unload returns modal
  const inTransitLorriesList = lorryLogs
    .filter((l) => l.status === "In_Transit")
    .map((l) => ({
      id: l.id,
      lorryId: l.lorryId,
      items: l.items
    }))

  // Calculate quick KPI aggregates
  const totalFinishedGoodsStock = finishedGoods.reduce((sum, item) => sum + item.stock, 0)
  const activeDispatchesCount = lorryLogs.filter((l) => l.status === "In_Transit").length
  
  // Count total units in transit
  let totalUnitsInTransit = 0
  lorryLogs
    .filter((l) => l.status === "In_Transit")
    .forEach((l) => {
      try {
        const parsed = JSON.parse(l.items) as { qty: number }[]
        parsed.forEach((p) => {
          totalUnitsInTransit += p.qty
        })
      } catch {
        // Ignored
      }
    })

  return (
    <div className="space-y-8">
      
      {/* Top Title and Modal Trigger Buttons */}
      <div className="flex flex-col gap-2 animate-fade-in">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-indigo-650 dark:text-indigo-400 hover:underline font-semibold">
          <ArrowLeft className="w-3.5 h-3.5" />
          ආපසු කළමනාකරණ පුවරුවට (Dashboard)
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
              <Boxes className="w-5.5 h-5.5" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                තොග කළමනාකරණය සහ ප්‍රවාහන අංශය (Inventory & Logistics)
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ගබඩාවේ පවතින නිමි භාණ්ඩ තොග මට්ටම් සහ ප්‍රවාහන ලොරි රථ පිටත් කිරීම් මෙතැනින් කළමනාකරණය කරන්න.
              </p>
            </div>
          </div>
          
          {/* Lorry Load/Unload Dialog Form Modals */}
          <LorryModals 
            finishedGoods={fgSelectionList} 
            inTransitLorries={inTransitLorriesList} 
          />
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        
        {/* Total Warehouse Stock */}
        <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden relative transition-all duration-300 hover:shadow-md">
          <div className="absolute top-0 left-0 h-1.5 w-full bg-amber-500" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div>
              <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-455 dark:text-slate-500">
                නිමි භාණ්ඩ ගබඩා තොගය (Warehouse Finished Stock)
              </CardDescription>
              <CardTitle className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                {totalFinishedGoodsStock.toLocaleString()} ඒකක (Units)
              </CardTitle>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400">
              <Layers className="w-6 h-6" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              නිමි නිෂ්පාදන කාණ්ඩ {finishedGoods.length}ක් සඳහා සක්‍රීය තොග පවතී
            </p>
          </CardContent>
        </Card>

        {/* Lorry fleet Dispatches */}
        <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden relative transition-all duration-300 hover:shadow-md">
          <div className="absolute top-0 left-0 h-1.5 w-full bg-indigo-500" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div>
              <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-455 dark:text-slate-500">
                ධාවනයේ යෙදෙන ලොරි රථ (Active Fleet Dispatches)
              </CardDescription>
              <CardTitle className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                ලොරි රථ {activeDispatchesCount} ක්
              </CardTitle>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400">
              <Truck className="w-6 h-6" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-slate-550 dark:text-slate-400 font-semibold flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-indigo-500" />
              භාණ්ඩ ඒකක {totalUnitsInTransit.toLocaleString()} ක් මේ වන විට ප්‍රවාහනය කෙරේ
            </p>
          </CardContent>
        </Card>

        {/* Audit Status */}
        <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden relative transition-all duration-300 hover:shadow-md">
          <div className="absolute top-0 left-0 h-1.5 w-full bg-emerald-500" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div>
              <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-455 dark:text-slate-500">
                පද්ධති සම්බන්ධතා තත්ත්වය (Logistical Status)
              </CardDescription>
              <CardTitle className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                සක්‍රීයයි (Synced)
              </CardTitle>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
              <CheckCircle className="w-6 h-6" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1.5">
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" />
              SQLite දත්ත ගබඩාව සාර්ථකව සම්බන්ධ වී ඇත
            </p>
          </CardContent>
        </Card>

      </div>

      {/* Dynamic Tab Switcher */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-1.5 pt-2">
        <Link
          href="/inventory?view=goods"
          className={cn(
            "pb-3.5 text-xs font-bold border-b-2 px-4 transition-all duration-200",
            view === "goods"
              ? "border-amber-500 text-amber-600 dark:text-amber-400 font-extrabold"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
          )}
        >
          නිමි භාණ්ඩ ලෙජරය (Goods Stock)
        </Link>
        <Link
          href="/inventory?view=materials"
          className={cn(
            "pb-3.5 text-xs font-bold border-b-2 px-4 transition-all duration-200",
            view === "materials"
              ? "border-amber-500 text-amber-600 dark:text-amber-400 font-extrabold"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
          )}
        >
          අමුද්‍රව්‍ය ලැයිස්තුව (Materials Stock)
        </Link>
        <Link
          href="/inventory?view=lorries"
          className={cn(
            "pb-3.5 text-xs font-bold border-b-2 px-4 transition-all duration-200",
            view === "lorries"
              ? "border-amber-500 text-amber-600 dark:text-amber-400 font-extrabold"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
          )}
        >
          ප්‍රවාහන මෙහෙයුම් ලොග් (Lorry Operations)
        </Link>
      </div>

      {/* Conditional views render */}
      {view === "goods" && (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Finished Goods Data Grid */}
          <Card className="lg:col-span-2 rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
            <CardHeader className="border-b border-slate-100 dark:border-slate-800/80 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-base font-bold text-slate-900 dark:text-white">නිමි භාණ්ඩ ගබඩා තොගය (Finished Goods)</CardTitle>
                <CardDescription className="text-xs">
                  කර්මාන්තශාලාවෙන් නිම කර ප්‍රධාන ගබඩාවේ ගබඩා කර ඇති නිෂ්පාදන කාණ්ඩ තොරතුරු.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
                      <th className="py-3 px-6">නිෂ්පාදන කාණ්ඩ කේතය (Batch ID)</th>
                      <th className="py-3 px-6">තොගයේ ඇති ප්‍රමාණය (Available Stock)</th>
                      <th className="py-3 px-6">නිෂ්පාදිත දිනය (Mfg Date)</th>
                      <th className="py-3 px-6">කල් ඉකුත් වන දිනය (Expiry Date)</th>
                      <th className="py-3 px-6 text-right">තත්ත්වය (Status)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-sm">
                    {finishedGoods.map((item) => {
                      const mfg = new Date(item.mfgDate)
                      const exp = new Date(item.expDate)

                      return (
                        <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                          <td className="py-4 px-6 font-bold text-slate-850 dark:text-slate-200">
                            <span className="inline-flex items-center gap-2">
                              <Package className="w-4 h-4 text-amber-500" />
                              {item.batchNumber}
                            </span>
                          </td>
                          <td className="py-4 px-6 font-semibold">
                            {item.stock.toLocaleString()} ඒකක (Units)
                          </td>
                          <td className="py-4 px-6 text-slate-500 dark:text-slate-400">
                            {mfg.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                          </td>
                          <td className="py-4 px-6 text-slate-500 dark:text-slate-400">
                            {exp.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                          </td>
                          <td className="py-4 px-6 text-right">
                            {item.stock > 0 ? (
                              <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-455 hover:bg-emerald-50/80 border border-emerald-100 dark:border-emerald-900/40 rounded-xl px-2.5 py-0.5 text-[10px] font-bold shadow-none">
                                ගබඩාවේ ඇත (In_Warehouse)
                              </Badge>
                            ) : (
                              <Badge className="bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-100/80 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-0.5 text-[10px] font-bold shadow-none">
                                තොග අවසන් (Out_of_Stock)
                              </Badge>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                    {finishedGoods.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-450">
                          නිමි නිෂ්පාදන කිසිවක් ගබඩා කර නොමැත.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Quick stock balance summary */}
          <Card className="lg:col-span-1 rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Boxes className="w-5 h-5 text-amber-500" />
                තොග ශේෂ සාරාංශය (Warehouse Balance)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ගබඩාවේ ඇති සියලුම නිමි භාණ්ඩ වර්ග සාරාංශගත දළ විශ්ලේෂණය මෙතැනින් පරීක්ෂා කරන්න.
              </p>
              
              <div className="space-y-3.5 pt-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-650 dark:text-slate-405 font-bold">සෝයාමීට් පැකට් (Soyameet)</span>
                  <span className="font-extrabold text-slate-900 dark:text-white">~14,500u</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-650 dark:text-slate-405 font-bold">පොල්තෙල් බෝතල් (Coconut Oil)</span>
                  <span className="font-extrabold text-slate-900 dark:text-white">~8,400u</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-650 dark:text-slate-405 font-bold">සම්බා සහල් මලු (Samba Rice)</span>
                  <span className="font-extrabold text-slate-900 dark:text-white">~6,800u</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-650 dark:text-slate-405 font-bold">පරිප්පු පැකට් (Dhal Packets)</span>
                  <span className="font-extrabold text-slate-900 dark:text-white">~11,200u</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-amber-50/50 dark:bg-amber-950/20 rounded-2xl border border-amber-100/60 dark:border-amber-900/30 text-[10px] text-amber-800 dark:text-amber-400 font-semibold leading-relaxed mt-4">
              * සියලුම නිමි භාණ්ඩ ධාරිතාවයන් ශ්‍රී ලංකා ප්‍රමිති කාර්යාංශයේ (SLSI) නියමයන්ට අනුකූලව පරීක්ෂා කර ඇත.
            </div>
          </Card>
        </div>
      )}

      {view === "materials" && (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Raw Materials Table */}
          <Card className="lg:col-span-2 rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
            <CardHeader className="border-b border-slate-100 dark:border-slate-800/80 p-6">
              <CardTitle className="text-base font-bold text-slate-900 dark:text-white">අමුද්‍රව්‍ය තොග ලැයිස්තුව (Raw Materials Stock)</CardTitle>
              <CardDescription className="text-xs">
                කර්මාන්තශාලාවේ නිෂ්පාදන මෙහෙයුම් සඳහා සපයා ඇති සක්‍රීය අමුද්‍රව්‍ය තොග ප්‍රමාණයන්.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
                      <th className="py-3 px-6">අමුද්‍රව්‍ය කේතය</th>
                      <th className="py-3 px-6">අමුද්‍රව්‍ය නාමය (Designation)</th>
                      <th className="py-3 px-6">පවතින ප්‍රමාණය (Current Stock)</th>
                      <th className="py-3 px-6">කල් ඉකුත් වන දිනය</th>
                      <th className="py-3 px-6 text-right">තත්ත්වය</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-sm">
                    {rawMaterials.map((material) => {
                      const expiry = new Date(material.expiryDate)
                      
                      return (
                        <tr key={material.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                          <td className="py-4 px-6 font-semibold text-slate-500 dark:text-slate-400">
                            #{material.id.slice(-6).toUpperCase()}
                          </td>
                          <td className="py-4 px-6 font-bold">{material.name}</td>
                          <td className="py-4 px-6 font-semibold">
                            {material.stock.toLocaleString()} kg
                          </td>
                          <td className="py-4 px-6 text-slate-500 dark:text-slate-400">
                            {expiry.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                          </td>
                          <td className="py-4 px-6 text-right">
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-900/40">
                              සක්‍රීයයි (Stable)
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Quick raw materials procurement details */}
          <Card className="lg:col-span-1 rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Boxes className="w-5 h-5 text-amber-500" />
                අමුද්‍රව්‍ය මිලදී ගැනීම් (Procurement Stats)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                පසුගිය කාර්තුව පුරා මිලදී ගත් ප්‍රධාන අමුද්‍රව්‍ය ඇනවුම් තොරතුරු.
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="p-3 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-855 text-xs">
                  <div className="font-bold text-slate-850 dark:text-slate-200">සම්බා වී (Samba Paddy Procurement)</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">ප්‍රමාණය: 25,000 kg • සැපයුම්කරු: පොළොන්නරුව සහල් නිපදවන්නෝ</div>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-855 text-xs">
                  <div className="font-bold text-slate-850 dark:text-slate-200">රතු පරිප්පු (Red Dhal Procurement)</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">ප්‍රමාණය: 12,500 kg • සැපයුම්කරු: කොළඹ තොග වෙළෙන්දෝ</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-amber-50/50 dark:bg-amber-950/20 rounded-2xl border border-amber-100/60 dark:border-amber-900/30 text-[10px] text-amber-800 dark:text-amber-400 font-semibold mt-4">
              * අමුද්‍රව්‍ය තත්ත්ව පරීක්ෂණ සහතික (Quality testing) පාලක මධ්‍යස්ථානයේ ගබඩා කර ඇත.
            </div>
          </Card>
        </div>
      )}

      {view === "lorries" && (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Lorry Operations Ledger Section */}
          <Card className="lg:col-span-2 rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden flex flex-col justify-between">
            <div>
              <CardHeader className="border-b border-slate-100 dark:border-slate-800/80 p-6">
                <CardTitle className="text-base font-bold text-slate-900 dark:text-white">ප්‍රවාහන මෙහෙයුම් ලොග් (Lorry dispatches)</CardTitle>
                <CardDescription className="text-xs">
                  බෙදාහැරීමේ ලොරි රථ ධාවන සහ නැවත පැමිණීම් සටහන්.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto divide-y divide-slate-100 dark:divide-slate-800/80">
                  {lorryLogs.map((log) => {
                    let itemsDesc = ""
                    try {
                      const parsed = JSON.parse(log.items) as { sku: string; qty: number }[]
                      itemsDesc = parsed.map((p) => `${p.sku.split(" ")[0]} (${p.qty}u)`).join(", ")
                    } catch {
                      itemsDesc = "Unknown manifest items"
                    }

                    const formattedDate = new Date(log.createdAt).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit"
                    })

                    return (
                      <div key={log.id} className="p-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-slate-850 dark:text-slate-200 text-xs flex items-center gap-1.5">
                            <Truck className={cn("w-4 h-4", log.status === "In_Transit" ? "text-amber-500" : "text-emerald-500")} />
                            {log.lorryId}
                          </span>
                          
                          {log.status === "In_Transit" ? (
                            <Badge className="bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-450 hover:bg-amber-50/80 border border-amber-100 dark:border-amber-900/40 rounded-xl px-2 py-0 text-[9px] font-bold shadow-none">
                              ධාවනයේ (Transit)
                            </Badge>
                          ) : (
                            <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-455 hover:bg-emerald-50/80 border border-emerald-100 dark:border-emerald-900/40 rounded-xl px-2 py-0 text-[9px] font-bold shadow-none">
                              නැවත පැමිණි (Returned)
                            </Badge>
                          )}
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed">
                            <span className="font-bold text-slate-450">පටවන ලද දෑ:</span> {itemsDesc}
                          </p>
                          <p className="text-[9px] text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                            <Calendar className="w-3 h-3" />
                            පිටත් වූ වේලාව: {formattedDate}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                  {lorryLogs.length === 0 && (
                    <div className="p-8 text-center text-slate-450 text-xs">
                      ධාවනය වන ලොරි රථ කිසිවක් නැත.
                    </div>
                  )}
                </div>
              </CardContent>
            </div>
            
            <div className="p-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/30 dark:bg-slate-900/30 text-center">
              <span className="text-[10px] text-slate-400 flex items-center justify-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-indigo-500" />
                ආරක්ෂිත ප්‍රවාහන සන්නිවේදනය සක්‍රීයයි
              </span>
            </div>
          </Card>

          {/* Logistics dynamic map card */}
          <Card className="lg:col-span-1 rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Truck className="w-5 h-5 text-indigo-500" />
                බෙදාහැරීම් සිතියම (GPS Track Feed)
              </h3>
              <p className="text-xs text-slate-555 dark:text-slate-400">
                ශ්‍රී ලංකාවේ ප්‍රධාන බෙදාහැරීම් මාර්ග ඔස්සේ ගමන් කරන ලොරි රථ සජීවීව ලුහුබැඳීම මෙතැනින් සිදු කළ හැක.
              </p>
              
              <div className="space-y-3 pt-2 text-xs">
                <div className="flex gap-2.5 items-start">
                  <div className="w-2.5 h-2.5 mt-1 rounded-full bg-emerald-500 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-slate-800 dark:text-slate-200">WP-TRK-748 (කමල් සිල්වා)</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">දැනට: කඩවත අධිවේගී පිවිසුම • ගමනාන්තය: ගම්පහ Food City</div>
                  </div>
                </div>
                <div className="flex gap-2.5 items-start">
                  <div className="w-2.5 h-2.5 mt-1 rounded-full bg-amber-500 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-slate-800 dark:text-slate-200">WP-TRK-105 (සුනිල් රණසිංහ)</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">දැනට: මතුගම පාර • ගමනාන්තය: කළුතර සිල්ලර කඩ සංකීර්ණය</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-2xl border border-indigo-100/60 dark:border-indigo-900/30 text-[10px] text-indigo-800 dark:text-indigo-400 font-semibold mt-4">
              * සියලුම වාහන සජීවී ජීපීඑස් සබඳතාවයෙන් යුක්ත වේ.
            </div>
          </Card>
        </div>
      )}

    </div>
  )
}

