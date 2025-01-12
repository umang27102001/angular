import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { IProduct } from "../../Models/Product";
import * as AppState from "../../state/app.state"
import * as AppAction from "./product.list.action"

export interface State extends AppState.State{
  "products-list": ProductState
}

export interface ProductState{
  showProductCode: boolean,
  currentProduct: IProduct| null,
  products: IProduct[]
}

const initialState: ProductState = {
  currentProduct: null,
  products: [{
      categoryId: 0,
      discount: 0,
      id:0,
      imageUrl:'',
      productCode:'',
      categoryName:'',
      description:'',
      name:'',
      price:0
    }
  ],
  showProductCode: true
};

const getFeatureSelector = createFeatureSelector<ProductState>('products-list');
export const getShowProductCode = createSelector(getFeatureSelector, state => state.showProductCode);
export const allProducts = createSelector(getFeatureSelector, state => state.products);
export const getProduct = createSelector(getFeatureSelector, state => state.currentProduct);

export const productListReducer = createReducer<ProductState>(
  initialState,
  on(AppAction.toogleProductCode, (state): ProductState=>{
    return {
      ... state,
      showProductCode: !state.showProductCode,
    }
  }),
  on(AppAction.setCurrentProduct, (state, {product})=>{
    return {
      ...state,
      currentProduct: product }
  }),
  on(AppAction.clearCurrentProduct, (state): ProductState=>{
    return {
      ...state,
      products: state.products.filter(product => product.id != state.currentProduct?.id),
      currentProduct: null
    }
  }),
  on(AppAction.injectAllProducts, (state, action)=>{
    return {
      ...state,
      products: action.products
    }
  }),
  on(AppAction.initializeCurrentProduct, state =>{
    return {
      ...state,
      currentProduct: {
        categoryId: 0,
        discount: 0,
        id:0,
        imageUrl:'',
        productCode:'',
        categoryName:'',
        description:'',
        name:'',
        price:0
      }
    }
  }),)
