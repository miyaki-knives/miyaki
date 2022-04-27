import React from 'react';
import Modal from 'react-modal';
import { useState, useEffect } from 'react';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

function Cart(props) {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  //   useEffect(() => {
  //       fetchCart();
  //   }, [])

  useEffect(() => {
    closeModal();
  }, [props.isLoggedIn]);

  return (
    //ADD: if props.isLoggedIn is true call closeModal

    <div>
      {props.isLoggedIn && (
        <button onClick={openModal} className='signInBtn'>
          Cart
        </button>
      )}
      {/* <button onClick={openModal} className='signInBtn'>
        {props.isLoggedIn ? 'Cart' : 'Sign In'}
      </button> */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        {props.cartList.map((item) => (
          <div>{item.name}</div>
        ))}
        {/* <div className='inputForm'>
          <input type='text' placeholder='Enter Username' id='usernameInput' />
          <br />
          <input
            type='password'
            placeholder='Enter Password'
            id='passwordInput'
          />
          <br />
          <button onClick={props.handleClick} id='loginButton'>
            Login
          </button>
          <button onClick={props.handleClick} id='signUpButton'>
            Sign up
          </button>
        </div> */}
        This is your cart
      </Modal>
    </div>
  );
}

export default Cart;
