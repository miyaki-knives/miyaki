import React from 'react';
import { useState, useEffect } from 'react';
import HeaderContainer from './HeaderContainer.jsx';
import KnivesContainer from './KnivesContainer.jsx';

function Main() {
  const [userID, setUserID] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
function handleClick(e){
//{ knife_id, customer_id, quantity} what I'm using for variable names
  if (e.target.className === 'addToCartButton' ){
    //console.log(e.target.id) --> knife-12
    //knife-12 --> const knife_id = 12
    const knife_id = e.target.id.split('-')[1];
    console.log('userID: ', userID)
    if (!userID) {
      alert('Please login before adding to cart.');
      return;
    }
    fetch('/cart/cart/addToCart', {
      method: 'POST',
      body: JSON.stringify({
        knife_id,
        userID,
        quantity: 1,
    }),
    headers: { 'Content-Type': 'application/json'},
    })
    .then(res => res.json())
    .then(data =>
      consol,e.log('add to cart: ', data),
    )
    .catch(err => console.log('error adding knife:', err));
  
}

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
        setUserID(data.id)
        setLoggedIn(true);
        setUsername(data.username);
        setIsAdmin(data.isAdmin);
      }
      else {
        setUserID(null);
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
        setUserID(data.id)
        setLoggedIn(true);
        setUsername(data.username);
        setIsAdmin(data.isAdmin);
      }
      else {
        setUserID(null);
        setLoggedIn(false);
        setUsername(null);
        setIsAdmin(false);
      }
    })
    .catch(err => console.log('error in fetch request', err));
  }
}

useEffect(() => {console.log('userID: ', userID ,'isloggedin: ', isLoggedIn, 'username:  ', username, 'isAdmin: ', isAdmin)});
  return (
    <>
      <div>
      <HeaderContainer handleClick = {handleClick} isLoggedIn = { isLoggedIn } isAdmin = { isAdmin } username = { username }/>   

      </div> 
      <div>
        <KnivesContainer username = {username} isLoggedIn = {isLoggedIn} isAdmin = {isAdmin} handleClick = {handleClick}/>
      </div>
    </>
  )
}

export default Main;