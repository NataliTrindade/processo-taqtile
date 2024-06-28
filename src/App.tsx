import LoginForm from "./components/LoginForm";
import UsersList from "./components/UsersList";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginForm />} />
        <Route path="users" element={<UsersList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
