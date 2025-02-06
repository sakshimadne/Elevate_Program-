// import React, { useEffect, useState } from 'react'

// function EditableTable() {
//   const [posts, setPosts] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     // Fetch posts from JSONPlaceholder API
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch(
//           'https://jsonplaceholder.typicode.com/posts'
//         )
//         if (!response.ok) {
//           throw new Error('Failed to fetch posts')
//         }
//         const data = await response.json()
//         setPosts(data)
//       } catch (err) {
//         setError(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchPosts()
//   }, [])

//   const handleEdit = (ID, key, value) => {
//     setPosts((prevPosts) =>
//       prevPosts.map((post) =>
//         post.id === id ? { ...post, [key]: value } : post
//       )
//     )
//   }

//   return <div></div>
// }

// export default EditableTable

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
