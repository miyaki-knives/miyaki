import React, {useState} from 'react';

const AdminDeleteKnife = props => {
  const deleteKnife = (id) => {
    fetch(`./knives/knives/${id}`, {
        method: 'DELETE',
    })
    .catch(err => console.log('COULD NOT DELETE:', err))
  }
  if (props.isAdmin) {
    return (
      <div>
        <button>Delete Knife</button>
      </div>
    );
  } else return <></>
};

export default AdminDeleteKnife;