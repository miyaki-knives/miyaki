/**
 *
 * @module Knife
 * @author yeti crabs
 * @date 4/25/22 @2:55PM
 * @description presentation component that renders a single box for each knife
 */

import React from 'react';
import AdminDeleteKnife from './AdminDeleteKnife.jsx';
// import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

const Knife = (props) => {
  const {
    id,
    name,
    length,
    steel_type,
    price,
    type,
    img,
    hrc,
    bevel,
    isAdmin,
    fetchCart,
    handleClick,
  } = props;

  const handleAddToCart = (e) => {
    handleClick(e);
    fetchCart();
  };

  return (
    <Card className='knifeBox'>
      <CardContent>
        <img src={props.img} height='300' width='300' />
        <div className='knifeBox-info'>
          <h4>{props.name}</h4>
          <strong>Length:</strong> {props.length}mm
          <br />
          <strong>Steel:</strong> {props.steel_type}
          <br />
          <strong>Price:</strong> ${props.price}
          <br />
          <strong>Type:</strong> {props.type}
          <br />
          <strong>Bevel Symmetry:</strong> {props.bevel}
          <br />
          <button
            className='addToCartButton'
            id={`knife-${props.id}`}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <Typography component='legend'>Customer rating</Typography>
          <Rating name='read-only' value={5} readOnly />
          <AdminDeleteKnife isAdmin={isAdmin} id={id} fetchCart={fetchCart} />
        </div>
      </CardContent>
    </Card>
  );
};
export default Knife;
