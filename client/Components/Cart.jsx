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

  useEffect(() => {
    closeModal();
  }, [props.isLoggedIn]);

  const getTotalCost = (productList) => {
    return productList.reduce(
      (totalCost, { price: itemCost }) => totalCost + parseFloat(itemCost),
      0
    );
  };

  return (
    <div>
      {props.isLoggedIn && (
        <button onClick={openModal} className="cartBtn" id="cartBtn">
          Cart
        </button>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}>
        {props.userID &&
          Array.isArray(props.cartList) &&
          props.cartList.map((item, index) => (
            <div key={`item${index}`}>
              <div>Knife: {item.name}</div>
              <div>Price: {item.price}</div>

              <button
                onClick={() => {
                  props.deleteFromCart(props.userID, item.knife_id);
                }}>
                Delete
              </button>
            </div>
          ))}
        {props.userID &&
          Array.isArray(props.cartList) &&
          props.cartList.length > 0 && (
            <div>
              Total:
              {getTotalCost(props.cartList)}
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
