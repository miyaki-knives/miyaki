import React, { useState } from 'react';

const AdminAddKnife = (props) => {
  if (props.isAdmin) {
    return (
      <>
        <div>Add a knife (for admins only)</div>
        <form method="POST" action="/knives/addKnife">
          <input name="name" type="text" placeholder="name"></input>
          <input name="length" type="number" placeholder="length"></input>
          <input name="steel_type" type="text" placeholder="steel type"></input>
          <input name="price" type="number" placeholder="price"></input>
          <input name="type" type="text" placeholder="type"></input>
          <input name="img" type="text" placeholder="image link"></input>
          <input name="hrc" type="text" placeholder="hrc"></input>
          <input name="bevel" type="text" placeholder="bevel"></input>
          <input type="submit" value="Add Knife"></input>
        </form>
      </>
    );
  } else return <></>;
};

export default AdminAddKnife;
