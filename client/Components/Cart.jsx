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
        {props.userID &&
          Array.isArray(props.cartList) &&
          props.cartList.map((item, index) => (
            <div key={`item${index}`}>
              <div>Knife: {item.name}</div>
              <div>Price: {item.price}</div>
              <button>Delete</button>
            </div>
          ))}
      </Modal>
    </div>
  );
}

export default Cart;
