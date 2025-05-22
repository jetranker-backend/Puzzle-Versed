import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Profile() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState({
    name: '',
    email: '',
    openai_key: ''
  })
  const [message, setMessage] = useState(null)

  useEffect(() => {
    loadUserSettings()
  }, [])

  const loadUserSettings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No user found')

      // Get user settings and profile data
      const [{ data: settingsData }, { data: profileData }] = await Promise.all([
        supabase
          .from('user_settings')
          .select('*')
          .eq('id', user.id)
          .single(),
        supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
      ])
      
      setSettings({
        name: settingsData?.name || user.user_metadata?.name || '',
        email: profileData?.email || user.email || '',
        openai_key: settingsData?.openai_key || ''
      })
    } catch (error) {
      console.error('Error loading user settings:', error)
    } finally {
      setLoading(false)
    }
  }

  // Rest of the component remains the same...
}
