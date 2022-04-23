import React from 'react';
import { useState } from 'react';
import HeaderContainer from './HeaderContainer.jsx';

function Main() {
  const [isLoggedIn, setLoggedIn] = useState(false);
    
  return (
    <div>
     <HeaderContainer isLoggedIn = { isLoggedIn }/>   
    </div> 
  )
}

export default Main;