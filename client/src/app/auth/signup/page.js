"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"

// 🔥 shadcn + RHF + Zod imports
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

// shadcn UI components
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { toast } from "sonner"
import { registerUser } from "@/store/slices/authSlice"

//
// ----------------------------------------------------------
// 1️⃣ Create Zod validation schema
// ----------------------------------------------------------
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

function SignUp() {
  const router = useRouter()
  const dispatch = useDispatch()

  //
  // ----------------------------------------------------------
  // 2️⃣ Create React Hook Form instance with Zod validation
  // ----------------------------------------------------------
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  //
  // ----------------------------------------------------------
  // 3️⃣ Handle form submission
  //     - "values" already contain validated data
  // ----------------------------------------------------------
  const onSubmit = (values) => {
    console.log(values, "Submitted form values")

    dispatch(registerUser(values)).then((data) => {
      console.log(data, "registration response")
      if (data?.payload?.success) {
        console.log(data?.payload?.message, "success message")
        toast.success(data?.payload?.message)
        router.push("/auth/login")
      } else {
        console.log(
          data?.payload?.message ||
            "Something went wrong while registering. Please try again later."
        )
        toast.error(
          data?.payload?.message ||
            "Something went wrong while registering. Please try again later."
        )
      }
    })
  }

  //
  // ----------------------------------------------------------
  // 4️⃣ Render UI
  // ----------------------------------------------------------
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex flex-wrap  ">
        <div>
        <CardTitle>Create an account</CardTitle>
          <CardDescription>
          Enter your details below to create a new account.
        </CardDescription>
        </div>
        <div className="flex-end w-full">
          
         <CardAction>
          <Button variant="link" onClick={() => router.push("/auth/login")}>Already have an account?</Button>
        </CardAction>
        </div>
      
       
      </CardHeader>

      {/*  Wrap the whole form inside <Form> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">

            {/* -------------------- Name Field -------------------- */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* -------------------- Email Field -------------------- */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* -------------------- Password Field -------------------- */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter a secure password"
                      {...field}
                      className=""
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          {/* Submit button must be inside the form */}
          <CardFooter className="flex-col gap-2 mt-5">
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default SignUp
