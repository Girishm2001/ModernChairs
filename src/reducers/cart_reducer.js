import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    const tempitem = state.cart.find((item) => item.id === id + color);
    if (tempitem) {
      const tempcart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newamount = cartItem.amount + amount;
          if (newamount > cartItem.max) {
            newamount = cartItem.max;
          }
          return { ...cartItem, amount: newamount };
        } else {
          return cartItem;
        }
      });
      return { ...state, cart: tempcart };
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        price: product.price,
        image: product.images[0].url,
        max: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }
  if (action.type === REMOVE_CART_ITEM) {
    let tempcart = state.cart.filter((c) => c.id !== action.payload);
    return { ...state, cart: tempcart };
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const tempcart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload.id) {
        let newamount = cartItem.amount;
        if (action.payload.value === "increase") {
          newamount = newamount + 1;
          if (newamount > cartItem.max) {
            newamount = cartItem.max;
          }
        }
        if (action.payload.value === "decrease") {
          newamount = newamount - 1;
          if (newamount < 1) {
            newamount = 1;
          }
        }
        return { ...cartItem, amount: newamount };
      } else {
        return cartItem;
      }
    });
    return { ...state, cart: tempcart };
  }
  if (action.type === COUNT_CART_TOTALS) {
    const { totalitems, totalprice } = state.cart.reduce(
      (total, cartItem) => {
        total.totalitems += cartItem.amount;
        total.totalprice += cartItem.price * cartItem.amount;
        return total;
      },
      {
        totalitems: 0,
        totalprice: 0,
      }
    );
    return { ...state, totalitems, totalprice };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
