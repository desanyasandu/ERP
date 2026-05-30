"use client"

import React, { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import {
  User,
  CircleDollarSign,
  TrendingUp,
  Boxes,
  Package,
  Info,
  Search,
  Plus,
  ArrowLeft,
  ChevronRight,
  Phone,
  MapPin,
  CheckCircle2
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"

export default function OperationsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentView = searchParams.get("view") || "client"

  // Search filter
  const [searchTerm, setSearchTerm] = useState("")

  // Dynamic state hooks for interactive fully functional features
  // 1. Clients
  const [clients, setClients] = useState([
    { id: "C001", name: "Cargills Food City - Colombo 03", route: "Western - Colombo", phone: "011-2300100", outstanding: 120000, status: "Active" },
    { id: "C002", name: "Keells Super - Negombo", route: "Western - Gampaha", phone: "031-2234090", outstanding: 85000, status: "Active" },
    { id: "C003", name: "Lanka Sathosa - Galle", route: "Southern - Galle", phone: "091-2244890", outstanding: 0, status: "Active" },
    { id: "C004", name: "Siriwardena Grocery - Kandy", route: "Central - Kandy", phone: "081-4923011", outstanding: 45000, status: "Active" },
    { id: "C005", name: "Wijesinghe Stores - Matara", route: "Southern - Matara", phone: "041-2223399", outstanding: 15000, status: "Active" },
  ])
  const [newClientName, setNewClientName] = useState("")
  const [newClientRoute, setNewClientRoute] = useState("Western - Colombo")
  const [newClientPhone, setNewClientPhone] = useState("")
  const [newClientOutstanding, setNewClientOutstanding] = useState("")
  const [isClientModalOpen, setIsClientModalOpen] = useState(false)

  // 2. Sales
  const [sales, setSales] = useState([
    { id: "SL-1001", client: "Cargills Food City - Colombo 03", items: "සෝයාමීට් පැකට් x 500, පොල්තෙල් බෝතල් x 100", amount: 185000, date: "2026-05-28", status: "Delivered" },
    { id: "SL-1002", client: "Keells Super - Negombo", items: "සම්බා සහල් මලු x 50, පරිප්පු පැකට් x 200", amount: 245000, date: "2026-05-29", status: "In Transit" },
    { id: "SL-1003", client: "Siriwardena Grocery - Kandy", items: "කිරිපිටි පැකට් x 150, සෝයාමීට් x 100", amount: 98000, date: "2026-05-30", status: "Pending" },
  ])
  const [newSaleClient, setNewSaleClient] = useState("Cargills Food City - Colombo 03")
  const [newSaleAmount, setNewSaleAmount] = useState("")
  const [newSaleItems, setNewSaleItems] = useState("")
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false)

  // 3. Recovery
  const [recoveries, setRecoveries] = useState([
    { id: "RC-301", client: "Cargills Food City - Colombo 03", method: "Cheque (BOC)", amount: 80000, date: "2026-05-29", status: "Cleared" },
    { id: "RC-302", client: "Siriwardena Grocery - Kandy", method: "Cash", amount: 25000, date: "2026-05-30", status: "Cleared" },
    { id: "RC-303", client: "Keells Super - Negombo", method: "Cheque (Sampath)", amount: 50000, date: "2026-05-30", status: "Pending Clearance" },
  ])
  const [newRecClient, setNewRecClient] = useState("Cargills Food City - Colombo 03")
  const [newRecMethod, setNewRecMethod] = useState("Cash")
  const [newRecAmount, setNewRecAmount] = useState("")
  const [isRecModalOpen, setIsRecModalOpen] = useState(false)

  // 4. Stock
  const [stocks, setStocks] = useState([
    { id: "ST-01", name: "සෝයා පිටි (Soya Flour) - Raw Chemical/Material", qty: "4,500 kg", type: "Chemical/Raw", minLevel: "1,000 kg", status: "Stable" },
    { id: "ST-02", name: "පිරිපහදු නොකළ පොල්තෙල් (Crude Coconut Oil)", qty: "2,200 L", type: "Chemical/Raw", minLevel: "500 L", status: "Stable" },
    { id: "ST-03", name: "සෝයාමීට් පැකට් (Soyameet Packets) - 90g", qty: "12,000 Pkts", type: "Finished SKU", minLevel: "2,000 Pkts", status: "High Stock" },
    { id: "ST-04", name: "පොල්තෙල් බෝතල් (Coconut Oil Bottles) - 1L", qty: "850 Btls", type: "Finished SKU", minLevel: "1,000 Btls", status: "Reorder Required" },
    { id: "ST-05", name: "සම්බා සහල් මලු (Samba Rice Bags) - 10kg", qty: "320 Bags", type: "Finished SKU", minLevel: "100 Bags", status: "Stable" },
  ])
  const [newStockItemName, setNewStockItemName] = useState("")
  const [newStockQty, setNewStockQty] = useState("")
  const [newStockType, setNewStockType] = useState("Finished SKU")
  const [isStockModalOpen, setIsStockModalOpen] = useState(false)

  // 5. Creditors
  const [creditors] = useState([
    { id: "CR-01", name: "Lanka Chemical Importers PLC", contact: "011-4990900", outstanding: 340000, term: "30 Days", status: "Due in 5 Days" },
    { id: "CR-02", name: "Wijeya Packaging Suppliers Ltd", contact: "011-2856339", outstanding: 125000, term: "15 Days", status: "Stable" },
    { id: "CR-03", name: "Saman Paddy Distributers", contact: "049-2223845", outstanding: 95000, term: "Cash on Delivery", status: "Paid" },
  ])

  // 6. Debtors
  const [debtors] = useState([
    { id: "DB-01", name: "Cargills Food City - Colombo 03", outstanding: 120000, lastPayDate: "2026-05-15", phone: "011-2300100", status: "Overdue 15 Days" },
    { id: "DB-02", name: "Keells Super - Negombo", outstanding: 85000, lastPayDate: "2026-05-20", phone: "031-2234090", status: "Stable" },
    { id: "DB-03", name: "Siriwardena Grocery - Kandy", outstanding: 45000, lastPayDate: "2026-05-10", phone: "081-4923011", status: "Overdue 20 Days" },
  ])

  // 7. Suppliers
  const [suppliers, setSuppliers] = useState([
    { id: "SP-01", name: "Lanka Chemical Importers PLC", location: "Colombo 13", items: "Caustic Soda, Food Colorings, Surfactants", status: "Contract Active" },
    { id: "SP-02", name: "Wijeya Packaging Suppliers Ltd", location: "Homagama", items: "Printed Plastic Pouches, Corrugated Boxes", status: "Contract Active" },
    { id: "SP-03", name: "Saman Paddy Distributers", location: "Polonnaruwa", items: "Samba Paddy, Keeri Samba Paddy", status: "Contract Active" },
  ])
  const [newSupName, setNewSupName] = useState("")
  const [newSupItems, setNewSupItems] = useState("")
  const [isSupModalOpen, setIsSupModalOpen] = useState(false)

  // 8. Expenses
  const [expenses, setExpenses] = useState([
    { id: "EXP-101", title: "ලොරියට ඩීසල් ගැසීම (Lorry WP-TRK-102 Diesel)", category: "Logistics", amount: 18500, date: "2026-05-29", status: "Approved" },
    { id: "EXP-102", title: "කර්මාන්තශාලා විදුලි බිල (Factory Electricity)", category: "Utilities", amount: 84000, date: "2026-05-29", status: "Approved" },
    { id: "EXP-103", title: "ගබඩා සේවක තේ පැන් වියදම් (Staff Refreshments)", category: "Welfare", amount: 4500, date: "2026-05-30", status: "Pending Approval" },
  ])
  const [newExpTitle, setNewExpTitle] = useState("")
  const [newExpCategory, setNewExpCategory] = useState("Logistics")
  const [newExpAmount, setNewExpAmount] = useState("")
  const [isExpModalOpen, setIsExpModalOpen] = useState(false)

  // 9. Managers Directory
  const [managers, setManagers] = useState([
    { id: "MG-01", name: "Nilantha Perera", role: "Factory Operations Manager", branch: "Main Mill - Gampaha", phone: "077-7123456", OEE: "92.4%", initial: "NP", color: "bg-indigo-500" },
    { id: "MG-02", name: "Kusum Siriwardena", role: "Quality Control Director", branch: "Main Mill - Gampaha", phone: "071-4823901", OEE: "95.0%", initial: "KS", color: "bg-emerald-500" },
    { id: "MG-03", name: "Sunil Ranasinghe", role: "Western Province Logistics Manager", branch: "Colombo Depot", phone: "076-2234091", OEE: "89.2%", initial: "SR", color: "bg-violet-500" },
    { id: "MG-04", name: "Priyantha Fernando", role: "Sales & Outlets Manager", branch: "Head Office - Colombo", phone: "072-8923011", OEE: "91.8%", initial: "PF", color: "bg-amber-500" },
  ])
  const [newManName, setNewManName] = useState("")
  const [newManRole, setNewManRole] = useState("")
  const [newManPhone, setNewManPhone] = useState("")
  const [isManModalOpen, setIsManModalOpen] = useState(false)

  // Navigate to tabs
  const setView = (view: string) => {
    setSearchTerm("")
    router.push(`/operations?view=${view}`)
  }

  // Interactive addition submit handlers
  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newClientName || !newClientPhone) return
    const newClient = {
      id: `C00${clients.length + 1}`,
      name: newClientName,
      route: newClientRoute,
      phone: newClientPhone,
      outstanding: parseFloat(newClientOutstanding) || 0,
      status: "Active"
    }
    setClients([newClient, ...clients])
    setNewClientName("")
    setNewClientPhone("")
    setNewClientOutstanding("")
    setIsClientModalOpen(false)
  }

  const handleAddSale = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSaleAmount || !newSaleItems) return
    const newSale = {
      id: `SL-${1001 + sales.length}`,
      client: newSaleClient,
      items: newSaleItems,
      amount: parseFloat(newSaleAmount),
      date: new Date().toISOString().split("T")[0],
      status: "Pending"
    }
    setSales([newSale, ...sales])
    setNewSaleAmount("")
    setNewSaleItems("")
    setIsSaleModalOpen(false)
  }

  const handleAddRecovery = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newRecAmount) return
    const newRec = {
      id: `RC-${301 + recoveries.length}`,
      client: newRecClient,
      method: newRecMethod,
      amount: parseFloat(newRecAmount),
      date: new Date().toISOString().split("T")[0],
      status: "Cleared"
    }
    setRecoveries([newRec, ...recoveries])
    setNewRecAmount("")
    setIsRecModalOpen(false)
  }

  const handleAddStock = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newStockItemName || !newStockQty) return
    const newStock = {
      id: `ST-0${stocks.length + 1}`,
      name: newStockItemName,
      qty: newStockQty,
      type: newStockType,
      minLevel: "200 Units",
      status: "Stable"
    }
    setStocks([newStock, ...stocks])
    setNewStockItemName("")
    setNewStockQty("")
    setIsStockModalOpen(false)
  }

  const handleAddSupplier = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSupName || !newSupItems) return
    const newSup = {
      id: `SP-0${suppliers.length + 1}`,
      name: newSupName,
      location: "Sri Lanka",
      items: newSupItems,
      status: "Contract Active"
    }
    setSuppliers([newSup, ...suppliers])
    setNewSupName("")
    setNewSupItems("")
    setIsSupModalOpen(false)
  }

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newExpTitle || !newExpAmount) return
    const newExp = {
      id: `EXP-${101 + expenses.length}`,
      title: newExpTitle,
      category: newExpCategory,
      amount: parseFloat(newExpAmount),
      date: new Date().toISOString().split("T")[0],
      status: "Pending Approval"
    }
    setExpenses([newExp, ...expenses])
    setNewExpTitle("")
    setNewExpAmount("")
    setIsExpModalOpen(false)
  }

  const handleAddManager = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newManName || !newManRole || !newManPhone) return
    const initials = newManName.split(" ").map(w => w[0]).join("").toUpperCase().substring(0, 2)
    const newMan = {
      id: `MG-0${managers.length + 1}`,
      name: newManName,
      role: newManRole,
      branch: "Head Office - Colombo",
      phone: newManPhone,
      OEE: "90.0%",
      initial: initials || "MG",
      color: "bg-slate-500"
    }
    setManagers([...managers, newMan])
    setNewManName("")
    setNewManRole("")
    setNewManPhone("")
    setIsManModalOpen(false)
  }

  // Quick reminder SMS simulator for Debtors
  const sendSMSReminder = (clientName: string, amount: number) => {
    alert(`SMS යවන ලදී: ${clientName} වෙත Rs. ${amount.toLocaleString()}.00 ණය ගෙවන ලෙස කෙටි පණිවිඩයක් යවන ලදී.`)
  }

  // Tabs structure in Sinhala
  const tabs = [
    { id: "client", label: "ගනුදෙනුකරුවන් (Clients)", icon: User },
    { id: "sales", label: "අලෙවි ලෙජරය (Sales)", icon: CircleDollarSign },
    { id: "recovery", label: "අයකරගැනීම් (Recovery)", icon: TrendingUp },
    { id: "stock", label: "තොග පාලනය (Stocks)", icon: Boxes },
    { id: "supplier", label: "සැපයුම්කරුවන් (Suppliers)", icon: Package },
    { id: "expenses", label: "වියදම් (Expenses)", icon: CircleDollarSign, badge: "rose" },
    { id: "credit", label: "ණයහිමි පාලනය (Credit)", icon: Info },
    { id: "debt", label: "ණයගැති පාලනය (Debt)", icon: Info },
    { id: "managers", label: "කළමනාකරුවන් (Managers)", icon: User, border: true },
  ]

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
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
              <Boxes className="w-5.5 h-5.5" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                පද්ධති මෙහෙයුම් කේන්ද්‍රය (System Operations Hub)
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                ගනුදෙනුකරුවන්, විකුණුම්, අයකරගැනීම්, සැපයුම්, වියදම් සහ සමාගම් නියෝජිතයින්ගේ සියලුම මෙහෙයුම් මෙතැනින් පාලනය කරන්න.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        
        {/* Left Side Tab Navigator */}
        <div className="lg:col-span-1 space-y-4">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
              මෙහෙයුම් මොඩියුලයන්
            </div>
            {tabs.map(tab => {
              const Icon = tab.icon
              const isActive = currentView === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setView(tab.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all duration-200 ${
                    tab.border ? "border-t border-slate-100 dark:border-slate-800 pt-3 mt-2" : ""
                  } ${
                    isActive
                      ? tab.badge === "rose"
                        ? "bg-rose-50 dark:bg-rose-950/40 text-rose-650 dark:text-rose-455 font-extrabold"
                        : "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 font-extrabold"
                      : "text-slate-600 hover:text-slate-950 dark:text-slate-350 dark:hover:text-white hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? (tab.badge === "rose" ? "text-rose-500" : "text-indigo-500") : "text-slate-400"}`} />
                    <span>{tab.label}</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Side Content Panel */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* SEARCH & ACTION CONTROL BAR */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <Input
                type="search"
                placeholder="සොයන්න..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 h-9 text-xs rounded-xl bg-slate-50 border-slate-200 focus-visible:bg-white"
              />
            </div>
            
            {/* Conditional Dialog Triggers depending on active view */}
            {currentView === "client" && (
              <Dialog open={isClientModalOpen} onOpenChange={setIsClientModalOpen}>
                <DialogTrigger asChild>
                  <Button className="rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center gap-1.5 h-9">
                    <Plus className="w-4 h-4" /> නව ගනුදෙනුකරුවෙකු එක් කරන්න
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md bg-white text-slate-900 rounded-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-base font-extrabold">නව ගනුදෙනුකරුවෙකු ලියාපදිංචි කිරීම</DialogTitle>
                    <DialogDescription className="text-xs">පද්ධතියට නව බෙදාහැරීම් අලෙවිසැලක් හෝ ගැනුම්කරුවෙකු ඇතුළත් කරන්න.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddClient} className="space-y-4 pt-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">ගනුදෙනුකරුගේ නම (Client Name)</label>
                      <Input required value={newClientName} onChange={e => setNewClientName(e.target.value)} placeholder="උදා: Keells Super - Malabe" className="rounded-xl text-xs" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">මාර්ගය (Route/Zone)</label>
                        <select value={newClientRoute} onChange={e => setNewClientRoute(e.target.value)} className="w-full p-2 border border-slate-200 rounded-xl text-xs bg-slate-50">
                          <option value="Western - Colombo">Western - Colombo</option>
                          <option value="Western - Gampaha">Western - Gampaha</option>
                          <option value="Southern - Galle">Southern - Galle</option>
                          <option value="Central - Kandy">Central - Kandy</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">දුරකථන අංකය</label>
                        <Input required value={newClientPhone} onChange={e => setNewClientPhone(e.target.value)} placeholder="077-XXXXXXX" className="rounded-xl text-xs" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">ආරම්භක හිඟ මුදල Rs. (Outstanding)</label>
                      <Input type="number" value={newClientOutstanding} onChange={e => setNewClientOutstanding(e.target.value)} placeholder="0.00" className="rounded-xl text-xs" />
                    </div>
                    <DialogFooter className="pt-2">
                      <Button type="button" variant="ghost" onClick={() => setIsClientModalOpen(false)} className="rounded-xl text-xs">අවලංගු කරන්න</Button>
                      <Button type="submit" className="rounded-xl text-xs bg-indigo-650 hover:bg-indigo-700 text-white">සුරකින්න</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}

            {currentView === "sales" && (
              <Dialog open={isSaleModalOpen} onOpenChange={setIsSaleModalOpen}>
                <DialogTrigger asChild>
                  <Button className="rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center gap-1.5 h-9">
                    <Plus className="w-4 h-4" /> නව විකුණුම් ඇනවුමක් ලොග් කරන්න
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md bg-white text-slate-900 rounded-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-base font-extrabold">නව විකුණුම් ඇනවුමක් එක් කිරීම</DialogTitle>
                    <DialogDescription className="text-xs">ඇනවුම් කළ අයිතම සහ මුළු වටිනාකම ලියාපදිංචි කරන්න.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddSale} className="space-y-4 pt-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">ගනුදෙනුකරු (Client)</label>
                      <select value={newSaleClient} onChange={e => setNewSaleClient(e.target.value)} className="w-full p-2 border border-slate-200 rounded-xl text-xs bg-slate-50">
                        {clients.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">ඇනවුම් අයිතම (Order Details)</label>
                      <Input required value={newSaleItems} onChange={e => setNewSaleItems(e.target.value)} placeholder="උදා: සෝයාමීට් පැකට් x 200, පොල්තෙල් x 50" className="rounded-xl text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">මුළු ඇනවුම් වටිනාකම Rs.</label>
                      <Input type="number" required value={newSaleAmount} onChange={e => setNewSaleAmount(e.target.value)} placeholder="0.00" className="rounded-xl text-xs" />
                    </div>
                    <DialogFooter className="pt-2">
                      <Button type="button" variant="ghost" onClick={() => setIsSaleModalOpen(false)} className="rounded-xl text-xs">අවලංගු කරන්න</Button>
                      <Button type="submit" className="rounded-xl text-xs bg-indigo-650 hover:bg-indigo-700 text-white">ඇනවුම ඇතුළත් කරන්න</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}

            {currentView === "recovery" && (
              <Dialog open={isRecModalOpen} onOpenChange={setIsRecModalOpen}>
                <DialogTrigger asChild>
                  <Button className="rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center gap-1.5 h-9">
                    <Plus className="w-4 h-4" /> නව අයකරගැනීමක් ලොග් කරන්න
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md bg-white text-slate-900 rounded-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-base font-extrabold">නව අයකරගැනීමේ රිසිට්පතක් එක් කිරීම</DialogTitle>
                    <DialogDescription className="text-xs">පාරිභෝගිකයාගෙන් ලැබුණු මුදල් හෝ චෙක්පත් ගෙවීම් මෙතැනින් ලොග් කරන්න.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddRecovery} className="space-y-4 pt-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">ගනුදෙනුකරු (Client)</label>
                      <select value={newRecClient} onChange={e => setNewRecClient(e.target.value)} className="w-full p-2 border border-slate-200 rounded-xl text-xs bg-slate-50">
                        {clients.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">ගෙවීම් ක්‍රමය (Method)</label>
                        <select value={newRecMethod} onChange={e => setNewRecMethod(e.target.value)} className="w-full p-2 border border-slate-200 rounded-xl text-xs bg-slate-50">
                          <option value="Cash">Cash (මුදල්)</option>
                          <option value="Cheque (BOC)">Cheque (BOC චෙක්පත)</option>
                          <option value="Cheque (Sampath)">Cheque (Sampath චෙක්පත)</option>
                          <option value="Bank Transfer">Bank Transfer (බැංකු හරහා)</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">අයකරගත් මුදල Rs.</label>
                        <Input type="number" required value={newRecAmount} onChange={e => setNewRecAmount(e.target.value)} placeholder="0.00" className="rounded-xl text-xs" />
                      </div>
                    </div>
                    <DialogFooter className="pt-2">
                      <Button type="button" variant="ghost" onClick={() => setIsRecModalOpen(false)} className="rounded-xl text-xs">අවලංගු කරන්න</Button>
                      <Button type="submit" className="rounded-xl text-xs bg-indigo-650 hover:bg-indigo-700 text-white">රිසිට්පත සුරකින්න</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}

            {currentView === "stock" && (
              <Dialog open={isStockModalOpen} onOpenChange={setIsStockModalOpen}>
                <DialogTrigger asChild>
                  <Button className="rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center gap-1.5 h-9">
                    <Plus className="w-4 h-4" /> නව තොග අයිතමයක් එක් කරන්න
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md bg-white text-slate-900 rounded-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-base font-extrabold">නව තොග අයිතමයක් (Chemical/SKU) එක් කිරීම</DialogTitle>
                    <DialogDescription className="text-xs">අලුතින් රසායනික අමුද්‍රව්‍යයක් හෝ නිමි නිෂ්පාදන SKU එකක් ඇතුළත් කරන්න.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddStock} className="space-y-4 pt-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">අයිතමයේ නම (Item Name)</label>
                      <Input required value={newStockItemName} onChange={e => setNewStockItemName(e.target.value)} placeholder="උදා: Caustic Soda (NaOH)" className="rounded-xl text-xs" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">අයිතමයේ වර්ගය</label>
                        <select value={newStockType} onChange={e => setNewStockType(e.target.value)} className="w-full p-2 border border-slate-200 rounded-xl text-xs bg-slate-50">
                          <option value="Chemical/Raw">Chemical/Raw (රසායනික/අමුද්‍රව්‍ය)</option>
                          <option value="Finished SKU">Finished SKU (නිමි භාණ්ඩ SKU)</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">තොග ප්‍රමාණය (Qty)</label>
                        <Input required value={newStockQty} onChange={e => setNewStockQty(e.target.value)} placeholder="උදා: 1,500 kg / 3,000 Pkts" className="rounded-xl text-xs" />
                      </div>
                    </div>
                    <DialogFooter className="pt-2">
                      <Button type="button" variant="ghost" onClick={() => setIsStockModalOpen(false)} className="rounded-xl text-xs">අවලංගු කරන්න</Button>
                      <Button type="submit" className="rounded-xl text-xs bg-indigo-650 hover:bg-indigo-700 text-white">තොගයට ඇතුළත් කරන්න</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}

            {currentView === "supplier" && (
              <Dialog open={isSupModalOpen} onOpenChange={setIsSupModalOpen}>
                <DialogTrigger asChild>
                  <Button className="rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center gap-1.5 h-9">
                    <Plus className="w-4 h-4" /> නව සැපයුම්කරුවෙකු එක් කරන්න
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md bg-white text-slate-900 rounded-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-base font-extrabold">නව සැපයුම්කරුවෙකු ලියාපදිංචි කිරීම</DialogTitle>
                    <DialogDescription className="text-xs">රසායනික ද්‍රව්‍ය හෝ ඇසුරුම් ද්‍රව්‍ය සපයනු ලබන නව ආයතනයක් ඇතුළත් කරන්න.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddSupplier} className="space-y-4 pt-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">සැපයුම්කරුගේ නම (Supplier Name)</label>
                      <Input required value={newSupName} onChange={e => setNewSupName(e.target.value)} placeholder="උදා: Lanka Chemical Importers PLC" className="rounded-xl text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">සපයනු ලබන ද්‍රව්‍ය (Supplied Chemicals / Items)</label>
                      <Input required value={newSupItems} onChange={e => setNewSupItems(e.target.value)} placeholder="උදා: Caustic Soda, Food Colorings" className="rounded-xl text-xs" />
                    </div>
                    <DialogFooter className="pt-2">
                      <Button type="button" variant="ghost" onClick={() => setIsSupModalOpen(false)} className="rounded-xl text-xs">අවලංගු කරන්න</Button>
                      <Button type="submit" className="rounded-xl text-xs bg-indigo-650 hover:bg-indigo-700 text-white">සැපයුම්කරු එක් කරන්න</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}

            {currentView === "expenses" && (
              <Dialog open={isExpModalOpen} onOpenChange={setIsExpModalOpen}>
                <DialogTrigger asChild>
                  <Button className="rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm flex items-center gap-1.5 h-9">
                    <Plus className="w-4 h-4" /> නව වියදමක් ලොග් කරන්න
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md bg-white text-slate-900 rounded-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-base font-extrabold">නව වියදමක් ලියාපදිංචි කිරීම</DialogTitle>
                    <DialogDescription className="text-xs">මෙහෙයුම්, ප්‍රවාහන හෝ සේවා වියදම් ලොග් කර අනුමැතිය සඳහා යොමු කරන්න.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddExpense} className="space-y-4 pt-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">වියදම් විස්තරය (Description)</label>
                      <Input required value={newExpTitle} onChange={e => setNewExpTitle(e.target.value)} placeholder="උදා: ලොරියට ඩීසල් ගැසීම WP-TRK-102" className="rounded-xl text-xs" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">වියදම් කාණ්ඩය (Category)</label>
                        <select value={newExpCategory} onChange={e => setNewExpCategory(e.target.value)} className="w-full p-2 border border-slate-200 rounded-xl text-xs bg-slate-50">
                          <option value="Logistics">Logistics (ප්‍රවාහන වියදම්)</option>
                          <option value="Utilities">Utilities (උපයෝගිතා පිරිවැය)</option>
                          <option value="Welfare">Welfare (කාර්ය මණ්ඩල සුබසාධන)</option>
                          <option value="Maintenance">Maintenance (යන්ත්‍ර නඩත්තු)</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-bold text-rose-600">වියදම් වටිනාකම Rs.</label>
                        <Input type="number" required value={newExpAmount} onChange={e => setNewExpAmount(e.target.value)} placeholder="0.00" className="rounded-xl text-xs border-rose-250" />
                      </div>
                    </div>
                    <DialogFooter className="pt-2">
                      <Button type="button" variant="ghost" onClick={() => setIsExpModalOpen(false)} className="rounded-xl text-xs">අවලංගු කරන්න</Button>
                      <Button type="submit" className="rounded-xl text-xs bg-rose-650 hover:bg-rose-700 text-white">වියදම ලොග් කරන්න</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}

            {currentView === "managers" && (
              <Dialog open={isManModalOpen} onOpenChange={setIsManModalOpen}>
                <DialogTrigger asChild>
                  <Button className="rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center gap-1.5 h-9">
                    <Plus className="w-4 h-4" /> නව කළමනාකරුවෙකු එක් කරන්න
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md bg-white text-slate-900 rounded-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-base font-extrabold">නව සමාගම් කළමනාකරුවෙකු එක් කිරීම</DialogTitle>
                    <DialogDescription className="text-xs">ශාඛා හෝ කර්මාන්තශාලා අංශයන් භාරව කටයුතු කරන නව කළමනාකරුවෙකු ලියාපදිංචි කරන්න.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddManager} className="space-y-4 pt-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">කළමනාකරුගේ නම (Full Name)</label>
                      <Input required value={newManName} onChange={e => setNewManName(e.target.value)} placeholder="උදා: Nilantha Perera" className="rounded-xl text-xs" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">තනතුර (Role)</label>
                        <Input required value={newManRole} onChange={e => setNewManRole(e.target.value)} placeholder="උදා: Logistics Manager" className="rounded-xl text-xs" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">දුරකථන අංකය</label>
                        <Input required value={newManPhone} onChange={e => setNewManPhone(e.target.value)} placeholder="07X-XXXXXXX" className="rounded-xl text-xs" />
                      </div>
                    </div>
                    <DialogFooter className="pt-2">
                      <Button type="button" variant="ghost" onClick={() => setIsManModalOpen(false)} className="rounded-xl text-xs">අවලංගු කරන්න</Button>
                      <Button type="submit" className="rounded-xl text-xs bg-indigo-650 hover:bg-indigo-700 text-white">තොරතුරු සුරකින්න</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}

            {/* If Credit or Debt view, show status information */}
            {(currentView === "credit" || currentView === "debt") && (
              <span className="text-[11px] font-extrabold text-slate-500 flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                <Info className="w-4 h-4 text-indigo-500" />
                ප්‍රමාද වූ ගෙවීම් පාලනය සඳහා මෙම ලේඛනය යොදා ගැනේ.
              </span>
            )}

          </div>

          {/* VIEW-SPECIFIC LEDGERS & INTERFACES */}

          {/* 1. CLIENT DIRECTORY */}
          {currentView === "client" && (
            <div className="space-y-6 animate-fade-in">
              <Card className="rounded-2xl border-slate-200/80 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
                <CardHeader className="border-b border-slate-100 p-6 bg-slate-50/20">
                  <CardTitle className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <User className="w-4.5 h-4.5 text-indigo-500" />
                    ගනුදෙනුකරුවන්ගේ නාමාවලිය (Client Database Ledger)
                  </CardTitle>
                  <CardDescription className="text-xs">
                    TheERP පද්ධතියේ ලියාපදිංචි වී ඇති ප්‍රධාන සිල්ලර සහ සුපිරි වෙළඳසැල් කලාපීය නාමාවලිය.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                          <th className="py-3.5 px-6">ID</th>
                          <th className="py-3.5 px-6">ආයතන නම (Client Name)</th>
                          <th className="py-3.5 px-6">බෙදාහැරීමේ කලාපය (Route)</th>
                          <th className="py-3.5 px-6">දුරකථන (Contact)</th>
                          <th className="py-3.5 px-6">හිඟ මුදල් Rs. (Outstanding)</th>
                          <th className="py-3.5 px-6 text-right">තත්ත්වය (Status)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {clients
                          .filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.route.toLowerCase().includes(searchTerm.toLowerCase()))
                          .map(c => (
                            <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="py-4 px-6 font-bold text-indigo-650">{c.id}</td>
                              <td className="py-4 px-6 font-extrabold text-slate-800">{c.name}</td>
                              <td className="py-4 px-6 text-slate-500 font-semibold">{c.route}</td>
                              <td className="py-4 px-6 text-slate-550 font-semibold">{c.phone}</td>
                              <td className={`py-4 px-6 font-black ${c.outstanding > 0 ? "text-indigo-600" : "text-slate-400"}`}>
                                Rs. {c.outstanding.toLocaleString()}.00
                              </td>
                              <td className="py-4 px-6 text-right">
                                <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-xl px-2 py-0.5 font-bold">
                                  {c.status}
                                </span>
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

          {/* 2. SALES LEDGER */}
          {currentView === "sales" && (
            <div className="space-y-6 animate-fade-in">
              <Card className="rounded-2xl border-slate-200/80 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
                <CardHeader className="border-b border-slate-100 p-6 bg-slate-50/20">
                  <CardTitle className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <CircleDollarSign className="w-4.5 h-4.5 text-indigo-500" />
                    විකුණුම් ඇනවුම් ලෙජරය (Active Sales Orders)
                  </CardTitle>
                  <CardDescription className="text-xs">
                    සෝයාමීට්, පොල්තෙල් සහ සහල් තොග බෙදාහැරීම් සඳහා ඇනවුම් ප්‍රගතිය සහ මුළු බිල්පත් වටිනාකම.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                          <th className="py-3.5 px-6">Order ID</th>
                          <th className="py-3.5 px-6">ගනුදෙනුකරු (Client)</th>
                          <th className="py-3.5 px-6">ඇණවුම් විස්තරය (Items Manifest)</th>
                          <th className="py-3.5 px-6">දිනය (Date)</th>
                          <th className="py-3.5 px-6">ඇණවුම් වටිනාකම Rs.</th>
                          <th className="py-3.5 px-6 text-right">බෙදාහැරීම් ප්‍රගතිය</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {sales
                          .filter(s => s.client.toLowerCase().includes(searchTerm.toLowerCase()) || s.items.toLowerCase().includes(searchTerm.toLowerCase()))
                          .map(s => (
                            <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="py-4 px-6 font-bold text-indigo-650">{s.id}</td>
                              <td className="py-4 px-6 font-extrabold text-slate-800">{s.client}</td>
                              <td className="py-4 px-6 text-slate-550 font-semibold">{s.items}</td>
                              <td className="py-4 px-6 text-slate-400 font-semibold">{s.date}</td>
                              <td className="py-4 px-6 font-black text-indigo-600">Rs. {s.amount.toLocaleString()}.00</td>
                              <td className="py-4 px-6 text-right">
                                <span className={`inline-flex items-center gap-1 text-[10px] border rounded-xl px-2 py-0.5 font-bold ${
                                  s.status === "Delivered" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                                  s.status === "In Transit" ? "bg-amber-50 text-amber-700 border-amber-100" :
                                  "bg-indigo-50 text-indigo-700 border-indigo-100 animate-pulse"
                                }`}>
                                  {s.status}
                                </span>
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

          {/* 3. RECOVERY TRACKER */}
          {currentView === "recovery" && (
            <div className="space-y-6 animate-fade-in">
              <Card className="rounded-2xl border-slate-200/80 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
                <CardHeader className="border-b border-slate-100 p-6 bg-slate-50/20">
                  <CardTitle className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <TrendingUp className="w-4.5 h-4.5 text-indigo-500" />
                    ණය අයකරගැනීම් සහ චෙක්පත් ලේඛනය (Outstanding Recoveries Tracker)
                  </CardTitle>
                  <CardDescription className="text-xs">
                    පාරිභෝගිකයින්ගෙන් පියවන ලද ණය මුදල්, ලැබුණු මුදල් (Cash) සහ බැංකුවලට තැන්පත් කළ චෙක්පත් (Cheques) තොරතුරු.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                          <th className="py-3.5 px-6">Receipt No</th>
                          <th className="py-3.5 px-6">ගනුදෙනුකරු (Client)</th>
                          <th className="py-3.5 px-6">ගෙවීම් ක්‍රමය (Method)</th>
                          <th className="py-3.5 px-6">ලැබුණු දිනය (Date)</th>
                          <th className="py-3.5 px-6">අයකරගත් වටිනාකම Rs.</th>
                          <th className="py-3.5 px-6 text-right">තත්ත්වය (Status)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {recoveries
                          .filter(r => r.client.toLowerCase().includes(searchTerm.toLowerCase()) || r.method.toLowerCase().includes(searchTerm.toLowerCase()))
                          .map(r => (
                            <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="py-4 px-6 font-bold text-indigo-650">{r.id}</td>
                              <td className="py-4 px-6 font-extrabold text-slate-800">{r.client}</td>
                              <td className="py-4 px-6 text-slate-550 font-semibold">{r.method}</td>
                              <td className="py-4 px-6 text-slate-400 font-semibold">{r.date}</td>
                              <td className="py-4 px-6 font-black text-emerald-650">Rs. {r.amount.toLocaleString()}.00</td>
                              <td className="py-4 px-6 text-right">
                                <span className={`inline-flex items-center gap-1 text-[10px] border rounded-xl px-2 py-0.5 font-bold ${
                                  r.status === "Cleared" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-amber-50 text-amber-700 border-amber-100 animate-pulse"
                                }`}>
                                  {r.status}
                                </span>
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

          {/* 4. STOCK ADJUSTMENTS & FORMULA */}
          {currentView === "stock" && (
            <div className="space-y-6 animate-fade-in">
              <Card className="rounded-2xl border-slate-200/80 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
                <CardHeader className="border-b border-slate-100 p-6 bg-slate-50/20">
                  <CardTitle className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <Boxes className="w-4.5 h-4.5 text-indigo-500" />
                    කර්මාන්තශාලා තොග කළමනාකරණය (Basic Chemicals & SKU Balances)
                  </CardTitle>
                  <CardDescription className="text-xs">
                    සෝයා පිටි, පරිප්පු, කුළුබඩු වැනි අමුද්‍රව්‍ය මෙන්ම සෝයාමීට් පැකට්, පොල්තෙල් වැනි නිමි භාණ්ඩවල සැබෑ තොග ශේෂය.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                          <th className="py-3.5 px-6">SKU ID</th>
                          <th className="py-3.5 px-6">අයිතම විස්තරය (Item Details)</th>
                          <th className="py-3.5 px-6">අංශය (Type)</th>
                          <th className="py-3.5 px-6">අවම ආරක්ෂිත මට්ටම (Buffer)</th>
                          <th className="py-3.5 px-6">පවතින තොගය (Current Balance)</th>
                          <th className="py-3.5 px-6 text-right">තත්ත්වය (Status)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {stocks
                          .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
                          .map(s => (
                            <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="py-4 px-6 font-bold text-indigo-650">{s.id}</td>
                              <td className="py-4 px-6 font-extrabold text-slate-800">{s.name}</td>
                              <td className="py-4 px-6 text-slate-500 font-semibold">{s.type}</td>
                              <td className="py-4 px-6 text-slate-400 font-semibold">{s.minLevel}</td>
                              <td className="py-4 px-6 font-black text-slate-800">{s.qty}</td>
                              <td className="py-4 px-6 text-right">
                                <span className={`inline-flex items-center gap-1 text-[10px] border rounded-xl px-2 py-0.5 font-bold ${
                                  s.status === "High Stock" || s.status === "Stable" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-rose-50 text-rose-700 border-rose-100 animate-pulse"
                                }`}>
                                  {s.status}
                                </span>
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

          {/* 5. CREDIT MANAGEMENT */}
          {currentView === "credit" && (
            <div className="space-y-6 animate-fade-in">
              <Card className="rounded-2xl border-slate-200/80 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
                <CardHeader className="border-b border-slate-100 p-6 bg-slate-50/20">
                  <CardTitle className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <Info className="w-4.5 h-4.5 text-indigo-500" />
                    සැපයුම්කරුවන්ගේ ණයහිමි ලෙජරය (Creditors & Payables Management)
                  </CardTitle>
                  <CardDescription className="text-xs">
                    සමාගම විසින් රසායනික හා ඇසුරුම් ද්‍රව්‍ය සපයන ලද විදේශීය හෝ දේශීය ආයතන වෙත ගෙවීමට ඇති ණය ශේෂයන්.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                          <th className="py-3.5 px-6">Creditor ID</th>
                          <th className="py-3.5 px-6">සැපයුම්කරු (Supplier Name)</th>
                          <th className="py-3.5 px-6">දුරකථන (Contact)</th>
                          <th className="py-3.5 px-6">ණය කාල සීමාව (Payment Term)</th>
                          <th className="py-3.5 px-6">ගෙවීමට ඇති මුදල Rs. (Total Dues)</th>
                          <th className="py-3.5 px-6 text-right">අවදානම් මට්ටම (Status)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {creditors
                          .filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
                          .map(c => (
                            <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="py-4 px-6 font-bold text-indigo-650">{c.id}</td>
                              <td className="py-4 px-6 font-extrabold text-slate-800">{c.name}</td>
                              <td className="py-4 px-6 text-slate-500 font-semibold">{c.contact}</td>
                              <td className="py-4 px-6 text-slate-400 font-semibold">{c.term}</td>
                              <td className="py-4 px-6 font-black text-rose-600">Rs. {c.outstanding.toLocaleString()}.00</td>
                              <td className="py-4 px-6 text-right">
                                <span className={`inline-flex items-center gap-1 text-[10px] border rounded-xl px-2 py-0.5 font-bold ${
                                  c.status === "Paid" || c.status === "Stable" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-rose-50 text-rose-700 border-rose-100 animate-pulse"
                                }`}>
                                  {c.status}
                                </span>
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

          {/* 6. DEBT MANAGEMENT */}
          {currentView === "debt" && (
            <div className="space-y-6 animate-fade-in">
              <Card className="rounded-2xl border-slate-200/80 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
                <CardHeader className="border-b border-slate-100 p-6 bg-slate-50/20">
                  <CardTitle className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <Info className="w-4.5 h-4.5 text-indigo-500" />
                    පාරිභෝගික ණයගැති පාලනය (Debtors aging & Reminders Center)
                  </CardTitle>
                  <CardDescription className="text-xs">
                    කීල්ස්, කාර්ගිල්ස් සහ සිල්ලර අලෙවිසැල් මඟින් සමාගමට ලැබීමට ඇති ණය මුදල් ලේඛනය සහ Quick SMS යැවීමේ පහසුකම.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                          <th className="py-3.5 px-6">Debtor ID</th>
                          <th className="py-3.5 px-6">අලෙවිසැල (Shop Outlet)</th>
                          <th className="py-3.5 px-6">අවසන් වරට ගෙවූ දිනය</th>
                          <th className="py-3.5 px-6">ණය මුදල Rs. (Receivables)</th>
                          <th className="py-3.5 px-6">ප්‍රමාද කාලය (Aging)</th>
                          <th className="py-3.5 px-6 text-right">ක්‍රියාමාර්ග (Quick Action)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {debtors
                          .filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()))
                          .map(d => (
                            <tr key={d.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="py-4 px-6 font-bold text-indigo-650">{d.id}</td>
                              <td className="py-4 px-6 font-extrabold text-slate-800">{d.name}</td>
                              <td className="py-4 px-6 text-slate-500 font-semibold">{d.lastPayDate}</td>
                              <td className="py-4 px-6 font-black text-indigo-600">Rs. {d.outstanding.toLocaleString()}.00</td>
                              <td className="py-4 px-6 font-bold">
                                <span className={`inline-flex items-center gap-1 text-[10px] border rounded-xl px-2 py-0.5 font-bold ${
                                  d.status.includes("Overdue") ? "bg-rose-50 text-rose-700 border-rose-100" : "bg-slate-50 text-slate-600 border-slate-200"
                                }`}>
                                  {d.status}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-right">
                                <Button
                                  size="sm"
                                  onClick={() => sendSMSReminder(d.name, d.outstanding)}
                                  className="h-7 text-[10px] bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-extrabold shadow-sm"
                                >
                                  SMS Reminder
                                </Button>
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

          {/* 7. SUPPLIER DIRECTORY */}
          {currentView === "supplier" && (
            <div className="space-y-6 animate-fade-in">
              <Card className="rounded-2xl border-slate-200/80 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
                <CardHeader className="border-b border-slate-100 p-6 bg-slate-50/20">
                  <CardTitle className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <Package className="w-4.5 h-4.5 text-indigo-500" />
                    සැපයුම්කරුවන්ගේ නාමාවලිය (Raw Materials Suppliers Database)
                  </CardTitle>
                  <CardDescription className="text-xs">
                    සෝයා පිටි, පොල්තෙල්, වී සහ ඇසුරුම් ද්‍රව්‍ය සපයනු ලබන ලියාපදිංචි සැපයුම් සමාගම් විස්තර.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                          <th className="py-3.5 px-6">ID</th>
                          <th className="py-3.5 px-6">ආයතන නම (Supplier)</th>
                          <th className="py-3.5 px-6">ස්ථානය (Location)</th>
                          <th className="py-3.5 px-6">සපයන අයිතම (Supplied Materials)</th>
                          <th className="py-3.5 px-6 text-right">ගිවිසුම (Status)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {suppliers
                          .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.items.toLowerCase().includes(searchTerm.toLowerCase()))
                          .map(s => (
                            <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="py-4 px-6 font-bold text-indigo-650">{s.id}</td>
                              <td className="py-4 px-6 font-extrabold text-slate-800">{s.name}</td>
                              <td className="py-4 px-6 text-slate-500 font-semibold">{s.location}</td>
                              <td className="py-4 px-6 text-slate-550 font-semibold">{s.items}</td>
                              <td className="py-4 px-6 text-right">
                                <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-xl px-2 py-0.5 font-bold">
                                  {s.status}
                                </span>
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

          {/* 8. EXPENSES LOG */}
          {currentView === "expenses" && (
            <div className="space-y-6 animate-fade-in">
              <Card className="rounded-2xl border-slate-200/80 bg-white dark:bg-slate-900 shadow-sm overflow-hidden border-rose-100">
                <CardHeader className="border-b border-slate-100 p-6 bg-rose-50/[0.05]">
                  <CardTitle className="text-sm font-extrabold text-rose-700 flex items-center gap-2">
                    <CircleDollarSign className="w-4.5 h-4.5 text-rose-500" />
                    වියදම් ලෙජරය සහ වවුචර් ලොගය (Expenses Voucher Log)
                  </CardTitle>
                  <CardDescription className="text-xs">
                    ප්‍රවාහන ඩීසල් පිරිවැය, නඩත්තු ගාස්තු, සුබසාධන සහ විදුලි බිල්පත් පිරිවැය මෙහෙයුම් ලොගය.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                          <th className="py-3.5 px-6">Voucher ID</th>
                          <th className="py-3.5 px-6">වියදම් විස්තරය (Expense Description)</th>
                          <th className="py-3.5 px-6">වියදම් කාණ්ඩය (Category)</th>
                          <th className="py-3.5 px-6">ලොග් කළ දිනය (Date)</th>
                          <th className="py-3.5 px-6">මුදල Rs. (Voucher Amount)</th>
                          <th className="py-3.5 px-6 text-right">අනුමැතිය (Approval Status)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {expenses
                          .filter(e => e.title.toLowerCase().includes(searchTerm.toLowerCase()) || e.category.toLowerCase().includes(searchTerm.toLowerCase()))
                          .map(e => (
                            <tr key={e.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="py-4 px-6 font-bold text-indigo-650">{e.id}</td>
                              <td className="py-4 px-6 font-extrabold text-slate-800">{e.title}</td>
                              <td className="py-4 px-6 text-slate-500 font-semibold">{e.category}</td>
                              <td className="py-4 px-6 text-slate-400 font-semibold">{e.date}</td>
                              <td className="py-4 px-6 font-black text-rose-600">Rs. {e.amount.toLocaleString()}.00</td>
                              <td className="py-4 px-6 text-right">
                                <span className={`inline-flex items-center gap-1 text-[10px] border rounded-xl px-2 py-0.5 font-bold ${
                                  e.status === "Approved" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-amber-50 text-amber-700 border-amber-100 animate-pulse"
                                }`}>
                                  {e.status}
                                </span>
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

          {/* 9. COMPANY MANAGERS DIRECTORY */}
          {currentView === "managers" && (
            <div className="space-y-6 animate-fade-in">
              <Card className="rounded-2xl border-slate-200/80 bg-white dark:bg-slate-900 shadow-sm p-6">
                <CardHeader className="p-0 pb-6 border-b border-slate-150 mb-6">
                  <CardTitle className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-indigo-500" />
                    සමාගම් කළමනාකාර නාමාවලිය (Managers & Representatives)
                  </CardTitle>
                  <CardDescription className="text-xs">
                    TheERP නිෂ්පාදන, ඇසුරුම්, ප්‍රවාහන සහ කලාපීය විකුණුම් භාර ප්‍රධාන නියෝජිතයින් සහ ඔවුන්ගේ OEE කාර්යසාධන ශ්‍රේණි.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid gap-6 md:grid-cols-2">
                    {managers
                      .filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.role.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map(m => (
                        <div key={m.id} className="p-5 bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 flex items-start gap-4 hover:shadow-md hover:border-indigo-150 transition-all duration-300">
                          {/* Manager Stylized Avatar */}
                          <div className={`w-12 h-12 rounded-2xl ${m.color} text-white font-extrabold flex items-center justify-center flex-shrink-0 text-sm shadow-md`}>
                            {m.initial}
                          </div>
                          <div className="flex-1 min-w-0 space-y-2 text-xs">
                            <div>
                              <div className="flex items-center justify-between">
                                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white truncate">{m.name}</h4>
                                <Badge className="bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 border-indigo-100 font-bold text-[9px] hover:bg-indigo-50">{m.id}</Badge>
                              </div>
                              <p className="text-[11px] font-bold text-indigo-600 mt-0.5">{m.role}</p>
                            </div>
                            <div className="space-y-1 text-slate-500">
                              <span className="flex items-center gap-1.5 font-semibold">
                                <MapPin className="w-3.5 h-3.5 text-slate-400" /> {m.branch}
                              </span>
                              <span className="flex items-center gap-1.5 font-semibold">
                                <Phone className="w-3.5 h-3.5 text-slate-400" /> {m.phone}
                              </span>
                            </div>
                            
                            {/* Performance OEE index indicator */}
                            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px]">
                              <span className="text-slate-400 font-bold">ක්‍රියාකාරී කාර්යක්ෂමතාව (OEE Score):</span>
                              <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-xl border border-emerald-100 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-500" /> {m.OEE}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
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
