'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'

const validationSignInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, {
      message: 'Password must contain at least 1 uppercase letter',
    })
    .regex(/\d/, {
      message: 'Password must contain at least 1 numeric digit',
    }),
})

type LoginSchemaType = z.infer<typeof validationSignInSchema>

export default function SignIn() {
  const { toast } = useToast()

  const formInstance = useForm<LoginSchemaType>({
    resolver: zodResolver(validationSignInSchema),
  })
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = formInstance

  const onSubmit = (data: LoginSchemaType) => {
    toast({
      variant: 'success',
      title: 'Data from user',
      description: `Email: ${data.email} \n Password:${data.password}`,
    })
  }

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center">
        <Card className="w-[400px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl justify-center flex">
              Sign in
            </CardTitle>
            <CardDescription className="text-md justify-center flex font-medium">
              Welcome back 👋
            </CardDescription>
          </CardHeader>
          <FormProvider {...formInstance}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="grid gap-4 space-y-2">
                <Input
                  id="Email"
                  label="Email"
                  placeholder="Enter username or email"
                  type="email"
                  {...register('email')}
                  error={errors.email && errors.email.message}
                />
                <Input
                  id="Password"
                  label="Password"
                  placeholder="Enter password"
                  type="password"
                  {...register('password')}
                  error={errors.password && errors.password.message}
                />

                <div className="flex w-full justify-between text-sm">
                  <Link className="text-indigo-600" href="/signup">
                    Already have an account
                  </Link>
                  <Link className="text-pink-700" href="/forgot-password">
                    Forget password
                  </Link>
                </div>
                <Button appearance="primary" className="w-full " type="submit">
                  Sign in
                </Button>
              </CardContent>
            </form>
          </FormProvider>
          <CardFooter className="grid gap-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-muted-foreground opacity-70">
                  Or continue by
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Button className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-2 focus:outline-none focus:ring-pink-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-white dark:hover:bg-[#050708]/30">
                <Icons.GitHub className="mx-2 h-6 w-8" />
                Sign in with Github
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      <Toaster />
    </>
  )
}
