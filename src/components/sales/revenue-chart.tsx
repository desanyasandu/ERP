"use client"

import React from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"

interface RevenueChartProps {
  data: {
    date: string
    grocery: number
    foodcity: number
  }[]
}

interface TooltipPayloadItem {
  name: string
  value: number
  stroke?: string
  payload: Record<string, unknown>
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayloadItem[]
  label?: string
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const groceryVal = payload.find(p => p.name.toLowerCase().includes("grocery") || p.name.includes("කඩ"))?.value ?? 0
    const foodcityVal = payload.find(p => p.name.toLowerCase().includes("food") || p.name.includes("සිටි"))?.value ?? 0
    const totalVal = groceryVal + foodcityVal

    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-xl shadow-lg text-xs min-w-[220px]">
        <p className="font-bold text-slate-800 dark:text-slate-200 mb-1.5">{label}</p>
        <div className="space-y-1.5">
          <p className="flex justify-between items-center gap-4">
            <span className="text-violet-500 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-violet-500" />
              බඩු කඩ ආදායම (Grocery):
            </span>
            <span className="font-bold text-slate-900 dark:text-white">
              Rs. {Number(groceryVal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </p>
          <p className="flex justify-between items-center gap-4">
            <span className="text-sky-500 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              ෆුඩ් සිටි (Food City):
            </span>
            <span className="font-bold text-slate-900 dark:text-white">
              Rs. {Number(foodcityVal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </p>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 mt-1.5 flex justify-between items-center gap-4 text-xs font-extrabold text-slate-500 dark:text-slate-400">
            <span>දෛනික එකතුව (Total):</span>
            <span>
              Rs. {totalVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 15,
            left: -10,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="oklch(0.922 0 0 / 50%)"
            className="dark:stroke-slate-800/50"
          />
          <XAxis
            dataKey="date"
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
            tickFormatter={(value) => `Rs.${Number(value).toLocaleString(undefined, { notation: "compact" })}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: "11px", fontWeight: "600", color: "#64748b" }}
          />
          <Line
            name="බඩු කඩ විකුණුම් ආදායම (Grocery Chain)"
            type="monotone"
            dataKey="grocery"
            stroke="#8b5cf6"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 1 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          <Line
            name="ෆුඩ් සිටි විකුණුම් ආදායම (Food City)"
            type="monotone"
            dataKey="foodcity"
            stroke="#0ea5e9"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 1 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
