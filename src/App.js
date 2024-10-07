import RegisterForm from "./pages/register";
import Login from "./pages/login";
import { AlertProvider } from "./services/alertService";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainForm from "./pages/main";

function App() {
  return (
    <AlertProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RegisterForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<MainForm />} />
        </Routes>
      </Router>
    </AlertProvider>
  );
}

export default App;
