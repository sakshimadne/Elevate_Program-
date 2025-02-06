import React, { useEffect, useState } from 'react'

const DataTable = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users') // Example API
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((error) => console.error('Error fetching data:', error))
  }, [])

  return (
    <div className='container'>
      <h2>Users List</h2>
      <table border='1'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
