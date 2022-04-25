import React from 'react';
import { useState, useEffect } from 'react';
import HeaderContainer from './HeaderContainer.jsx';

function Main() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
function handleClick(e){
  if (e.target.id === 'loginButton'){
    console.log(document.querySelector('#usernameInput'))
    const user = document.querySelector('#usernameInput').value;
    const password = document.querySelector('#passwordInput').value;

    fetch(`/customers/customers/login`, {
      method: 'POST',
      body: JSON.stringify({user, password}),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => {
      // console.log(typeof data.username);
      if (data.username) {
        setLoggedIn(true);
        setUsername(data.username);
        setIsAdmin(data.isAdmin);
      }
      else {
        setLoggedIn(false);
        setUsername(null);
        setIsAdmin(false);
      }
    })
    // .then(() => console.log('isloggedin: ', isLoggedIn, 'username:  ', username, 'isAdmin: ', isAdmin))
    .catch(err => console.log('error in fetch request', err));
  }


  if (e.target.id === 'signUpButton'){
    const user = document.querySelector('#usernameInput').value;
    const password = document.querySelector('#passwordInput').value;
    fetch(`/customers/customers/addCustomer`, {
      method: 'POST',
      body: JSON.stringify({user, password}),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => {
      if (data.username) {
        setLoggedIn(true);
        setUsername(data.username);
        setIsAdmin(data.isAdmin);
      }
      else {
        setLoggedIn(false);
        setUsername(null);
        setIsAdmin(false);
      }
    })
    .catch(err => console.log('error in fetch request', err));
  }
}

useEffect(() => {console.log('isloggedin: ', isLoggedIn, 'username:  ', username, 'isAdmin: ', isAdmin)});
  return (
    <div>
     <HeaderContainer handleClick = {handleClick} isLoggedIn = { isLoggedIn } isAdmin = { isAdmin } username = { username }/>   
    </div> 
  )
}

export default Main;