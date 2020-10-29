import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Product from '../Product/Product';
const ProductDetails = () => {
const {productKey} = useParams();
const [product, setProduct] = useState({})
useEffect(()=>{
    fetch('http://localhost:5000/products'+productKey)
    .then(res=>res.json())
    .then(data=>setProduct(data))
},[productKey])
// const products = fakeData.find(pd=>pd.key===productKey);
console.log(product)
    return (
        <div>
            <h1> {productKey} is loading</h1>
            <Product showAddToCart={false} item={product}> </Product>
        </div>
    );
};

export default ProductDetails;