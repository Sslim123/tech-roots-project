
import Table from "react-bootstrap/Table";
// import React, {useState, useEffect} from "react";
import User from './fakeData.json'
// import axios from "axios";
function LaptopTable() {
//   const [data, setData] = useState(null);
//   const [loading, setLoaing] = useState(true);
//   const [error, setErros] = useState(null);

//   useEffect(() => {
//     axios('https://dummyjson.com/users/1')
//       .then( response => setData(response.data))
//       .catch(error => {
//         console.log('error fetching data:', error);
//         setErros(error)
//       })
//       .finally(()=>{
//         setLoaing(false);
//       })
      
//   }, []);
//   if (loading) return 'loding....'
//   if (error) return 'eroor!....'
  const tabuser = User.map((item) => {
    return (
      <tr>
        <th>{item.id}</th>
        <th>{item.name}</th>
        <th>{item.lasteName}</th>
        <th>{item.email}</th>
      </tr>
    );
  
  });



  return (
    <Table striped bordered hover size="sm" >
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>{tabuser }</tbody>
    </Table>
  );
}

export default LaptopTable;
