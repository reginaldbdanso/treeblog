// import useBlogsContext from "../hooks/useBlogContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';


const BlogDetails = ({blog}) => {


    return (
        <div className="featured">
            <h2>{blog.title}</h2>
            <p><strong>Author: </strong>{blog.author}</p>
            <p><strong></strong>{blog.body}</p>
            {blog.createdAt && !isNaN(Date.parse(blog.createdAt)) && <p>{formatDistanceToNow(new Date(blog.createdAt), {addSuffix: true})}</p>}
        </div>
    );
}
 
export default BlogDetails;