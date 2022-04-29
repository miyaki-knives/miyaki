import React, { useState, useEffect } from 'react';
import Knife from './Knife.jsx';
import AdminAddKnife from './AdminAddKnife.jsx';

function KnivesContainer(props) {
  const [knivesToRender, setKnivesToRender] = useState([]);

  fetch(`/knives/`)
    .then((data) => data.json())
    .then((array) => {
      const finalRender = array.map((knife) => (
        <Knife
          username={props.username}
          key={knife.knife_id}
          id={knife.knife_id}
          name={knife.name}
          length={knife.length}
          steel_type={knife.steel_type}
          price={knife.price}
          type={knife.type}
          hrc={knife.hrc}
          bevel={knife.bevel}
          isLoggedIn={props.isLoggedIn}
          isAdmin={props.isAdmin}
          img={knife.img}
          handleClick={props.handleClick}
          fetchCart={props.fetchCart}
        />
      ));
      if (JSON.stringify(finalRender) !== JSON.stringify(knivesToRender)) {
        setKnivesToRender(finalRender);
      }
    });
  return (
    // only render knives container div if isLoggedIn=true?
    <div id="knivesContainerDiv">
      {/* <h2>Product List</h2> */}
      <div>
        {props.isAdmin && props.isLoggedIn && (
          <AdminAddKnife isAdmin={props.isAdmin} fetchCart={props.fetchCart} />
        )}
      </div>
      {knivesToRender}
    </div>
  );
}

export default KnivesContainer;
