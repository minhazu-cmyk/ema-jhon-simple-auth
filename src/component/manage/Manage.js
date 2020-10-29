import React from 'react';
import fakeData from '../../fakeData';
const Manage = () => {
  const handleProduct=() =>{
    fetch('https://nameless-dusk-60075.herokuapp.com/addProduct',{
      method:"POST",
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(fakeData)

    })
  }
    return (
        <div>
          <button onClick={handleProduct}>add products</button> 
        </div>
    );
};

export default Manage;