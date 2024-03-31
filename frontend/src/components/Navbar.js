import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import treeicon from "./Treeblogincon.png";

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
                <div className="iconheader">
            <img className='treeicon' src={treeicon} alt="treeblogicon" />
                <Link to="/">
                    <h1>TreeBlog</h1>
                </Link>
                </div>
                <div className="navlinks">
                    <nav>
                    {user && (<Link to='/'>Home</Link>)}
                    {user && (<Link to='/blogs'>All Blogs</Link>)}
                    {user && (<Link to='/myblogs'>My Blogs</Link>)}
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