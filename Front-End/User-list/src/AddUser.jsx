import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


const AddUser = () => {
    const [create, setCreate] = useState({ name: '', email: '', address: '' })
    const handleChange = (e) => {
        const { name, value } = e.target
        setCreate({ ...create, [name]: value })
    }

    const navigate = useNavigate()
    const handleSub = async (e) => {
        e.preventDefault()
        try {
            const resp = await axios.post('http://localhost:4000/api/user', create);
            toast.success(resp.data.message, { position: 'top-center' });
            navigate('/');
        } catch (error) {
            toast.error(error.response.data.message, { position: 'top-center' });
        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <form onSubmit={handleSub}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                        <input
                            onChange={handleChange}
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
                            name="address"
                            type="text"
                            id="address"
                            placeholder="Enter address"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddUser
