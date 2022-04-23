import React from 'react';

function HeaderContainer(props){
  return (
    <div className = 'HeaderContainer'>
      <h1>Yeti Crab Knives</h1>
      <div className = 'cartIcon'>Cart </div>
      <button className = 'signInBtn'>{props.isLoggedIn ? 'Log Out' : 'Sign In'}</button> 
    </div>
  )
}



export default HeaderContainer