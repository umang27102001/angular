export interface IProduct{
    id: number,
    name?: string,
    price?:number,
    description?:string,
    category?: string,
    imageUrl:string,
    discount: number
}