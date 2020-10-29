import React from 'react';


const Cart = (props) => {
    const cart = props.cart

    let total=0;

 for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
       total = total+product.price*product.quantity||1;
      
   }
   let shipping = 0;
   if(total>35){
       shipping=0;
   }
   else if(total>15){
       shipping=4.99;
   }
   else if(total>4){
       shipping=12.99;
   }
   const tax = (total/10).toFixed(2);
   const fixedNumber=(num)=>{
       const pricision =num.tofixedNumber(2);
       return Number(pricision);
   }
    return (
        <div>
            <h3>order summary</h3>
            <p>items orderd:{cart.length} </p>
            <p> price witout tax:{total}</p>
            <p>shipping : {shipping}</p>
            <p>total tax+vat:{tax}</p>
            <p>total price:{total+tax+shipping}</p>
            {
              props.children
            }
            
        </div>
    );
};

export default Cart;