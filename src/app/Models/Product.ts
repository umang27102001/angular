export interface IProduct{
    id: number,
    name?: string,
    price?:number,
    description?:string,
    categoryId: number,
    categoryName: string,
    productCode:string,
    imageUrl:string,
    discount: number
}
