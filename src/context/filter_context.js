import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  allProducts: [],
  filteredProducts: [],
  isGridview: true,
  sort: "price-lowest",
  filters: {
    category: "all",
    company: "all",
    color: "all",
    text: "",
    shipping: false,
    minprice: 0,
    price: 0,
    maxprice: 0,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext();

  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);
  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort, state.filters]);
  useEffect(() => {}, [products, state.filters]);
  const setListview = () => {
    dispatch({ type: SET_LISTVIEW });
  };
  const setGridview = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const updatesort = (e) => {
    dispatch({ type: UPDATE_SORT, payload: e.target.value });
  };
  const updatefilters = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "company") {
      value = e.target.textContent;
    }
    if (name === "color") {
      value = e.target.dataset.color;
    }
    if (name === "price") {
      value = Number(value);
    }
    if (name === "shipping") {
      value = e.target.checked;
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };
  const clearfilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };
  return (
    <FilterContext.Provider
      value={{
        ...state,
        setListview,
        setGridview,
        updatesort,
        updatefilters,
        clearfilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
