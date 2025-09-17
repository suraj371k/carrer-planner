"use client"
import UserSession from '@/components/dashboard/user-sessions'
import ProtectedRoute from '@/components/ProtectedRoute'
import React from 'react'

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <div>
        <div>
          <UserSession />
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Dashboard