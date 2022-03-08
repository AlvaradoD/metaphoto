export interface ProductDetail {
  Cod_Product:string,
  Description: string,
  bcunit: string,
  bcqty:string
}

export interface ProductSearch {
  product: string,
  description: string,
  code_old:string
}
export interface ProductData{
  productcode:string
  lotnumber:string
  description:string
  unitsXpack:number
}
