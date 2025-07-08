import { Route, Routes } from "react-router-dom"
import AuthLayout from "./layout/AuthLayout"
import RegsiterPage from "./pages/RegsiterPage"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import MainLayout from "./layout/MainLayout"

const App = () => {
  return (
    <Routes>

      <Route element={<AuthLayout />}>
        <Route path="/register" element={<RegsiterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/home" element={<HomePage />} />
      </Route>

    </Routes>
  )
}

export default App