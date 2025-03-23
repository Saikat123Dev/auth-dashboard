"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type UserData = {
  name: string
  email: string
  role: string
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    // Get user data from localStorage
    const userDataStr = localStorage.getItem("user")
    if (userDataStr) {
      try {
        const userData = JSON.parse(userDataStr)
        setUserData(userData)
      } catch (error) {
        console.error("Failed to parse user data:", error)
      }
    }
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
        <p className="text-muted-foreground">View and manage your profile information.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>Your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {userData ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p>{userData.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p>{userData.email}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Role</p>
                <p>{userData.role}</p>
              </div>
            </div>
          ) : (
            <p>Loading profile information...</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

