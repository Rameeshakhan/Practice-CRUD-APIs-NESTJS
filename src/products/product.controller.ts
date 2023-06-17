import { Controller, Post , Body, Get, Param , Patch, Delete} from '@nestjs/common'
import { ProductsService } from './products.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  addProduct(
    @Body() body: any,
  ): any {
    const data = this.productService.insertProduct(body.title, body.description, body.price);
    return  data ;
  }

  @Get()
  getAllProducts(){
    return this.productService.getProducts()
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
  deleteProduct(@Param('id') prodId: string, ) : any{
    return this.productService.deleteProduct(prodId)
  }
  
}
