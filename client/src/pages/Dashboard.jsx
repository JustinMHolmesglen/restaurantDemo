import useAuth from '../hooks/useAuth'
import TuCard from "../components/common/TuCard"

function Dashboard() {
  const { user: { id, username, email, isAdmin }, logout } = useAuth();

  if(!id){
    <TuCard title="Profile" authform>
      <div className="text-center mb-4">
        Cannot Retrieve User
      </div>
    </TuCard>
  }

  return (
    <TuCard title="Profile" authform>
      <div className="text-center mb-4">
        <h4>Welcome {username}</h4>
        <button onClick={logout}>Logout</button>
      </div>
    </TuCard>
  )
}

export default Dashboard