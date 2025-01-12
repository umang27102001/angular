import { createAction, props } from "@ngrx/store";
import { IProduct } from "../../Models/Product";

export const toogleProductCode = createAction(
  '[Product] Toogle Product Code'
);

export const setCurrentProduct = createAction(
  '[Product] Set Current Product',
  props<{product: IProduct}>()
);

export const clearCurrentProduct = createAction(
  '[Product] Clear Current Product'
);

export const initializeCurrentProduct = createAction(
  '[Product] initialize Product'
);

export const injectAllProducts = createAction(
  '[Product] inject all products',
  props<{products: IProduct[]}>()
)
