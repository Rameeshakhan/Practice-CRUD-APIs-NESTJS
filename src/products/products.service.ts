import { Injectable, NotFoundException } from '@nestjs/common'

import { Product} from './product.model'

@Injectable()
export class ProductsService{
    products: Product[];

    constructor() {
        this.products = [];
      }
    
    insertProduct(title: string, description: string, price: number){
        const id = Math.random().toString()
        const newProduct = new Product(id, title , description, price)
        this.products.push(newProduct)
        return this.products
    }

    getProducts(){
        return this.products
    }

    getSingleProduct(prodId: string){
       const product = this.findProduct(prodId)[0]
       return product
    }
    
    updateProduct(prodId: string, title: string, desc: string , price: number){
        const [product, index] = this.findProduct(prodId)
        const updatedProduct = {...product}
        if(title){
            updatedProduct.title = title
        }
        if(desc){
            updatedProduct.description = desc
        }
        if(price){
            updatedProduct.price = price
        }
        return this.products[index] = updatedProduct
    }

    deleteProduct(id: string){
        const index = this.findProduct(id)[1]
        this.products.splice(index, 1)
        return "Product Deleted"
    }

    private findProduct(id: string) :[Product, number]{
        const productIndex = this.products.findIndex(prod => prod.id === id)
        const product = this.products[productIndex]
        if(!product){
            throw new NotFoundException("Could not find product")
        }
        return [product , productIndex]
    }
}