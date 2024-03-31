// import useBlogsContext from "../hooks/useBlogContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
// import { useAuthContext } from '../hooks/useAuthContext';


const BlogDetails = ({blog}) => {
    // const {dispatch} = useBlogsContext();
    // const {user} = useAuthContext();

    // const handleClick = async () => {
    //     if (!user) {
    //         return
    //     }
        
    //     const response = await fetch(process.env.REACT_APP_API_URL + '/' + blog._id, {
    //         method: 'DELETE',
    //         headers: {
    //                "Authorization": `Bearer ${user.token}`
    //         }
    //     })
    //     // const json = await response.json();

    //     if (response.ok) {
    //         dispatch({type: 'DELETE_BLOG', payload: blog._id});
    //     }
    // }

    return (
        <div className="blog-details">
            <h2>{blog.title}</h2>
            <p><strong>Author: </strong>{blog.author}</p>
            <p><strong></strong>{blog.body}</p>
            {/* {blog.createdAt && <p>{formatDistanceToNow(new Date(blog.createdAt), {addSuffix: true})}</p>} */}
            {blog.createdAt && !isNaN(Date.parse(blog.createdAt)) && <p>{formatDistanceToNow(new Date(blog.createdAt), {addSuffix: true})}</p>}
            {/* <span className="material-symbols-outlined" onClick={handleClick}>delete</span> */}
        </div>
    );
}
 
export default BlogDetails;