import React from 'react';
import "./Review.css"
const ReviewItem = (props) => {
    // console.log(props);
    const {name, quantity,key,price} = props.product;
    const reviewStyle ={
        borderBottom: "1px solid gray",
        marginBottom: "5px",
        paddingBottom : "10px"
    }
    return (
        
        <div style={reviewStyle} >
            <h3> {name} </h3>
          <h4> quantity : {quantity} </h4>
          <p> price:$ {price}</p>
            <button className="btn" onClick={()=>props.removeHandle(key)}>remove</button>
         </div>
         
        
    );
};

export default ReviewItem;