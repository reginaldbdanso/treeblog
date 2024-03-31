import { useState } from "react";
import useBlogsContext from "../hooks/useBlogContext";
import { useAuthContext } from "../hooks/useAuthContext";

const BlogForm = () => {
    const { dispatch} = useBlogsContext()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [author, setAuthor] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const { user } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            setError('You must be logged in to add a blog');
            return
        }
        console.log('submitting form', user);
        const blog = {title, body, author};

        const response = await fetch(process.env.REACT_APP_API_URL, {
            method: 'POST',
            body: JSON.stringify(blog),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`     
        }
          

        })
        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if (response.ok) {
            dispatch({type: 'CREATE_BLOG', payload: json})
            setTitle('');
            setBody('');
            setAuthor('');
            setError(null);
            setEmptyFields([]);
            console.log('New Blog added', json);
        }
    }

    return (
       <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Blog</h3>

        <label>Blog Title:</label>
        <input 
            type="text" 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes('title') ? 'error' : ''}
        
        />
        <label>Body: </label>
        <textarea
            type="text" 
            onChange={(e) => setBody(e.target.value)}
            value={body}
            className={emptyFields.includes('body') ? 'error' : ''}        
        ></textarea>
        <label>Author: </label>
        <input 
            type="text" 
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            className={emptyFields.includes('author') ? 'error' : ''}
        />
        <button>Add Blog</button>
        {error && (
            <div className="error">{error}</div>
        )}
       </form> 
    );
}
 
export default BlogForm;