import { Route, Routes } from "react-router-dom"
import AuthLayout from "./layout/AuthLayout"
import RegsiterPage from "./pages/RegsiterPage"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import MainLayout from "./layout/MainLayout"
import CreatePostPage from "./pages/CreatePostPage"

const App = () => {
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