import React, { useContext, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import WebsiteMain from './Pages/WebsiteMain'
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import { MainContext } from './ContextMain'
import Dashboard from './Pages/Dashboard'
import axios from 'axios'
import { connectSocket } from './Sockets/Socket'
import SharePrompt from './Components/SharePrompt'


function App() {
  const { isDark, setIsDark, findUserData, } = useContext(MainContext)


  useEffect(() => {
    const initApp = async () => {
      try {
        await findUserData();
        connectSocket();
      } catch (err) {
        console.log(err)
      }
    }
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);


  const route = createBrowserRouter([
    {
      path: "/",
      element: <WebsiteMain />,
      children: [
        {
          path: "",
          element: <Home />
        }
      ]
    },
    {
      path: "/login",
      element: <Login />
    },
    {

      path: "/register",
      element: <SignUp />
    },
    {
      path: "/dashboard",
      element: <Dashboard />
    },
    {
      path: "/share/:id",
      element: <SharePrompt />
    }
  ])


  return (
    <RouterProvider router={route} />
  )
}

export default App
