import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

const UpdateUser = () => {
    const [user, setUser] = useState({ name: '', email: '', address: '' })
    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const {id} = useParams()

    const handleSub = async (e) => {
        e.preventDefault()
        await axios
            .put(`http://localhost:4000/api/update/user/${id}`, user)//the create from teh state not backend
            .then((resp) => {
                toast.success(resp.data.message, { position: 'top-right' })
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
        <div>
            <h1>Update user</h1>
            <div>
                <form action="" onSubmit={handleSub}>
                    <label htmlFor="">Name</label>
                    <input onChange={handleChange} value={user.name} name='name' type="text" id='name' placeholder='enter name' />
                    <label htmlFor="">Email</label>
                    <input onChange={handleChange} value={user.email} name='email' type="email" id='email' placeholder='enter email' />
                    <label htmlFor="">address</label>
                    <input onChange={handleChange} value={user.address} name='address' type="text" id='address' placeholder='enter address' />
                    <button type='submit'>Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateUser
