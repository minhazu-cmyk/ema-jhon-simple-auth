import React, { useState } from 'react'

import './shop.css'
// import Product from '../product/Product';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
 import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Shop = () => {
   
   const[products, setProducts] = useState([]);
   const[cart,setCart]= useState([]);

   useEffect(()=>{
       fetch('http://localhost:5000/products')
       .then(res=>res.json())
       .then(data=>setProducts(data))
   })
  
   useEffect(()=>{
     const saveCart = getDatabaseCart();
     const productKey = Object.keys(saveCart);
     fetch('http://localhost:5000/productsByKeys',{
        method:"POST",
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify(productKey)
    })
    .then(res=>res.json())
    .then(data=>setCart(data))


   },[])


   const handleClick = (product)=>{
       const toBeAddedKey = product.key;
    const sameProduct = cart.find(pd => pd.key ===toBeAddedKey);
    let count = 1;
    let newCart;
    if(sameProduct){
        const count = sameProduct.quantity+1;
       sameProduct.quantity= count;
        const others = cart.filter(pd=>pd.key!== toBeAddedKey )
        newCart=[...others, sameProduct];
    }
    else{
        product.quantity=1;
        newCart=[...cart,product]
    }

    setCart(newCart);
   
     addToDatabaseCart(product.key, count);
}

    return (
        <div className="shopping-container">
            <div className="product">
                
             
                {

              products.map(x=> <Product key={x.key} showAddToCart={true} handleClick={handleClick} item={x}></Product>)

                }

              
            </div>
            <div className="shopping-cart">
              <Cart cart={cart}>  <Link to="/order">
            <button className="btn">review order</button>
            </Link></Cart>
            </div>
           
        </div>
    );
};

export default Shop;