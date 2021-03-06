import React, {useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Feed from './Feed.js';
import Widgets from './Widgets.js';
import Login from './Login';
import { auth } from './firebase';
import { SecurityUpdateSharp } from '@mui/icons-material';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(()=> {
    auth.onAuthStateChanged(userAuth => {
      if(userAuth) {
             //user is logged in
        dispatch(login({
          email: userAuth.email,
           uid: userAuth.uid,
           displayName: userAuth.displayName,
           photoUrl: userAuth.photoURL,
        }))
      } else {
             //user is logged out
        dispatch(logout());
      }
    })
  }, [])

  return (
    <div className="app">

       <Header />

       {!user ? (
         <Login/>

       ) : (
        <div className="app_body">

        <Sidebar />
      
        <Feed />
      < Widgets />
      </div>
       )}

    
      

    </div>
  );
}

export default App;
