import { Route, Routes } from "react-router-dom"
import AuthLayout from "./layout/AuthLayout"
import RegsiterPage from "./pages/RegsiterPage"

const App = () => {
  return (
    <Routes>

      <Route element={<AuthLayout />}>
        <Route path="/register" element={<RegsiterPage />} />
      </Route>

    </Routes>
  )
}

export default App