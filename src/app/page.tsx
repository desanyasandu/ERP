import React from "react"
import { Calendar, Sparkles } from "lucide-react"
import { prisma } from "@/lib/prisma"
import DashboardClient from "@/components/dashboard/dashboard-client"

export const revalidate = 0 // Disable cache to get fresh database metrics

export default async function Home() {
  // 1. Fetch current database metrics in real-time
  
  // Aggregate raw material stock levels
  const rawMaterialStockAgg = await prisma.rawMaterial.aggregate({
    _sum: {
      stock: true
    }
  })
  const rawMaterialStock = rawMaterialStockAgg._sum.stock ?? 0
  const rawMaterialsCount = await prisma.rawMaterial.count()

  // Aggregate finished goods stock levels
  const finishedGoodStockAgg = await prisma.finishedGood.aggregate({
    _sum: {
      stock: true
    }
  })
  const finishedGoodStock = finishedGoodStockAgg._sum.stock ?? 0
  const finishedGoodsCount = await prisma.finishedGood.count()

  // Combined stock level metric
  const stockLevels = Math.round(rawMaterialStock + finishedGoodStock)

  // Count active dispatches currently in transit
  const activeVehicles = await prisma.lorryInventory.count({
    where: {
      status: "In_Transit"
    }
  })

  // Format today's date for header in Sinhala
  const d = new Date()
  const days = ["ඉරිදා (Sunday)", "සඳුදා (Monday)", "අඟහරුවාදා (Tuesday)", "බදාදා (Wednesday)", "බ්‍රහස්පතින්දා (Thursday)", "සිකුරාදා (Friday)", "සෙනසුරාදා (Saturday)"]
  const months = ["ජනවාරි (January)", "පෙබරවාරි (February)", "මාර්තු (March)", "අප්‍රේල් (April)", "මැයි (May)", "ජූනි (June)", "ජූලි (July)", "අගෝස්තු (August)", "සැප්තැම්බර් (September)", "ඔක්තෝබර් (October)", "නොවැම්බර් (November)", "දෙසැම්බර් (December)"]
  const currentDate = `අද ${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`

  // Prepare initial metrics feed
  const initialMetrics = {
    totalSales: 482900, // Infographic Target total sales metric
    activeVehicles,
    stockLevels: stockLevels > 0 ? stockLevels : 18450, // Default fallback if seed is absent
    rawMaterialsCount,
    finishedGoodsCount
  }

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-650 dark:text-indigo-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
            TheERP කර්මාන්තශාලා කළමනාකරණ පද්ධතිය (Factory Control Center)
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
            සාදරයෙන් පිළිගනිමු, Mr. Admin
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-455" />
            {currentDate}
          </p>
        </div>
      </div>

      {/* Render Client dashboard containing interactive search filters and Recharts infographics */}
      <DashboardClient initialMetrics={initialMetrics} />

    </div>
  )
}
