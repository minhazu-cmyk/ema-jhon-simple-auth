
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeLogInFrameWork =()=>{
    if(firebase.apps.length===0){
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleClick =()=>{
    const provider = new firebase.auth.GoogleAuthProvider();
   return firebase.auth().signInWithPopup(provider)
   .then(res=>{
     const{displayName,email,emailVerified}= res.user;
     const signUser={
       isSignedIn:true,
       name:displayName,
       email:email,
       success:true,
     }
     return signUser;
     console.log(displayName,email,emailVerified)
   })
  .catch(error=>{
    console.log(error)
    console.log(error.message)
  })

  }
//   handleOut can be here,

export const handleFb =()=>{
    const fbProvider = new firebase.auth.FacebookAuthProvider();
     return firebase.auth().signInWithPopup(fbProvider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      user.success=true;
      return user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }
   export const handleOut=()=>{
   return firebase.auth().signOut()
    .then(res=>{
    const isSignOut={
      isSignedIn: false,
      name:"",
      email:"",
      error:"",
      success:false,
     
    }
   return isSignOut;

  })
   .catch(error=>{
   })
};
     
export const createUserWithEmailPassword =(name, email, pass)=>{
  
  return firebase.auth().createUserWithEmailAndPassword(email, pass)
  .then(res=>{
    const newUserInfo =res.user;
    newUserInfo.error="";
    newUserInfo.success=true;
   displayUser(name)
   return newUserInfo;
  })
  .catch(error=> {
   
    const newUserInfo={}
    newUserInfo.error=error.message;
    newUserInfo.success=false;
    return newUserInfo;
   
 });
}
export const signInUserWithMailPassword = (email,pass)=>{
   return firebase.auth().signInWithEmailAndPassword(email , pass)
    .then(res=>{
      const newUserInfo =res.user;
      newUserInfo.error="";
      newUserInfo.success=true;
      return newUserInfo;
    })
    .catch(error=> {
      // Handle Errors here.
      const newUserInfo={}
      newUserInfo.error=error.message;
      newUserInfo.success=false;
     return newUserInfo;
    });
}

const displayUser= name=>{
    const user = firebase.auth().currentUser;
 
 user.updateProfile({
   displayName: name,
   
 }).then(function() {
  console.log("user name update successfully")
 }).catch(function(error) {
   console.log(error)
 });
   }