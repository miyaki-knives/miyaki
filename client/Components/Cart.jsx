import React from 'react';
import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import checkout from '../assets/checkout.png';

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

  useEffect(() => {
    closeModal();
  }, [props.isLoggedIn]);

  const getTotalCost = (productList) => {
    return productList.reduce(
      (totalCost, { price: itemCost }) => totalCost + parseFloat(itemCost),
      0
    );
  };
  const appleButton =
    'https://support.pixelunion.net/hc/article_attachments/360060934313/Additional_checkout_buttons_on_the_cart_page.png';
  return (
    <div>
      {props.isLoggedIn && (
        <Button
          variant='contained'
          onClick={openModal}
          className='cartBtn'
          id='cartBtn'
        >
          Cart
        </Button>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2>Your order:</h2>
        {props.userID &&
          Array.isArray(props.cartList) &&
          props.cartList.map((item, index) => (
            <div key={`item${index}`} className='shopping-cart'>
              <div className='cart-item'>
                <div>Knife: {item.name}</div>
                <div>Price:$ {item.price}</div>
              </div>
              <div className='cart-delete-item'>
                <Button
                  variant='outlined'
                  onClick={() => {
                    props.deleteFromCart(props.userID, item.knife_id);
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        {props.userID &&
          Array.isArray(props.cartList) &&
          props.cartList.length > 0 && (
            <div className='cart-total'>
              Total: ${getTotalCost(props.cartList)}
              <img src={appleButton} width='250' />
            </div>
          )}
        {props.userID &&
          Array.isArray(props.cartList) &&
          props.cartList.length === 0 && <div>Your cart is empty.</div>}
      </Modal>
    </div>
  );
}

export default Cart;
