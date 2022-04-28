import React, { useState } from 'react';

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
        <button onClick={deleteKnife} id={`delete${props.id}`}>
          Delete Knife
        </button>
      </div>
    );
  } else return <></>;
};

export default AdminDeleteKnife;
