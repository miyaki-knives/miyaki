import React from 'react';
import Modal from 'react-modal';
import { useState } from 'react';

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

function Login(props){
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  // function afterOpenModal() {
  // }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal} className = 'signInBtn'>{props.isLoggedIn ? 'Log Out' : 'Sign In'}</button> 
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        
        
         <div className = 'inputForm'> 
          <input type='text' placeholder = 'Enter Username' id='usernameInput' />
          <br />
          <input type='password' placeholder='Enter Password' id='passwordInput' />
          <br />
          <button onClick={props.handleClick} id='loginButton'>Login</button>
          <button id='signUpButton'>Sign up</button>
        </div>
        
      </Modal>
    </div>
  );
}

export default Login