import React from 'react';
import { useState } from 'react';
import HeaderContainer from './HeaderContainer.jsx';

function Main() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  
function handleClick(e){
  if (e.target.id === 'loginButton'){
    const username = document.querySelector('#usernnameInput').value;
    const password = document.querySelector('#passwordInput').value;

    fetch('/api', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => {
      setLoggedIn(data.isLoggedIn);
    })
    .catch(err => console.logged('error in fetch request', err));
  }
  if (e.target.id === 'signUpButton'){
    const username = document.querySelector('#usernameInput')
    const password = document.querySelector('passwordInput')
  }
}

  return (
    <div>
     <HeaderContainer isLoggedIn = { isLoggedIn }/>   
     
    </div> 
  )
}

export default Main;