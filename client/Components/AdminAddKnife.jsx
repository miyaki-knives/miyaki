import React, { useState } from 'react';

const AdminAddKnife = (props) => {
  if (props.isAdmin) {
    const handleSubmit = () => {
      fetch('/knives/addKnife', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON',
        },
        // body: new URLSearchParams(new FormData(event.target)), // event.target is the form
        body: JSON.stringify({
          name,
          length,
          steel_type,
          price,
          type,
          img,
          hrc,
          bevel,
        }), // event.target is the form
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          props.fetchCart();
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const useInput = (init) => {
      const [value, setValue] = useState(init);
      const onChange = (e) => {
        setValue(e.target.value);
      };
      return [value, onChange];
    };

    const [name, nameOnChange] = useInput('');
    const [length, lengthOnChange] = useInput('');
    const [steel_type, steel_typeOnChange] = useInput('');
    const [price, priceOnChange] = useInput('');
    const [type, typeOnChange] = useInput('');
    const [img, imgOnChange] = useInput('');
    const [hrc, hrcOnChange] = useInput('');
    const [bevel, bevelOnChange] = useInput('');

    return (
      <>
        <div>Add a knife (for admins only)</div>
        <form id="addKnifeForm">
          <input
            name="name"
            type="text"
            placeholder="name"
            onChange={nameOnChange}
            value={name}></input>
          <input
            name="length"
            type="number"
            placeholder="length"
            onChange={lengthOnChange}
            value={length}></input>
          <input
            name="steel_type"
            type="text"
            placeholder="steel type"
            onChange={steel_typeOnChange}
            value={steel_type}></input>
          <input
            name="price"
            type="number"
            placeholder="price"
            onChange={priceOnChange}
            value={price}></input>
          <input
            name="type"
            type="text"
            placeholder="type"
            onChange={typeOnChange}
            value={type}></input>
          <input
            name="img"
            type="text"
            placeholder="image link"
            onChange={imgOnChange}
            value={img}></input>
          <input
            name="hrc"
            type="text"
            placeholder="hrc"
            onChange={hrcOnChange}
            value={hrc}></input>
          <input
            name="bevel"
            type="text"
            placeholder="bevel"
            onChange={bevelOnChange}
            value={bevel}></input>
          <input type="button" value="Add Knife" onClick={handleSubmit}></input>
        </form>
      </>
    );
  } else return <></>;
};

export default AdminAddKnife;
