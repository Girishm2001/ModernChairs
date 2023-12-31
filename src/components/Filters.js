import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";

const Filters = () => {
  const {
    filters: {
      text,
      color,
      category,
      maxprice,
      minprice,
      price,
      company,
      shipping,
    },
    updatefilters,
    allProducts,
    clearfilters,
  } = useFilterContext();
  const uniquecategory = getUniqueValues(allProducts, "category");
  const uniquecolor = getUniqueValues(allProducts, "colors");
  const uniquecompany = getUniqueValues(allProducts, "company");
  return (
    <Wrapper>
      <div className="content">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {/* textinput */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="search"
              className="search-input"
              value={text}
              onChange={updatefilters}
            />
          </div>
          {/* category-input */}
          <div className="form-control">
            <h5>Categories:</h5>
            <select
              type="select"
              name="category"
              className="category"
              value={category}
              onChange={updatefilters}
            >
              {uniquecategory.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          {/* company input */}
          <div className="form-control">
            <h5>Company:</h5>
            {uniquecompany.map((item, index) => {
              return (
                <button
                  key={index}
                  type="button"
                  name="company"
                  className={`${
                    company === item.toLowerCase() ? "active" : null
                  }`}
                  onClick={updatefilters}
                >
                  {item}
                </button>
              );
            })}
          </div>
          {/* color-input */}
          <div className="form-control">
            <h5>Colors:</h5>
            <div className="colors">
              {uniquecolor.map((item, index) => {
                if (item === "all") {
                  return (
                    <button
                      key={"all"}
                      type="button"
                      name="color"
                      data-color="all"
                      className={`${
                        color === "all" ? "all-btn active" : "all-btn"
                      }`}
                      onClick={updatefilters}
                    >
                      all
                    </button>
                  );
                }
                return (
                  <button
                    key={index}
                    type="button"
                    name="color"
                    style={{ background: item }}
                    data-color={item}
                    className={`${
                      color === item ? "color-btn active" : "color-btn"
                    }`}
                    onClick={updatefilters}
                  >
                    {item === color ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>
          {/* price input */}
          <div className="form-control">
            <h5>price:</h5>
            <p>{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              min={minprice}
              max={maxprice}
              value={price}
              onChange={updatefilters}
            />
          </div>
          {/* shipping input */}
          <div className="form-control shipping">
            <label htmlFor="shipping">Free Shipping</label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              checked={shipping}
              onChange={updatefilters}
            />
          </div>
        </form>
        <button className="clear-btn" onClick={clearfilters}>
          Clear Filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .category {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
