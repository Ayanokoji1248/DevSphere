import { Route, Routes } from "react-router-dom"
import AuthLayout from "./layout/AuthLayout"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import MainLayout from "./layout/MainLayout"
import CreatePostPage from "./pages/CreatePostPage"
import { useEffect } from "react"
import axios from "axios"
import { BACKEND_URL } from "./utils"
import userStore from "./store/userStore"
import ProtectedRoute from "./components/ProtectedRoute"
import postStore from "./store/postStore"
import UserProfilePage from "./pages/UserProfilePage"


const App = () => {

  const { setUser, setLoading } = userStore()
  const { setPosts } = postStore();
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

  const getAllBlogs = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/post/all`, {
        withCredentials: true
      })
      // console.log(response.data.posts)
      setPosts(response.data.posts.reverse())
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    setLoading(true)
    getCurrentUser()
    getAllBlogs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Routes>

      <Route element={<AuthLayout />}>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/home" element={<HomePage />} />
        {/* this will be authenticated routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
        </Route>

      </Route>

    </Routes >
  )
}

export default App