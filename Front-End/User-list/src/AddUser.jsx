import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const AddUser = () => {
    const [create, setCreate] = useState({ name: '', email: '', address: '' })
    const handleChange = (e) => {
        const { name, value } = e.target
        setCreate({ ...create, [name]: value })
    }

    const handleSub = async (e) => {
        e.preventDefault()
        await axios
            .post('http://localhost:4000/api/user', create)//the create from teh state not backend
            .then((resp) => {
                toast.success(resp.data.message,{position:'top-right'})
            })
            .catch((error) => { console.log(error) })
    }
    return (
        <div>
            <h1>users</h1>
            <div>
                <form action="" onSubmit={handleSub}>
                    <label htmlFor="">Name</label>
                    <input onChange={handleChange} name='name' type="text" id='name' placeholder='enter name' />
                    <label htmlFor="">Email</label>
                    <input onChange={handleChange} name='email' type="email" id='email' placeholder='enter email' />
                    <label htmlFor="">address</label>
                    <input onChange={handleChange} name='address' type="text" id='address' placeholder='enter address' />
                    <button type='submit'>submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddUser
