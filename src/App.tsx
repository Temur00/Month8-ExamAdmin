import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header, MySidebar } from "./components/index";
import {
  Dashboard,
  Login,
  NotFound,
  Profile,
  Register,
  Products,
} from "./pages/index";

const App = () => {
  return (
    <div className="max-h-screen">
      <Router>
        <Header />
        <div className="flex bg-slate-50 dark:bg-[#252e45]">
          <MySidebar />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="products" element={<Products />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
