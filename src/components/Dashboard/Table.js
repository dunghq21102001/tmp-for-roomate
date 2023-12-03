import { useEffect, useState } from 'react'
import API from '../../API';
import Swal from 'sweetalert2';
const Table = ({ employees, handleEdit, handleDelete }) => {


  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: null,
  });

  const [list, setList] = useState([])

  useEffect(() => {
    fetchP()
  }, [])

  const fetchP = () => {
    API.getP()
      .then(res => {
        setList(res.data)
      })
      .catch(err => console.log(err))
  }

  const deleteI = (id) => {
    Swal.fire({
      text: `Do you sure to delete?`,
      icon: "warning",
      cancelButtonText: 'No',
      showCancelButton: true,
      confirmButtonColor: '#f38021',
      cancelButtonColor: '#b6d9ff',
      confirmButtonText: 'Yes'
    })
      .then(res => {
        if (res.isConfirmed) {
          API.delP(id)
            .then(res => {
              Swal.fire({
                icon: 'success',
                title: 'deleted!',
                text: `data has been deleted.`,
                showConfirmButton: false,
                timer: 1500,
              });

              fetchP()
            })
            .catch(err => { })
        }
      })
      .catch(err => { })

  }


  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            {/* <th>Category</th> */}
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {list.length > 0 ? (
            list.map((item, i) => (
              <tr key={item?.id}>
                <td>
                  {item?.id}
                </td>
                <td>
                  {item?.productName}
                </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(item?.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => deleteI(item?.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Product</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
