import React from 'react'

import {Button,Container,Navbar,Modal} from 'react-bootstrap'
import { useState, useContext } from "react";

import { CartContext } from '../CartContext';
import CartProduct from './CartProduct';

const NavComponent = () => {
  const cart = useContext(CartContext);

  const [show,setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const checkout=async()=>{
  //   await fetch('http://localhost:4000/checkout',{
  //     method:"POST",
  //     headers:{
  //       'Content-Type':'application/json'
  //     },
  //     body:JSON.stringify({items:cart.items})
  //   }).then((response)=>{
  //     return response.json();
  //   }).then((response)=>{
  //     if(response.url){
  //       window.location.assign(response.url);
  //     }
  //   })
  // }

  const checkout = async () => {
    // Convert total cost estimation directly to USD for a safety margin check
    const totalInUsd = cart.getTotalCost() * 0.012;

    if (totalInUsd < 0.5) {
      alert(
        "Stripe requires a minimum transaction amount equivalent to $0.50 USD (approx ₹45.00). Please add more items to your cart!",
      );
      return; // Halt the checkout function immediately
    }
    try {
      const response = await fetch("http://localhost:4000/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ◄ Fixed typo here (removed 's')
        },
        body: JSON.stringify({ items: cart.items }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.assign(data.url); // Redirects to Stripe checkout
      } else {
        console.error("Server did not return a checkout URL:", data);
      }
    } catch (error) {
      console.error("Network error during checkout:", error);
    }
  };;

  const productsCount = cart.items.reduce((sum,product)=>sum+product.quantity,0);

  return (
    <>
      <Navbar expand="sm">
        <Navbar.Brand href="/">Store</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button onClick={handleShow}>Cart ({productsCount} items)</Button>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsCount > 0 ? 
          <>
          <p>Items in your Cart:</p>
          {cart.items.map((currentProduct,idx)=>(
            <CartProduct key={idx} id={currentProduct.id} quantity={currentProduct.quantity}></CartProduct>
          ))}

          <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>

          <Button variant='success' onClick={checkout}>Purchase items</Button>
          </> 
          : 
          <h1>No Items in your Cart</h1>}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavComponent;