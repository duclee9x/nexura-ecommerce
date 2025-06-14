/**
 * Database Connection Utility
 *
 * This is a placeholder for a real database connection.
 * In a production app, you would use a proper database client.
 */

import type { PaginatedResponse } from "@/types/schema"

// Mock database for demo purposes
const mockDb = {
  products:   [] as any[],
  customers:  [] as any[],
  orders:     [] as any[],
  blog_posts: [] as any[],
  warehouses: [] as any[],
  users:      [] as any[],
}

export async function query<T>(
  table: keyof typeof mockDb,
  options?: {
    where?:          Record<string, any>
    limit?:          number
    offset?:         number
    orderBy?:        string
    orderDirection?: "asc" | "desc"
  },
): Promise<T[]> {
  // Simulate database query with delay
  await new Promise(resolve => setTimeout(resolve, 100))

  let results = [...mockDb[table]]

  // Apply where filters
  if (options?.where) {
    Object.entries(options.where).forEach(([ key, value ]) => {
      results = results.filter(item => item[key] === value)
    })
  }

  // Apply ordering
  if (options?.orderBy) {
    results.sort((a, b) => {
      const aValue = a[options.orderBy!]
      const bValue = b[options.orderBy!]

      if (options.orderDirection === "desc") {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }

      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    })
  }

  // Apply pagination
  if (options?.limit) {
    const offset = options.offset || 0
    results = results.slice(offset, offset + options.limit)
  }

  return results as T[]
}

export async function getById<T>(table: keyof typeof mockDb, id: string): Promise<T | null> {
  // Simulate database query with delay
  await new Promise(resolve => setTimeout(resolve, 50))

  const result = mockDb[table].find(item => item.id === id)
  return (result || null) as T | null
}

export async function insert<T>(table: keyof typeof mockDb, data: T): Promise<T> {
  // Simulate database insert with delay
  await new Promise(resolve => setTimeout(resolve, 150))

  // Generate an ID if not provided
  const dataWithId = {
    id:        (data as any).id || crypto.randomUUID(),
    createdAt: (data as any).createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...data,
  }

  mockDb[table].push(dataWithId)
  return dataWithId as T
}

export async function update<T>(table: keyof typeof mockDb, id: string, data: Partial<T>): Promise<T> {
  // Simulate database update with delay
  await new Promise(resolve => setTimeout(resolve, 150))

  const index = mockDb[table].findIndex(item => item.id === id)

  if (index === -1) {
    throw new Error(`Item with id ${id} not found in ${table}`)
  }

  const updatedData = {
    ...mockDb[table][index],
    ...data,
    updatedAt: new Date().toISOString(),
  }

  mockDb[table][index] = updatedData
  return updatedData as T
}

export async function remove(table: keyof typeof mockDb, id: string): Promise<boolean> {
  // Simulate database delete with delay
  await new Promise(resolve => setTimeout(resolve, 100))

  const index = mockDb[table].findIndex(item => item.id === id)

  if (index === -1) {
    return false
  }

  mockDb[table].splice(index, 1)
  return true
}

export async function paginate<T>(
  table: keyof typeof mockDb,
  options: {
    page:            number
    pageSize:        number
    where?:          Record<string, any>
    orderBy?:        string
    orderDirection?: "asc" | "desc"
  },
): Promise<PaginatedResponse<T>> {
  // Simulate database query with delay
  await new Promise(resolve => setTimeout(resolve, 200))

  let results = [...mockDb[table]]

  // Apply where filters
  if (options?.where) {
    Object.entries(options.where).forEach(([ key, value ]) => {
      results = results.filter(item => item[key] === value)
    })
  }

  // Get total before pagination
  const total = results.length

  // Apply ordering
  if (options?.orderBy) {
    results.sort((a, b) => {
      const aValue = a[options.orderBy!]
      const bValue = b[options.orderBy!]

      if (options.orderDirection === "desc") {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }

      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    })
  }

  // Apply pagination
  const page = options.page || 1
  const pageSize = options.pageSize || 10
  const offset = (page - 1) * pageSize

  results = results.slice(offset, offset + pageSize)

  return {
    items:      results as T[],
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
    hasMore:    page * pageSize < total,
  }
}