import useBlogsContext from "../hooks/useBlogContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useAuthContext } from '../hooks/useAuthContext';


const BlogDetails = ({userblog}) => {
    const {dispatch} = useBlogsContext();
    const {user} = useAuthContext();

    const handleClick = async () => {
        if (!user) {
            return
        }
        
        const response = await fetch(process.env.REACT_APP_API_URL + '/' + userblog._id, {
            method: 'DELETE',
            headers: {
                   "Authorization": `Bearer ${user.token}`
            }
        })
        // const json = await response.json();

        if (response.ok) {
            dispatch({type: 'DELETE_BLOG', payload: userblog._id});
        }
    }

    return (
        <div className="blog-details">
            <h2>{userblog.title}</h2>
            <p><strong>Author: </strong>{userblog.author}</p>
            <p><strong></strong>{userblog.body}</p>
            {userblog.createdAt && !isNaN(Date.parse(userblog.createdAt)) && <p>{formatDistanceToNow(new Date(userblog.createdAt), {addSuffix: true})}</p>}
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    );
}
 
export default BlogDetails;