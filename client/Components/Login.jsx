import React from 'react';
import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import { TextField, Container, Box, Button } from '@mui/material';

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

function Login(props) {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  // function afterOpenModal() {
  // }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    closeModal();
  }, [props.isLoggedIn]);

  return (
    //ADD: if props.isLoggedIn is true call closeModal

    <div>
      <Button variant='contained' onClick={openModal} className='signInBtn'>
        {props.isLoggedIn ? 'Log Out' : 'Sign In'}
      </Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <Container maxWidth='sm'>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div className='inputForm'>
              <TextField
                type='text'
                placeholder='Enter Username'
                id='usernameInput'
              />
              <br />
              <TextField
                type='password'
                placeholder='Enter Password'
                id='passwordInput'
              />

              <br />
              <Button
                variant='contained'
                onClick={props.handleClick}
                id='loginButton'
              >
                Login
              </Button>
              <Button
                variant='contained'
                onClick={props.handleClick}
                id='signUpButton'
              >
                Sign up
              </Button>
            </div>
          </Box>
        </Container>
      </Modal>
    </div>
  );
}

export default Login;
