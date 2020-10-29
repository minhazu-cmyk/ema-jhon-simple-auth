import React, { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../reviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import "./order.css"
import happyImage from "../../images/giphy.gif"
import { useHistory } from 'react-router-dom';

const Order = () => {
    const [cart,setCart]= useState([]);
    const [orderPlaced, setOrederPlaced] = useState(false);

      const history = useHistory();
    const handleProceed = ()=>{
      history.push("/shipment");
    }

   const removeHandle=(productKey)=>{
       console.log("clicked",productKey);
       const newCart = cart.filter(pd=>pd.key!==productKey);
       setCart(newCart);
       removeFromDatabaseCart(productKey)
   }

    useEffect(()=>{
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
     
    fetch('http://localhost:5000/productsByKeys',{
        method:"POST",
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify(productKeys)
    })
    .then(res=>res.json())
    .then(data=>setCart(data))

   


    },[])
     let thankyou;
     if(orderPlaced){
         thankyou= <img src={happyImage} alt=""/>
     }
    return (
        <div className="product-name">
        <div className="item-name">
           

           {
               cart.map(x=><ReviewItem key={x.key} product={x} removeHandle={removeHandle}></ReviewItem>)
           }
             
             {
                 thankyou
             }
        </div>
  <div className="cart-area">
  <Cart cart={cart}>
      <button onClick={handleProceed} className="btn">proceed order </button>
  </Cart>
  </div>

      </div>
    );

};

export default Order;