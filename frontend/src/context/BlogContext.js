import { createContext, useReducer } from "react";

export const BlogContext = createContext();

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BLOGS':
            return {
                blogs: action.payload
            }
        case 'SET_USER_BLOGS':
            return {
                userblogs: action.payload
            }
        case 'CREATE_BLOG':
            return {
                blogs: [action.payload, ...state.blogs]
            }
        case 'DELETE_BLOG':
            return {
                blogs: state.blogs.filter((blog) => blog._id !== action.payload)
            }
        default:
            return state;
    }
}

export const MyBlogContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(blogReducer, {
        blogs: null,
        userblogs: null

    })

    return (
        <BlogContext.Provider value={{...state, dispatch}}>
            { children }
        </BlogContext.Provider>
    )

}