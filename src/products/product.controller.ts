import { Controller, Post , Body, Get, Param , Patch, Delete} from '@nestjs/common'
import { ProductsService } from './products.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  async addProduct(
    @Body() body: any,
  ): Promise<any> {
    const generatedID = await this.productService.insertProduct(body.title, body.description, body.price);
    return  {id: generatedID};
  }

  @Get()
  async getAllProducts(){
    const products = await this.productService.getProducts()
    return products.map(prod => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price
    }))
  }

  @Get(':id')
  getProduct(@Param('id') prodId : string){
    return this.productService.getSingleProduct(prodId)
  }

  @Patch(':id')
  updateProduct(@Param('id') prodId: string, @Body() body: any): any {
    return this.productService.updateProduct(prodId, body.title, body.description, body.price);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') prodId: string, ) : Promise<any> {
    const result = await this.productService.deleteProduct(prodId)
  }
  
}
