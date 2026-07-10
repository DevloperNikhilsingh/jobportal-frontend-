import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAdminAuth } from '../../context/AdminAuthContext'
import AdminLoginModal from '../../Component/AdminLoginModal'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAdminAuth()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      setShowModal(true)
    }
  }, [isAuthenticated])

  if (isAuthenticated) {
    return children
  }

  // If not authenticated, show login modal and redirect to home
  return (
    <>
      <Navigate to="/home" replace />
      <AdminLoginModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}

export default ProtectedRoute
