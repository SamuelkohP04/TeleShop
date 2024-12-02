import './App.css';
import React, {useState, useEffect} from 'react'
import Card from './Components/Card/Card'
import Cart from './Components/Cart/Cart'
const { getData } = require("./db/db");
const foods = getData();
const tele = window.Telegram.WebApp

function App() {

  const [cartItems, setCartItems] = useState([]);

  useEffect(()=>{
    tele.ready();
  })

  const onAdd = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist) { // find food if in cart, compare id and add quantity
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );

    } else { // not in cart, set cartItems to previous state and set quantity to 1
      setCartItems([...cartItems, { ...food, quantity: 1 }]);
    }
  };

  const onRemove = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((x) => x.id !== food.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity - 1 } : x
        )
      );
    }
  };

  const onCheckout = () => {
    tele.MainButton.text = "Pay :)";
    tele.MainButton.show();
  }

  return (
    <>
    <h1 className='heading'>Order Food</h1>
    <Cart cartItems={cartItems} onCheckout={onCheckout}/>
    <div className='cards__container'>
      {foods.map(food => { return <Card food={food} key={food.id} onAdd={onAdd} onRemove={onRemove}/>})}
    </div>
    
    </>
  );
}

export default App;
