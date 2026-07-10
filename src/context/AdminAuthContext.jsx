import React, { createContext, useContext, useState, useEffect } from 'react'

const AdminAuthContext = createContext()

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [admin, setAdmin] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const role = localStorage.getItem('userRole')
    if (token && role === 'ADMIN') {
      setIsAuthenticated(true)
    }

    const savedAdmin = localStorage.getItem('adminProfile')
    if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin))
    } else {
      setAdmin({
        name: 'Admin',
        email: 'admin@iptech.com',
        phone: '+91 9876543210',
        designation: 'Super Admin'
      })
    }
  }, [])

  const login = async (email, password) => {
    try {
      const res = await fetch('http://https://jobportal-backend-cm33.onrender.com/api/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok || !data.token) {
        return { success: false, message: data.message || 'Invalid Email or Password' }
      }

      localStorage.setItem('authToken', data.token)
      localStorage.setItem('userRole', data.role)
      setIsAuthenticated(true)

      return { success: true }
    } catch (err) {
      console.error('Admin login error:', err)
      return { success: false, message: 'Server error, please try again' }
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('authToken')
    localStorage.removeItem('userRole')
  }

  const updateProfile = (newProfile) => {
    const updatedProfile = { ...admin, ...newProfile }
    setAdmin(updatedProfile)
    localStorage.setItem('adminProfile', JSON.stringify(updatedProfile))
  }

  return (
    <AdminAuthContext.Provider value={{
      isAuthenticated,
      admin,
      login,
      logout,
      updateProfile
    }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export const useAdminAuth = () => useContext(AdminAuthContext)