"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as jose from 'jose'; // For JWT generation
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

type LoginFormValues = z.infer<typeof loginSchema>

// Mock user for demonstration
const MOCK_USER = {
  email: "user@example.com",
  password: "password123",
  name: "John Doe",
  role: "Admin",
  id: "123456789",
}

// JWT Secret (in a real app, this would be stored securely and never exposed client-side)
// For a production app, you would handle JWT generation on the server
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || "this-is-a-secret-key-for-demo-only"

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function generateJWT(user) {
    // Create payload for JWT
    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours expiry
    }

    // Sign the JWT token
    const secretKey = new TextEncoder().encode(JWT_SECRET)
    const token = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .sign(secretKey)

    return token
  }

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check credentials against mock user
      if (data.email === MOCK_USER.email && data.password === MOCK_USER.password) {
        // Generate a proper JWT token
        const token = await generateJWT(MOCK_USER)

        // Store only non-sensitive user info in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: MOCK_USER.name,
            email: MOCK_USER.email,
            role: MOCK_USER.role,
          })
        )

        // Store the JWT in localStorage
        localStorage.setItem("jwt", token)

        // Set HTTP-only cookie for added security (would typically be done server-side)
        // Note: In a real app, HTTP-only cookies should be set by the server
        document.cookie = `auth-token=${token}; path=/; max-age=86400; SameSite=Lax; Secure`

        toast.success("Logged in successfully")

        // Redirect to dashboard
        router.push("/dashboard")
      } else {
        toast.error("Invalid email or password")
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="name@example.com" {...form.register("email")} />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Button variant="link" className="h-auto p-0 text-sm" type="button">
                Forgot password?
              </Button>
            </div>
            <Input id="password" type="password" {...form.register("password")} />
            {form.formState.errors.password && (
              <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Demo credentials:</p>
            <p>Email: user@example.com</p>
            <p>Password: password123</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
