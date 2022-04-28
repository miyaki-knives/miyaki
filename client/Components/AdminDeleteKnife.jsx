import React, { useState } from 'react';
import { Button } from '@mui/material';

const AdminDeleteKnife = (props) => {
  const deleteKnife = () => {
    fetch(`/knives/${props.id}`, {
      method: 'DELETE',
    })
      .then(() => props.fetchCart())
      .catch((err) => console.log('COULD NOT DELETE:', err));
  };
  if (props.isAdmin) {
    return (
      <div>
        <Button
          variant='contained'
          onClick={deleteKnife}
          id={`delete${props.id}`}
        >
          Delete Knife
        </Button>
      </div>
    );
  } else return <></>;
};

export default AdminDeleteKnife;
