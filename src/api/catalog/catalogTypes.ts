import { IProduct } from "app-types";

export interface ICatalogPage {
  title: string
  products: Array<IProduct>
}