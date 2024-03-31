import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const AllBlogDetails = ({blog}) => {


    return (
        <div className="allblog-details">
            <h2>{blog.title}</h2>
            <p><strong>Author: </strong>{blog.author}</p>
            <p><strong></strong>{blog.body}</p>
            {blog.createdAt && !isNaN(Date.parse(blog.createdAt)) && <p>{formatDistanceToNow(new Date(blog.createdAt), {addSuffix: true})}</p>}
            {/* <span className="material-symbols-outlined" onClick={handleClick}>delete</span> */}
        </div>
    );
}
 
export default AllBlogDetails;