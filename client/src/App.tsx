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
import EditProfilePage from "./pages/EditProfilePage"
import ProjectPage from "./pages/ProjectPage"
import projectStore from "./store/projectStore"
import CreateProjectPage from "./pages/CreateProjectPage"


const App = () => {

  const { setUser, setLoading } = userStore()
  const { setPosts } = postStore();
  const { setProjects } = projectStore()
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


  const getAllProjects = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/project/all-project`, {
        withCredentials: true
      })
      console.log(response.data)
      setProjects(response.data.projects.reverse())
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setLoading(true)
    getCurrentUser()
    getAllBlogs()
    getAllProjects()
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
          <Route path="/edit-profile" element={<EditProfilePage />} />
        </Route>

      </Route>

      <Route path="/projects" element={<ProjectPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/create-project" element={<CreateProjectPage />} />
      </Route>

    </Routes >
  )
}

export default App