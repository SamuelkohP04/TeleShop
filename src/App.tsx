import './App.css';
import React, {useState, useEffect} from 'react'
import Card from './Components/Card/Card.tsx'
import Cart from './Components/Cart/Cart.jsx'
const { getData } = require("./db/db.js");
const products = getData();

declare global {
  interface Window {
    Telegram: any;
    tele: any;
  }
}
const tele = window.Telegram.WebApp

function App() {

  const [cartItems, setCartItems] = useState([]);

  useEffect(()=>{
    tele.ready();
  })

  // const onAdd = (food) => {
  //   const exist = cartItems.find((x) => x.id === food.id);
  //   if (exist) { // find food if in cart, compare id and add quantity
  //     setCartItems(
  //       cartItems.map((x) =>
  //         x.id === food.id ? { ...exist, quantity: exist.quantity + 1 } : x
  //       )
  //     );

  //   } else { // not in cart, set cartItems to previous state and set quantity to 1
  //     setCartItems([...cartItems, { ...food, quantity: 1 }]);
  //   }
  // };

  // const onRemove = (food) => {
  //   const exist = cartItems.find((x) => x.id === food.id);
  //   if (exist.quantity === 1) {
  //     setCartItems(cartItems.filter((x) => x.id !== food.id));
  //   } else {
  //     setCartItems(
  //       cartItems.map((x) =>
  //         x.id === food.id ? { ...exist, quantity: exist.quantity - 1 } : x
  //       )
  //     );
  //   }
  // };

  // const onCheckout = () => {
  //   tele.MainButton.text = "Pay :)";
  //   tele.MainButton.show();
  // }

  return (
     <div className="relative bg-black/20">

      <div className="max-w-6xl mx-auto">
    <h1 className='heading'>Book a Tarot Card Consultation</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
    {/* <Cart cartItems={cartItems} onCheckout={onCheckout}/> */}
    <div className='flex flex-col items-center text-center'>
      {products.map(product => { return <Card product={product} key={product.id} />})}
    </div>
    
    </div>
    </div>
    </div>
  );
}

export default App;
