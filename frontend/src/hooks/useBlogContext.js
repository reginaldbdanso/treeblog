import { BlogContext } from "../context/BlogContext";
import { useContext } from "react";

export const useBlogsContext = () => {
    const context = useContext(BlogContext);

    if (!context) {
        throw new Error("only use this context inside the BlogContextProvider");
    }

    return context;
}
 
export default useBlogsContext;
