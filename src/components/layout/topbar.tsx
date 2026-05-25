"use client"

import React, { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Bell, Search, Sun, Moon, Menu, ChevronDown, LogOut, User, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Sidebar from "@/components/layout/sidebar"

export default function Topbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  // Ensure theme rendering matches on client
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 md:px-8 dark:border-slate-800 dark:bg-slate-900/90 transition-colors duration-200">
        <div className="w-64 animate-pulse h-8 bg-slate-100 dark:bg-slate-800 rounded-md" />
        <div className="w-32 animate-pulse h-8 bg-slate-100 dark:bg-slate-800 rounded-md" />
      </header>
    )
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 md:px-8 dark:border-slate-800 transition-colors duration-300">
      
      {/* Search & Mobile Menu Drawer */}
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile Menu Trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9 text-slate-500 hover:text-slate-950 dark:hover:text-white rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
            <Sidebar className="w-full border-r-0" />
          </SheetContent>
        </Sheet>

        {/* Global Search Bar */}
        <div className="relative hidden sm:flex max-w-md w-full">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-indigo-500 transition-colors" />
          <Input
            type="search"
            placeholder="Search transactions, inventory logs..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus-visible:bg-white dark:bg-slate-900/50 focus-visible:ring-1 focus-visible:ring-indigo-500 dark:focus-visible:ring-indigo-400 focus:border-indigo-500 transition-all duration-200"
          />
        </div>
      </div>

      {/* Right Action Icons */}
      <div className="flex items-center gap-3">
        {/* Dark/Light Mode Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-9 w-9 text-slate-500 hover:text-slate-950 dark:hover:text-white rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
          title="Toggle Theme"
        >
          {theme === "dark" ? (
            <Sun className="h-4.5 w-4.5 text-amber-500 transition-transform duration-300 hover:rotate-90" />
          ) : (
            <Moon className="h-4.5 w-4.5 text-indigo-600 transition-transform duration-300 hover:-rotate-12" />
          )}
        </Button>

        {/* Notifications Dropdown */}
        <DropdownMenu open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9 text-slate-500 hover:text-slate-950 dark:hover:text-white rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
            >
              <Bell className="h-4.5 w-4.5" />
              {/* Alert badge indicator */}
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-2 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-2">
            <DropdownMenuLabel className="flex justify-between items-center px-2 py-1.5 text-sm font-semibold text-slate-900 dark:text-white">
              <span>Notifications</span>
              <span className="text-xs font-normal text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">Mark all as read</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
            <div className="max-h-64 overflow-y-auto space-y-1 py-1 custom-scrollbar">
              <div className="flex gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition">
                <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-emerald-500" />
                <div className="flex-1 text-xs">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Production Run #846 Completed</p>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">Batch ERP-P846 is verified and items are dispatched.</p>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">5 mins ago</span>
                </div>
              </div>
              <div className="flex gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition">
                <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-amber-500" />
                <div className="flex-1 text-xs">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Low Stock Alert: Silicon Wafers</p>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">Quantity fell below safety buffer (150 units left).</p>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">2 hours ago</span>
                </div>
              </div>
              <div className="flex gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition">
                <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-violet-500" />
                <div className="flex-1 text-xs">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Enterprise Sale Confirmed</p>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">Payment received from Acme Corp for Order #1004.</p>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">4 hours ago</span>
                </div>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <span className="h-5 w-px bg-slate-200 dark:bg-slate-800 hidden sm:inline" />

        {/* User Account Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer group p-1 pr-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition duration-200">
              <Avatar className="h-8.5 w-8.5 border-2 border-indigo-50 dark:border-indigo-950 shadow-sm group-hover:scale-105 transition-transform duration-200">
                <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Sarah Miller" />
                <AvatarFallback className="bg-indigo-500 text-white text-xs">SM</AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">Sarah Miller</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 leading-none">Operations Administrator</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-white transition duration-200 hidden md:block" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-2 shadow-lg">
            <DropdownMenuLabel className="px-2 py-1.5 text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
            <DropdownMenuItem className="flex gap-2.5 items-center px-2 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition">
              <User className="w-4 h-4 text-slate-400" />
              <span>Profile Details</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-2.5 items-center px-2 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition">
              <Settings className="w-4 h-4 text-slate-400" />
              <span>System Preferences</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
            <DropdownMenuItem className="flex gap-2.5 items-center px-2 py-2 rounded-lg text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer transition">
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </header>
  )
}
