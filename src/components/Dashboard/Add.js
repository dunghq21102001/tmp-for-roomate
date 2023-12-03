import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import API from '../../API';

const Add = ({ employees, setEmployees, setIsAdding }) => {
  const [name, setName] = useState('');
  const [cate, setCate] = useState([]);
  const [selectedCate, setSelectedCate] = useState('')

  useEffect(() => {
    API.getC()
      .then(res => {
        setCate(res.data)
      })
      .catch(err => { })
  }, [])
  const handleAdd = e => {
    e.preventDefault();

    if (!name || !cate) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    API.postP({
      productName: name,
      cateId: selectedCate || cate[0]?.id
    })
    .then(res => {
      setIsAdding(false);

      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: `data has been Added.`,
        showConfirmButton: false,
        timer: 1500,
      });
    })
    .catch(err => {
      setIsAdding(false);

      Swal.fire({
        icon: 'error',
        title: 'Fail!',
        text: `Add data fail`,
        showConfirmButton: false,
        timer: 1500,
      });
    })


   
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Product</h1>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <select onChange={(e) => setSelectedCate(e.target.value)}>
          {cate.map(item => (
            <option value={item?.id} key={item?.id}>{item?.cateName}</option>
          ))}
        </select>

        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
