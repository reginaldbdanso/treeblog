// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';


import Home from './pages/Home';
import Blogs from './pages/Blogs';
import MyBlogs from './pages/MyBlogs';
import About from './pages/About';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/Footer';


function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" exact element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/blogs" exact element={user ? <Blogs /> : <Navigate to="/login" />} />
            <Route path="/myblogs" exact element={user ? <MyBlogs /> : <Navigate to="/login" />} />
            <Route path="/about" exact element={user ? <About /> : <Navigate to="/login" />} />
            <Route path="/login" exact element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" exact element={!user ? <Signup /> : <Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
