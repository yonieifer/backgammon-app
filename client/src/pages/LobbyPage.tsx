import useAuthStore from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'

function LobbyPage() {
    const user = useAuthStore(state => state.user)
    const logout = useAuthStore(state => state.logout)
    const navigate = useNavigate()
    const onLogout = () => {
        logout()
        navigate("/")
    }

  return (
    <>
        <h1>Hello, {user?.username}.</h1>
        <button onClick={onLogout}>Logout</button>
        <button onClick={() => navigate("/game")}>Profile</button>
    </>
  )
}

export default LobbyPage