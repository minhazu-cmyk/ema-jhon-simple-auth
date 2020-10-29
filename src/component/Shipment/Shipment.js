import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import processPayment from './processPayment/processPayment';
import "./Shipment.css"

const Shipment = () => {

    const [logInUser, setLogInUser] = useContext(userContext);
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
      const saveCart = getDatabaseCart();
      const orderDetails = {...logInUser , products:saveCart, Shipment:data, orderTime:new Date()};

      fetch('https://nameless-dusk-60075.herokuapp.com/addOrder',{
        method:'POST',
        headers:{
          'content-type': 'application/json'
        },
        body:JSON.stringify(orderDetails)
      })
      .then(res=>res.json())
      .then(data=>{
        if(data){
          processOrder()
          alert('ordered successfully')
        }
      })
    };
  
    console.log(watch("example")); // watch input value by passing the name of it
  
    return (
    <div className="row">
      <div className="col-md-6">
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
     <input name="name" defaultValue={logInUser.name} ref={register({ required: true })} placeholder="your name" />
       {errors.name && <span className="error" >name field is required</span>}
       
       <input name="email" defaultValue={logInUser.email} ref={register({ required: true })} placeholder="your email" />
       {errors.name && <span className="error" >email field is required</span>}
      
       <input name="address" ref={register({ required: true })} placeholder="address" />
       {errors.name && <span className="error" > address field is required</span>}

       <input name="number" ref={register({ required: true })} placeholder="number" />
       {errors.name && <span className="error" > phone number field is required</span>}
       <input type="submit" />
      </form>
      </div>
      <div className="col-md-6">
        <h1> pay here </h1>
         <processPayment></processPayment>
      </div>
    </div>
    );
};

export default Shipment;
