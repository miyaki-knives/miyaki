import React, {useState, useEffect} from 'react';
import Knife from './Knife.jsx';


function KnivesContainer(props){
  const [knivesToRender, setKnivesToRender] = useState([]);
  
  fetch(`/knives/knives/`)
    .then(data => data.json())
    .then(array => {
        const finalRender = array.map(knife => (
        <Knife username = {props.username} key = {knife.id} id = {knife.id} name = {knife.name} length = {knife.length} steel_type = {knife.steel_type} price = {knife.price} type = {knife.type} hrc = {knife.hrc} bevel = {knife.bevel} isLoggedIn = {props.isLoggedIn} isAdmin = {props.isAdmin} img = {knife.img}/>
        ))
        if (JSON.stringify(finalRender) !== JSON.stringify(knivesToRender)){
        setKnivesToRender(finalRender)
      }
  });
  return (
    <div>
      <h2>List of Knives</h2>
        {knivesToRender}
    </div>
  )
}

export default KnivesContainer;