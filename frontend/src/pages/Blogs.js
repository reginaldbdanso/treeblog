import { useEffect } from "react";
import BlogDetails from "../components/BlogDetails";
import BlogForm from "../components/BlogForm";
import useBlogsContext from "../hooks/useBlogContext";
import { useAuthContext } from "../hooks/useAuthContext";


const Blogs = () => {
    // const [Blogs, setBlogs] = useState(null)
    const { blogs, dispatch } = useBlogsContext()
    const { user } = useAuthContext()


    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL, {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if (response.ok) {
                // setBlogs(json);
                dispatch({ type: 'SET_BLOGS', payload: json })
            }
        }

        fetchBlogs()
    }, [dispatch, user]);

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

export default Blogs;