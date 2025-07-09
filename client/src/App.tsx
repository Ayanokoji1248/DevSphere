import { Route, Routes } from "react-router-dom"
import AuthLayout from "./layout/AuthLayout"
import RegsiterPage from "./pages/RegsiterPage"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import MainLayout from "./layout/MainLayout"
import CreatePostPage from "./pages/CreatePostPage"
import { useEffect } from "react"
import axios from "axios"
import { BACKEND_URL } from "./utils"
import userStore from "./store/userStore"


const App = () => {
  const { setUser } = userStore()
  const getCurrentUser = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/me`, {
        withCredentials: true
      })

      console.log(response.data.user)
      setUser(response.data.user)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  return (
    <Routes>

      <Route element={<AuthLayout />}>
        <Route path="/register" element={<RegsiterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/home" element={<HomePage />} />
        {/* this will be authenticated routes */}
        <Route path="create-post" element={<CreatePostPage />} />
      </Route>

    </Routes>
  )
}

export default App