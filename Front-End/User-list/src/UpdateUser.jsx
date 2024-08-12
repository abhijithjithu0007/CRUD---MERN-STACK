import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams ,useNavigate} from 'react-router-dom'
import { GrUpdate } from "react-icons/gr";


const UpdateUser = () => {
    const [user, setUser] = useState({ name: '', email: '', address: '' })
    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }
    const navigate =  useNavigate()

    const {id} = useParams()

    const handleSub = async (e) => {
        e.preventDefault()
        await axios
            .put(`http://localhost:4000/api/update/user/${id}`, user)//the create from teh state not backend
            .then((resp) => {
                toast.success(resp.data.message, { position: 'top-right' })
                navigate('/')
            })
            .catch((error) => { console.log(error) })
    }

    useEffect(()=>{
       axios.get(`http://localhost:4000/api/user/${id}`)
        .then((resp)=>{
            setUser(resp.data)
        })
        .catch((error)=>{
            console.log(error);
            
        })
    },[id])
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSub}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                    <input 
                        onChange={handleChange} 
                        value={user.name} 
                        name="name" 
                        type="text" 
                        id="name" 
                        placeholder="Enter name" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                    <input 
                        onChange={handleChange} 
                        value={user.email} 
                        name="email" 
                        type="email" 
                        id="email" 
                        placeholder="Enter email" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address</label>
                    <input 
                        onChange={handleChange} 
                        value={user.address} 
                        name="address" 
                        type="text" 
                        id="address" 
                        placeholder="Enter address" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 flex items-center justify-center space-x-2"
                >
                    <GrUpdate />
                    <span>Update</span>
                </button>
            </form>
        </div>
    </div>
    )
}

export default UpdateUser
