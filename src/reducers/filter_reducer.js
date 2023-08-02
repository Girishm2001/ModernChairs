import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    const allPrices = action.payload.map((p) => {
      return p.price;
    });
    const maximum = Math.max(...allPrices);
    return {
      ...state,
      filters: { ...state.filters, price: maximum, maxprice: maximum },
      allProducts: [...action.payload],
      filteredProducts: [...action.payload],
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, isGridview: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, isGridview: false };
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  if (action.type === SORT_PRODUCTS) {
    let tempProducts = [...state.filteredProducts];
    if (state.sort === "price-lowest")
      tempProducts = tempProducts.sort((a, b) => {
        return a.price - b.price;
      });
    if (state.sort === "price-highest")
      tempProducts = tempProducts.sort((a, b) => {
        return b.price - a.price;
      });
    if (state.sort === "name-a")
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    if (state.sort === "name-z")
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    return { ...state, filteredProducts: tempProducts };
  }
  if (action.type === UPDATE_FILTERS) {
    const name = action.payload.name;
    const value = action.payload.value;
    return {
      ...state,
      filters: { ...state.filters, [name]: value },
    };
  }
  if (action.type === FILTER_PRODUCTS) {
    const { allProducts } = state;
    const { company, color, price, text, shipping, category } = state.filters;
    let tempProducts = [...allProducts];
    if (text) {
      tempProducts = tempProducts.filter((prod) => {
        return prod.name.toLowerCase().startsWith(text);
      });
    }
    if (category) {
      if (category !== "all") {
        tempProducts = tempProducts.filter((prod) => {
          return prod.category === category;
        });
      }
    }
    if (company) {
      if (company !== "all") {
        tempProducts = tempProducts.filter((prod) => {
          return prod.company === company;
        });
      }
    }

    if (color !== "all") {
      tempProducts = tempProducts.filter((prod) => {
        return prod.colors.find((coloritem) => coloritem === color);
      });
    }
    if (price) {
      tempProducts = tempProducts.filter((prod) => {
        return prod.price <= price;
      });
    }
    if (shipping) {
      tempProducts = tempProducts.filter((prod) => {
        return prod.shipping === true;
      });
    }
    return { ...state, filteredProducts: tempProducts };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        category: "all",
        company: "all",
        color: "all",
        text: "",
        shipping: false,
        price: state.filters.maxprice,
      },
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
