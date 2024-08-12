import { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"
import toast from "react-hot-toast"

function User() {

    const [users, setUser] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axios.get('http://localhost:4000/api/alluser')
                setUser(resp.data)
            } catch (error) {
                console.log(error);

            }
        }
        fetchData()
    }, [])
const handleDelete= async(userid)=>{
   await axios.delete(`http://localhost:4000/api/delete/user/${userid}`)
   .then((resp)=>{
    setUser((prevUser)=>prevUser.filter((user)=>user._id !==userid))
    toast.success(resp.data.message,{position:'top-right'})
   })
  
}

    return (
        <div>

            <Link to={'/add'}>
                <button>Add User</button>
            </Link>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((item, index) => (
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.address}</td>
                           <Link to={`/update/`+item._id}><button>Update</button></Link> 
                            <button onClick={()=>handleDelete(item._id)}>Delete</button>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export default User