import { Routes, Route, Navigate } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Sarav from './features/sarav/pages/Sarav'
import TestPage from './features/sarav/pages/TestPage'
import Kaushalya from './pages/services/Kaushalya'
import Paramarsh from './pages/services/Paramarsh'
import Sahyog from './pages/services/Sahyog'


export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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