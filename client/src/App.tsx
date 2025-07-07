import { Route, Routes } from "react-router-dom"
import AuthLayout from "./layout/AuthLayout"
import RegsiterPage from "./pages/RegsiterPage"
import LoginPage from "./pages/LoginPage"

const App = () => {
  return (
    <Routes>

      <Route element={<AuthLayout />}>
        <Route path="/register" element={<RegsiterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

    </Routes>
  )
}

export default App