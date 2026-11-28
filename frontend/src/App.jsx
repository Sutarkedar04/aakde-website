import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ContactPage from './pages/ContactPage'
import Sarav from './features/sarav/pages/Sarav'
import TestPage from './features/sarav/pages/TestPage'
import Kaushalya from './pages/services/Kaushalya'
import Paramarsh from './pages/services/Paramarsh'
import Sahyog from './pages/services/Sahyog'
import { api } from './lib/api'
import { signIn, signOut, markAuthReady } from './lib/access'
import Profile from './pages/Profile' // adjust: the file that exports signIn / signOut

export default function App() {
  // On page load, ask the server who is signed in, so the browser never
  // thinks you are logged in after the session cookie has expired.
  useEffect(() => {
    api('/auth/me')
      .then(({ user }) => (user ? signIn(user) : signOut()))
      .catch(() => {}) 
      .finally(markAuthReady)
  }, [])

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services/sarav" element={<Sarav />} />
        <Route path="/services/kaushalya" element={<Kaushalya />} />
        <Route path="/services/paramarsh" element={<Paramarsh />} />
        <Route path="/services/sahyog" element={<Sahyog />} />
        <Route path="/sarav/test/:id" element={<TestPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}