import AddUser from "./AddUser"
import UpdateUser from "./UpdateUser"
import User from "./User"
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

function App() {
const route = createBrowserRouter([
  {
    path:'/',
    element:<User/>
  },
  {
    path:'/add',
    element:<AddUser/>
  },
  {
    path:'/update/:id',
    element:<UpdateUser/>
  }
])
  return (    
     <>
<RouterProvider router={route}></RouterProvider>
     </>
  )
}

export default App