import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const products_reducer = (state, action) => {
  if (action.type === SIDEBAR_OPEN) return { ...state, isSidebaropen: true };
  if (action.type === SIDEBAR_CLOSE) return { ...state, isSidebaropen: false };
  if (action.type === GET_PRODUCTS_BEGIN)
    return { ...state, products_loading: true };
  if (action.type === GET_PRODUCTS_SUCCESS) {
    const products = action.payload.data;
    const featuredProducts = products.filter((product) => {
      return product.featured === true;
    });
    return {
      ...state,
      products_loading: false,
      products: products,
      featuredProducts: featuredProducts,
    };
  }
  if (action.type === GET_PRODUCTS_ERROR)
    return { ...state, products_loading: false, products_error: true };

  if (action.type === GET_SINGLE_PRODUCT_BEGIN)
    return {
      ...state,
      single_product_loading: true,
      single_product_error: false,
    };
  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    const product = action.payload.data;
    return {
      ...state,
      single_product_loading: false,
      singleproduct: product,
    };
  }
  if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return {
      ...state,
      single_product_loading: false,
      single_product_error: true,
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;
