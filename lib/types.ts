export interface Product {
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
  createdAt: Date
  updatedAt: Date
  audience?: "pro" | "particulier" | "both"
}

export interface TechnicalFile {
  id: string
  name: string
  type: "pdf" | "doc" | "image"
  url: string
  size: number
}

export interface ProductCategory {
  id: string
  name: string
  description: string
  image?: string
  subcategories: ProductSubcategory[]
}

export interface ProductSubcategory {
  id: string
  name: string
  description: string
  image?: string
}

export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  addedAt: Date
}

export interface Cart {
  id: string
  items: CartItem[]
  total: number
  createdAt: Date
  updatedAt: Date
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  createdAt: Date
}
