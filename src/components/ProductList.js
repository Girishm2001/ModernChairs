import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filteredProducts: products, isGridview } = useFilterContext();
  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: "none" }}>
        Sorry No products match your search....
      </h5>
    );
  }

  return isGridview === true ? (
    <GridView products={products} />
  ) : (
    <ListView products={products} />
  );
};

export default ProductList;
