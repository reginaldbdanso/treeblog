import { useEffect } from "react";
import BlogDetails from "../components/BlogDetails";
import BlogForm from "../components/BlogForm";
import useBlogsContext from "../hooks/useBlogContext";

const Home = () => {
    // const [Blogs, setBlogs] = useState(null)
    const {blogs, dispatch} = useBlogsContext()

    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL);
            const json = await response.json();

            if (response.ok) {
                // setBlogs(json);
                dispatch({type: 'SET_BLOGS', payload: json})
            }
        }

        fetchBlogs()
    }, [dispatch]);

    return (
        <div className="home">
            <div className="Blogs">
                {!blogs && <div>Loading...</div>}
                {blogs && blogs.map((blog) => (
                <BlogDetails key={blog._id} blog={blog} />
                ))}
            </div>
            <BlogForm />
        </div>
    );
}
 
export default Home;