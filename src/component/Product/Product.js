import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import "./Product.css"
import { Link } from 'react-router-dom';
const Product = (props) => {
      // console.log(props.item);
const {name, seller,stock,price,key, img} = props.item
    return (
        <div className="product-name">
        <div>
        <img src={img} alt=""/>
        </div>
        {/* <Link to="/about">About</Link> */}
         <div className="list">
         <h4 className="list-name"> <Link to={"/product/"+key}>{name}</Link></h4>
         <br/>
         <div className="footer">
         <p><small>by:{seller} </small></p>
         <p>${price}</p>
         <p><small>only{stock} in stock-order soon</small></p>

       { props.showAddToCart && <button className='btn' onClick={()=>props.handleClick(props.item)}
        ><FontAwesomeIcon icon={faShoppingCart} />add to cart</button>}
            </div>
        </div>
      </div>
      
    );
};

export default Product;