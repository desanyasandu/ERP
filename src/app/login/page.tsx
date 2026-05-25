"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Package, Lock, User, Loader2, Sparkles, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Clear any previous session on loading login page
    localStorage.removeItem("the_erp_auth")
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    // Fast credentials check using localStorage or fallback to default 'admin'
    setTimeout(() => {
      const storedPassword = localStorage.getItem("the_erp_auth_password") || "admin"
      if (username.trim() === "admin" && password === storedPassword) {
        localStorage.setItem("the_erp_auth", "true")
        router.push("/")
      } else {
        setError("පරිශීලක නාමය හෝ මුද්‍රණ පදය වැරදියි. කරුණාකර නැවත උත්සාහ කරන්න.")
        setIsSubmitting(false)
      }
    }, 800)
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50/50 dark:bg-slate-950 p-4">
      {/* Background soft glow effects */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-indigo-200/40 dark:bg-indigo-950/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-violet-200/40 dark:bg-violet-950/20 blur-3xl pointer-events-none" />

      <Card className="w-full max-w-[400px] rounded-3xl border border-slate-200/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 shadow-xl relative z-10 animate-fade-in">
        
        {/* Brand Header */}
        <CardHeader className="text-center p-0 pb-6 flex flex-col items-center">
          <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-md shadow-indigo-100 dark:shadow-none mb-3.5">
            <Package className="w-5.5 h-5.5" />
          </div>
          <CardTitle className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-1.5 justify-center">
            TheERP <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-650 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40">Sri Lanka</span>
          </CardTitle>
          <CardDescription className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
            පද්ධතියට ඇතුළු වීම සඳහා ඔබේ ගිණුම් තොරතුරු ඇතුළත් කරන්න.
          </CardDescription>
        </CardHeader>

        {/* Content Form */}
        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-[11px] font-bold text-rose-700 dark:text-rose-300 bg-rose-50/70 dark:bg-rose-950/30 rounded-xl border border-rose-100 dark:border-rose-900/45 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Username */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-455 dark:text-slate-450">
                පරිශීලක නාමය (Username)
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <Input
                  type="text"
                  placeholder="admin"
                  required
                  disabled={isSubmitting}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 focus-visible:ring-1 focus-visible:ring-indigo-500 font-medium"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-455 dark:text-slate-450">
                මුද්‍රණ පදය (Password)
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  required
                  disabled={isSubmitting}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 focus-visible:ring-1 focus-visible:ring-indigo-500 font-medium"
                />
              </div>
            </div>

            {/* Hint Box */}
            <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-2xl border border-indigo-100/60 dark:border-indigo-900/30 text-[10px] text-indigo-700 dark:text-indigo-400 leading-normal flex items-start gap-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0 mt-0.5 animate-bounce" />
              <span>
                <strong>ආදර්ශ ලොගින් තොරතුරු:</strong> admin / admin ලෙස ඇතුළු වන්න.
              </span>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-indigo-650 hover:from-sky-600 hover:to-indigo-700 text-white font-bold h-10 shadow-md shadow-indigo-100 dark:shadow-none transition-all duration-200 mt-2 flex items-center justify-center gap-1.5"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  පරිශීලනය කෙරේ...
                </>
              ) : (
                "පද්ධතියට ඇතුළු වන්න"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="p-0 pt-5 mt-5 border-t border-slate-100 dark:border-slate-800/80 flex flex-col justify-center text-center">
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
            © 2026 TheERP. All rights reserved.
          </p>
          <p className="text-[9px] text-indigo-500/80 font-bold tracking-wider uppercase mt-1">
            Sri Lankan Grocery Distribution Suite
          </p>
        </CardFooter>

      </Card>
    </div>
  )
}
