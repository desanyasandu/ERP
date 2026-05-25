"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Wallet, Loader2 } from "lucide-react"
import { disbursePettyCashAction } from "@/app/sales/actions"

export default function PettyCashModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    driverName: "",
    amount: "",
    reason: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const numAmount = parseFloat(formData.amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      setError("කරුණාකර වලංගු ධන මුදල් ප්‍රමාණයක් ඇතුළත් කරන්න.")
      setIsSubmitting(false)
      return
    }

    try {
      const res = await disbursePettyCashAction({
        driverName: formData.driverName,
        amount: numAmount,
        reason: formData.reason
      })

      if (res.success) {
        // Reset form state & close modal
        setFormData({ driverName: "", amount: "", reason: "" })
        setIsOpen(false)
      } else {
        setError(res.error || "ඇතුළත් කිරීමේදී දෝෂයක් සිදු විය. කරුණාකර නැවත උත්සාහ කරන්න.")
      }
    } catch (err) {
      console.error(err)
      setError("සේවාදායක සම්බන්ධතාවය බිඳ වැටී ඇත.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-md transition-all duration-200 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          සුළු මුදල් අත්තිකාරම් නිකුත් කිරීම (Disburse)
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xl">
        <DialogHeader>
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500 mb-2">
            <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded-xl">
              <Wallet className="w-5 h-5" />
            </div>
            <DialogTitle className="text-lg font-bold text-slate-900 dark:text-white">
              සුළු මුදල් අත්තිකාරම් නිකුත් කිරීම (Petty Cash)
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
            රියදුරන් සඳහා හදිසි ධාවන වියදම් (ඩීසල්, මාර්ග ගාස්තු) අත්තිකාරම් මුදල් මෙතැනින් ලියාපදිංචි කරන්න.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {error && (
            <div className="p-3 text-xs font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/30 rounded-xl border border-rose-100 dark:border-rose-900/40 animate-shake">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="driverName" className="text-[11px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400">
              රියදුරුගේ නම (Driver Name)
            </label>
            <Input
              id="driverName"
              placeholder="उदा. නිමල් පෙරේරා"
              required
              disabled={isSubmitting}
              value={formData.driverName}
              onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
              className="rounded-xl border-slate-200 dark:border-slate-800 focus-visible:ring-1 focus-visible:ring-amber-500 bg-slate-50 dark:bg-slate-900"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="amount" className="text-[11px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400">
              අත්තිකාරම් මුදල් ප්‍රමාණය (Amount Rs.)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-xs font-bold pointer-events-none">
                Rs.
              </span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                required
                disabled={isSubmitting}
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="pl-10 rounded-xl border-slate-200 dark:border-slate-800 focus-visible:ring-1 focus-visible:ring-amber-500 bg-slate-50 dark:bg-slate-900 font-medium"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="reason" className="text-[11px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400">
              අත්තිකාරම් ලබාදීමට හේතුව (Reason)
            </label>
            <Input
              id="reason"
              placeholder="उदा. WP-TRK ලොරි රථයට ඩීසල් ගැසීම සඳහා"
              required
              disabled={isSubmitting}
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="rounded-xl border-slate-200 dark:border-slate-800 focus-visible:ring-1 focus-visible:ring-amber-500 bg-slate-50 dark:bg-slate-900"
            />
          </div>

          <DialogFooter className="pt-4 gap-2 sm:gap-0">
            <Button
              type="button"
              variant="ghost"
              disabled={isSubmitting}
              onClick={() => setIsOpen(false)}
              className="rounded-xl text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              අවලංගු කරන්න (Cancel)
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 shadow-sm flex items-center gap-1.5"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  නිකුත් කෙරේ...
                </>
              ) : (
                "අනුමත කර සටහන් කරන්න"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
