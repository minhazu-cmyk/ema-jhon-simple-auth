import React, { useState } from 'react';
import { useContext } from 'react';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { handleGoogleClick, handleOut, initializeLogInFrameWork, handleFb, createUserWithEmailPassword, signInUserWithMailPassword} from './LogInManager';

;

function LogIn() {
  const [newUser, setNewUser]= useState(false);
  const [user,setUser] = useState({

    isSignedIn:false,
    
    name:'',
    email:'',
    pass: "",

  });
  initializeLogInFrameWork();

  const [logInUser, setLogInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/" } };

  const handleGoogleSubmit =()=>{
    handleGoogleClick()
    .then(res=>{
      setUser(res);
      setLogInUser(res);
      history.replace(from);
    })
  }
  const handleFb=()=>{
    handleFb()
    .then(res=>{
      setUser(res);
      setLogInUser(res);
      history.replace(from);
    })
  }
  const handleOut =()=>{
    handleOut()
    .then(res=>{
         setUser(res);
         setLogInUser(res);
    })
  }
  

 const handleBlur=(event)=>{
// console.log(event.target.name,event.target.value)
let formValid= true;
if(event.target.name==="email"){
 formValid= /\S+@\S+\.\S+/.test(event.target.value);

}
if(event.target.name==="pass"){
  const isPassValid = event.target.value.length>6;
const passwordValue= /\d{1}/.test(event.target.value)

  formValid = isPassValid && passwordValue;
}
if(formValid){
  console.log(event.target.name,event.target.value)
const newInfo= {...user};
newInfo[event.target.name]= event.target.value;
setUser(newInfo)

}

  }
  const handleSubmit=(event)=>{
  
// console.log(user.email,user.pass)
if(newUser && user.email && user.pass){
  createUserWithEmailPassword(user.name, user.email, user.pass)
  .then(res=>{
    setUser(res);
    setLogInUser(res);
    history.replace(from);
  })
  
}
  if(!newUser && user.email && user.pass){
    signInUserWithMailPassword(user.email, user.pass)
    .then(res=>{
      setUser(res);
      setLogInUser(res);
      history.replace(from);
    })
    
}
event.preventDefault();
  }
 

  
  return (
    <div style={{textAlign:"center"}} >
      {
        user.isSignedIn ?  <button onClick={handleOut}> sign out</button> : <button onClick={handleGoogleSubmit}> sign in</button>
      }
      <br/>
      <button onClick={handleFb}> log in with facebook</button>
      {
        user.isSignedIn && <div> <p>welcome {user.name} </p>
        <p> email:{user.email} </p>
      
        </div>
}
       <h2> my own authentication </h2>
       <input type="checkbox" name="newUser" onChange={()=>setNewUser(!newUser)} id=""/>
       <label htmlFor="newUser">newUser sign in</label>
       <form onSubmit={handleSubmit}>
         {newUser &&  <input type="text" name="name"onBlur={handleBlur} placeholder="ur name"/>}
         <br/>
      <input type="email" name="email" onBlur={handleBlur} id="" placeholder="write your email here" required/>
      <br/>
        <input type="password" onBlur={handleBlur} name="pass" id="" placeholder="pass here" required/>
        <br/>
        <input type="submit" value={newUser?"sign up" : "sign in"}/>
        </form>
        <p style={{color:"red"}}> {user.error} </p>
        {user.success && <p style={{color:"green"}}> users {newUser ?"created" :"log in" }  successfully </p>}

    </div>
  );
}

export default LogIn;
