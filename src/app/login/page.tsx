'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useAuthContext } from 'src/contexts/authentication'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { Logo } from '@/components/Logo'
import { useToast } from '@/components/ui/use-toast'

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

const loginFormDefaultValues = { email: '', password: '' }

export default function SignIn() {
  const { push } = useRouter()
  const { login, isLogin } = useAuthContext()
  const [isLoading, setIsLoading] = useState(false)

  const formInstance = useForm({
    defaultValues: loginFormDefaultValues,
    resolver: zodResolver(validationSignInSchema),
  })
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = formInstance

  const { toast } = useToast()

  const onSubmit = async (data: typeof loginFormDefaultValues) => {
    setIsLoading(true)
    try {
      await login(data.email, data.password)
      toast({
        variant: 'success',
        title: 'Register success',
        description: `Great, we back to process`,
      })
    } catch (error) {
      toast({
        variant: 'error',
        title: 'Login Error',
        description: `${error}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isLogin) {
      setTimeout(() => {
        push('/')
      }, 1500)
    }
  }, [isLogin, push])

  return (
    <div>
      {isLoading ? (
        <div />
      ) : (
        <div className="w-full min-h-screen flex flex-col justify-center items-center">
          <div
            className="mb-8 flex flex-col justify-center items-center 
          desktop2k:mb-8 desktop2k:mt-[-12rem]"
          >
            <div className="transform object-cover">
              <Logo />
            </div>
            <div>
              <p className="font-semibold text-3xl">
                Hallucination Guys say hi 👋
              </p>
            </div>
          </div>
          <Card className="w-[400px]">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl justify-center flex">
                Login
              </CardTitle>
              <CardDescription className="text-md justify-center flex font-medium" />
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
                    <Link
                      className="text-indigo-700 hover:opacity-80"
                      href="/signup"
                    >
                      Already have an account
                    </Link>
                    <Link
                      className="text-pink-700 hover:opacity-80"
                      href="/forgot-password"
                    >
                      Forget your password?
                    </Link>
                  </div>
                  <Button
                    appearance="primary"
                    className="w-full"
                    size="lg"
                    type="submit"
                  >
                    Login
                  </Button>
                </CardContent>
              </form>
            </FormProvider>
          </Card>
        </div>
      )}
    </div>
  )
}
