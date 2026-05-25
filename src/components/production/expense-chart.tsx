"use client"

import React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"

interface ExpenseChartProps {
  data: {
    month: string
    utility: number
    maintenance: number
  }[]
}

interface TooltipPayloadItem {
  name: string
  value: number
  payload: Record<string, unknown>
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayloadItem[]
  label?: string
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const utilityValue = payload[0]?.value ?? 0
    const maintenanceValue = payload[1]?.value ?? 0
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-xl shadow-lg text-xs">
        <p className="font-bold text-slate-800 dark:text-slate-200 mb-1.5">{label}</p>
        <div className="space-y-1">
          <p className="flex justify-between items-center gap-6">
            <span className="text-amber-500 font-medium">විදුලි/ජල බිල (Utility):</span>
            <span className="font-bold text-slate-900 dark:text-white">
              Rs. {Number(utilityValue).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </p>
          <p className="flex justify-between items-center gap-6">
            <span className="text-indigo-500 font-medium">නඩත්තු පිරිවැය (Maintenance):</span>
            <span className="font-bold text-slate-900 dark:text-white">
              Rs. {Number(maintenanceValue).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </p>
          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800/80 mt-1 flex justify-between items-center gap-6 text-[10px] font-bold text-slate-400">
            <span>එකතුව (Total):</span>
            <span>
              Rs. {(Number(utilityValue) + Number(maintenanceValue)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default function ExpenseChart({ data }: ExpenseChartProps) {
  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -10,
            bottom: 5,
          }}
          barGap={4}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="oklch(0.922 0 0 / 50%)"
            className="dark:stroke-slate-800/50"
          />
          <XAxis
            dataKey="month"
            stroke="#94a3b8"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            dy={8}
          />
          <YAxis
            stroke="#94a3b8"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            dx={-8}
            tickFormatter={(value) => `Rs.${value}`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(148, 163, 184, 0.05)", radius: 8 }} />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: "11px", fontWeight: "600", color: "#64748b" }}
          />
          <Bar
            name="විදුලි සහ ජල බිල (Utility)"
            dataKey="utility"
            fill="url(#utilityGrad)"
            radius={[4, 4, 0, 0]}
            maxBarSize={32}
          />
          <Bar
            name="යන්ත්‍ර නඩත්තු (Maintenance)"
            dataKey="maintenance"
            fill="url(#maintenanceGrad)"
            radius={[4, 4, 0, 0]}
            maxBarSize={32}
          />
          {/* Gradients definitions */}
          <defs>
            <linearGradient id="utilityGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.4} />
            </linearGradient>
            <linearGradient id="maintenanceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.4} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
