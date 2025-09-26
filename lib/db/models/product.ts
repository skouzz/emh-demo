import { ObjectId } from "mongodb"

export interface TechnicalFile {
  id: string
  name: string
  type: "pdf" | "doc" | "image"
  url: string
  size: number
}

export interface ProductSubcategory {
  id: string
  name: string
  description: string
  image?: string
}

export interface ProductCategory {
  _id?: ObjectId
  id: string
  name: string
  description: string
  image?: string
  subcategories: ProductSubcategory[]
  createdAt: Date
  updatedAt: Date
}

export interface Product {
  _id?: ObjectId
  id: string
  name: string
  reference: string
  description: string
  category: string
  subcategory?: string
  characteristics: Record<string, string>
  technicalSpecs: Record<string, string>
  images: string[]
  technicalFiles: TechnicalFile[]
  price?: number
  availability: "in-stock" | "out-of-stock" | "on-order"
  featured: boolean
  audience?: "pro" | "particulier" | "both"
  createdAt: Date
  updatedAt: Date
}