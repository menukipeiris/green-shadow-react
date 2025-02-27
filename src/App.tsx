import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import {RootLayout} from "./component/RootLayout.tsx";
import {Dashboard} from "./Pages/Dashboard.tsx";
import {Field} from "./Pages/Field.tsx";
import {Crop} from "./Pages/Crop.tsx";
import {Staff} from "./Pages/Staff.tsx";
import {Vehicle} from "./Pages/Vehicle.tsx";
import {Equipment} from "./Pages/Equipment.tsx";
import {MonitoringLog} from "./Pages/MonitoringLog.tsx";
import {Login} from "./Pages/Login.tsx";
import {Register} from "./Pages/register.tsx";

function App() {
    const routes= createBrowserRouter([
        {
            path:'/',
            element:<Login/>
        },
        {
            path:'/register',
            element:<Register/>
        },
        {
            path:'',
            element:<RootLayout/>,
            children:[
                {path:'/dashboard',element:<Dashboard/>},
                {path:'/crop',element:<Crop/>},
                {path:'/field',element:<Field/>},
                {path:'/staff',element:<Staff/>},
                {path:'/vehicle',element:<Vehicle/>},
                {path:'/equipment',element:<Equipment/>},
                {path:'/logs',element:<MonitoringLog/>}
            ]
        }
    ])

  return (
    <>
        <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
