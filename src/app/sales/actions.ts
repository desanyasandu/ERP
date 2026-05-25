"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export interface DisbursePettyCashInput {
  driverName: string
  amount: number
  reason: string
}

/**
 * Creates a new PettyCash advance record in the database
 * and revalidates the sales ledger route to show live updates.
 */
export async function disbursePettyCashAction(input: DisbursePettyCashInput) {
  if (!input.driverName || typeof input.driverName !== "string" || input.driverName.trim() === "") {
    return { success: false, error: "Driver name is required." }
  }

  if (isNaN(input.amount) || input.amount <= 0) {
    return { success: false, error: "A valid positive amount is required." }
  }

  if (!input.reason || typeof input.reason !== "string" || input.reason.trim() === "") {
    return { success: false, error: "Reason for advance is required." }
  }

  try {
    await prisma.pettyCash.create({
      data: {
        driverName: input.driverName.trim(),
        amount: Number(input.amount),
        reason: input.reason.trim(),
      },
    })

    revalidatePath("/sales")
    return { success: true }
  } catch (error) {
    console.error("Failed to disburse petty cash:", error)
    return { success: false, error: "Internal server error while saving record." }
  }
}
