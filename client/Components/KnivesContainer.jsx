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
        />
      ));
      if (JSON.stringify(finalRender) !== JSON.stringify(knivesToRender)) {
        setKnivesToRender(finalRender);
      }
    });
  return (
    <div id="knivesContainerDiv">
      <div>
        <AdminAddKnife isAdmin={props.isAdmin} />
        <h2>List of Knives</h2>
      </div>
      {knivesToRender}
    </div>
  );
}

export default KnivesContainer;
