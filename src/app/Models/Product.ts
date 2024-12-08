export interface IProduct{
    id: number,
    name?: string,
    price?:number,
    description?:string,
    categoryId: number,
    categoryName: string,
    imageUrl:string,
    discount: number
}