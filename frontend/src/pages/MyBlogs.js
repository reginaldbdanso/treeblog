import { useEffect } from "react";
import BlogDetails from "../components/BlogDetails";
import BlogForm from "../components/BlogForm";
import useBlogsContext from "../hooks/useBlogContext";
import { useAuthContext } from "../hooks/useAuthContext";


const MyBlogs = () => {
    const { userblogs, dispatch } = useBlogsContext()
    const { user } = useAuthContext()


    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + "/user", {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if (response.ok) {
                // setBlogs(json);
                dispatch({ type: 'SET_USER_BLOGS', payload: json })
            }
        }

        fetchBlogs()
    }, [dispatch, user]);

    return (
        <div className="myblogs">
            <div className="Blogs">
                {!userblogs && <div>Loading...</div>}
                {userblogs && userblogs.map((userblog) => (
                    <BlogDetails key={userblog._id} userblog={userblog} />
                ))}
            </div>
            <BlogForm />
        </div>
    );
}

export default MyBlogs;