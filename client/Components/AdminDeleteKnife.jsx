import React, { useState } from 'react';

const AdminDeleteKnife = (props) => {
  const deleteKnife = () => {
    fetch(`/knives/${props.id}`, {
      method: 'DELETE',
    }).catch((err) => console.log('COULD NOT DELETE:', err));
  };
  if (props.isAdmin) {
    return (
      <div>
        <button onClick={deleteKnife}>Delete Knife</button>
      </div>
    );
  } else return <></>;
};

export default AdminDeleteKnife;
