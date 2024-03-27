import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>TreeBlog</h1>
                </Link>
                <div className="navlinks">
                    <Link to='/'>Home</Link>
                    <Link to='/blogs'>Blogs</Link>
                    <Link to='/about'>About</Link>
                    <Link to='/contact'>Contact</Link>
                </div>
            </div>
        </header>
    );
}
 
export default Navbar;