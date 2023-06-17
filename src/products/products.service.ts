import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { Product} from './product.model'
import { Model } from 'mongoose';

@Injectable()
export class ProductsService{
    products: Product[];

    constructor(@InjectModel('Product') private readonly productModel : Model<Product>) {
        this.products = [];
      }
    
    async insertProduct(title: string, description: string, price: number){
        const newProduct = new this.productModel({
            title, 
            description, 
            price
        })
        const result = await newProduct.save()
        return result.id
    }

    async getProducts(){
        const Products = await this.productModel.find().exec()
        return Products as Product[]
    }

    async getSingleProduct(prodId: string){
        try{
            const product =  await this.findProduct(prodId)
            return product
        }catch{
            throw new NotFoundException("Could not find product")
        }
    }
    
   async  updateProduct(prodId: string, title: string, desc: string , price: number){
        const updatedProduct = await this.findProduct(prodId)
        if(title){
            updatedProduct.title = title
        }
        if(desc){
            updatedProduct.description = desc
        }
        if(price){
            updatedProduct.price = price
        }
        return updatedProduct.save()
    }

    async deleteProduct(id: string): Promise <any>{
        const product = await this.findProduct(id)
                console.log ("Product Deleted")
    }

    private async findProduct(id: string) :Promise<Product>{
        const product = await this.productModel.findById(id)
        if(!product){
            throw new NotFoundException("Could not find product")
        }
        return product
    }
}