import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import API from '../../API';

const Edit = ({ employees, selectedEmployee, setEmployees, setIsEditing }) => {

  // const [firstName, setFirstName] = useState(selectedEmployee.firstName);
  // const [lastName, setLastName] = useState(selectedEmployee.lastName);
  // const [email, setEmail] = useState(selectedEmployee.email);
  // const [salary, setSalary] = useState(selectedEmployee.salary);
  // const [date, setDate] = useState(selectedEmployee.date);

  const [name, setName] = useState(selectedEmployee?.productName);
  const [cate, setCate] = useState([]);
  const [selectedCate, setSelectedCate] = useState(selectedEmployee?.cateId)

  useEffect(() => {
    API.getC()
      .then(res => {
        setCate(res.data)
      })
      .catch(err => { })
  }, [])

  const handleUpdate = e => {
    e.preventDefault();

    if (!name || !cate) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }


    API.putP(selectedEmployee?.id,
      {
        id: selectedEmployee?.id,
        productName: name,
        cateId: selectedCate,
        cate: null
      }
    )
      .then(res => {
        setIsEditing(false)
        Swal.fire({
          icon: 'success',
          title: 'updated!',
          text: `data has been updated.`,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(err => { })
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Employee</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <select onChange={(e) => setSelectedCate(e.target.value)}>
          {cate.map(item => (
            <option selected={selectedCate === item?.id} value={item?.id} key={item?.id}>{item?.cateName}</option>
          ))}
        </select>
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
