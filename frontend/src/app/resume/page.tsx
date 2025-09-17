"use client"

import Analytics from '@/components/resume/Analytics'
import Upload from '@/components/resume/Upload'
import ProtectedRoute from '@/components/ProtectedRoute'
import React from 'react'

const Resume = () => {
  return (
    <ProtectedRoute>
      <div>
          <div>
              <Upload/>
          </div>
          <div>
              <Analytics />
          </div>
      </div>
    </ProtectedRoute>
  )
}

export default Resume