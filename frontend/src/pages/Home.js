import { useEffect } from "react";
import Featured from "../components/Featured";
// import BlogForm from "../components/BlogForm";
import useBlogsContext from "../hooks/useBlogContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
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
        // url('path/to/your/image.jpg

        if (user) {
            fetchBlogs()
        }
    }, [dispatch, user]);

    return (
        <div>
            <div className="hero">
                <div className="grid-container">
                    <div className="grid-item">
                        {/* <img src={image} alt="homepage_image" style={{ height: "500px", alignItems: "center", position: "absolute" }}/> */}
                        <div className="banner_caption" style={{ position: "relative", zIndex: 1 }}>
                            <h1>Welcome to TreeBlog</h1>
                            <p>Discover amazing blog posts from our community</p>
                        </div>
                    </div>
                </div>
            </div>
           
            <div className="featured-posts">
                <h2>Featured Posts</h2>
                <div className="post-list">
                    {!blogs && <div>Loading...</div>}
                    {blogs && blogs.slice(0, 4).map((blog) => (
                        <Featured key={blog._id} blog={blog} />
                    ))}
                </div>
            </div>
            
        </div>
    );
}

export default Home;