import "./App.css";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Public portfolio (your current app, extracted to a wrapper)
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { MobileMenu } from "./components/MobileMenu";
import { Home } from "./components/sections/Home";
import { About } from "./components/sections/About";
import { Contact } from "./components/sections/Contact";

// New pages
import { Login } from "./pages/Login";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { NewPost } from "./pages/admin/NewPost";
import { Posts } from "./pages/Posts";
import { PostDetail } from "./pages/PostDetail";
import { Portfolio } from "./pages/Portfolio";
import { AgeCalculator } from "./pages/AgeCalculator";
import { Playground } from "./pages/Playground";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Portfolio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/age-calculator" element={<AgeCalculator />} />

          {/* Protected admin routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/new-post" element={<NewPost />} />
            <Route path="/admin/edit-post/:id" element={<NewPost />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
