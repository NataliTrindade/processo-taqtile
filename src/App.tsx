import LoginForm from "./components/LoginForm";
import BlankPage from "./components/BlankPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginForm />} />
        <Route path="blank" element={<BlankPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
