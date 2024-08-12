import { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import { LuFileEdit } from "react-icons/lu";
import { RiDeleteBin2Fill } from "react-icons/ri";



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


    const handleDelete = async (userid) => {
        const toastload = toast.loading('Deleting user...', { position: 'top-center' });

        setTimeout(async () => {
            try {
                toast.dismiss(toastload);
                const resp = await axios.delete(`http://localhost:4000/api/delete/user/${userid}`);
                setUser((prevUser) => prevUser.filter((user) => user._id !== userid));
                toast.success(resp.data.message, { position: 'top-center' });
            } catch (error) {
                toast.dismiss(toastload);
            }
        }, 2000);

    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex justify-end mb-4">
                <Link to={'/add'}>
                    <button className="bg-slate-600 text-white px-4 py-2 rounded hover:bg-slate-500">Add User</button>
                </Link>
            </div>

            <table className="w-full bg-white rounded shadow-lg">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="text-left py-2 px-4">Name</th>
                        <th className="text-left py-2 px-4">Email</th>
                        <th className="text-left py-2 px-4">Address</th>
                        <th className="text-left py-2 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((item, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-4">{item.name}</td>
                            <td className="py-2 px-4">{item.email}</td>
                            <td className="py-2 px-4">{item.address}</td>
                            <td className="py-2 px-4 flex space-x-2">
                                <Link to={`/update/` + item._id}>
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-400 flex items-center space-x-1">
                                        <LuFileEdit />
                                        <span>Update</span>
                                    </button>
                                </Link>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400 flex items-center space-x-1"
                                >
                                    <RiDeleteBin2Fill />
                                    <span>Delete</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export default User