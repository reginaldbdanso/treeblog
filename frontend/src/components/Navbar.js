import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { logout } = useLogout()
    const navigate = useNavigate()
    const { user } = useAuthContext()

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>TreeBlog</h1>
                </Link>
                <div className="navlinks">
                    <nav>
                    {user && (<Link to='/'>Home</Link>)}
                    {user && (<Link to='/blogs'>Blogs</Link>)}
                    {user && (<Link to='/about'>About</Link>)}
                    {!user && (
                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </div>)}
                    {user && (
                    <div>
                        <button onClick={handleLogout}>Logout</button>
                        {/* <span>{user.email}</span> */}
                    </div>)}
                    </nav>
                    {user && (<span>{user.email}</span>)}
                </div>
            </div>
        </header>
    );
}
 
export default Navbar;