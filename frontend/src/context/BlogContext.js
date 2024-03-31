import { createContext, useReducer } from "react";

export const BlogContext = createContext();

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BLOGS':
            return {
                blogs: action.payload,
                userblogs: state.userblogs
            }
        case 'SET_USER_BLOGS':
            return {
                blogs: state.blogs,
                userblogs: action.payload
            }
        case 'CREATE_BLOG':
            return {
                blogs: [action.payload, ...state.blogs],
                userblogs: [action.payload, ...state.userblogs]
            }
        case 'DELETE_BLOG':
            return {
                blogs: state.blogs.filter((blog) => blog._id !== action.payload),
                userblogs: state.userblogs.filter((blog) => blog._id !== action.payload)
            }
        default:
            return state;
    }
}

export const MyBlogContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(blogReducer, {
        blogs: [],
        userblogs: null

    })

    return (
        <BlogContext.Provider value={{...state, dispatch}}>
            { children }
        </BlogContext.Provider>
    )

}
