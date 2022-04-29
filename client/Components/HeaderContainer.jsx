import React from 'react';
import Login from './Login.jsx';
import Cart from './Cart.jsx';
import miyaki_logo_white from '../assets/miyaki_logo_white.png';
function HeaderContainer(props) {
  return (
    <div className="HeaderContainer">
      <div className="LeftContainer">
        <img
          src={miyaki_logo_white}
          style={{ height: 'auto', width: '90px' }}
          alt="Logo"
        />
      </div>
      <div className="RightContainer">
        {/* <div className='cartIcon'>Cart </div> */}
        <Cart
          cartList={props.cartList}
          isLoggedIn={props.isLoggedIn}
          userID={props.userID}
          deleteFromCart={props.deleteFromCart}
        />
        <Login
          handleClick={props.handleClick}
          isLoggedIn={props.isLoggedIn}
          username={props.username}
          setLoggedIn={props.setLoggedIn}
        />
      </div>
    </div>
  );
}

export default HeaderContainer;
