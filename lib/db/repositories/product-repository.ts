import { getDatabase } from "../connection"
import { Product, ProductCategory } from "../models/product"

export class ProductRepository {
  private async getProductCollection() {
    const db = await getDatabase()
    return db.collection<Product>("products")
  }

  private async getCategoryCollection() {
    const db = await getDatabase()
    return db.collection<ProductCategory>("categories")
  }

  // Product methods
  async findAllProducts(): Promise<Product[]> {
    const collection = await this.getProductCollection()
    return await collection.find({}).sort({ createdAt: -1 }).toArray()
  }

  async findProductById(id: string): Promise<Product | null> {
    const collection = await this.getProductCollection()
    return await collection.findOne({ id })
  }

  async findProductsByCategory(categoryId: string): Promise<Product[]> {
    const collection = await this.getProductCollection()
    return await collection.find({ category: categoryId }).toArray()
  }

  async findFeaturedProducts(): Promise<Product[]> {
    const collection = await this.getProductCollection()
    return await collection.find({ featured: true }).toArray()
  }

  async searchProducts(query: string): Promise<Product[]> {
    const collection = await this.getProductCollection()
    const regex = new RegExp(query, "i")
    
    return await collection.find({
      $or: [
        { name: { $regex: regex } },
        { reference: { $regex: regex } },
        { description: { $regex: regex } }
      ]
    }).toArray()
  }

  async createProduct(productData: Omit<Product, "_id">): Promise<Product> {
    const collection = await this.getProductCollection()
    
    const product: Product = {
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(product)
    return { ...product, _id: result.insertedId }
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    const collection = await this.getProductCollection()
    
    const result = await collection.findOneAndUpdate(
      { id },
      { 
        $set: { 
          ...updates, 
          updatedAt: new Date() 
        } 
      },
      { returnDocument: "after" }
    )

    return result || null
  }

  async deleteProduct(id: string): Promise<boolean> {
    const collection = await this.getProductCollection()
    const result = await collection.deleteOne({ id })
    return result.deletedCount > 0
  }

  // Category methods
  async findAllCategories(): Promise<ProductCategory[]> {
    const collection = await this.getCategoryCollection()
    return await collection.find({}).sort({ name: 1 }).toArray()
  }

  async findCategoryById(id: string): Promise<ProductCategory | null> {
    const collection = await this.getCategoryCollection()
    return await collection.findOne({ id })
  }

  async createCategory(categoryData: Omit<ProductCategory, "_id">): Promise<ProductCategory> {
    const collection = await this.getCategoryCollection()
    
    const category: ProductCategory = {
      ...categoryData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(category)
    return { ...category, _id: result.insertedId }
  }

  async updateCategory(id: string, updates: Partial<ProductCategory>): Promise<ProductCategory | null> {
    const collection = await this.getCategoryCollection()
    
    const result = await collection.findOneAndUpdate(
      { id },
      { 
        $set: { 
          ...updates, 
          updatedAt: new Date() 
        } 
      },
      { returnDocument: "after" }
    )

    return result || null
  }

  async deleteCategory(id: string): Promise<boolean> {
    const collection = await this.getCategoryCollection()
    
    // Check if any products use this category
    const productCollection = await this.getProductCollection()
    const productsInCategory = await productCollection.countDocuments({ category: id })
    
    if (productsInCategory > 0) {
      throw new Error(`Cannot delete category: ${productsInCategory} products are using this category`)
    }

    const result = await collection.deleteOne({ id })
    return result.deletedCount > 0
  }

  // Initialize default categories
  async initializeDefaultCategories(): Promise<void> {
    const collection = await this.getCategoryCollection()
    const count = await collection.countDocuments()
    
    if (count === 0) {
      const defaultCategories: Omit<ProductCategory, "_id">[] = [
        {
          id: "1",
          name: "Appareillage",
          description: "Interrupteurs, prises et accessoires",
          subcategories: [
            { id: "1-1", name: "Interrupteurs", description: "Gamme complète d'interrupteurs" },
            { id: "1-2", name: "Prises", description: "Prises électriques et spécialisées" },
            { id: "1-3", name: "Variateurs", description: "Variateurs d'éclairage" },
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2",
          name: "Tableaux Électriques",
          description: "Solutions de distribution électrique",
          subcategories: [
            { id: "2-1", name: "Coffrets", description: "Coffrets de distribution" },
            { id: "2-2", name: "Disjoncteurs", description: "Protection électrique" },
            { id: "2-3", name: "Accessoires", description: "Accessoires de tableau" },
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "3",
          name: "Domotique",
          description: "Solutions intelligentes MyHOME",
          subcategories: [
            { id: "3-1", name: "Éclairage", description: "Gestion intelligente de l'éclairage" },
            { id: "3-2", name: "Volets", description: "Automatisation des volets" },
            { id: "3-3", name: "Sécurité", description: "Systèmes de sécurité connectés" },
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "4",
          name: "Câblage",
          description: "Solutions de câblage et connectique",
          subcategories: [
            { id: "4-1", name: "Goulottes", description: "Goulottes et moulures" },
            { id: "4-2", name: "Conduits", description: "Conduits et accessoires" },
            { id: "4-3", name: "Connectique", description: "Bornes et connecteurs" },
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]

      await collection.insertMany(defaultCategories)
    }
  }
}

export const productRepository = new ProductRepository()