"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Truck, RotateCcw, Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
import { loadLorryAction, unloadReturnsAction } from "@/app/inventory/actions"

interface FinishedGoodItem {
  id: string
  batchNumber: string
  stock: number
}

interface InTransitLorryItem {
  id: string
  lorryId: string
  items: string
}

interface LorryModalsProps {
  finishedGoods: FinishedGoodItem[]
  inTransitLorries: InTransitLorryItem[]
}

export default function LorryModals({ finishedGoods, inTransitLorries }: LorryModalsProps) {
  // Modal states
  const [loadOpen, setLoadOpen] = useState(false)
  const [unloadOpen, setUnloadOpen] = useState(false)

  // Loading states
  const [loading, setLoading] = useState(false)

  // Message states
  const [loadMsg, setLoadMsg] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [unloadMsg, setUnloadMsg] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Form states
  const [lorryId, setLorryId] = useState("")
  const [selectedGoodId, setSelectedGoodId] = useState("")
  const [quantity, setQuantity] = useState("")

  const [selectedLorryInvId, setSelectedLorryInvId] = useState("")

  // Submit Load Lorry
  const handleLoadLorrySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoadMsg(null)
    setLoading(true)

    const qtyNum = parseInt(quantity, 10)
    const result = await loadLorryAction(lorryId, selectedGoodId, qtyNum)

    setLoading(false)
    if (result.success) {
      setLoadMsg({ type: "success", text: "ලොරි රථය සාර්ථකව පටවා පිටත් කර හරින ලදී! (Lorry Dispatched)" })
      // Reset form
      setLorryId("")
      setSelectedGoodId("")
      setQuantity("")
      // Close dialog after 1.5s
      setTimeout(() => {
        setLoadOpen(false)
        setLoadMsg(null)
      }, 1500)
    } else {
      setLoadMsg({ type: "error", text: result.error || "ලොරි රථය පැටවීමට නොහැකි විය." })
    }
  }

  // Submit Unload Returns
  const handleUnloadReturnsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUnloadMsg(null)
    setLoading(true)

    const result = await unloadReturnsAction(selectedLorryInvId)

    setLoading(false)
    if (result.success) {
      setUnloadMsg({ type: "success", text: "ලොරි රථය නැවත පැමිණි අතර භාණ්ඩ තොගය සාර්ථකව ගබඩා කරන ලදී! (Stock Restored)" })
      setSelectedLorryInvId("")
      // Close dialog after 1.5s
      setTimeout(() => {
        setUnloadOpen(false)
        setUnloadMsg(null)
      }, 1500)
    } else {
      setUnloadMsg({ type: "error", text: result.error || "නැවත පැමිණීම් සැකසීමට නොහැකි විය." })
    }
  }

  return (
    <div className="flex items-center gap-3">
      {/* 1. Load Lorry Modal Dialog */}
      <Dialog open={loadOpen} onOpenChange={(val) => { setLoadOpen(val); setLoadMsg(null) }}>
        <DialogTrigger asChild>
          <Button className="rounded-xl bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-100 dark:shadow-none text-sm font-semibold flex items-center gap-1.5 py-5">
            <Truck className="w-4.5 h-4.5" />
            ලොරි රථය පැටවීම (Load Lorry)
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-slate-900 dark:text-white">ලොරි රථයක් පැටවීම (Load Lorry)</DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              ගබඩාවේ ඇති නිමි භාණ්ඩ තොගයෙන් ඒකක අඩු කර බෙදාහැරීමේ ලොරි රථයකට භාණ්ඩ පටවන්න.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleLoadLorrySubmit} className="space-y-4 py-4 text-sm">
            {/* Lorry ID Input */}
            <div className="space-y-1.5">
              <label htmlFor="lorryId" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                ලොරි රථ අංකය (Lorry / Truck ID)
              </label>
              <Input
                id="lorryId"
                placeholder="उदा. WP-TRK-102"
                value={lorryId}
                onChange={(e) => setLorryId(e.target.value)}
                required
                disabled={loading}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 focus-visible:ring-1 focus-visible:ring-amber-500"
              />
            </div>

            {/* Finished Good Selection */}
            <div className="space-y-1.5">
              <label htmlFor="finishedGood" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                නිමි භාණ්ඩ කාණ්ඩය තෝරන්න (Select Batch)
              </label>
              <select
                id="finishedGood"
                value={selectedGoodId}
                onChange={(e) => setSelectedGoodId(e.target.value)}
                required
                disabled={loading}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 p-2.5 dark:bg-slate-900/50 focus-visible:ring-1 focus-visible:ring-amber-500 outline-none text-slate-700 dark:text-slate-350"
              >
                <option value="" disabled>-- නිෂ්පාදන කාණ්ඩය තෝරන්න --</option>
                {finishedGoods.map((good) => (
                  <option key={good.id} value={good.id}>
                    {good.batchNumber} (තොගයේ ඇති ප්‍රමාණය: {good.stock} ඒකක)
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity Input */}
            <div className="space-y-1.5">
              <label htmlFor="quantity" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                පටවන භාණ්ඩ ප්‍රමාණය (Quantity)
              </label>
              <Input
                id="quantity"
                type="number"
                min="1"
                placeholder="उदा. 100"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                disabled={loading}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 focus-visible:ring-1 focus-visible:ring-amber-500"
              />
            </div>

            {/* Feedback Message */}
            {loadMsg && (
              <div
                className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs leading-relaxed ${
                  loadMsg.type === "success"
                    ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-400"
                    : "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40 text-rose-800 dark:text-rose-450"
                }`}
              >
                {loadMsg.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                )}
                <span>{loadMsg.text}</span>
              </div>
            )}

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setLoadOpen(false)}
                disabled={loading}
                className="rounded-xl border border-slate-200 dark:border-slate-800 text-sm"
              >
                අවලංගු කරන්න (Cancel)
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-amber-500 hover:bg-amber-600 text-white shadow-sm font-semibold flex items-center gap-1.5 text-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    පටවමින් පවතී...
                  </>
                ) : (
                  "පැටවීම තහවුරු කරන්න"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 2. Unload Returns Modal Dialog */}
      <Dialog open={unloadOpen} onOpenChange={(val) => { setUnloadOpen(val); setUnloadMsg(null) }}>
        <DialogTrigger asChild>
          <Button variant="outline" className="rounded-xl border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/80 text-sm font-semibold flex items-center gap-1.5 py-5">
            <RotateCcw className="w-4.5 h-4.5" />
            නැවත පැමිණීම් තැන්පත් කිරීම (Unload Returns)
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-slate-900 dark:text-white">නැවත පැමිණි ලොරි රථ බෑම (Unload Returns)</DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              ධාවනයේ යෙදුණු ලොරි රථයක් තෝරා, එහි ඉතිරි වූ හෝ ආපසු ආ භාණ්ඩ නැවත ගබඩා තොගයට එකතු කරන්න.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUnloadReturnsSubmit} className="space-y-4 py-4 text-sm">
            {/* Lorry dispatch Selection */}
            <div className="space-y-1.5">
              <label htmlFor="lorryInv" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                ධාවනයේ යෙදෙන ලොරි රථය තෝරන්න (Select Dispatch)
              </label>
              <select
                id="lorryInv"
                value={selectedLorryInvId}
                onChange={(e) => setSelectedLorryInvId(e.target.value)}
                required
                disabled={loading}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 p-2.5 dark:bg-slate-900/50 focus-visible:ring-1 focus-visible:ring-indigo-500 outline-none text-slate-700 dark:text-slate-350"
              >
                <option value="" disabled>-- ලොරි රථය සහ පටවා ඇති භාණ්ඩ තෝරන්න --</option>
                {inTransitLorries.map((lorry) => {
                  let manifestDesc = ""
                  try {
                    const parsed = JSON.parse(lorry.items) as { sku: string; qty: number }[]
                    manifestDesc = parsed.map((p) => `${p.sku.split(" ")[0]} (${p.qty}u)`).join(", ")
                  } catch {
                    manifestDesc = "Unknown manifest"
                  }
                  return (
                    <option key={lorry.id} value={lorry.id}>
                      {lorry.lorryId} — [{manifestDesc}]
                    </option>
                  )
                })}
              </select>
            </div>

            {/* Feedback Message */}
            {unloadMsg && (
              <div
                className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs leading-relaxed ${
                  unloadMsg.type === "success"
                    ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-400"
                    : "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40 text-rose-800 dark:text-rose-455"
                }`}
              >
                {unloadMsg.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                )}
                <span>{unloadMsg.text}</span>
              </div>
            )}

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setUnloadOpen(false)}
                disabled={loading}
                className="rounded-xl border border-slate-200 dark:border-slate-800 text-sm"
              >
                අවලංගු කරන්න (Cancel)
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm font-semibold flex items-center gap-1.5 text-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    බාමින් පවතී...
                  </>
                ) : (
                  "ආපසු බෑම තහවුරු කරන්න"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
