"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"

interface ServerActionResponse {
  success: boolean
  error?: string
}

/**
 * Load Lorry Action
 * Deducts specified quantity from the FinishedGood main stock and dispatches a Lorry.
 */
export async function loadLorryAction(
  lorryId: string,
  finishedGoodId: string,
  quantity: number
): Promise<ServerActionResponse> {
  try {
    // 1. Validation
    if (!lorryId.trim()) {
      return { success: false, error: "Lorry ID cannot be empty." }
    }
    if (!finishedGoodId) {
      return { success: false, error: "A finished good batch must be selected." }
    }
    if (quantity <= 0) {
      return { success: false, error: "Load quantity must be a positive integer." }
    }

    // 2. Perform transaction
    const result = await prisma.$transaction(async (tx) => {
      // Find the FinishedGood stock
      const good = await tx.finishedGood.findUnique({
        where: { id: finishedGoodId },
      })

      if (!good) {
        throw new Error("Finished Good batch was not found.")
      }

      if (good.stock < quantity) {
        throw new Error(`Insufficient stock. Current stock is ${good.stock} units.`)
      }

      // Deduct quantity from stock
      await tx.finishedGood.update({
        where: { id: finishedGoodId },
        data: {
          stock: good.stock - quantity,
        },
      })

      // Create a LorryInventory manifest
      const manifest = [{ finishedGoodId, batchNumber: good.batchNumber, qty: quantity }]

      await tx.lorryInventory.create({
        data: {
          lorryId: lorryId.trim(),
          items: JSON.stringify(manifest),
          status: "In_Transit",
        },
      })

      return { success: true }
    })

    revalidatePath("/inventory")
    return result
  } catch (err: unknown) {
    console.error("Error in loadLorryAction:", err)
    const errorMsg = err instanceof Error ? err.message : "An unexpected database error occurred."
    return { success: false, error: errorMsg }
  }
}

/**
 * Unload Returns Action
 * Marks Lorry status as Returned and restores its items back to the FinishedGood main stock.
 */
export async function unloadReturnsAction(lorryInventoryId: string): Promise<ServerActionResponse> {
  try {
    if (!lorryInventoryId) {
      return { success: false, error: "A lorry shipment must be selected." }
    }

    const result = await prisma.$transaction(async (tx) => {
      // Find the LorryInventory record
      const lorry = await tx.lorryInventory.findUnique({
        where: { id: lorryInventoryId },
      })

      if (!lorry) {
        throw new Error("Lorry shipment was not found.")
      }

      if (lorry.status === "Returned") {
        throw new Error("This lorry shipment has already been returned.")
      }

      // Parse manifest items
      let manifest: { finishedGoodId: string; batchNumber: string; qty: number }[] = []
      try {
        manifest = JSON.parse(lorry.items)
      } catch {
        throw new Error("Failed to parse the lorry inventory item manifest.")
      }

      // Add quantities back to FinishedGood stock
      for (const item of manifest) {
        const good = await tx.finishedGood.findUnique({
          where: { id: item.finishedGoodId },
        })

        if (good) {
          await tx.finishedGood.update({
            where: { id: item.finishedGoodId },
            data: {
              stock: good.stock + item.qty,
            },
          })
        }
      }

      // Update Lorry status to Returned
      await tx.lorryInventory.update({
        where: { id: lorryInventoryId },
        data: {
          status: "Returned",
        },
      })

      return { success: true }
    })

    revalidatePath("/inventory")
    return result
  } catch (err: unknown) {
    console.error("Error in unloadReturnsAction:", err)
    const errorMsg = err instanceof Error ? err.message : "An unexpected database error occurred."
    return { success: false, error: errorMsg }
  }
}
