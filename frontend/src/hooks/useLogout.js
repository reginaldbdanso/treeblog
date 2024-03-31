import { useAuthContext } from './useAuthContext'
import { useBlogsContext } from './useBlogContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchBlogs } = useBlogsContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchBlogs({ type: 'SET_BLOGS', payload: null })
  }

  return { logout }
}
