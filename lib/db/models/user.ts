import { ObjectId } from "mongodb"

export interface User {
  _id?: ObjectId
  id: string
  email: string
  name: string
  role: "superadmin" | "admin" | "customer"
  password?: string
  audience?: "pro" | "particulier"
  provider?: "google" | "linkedin"
  createdAt: Date
  updatedAt: Date
}

export interface CustomerUser {
  _id?: ObjectId
  id: string
  email: string
  name: string
  audience?: "pro" | "particulier"
  provider?: "google" | "linkedin"
  createdAt: Date
  updatedAt: Date
}