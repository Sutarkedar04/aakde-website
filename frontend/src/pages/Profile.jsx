import { Navigate, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import useAuth from '../hooks/useAuth'

export default function Profile() {
  const { user, isLoggedIn, ready, logout } = useAuth()
  const navigate = useNavigate()

  if (!ready) return null
  if (!isLoggedIn) return <Navigate to="/login" replace />

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <AuthLayout title="My profile" subtitle="You are signed in.">
      <dl className="grid gap-4">
        <div>
          <dt className="text-sm text-soft">Name</dt>
          <dd className="font-semibold text-main">{user?.name ?? '-'}</dd>
        </div>
        <div>
          <dt className="text-sm text-soft">Email</dt>
          <dd className="font-semibold text-main">{user?.email ?? '-'}</dd>
        </div>
        <div>
          <dt className="text-sm text-soft">Account type</dt>
          <dd className="font-semibold capitalize text-main">{user?.role?.toLowerCase() ?? '-'}</dd>
        </div>
      </dl>
      <button type="button" onClick={handleLogout} className="btn btn-ghost mt-6 w-full">
        Log out
      </button>
    </AuthLayout>
  )
}