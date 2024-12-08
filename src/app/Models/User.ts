import { IProduct } from "./Product"

export interface IUser{
    id: number,
    name: string,
    email:string,
    password:string,
    contact:string,
    address:string
    products:IProduct[]
}