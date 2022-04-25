/**
 * 
 * @module Knife
 * @author yeti crabs
 * @date 4/25/22 @2:55PM
 * @description presentation component that renders a single box for each knife
 */

import React from 'react';

const Knife = props => {
  const { id, name, length, steel_type, price, type, img, hrc, bevel } = props;

    return(
      <div className="knifeBox">
        <div><img src={props.img}/></div>
        <div>{props.name}</div>
        <div>Length:{props.length}mm</div>
        <div>Steel:{props.steel_type}</div>
        <div>Price:${props.price}</div>
        <div>Type:{props.type}</div>
        <div>Bevel Symmetry:{props.bevel}</div>
      </div>
    );
};
export default Knife;