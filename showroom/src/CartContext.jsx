import { createContext,useState } from "react";
import { getProductData, ProductsArray } from "./Products";

import React from 'react'

 export const CartContext = createContext({
  items:[],
  getProductQuantity:()=>{},
  addOneToCart:()=>{},
  removeOneFromCart:()=>{},
  deleteFromcart:()=>{},
  getTotalCost:()=>{}
});

export function CartProvider({children}){
  const [cartProducts,setCartProducts] = useState([]);

  function getProductQuantity(id){
    const quantity = cartProducts.find(product=> product.id===id)?.quantity

    if(quantity==undefined) return 0;

    return quantity;
  }

  function addOneToCart(id){
    const quantity=getProductQuantity(id);
    if(quantity===0){
      setCartProducts(
        [
          ...cartProducts,
          {
            id:id,
            quantity:1
          }
        ]
      )
    }else{
      setCartProducts(
        cartProducts.map(
          product=>product.id===id?{...product,quantity:product.quantity+1}:product
        )
      )
    }
  }

  function removeOneFromCart(id){
    const quantity=getProductQuantity(id);

    if(quantity==1){
      deleteFromcart(id);
    }else{
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product,
        ),
      );
    }
  }

  function deleteFromcart(id){
    setCartProducts(
      cartProducts=>cartProducts.filter(currentProduct=>{
        return currentProduct.id!=id;
      })
    )
  }

  function getTotalCost(){
    let totalCost=0;
    cartProducts.map((cartItem)=>{
      const productData=getProductData(cartItem.id);
      totalCost+=(productData.price*cartItem.quantity)
    })
    return totalCost;
  }

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromcart,
    getTotalCost,
  };

  return(
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}

// export default CartProvider;