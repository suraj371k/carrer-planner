"use client"

import Analytics from '@/components/resume/Analytics'
import Upload from '@/components/resume/Upload'
import React from 'react'

const Resume = () => {
  return (
    <div>
        <div>
            <Upload/>
        </div>
        <div>
            <Analytics />
        </div>
    </div>
  )
}

export default Resume