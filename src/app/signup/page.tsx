'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { useAuthContext } from 'src/contexts/authentication'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { Logo } from '@/components/Logo'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/components/ui/use-toast'

/*eslint prefer-regex-literals: "error"*/
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
)

const validationSignUpSchema = z
  .object({
    firstName: z
      .string()
      .refine((value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value)),
    lastName: z
      .string()
      .refine((value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value)),
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
    passwordConfirm: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[A-Z]/, {
        message: 'Password must contain at least 1 uppercase letter',
      })
      .regex(/\d/, {
        message: 'Password must contain at least 1 numeric digit',
      }),
    phone: z
      .string()
      .min(10, 'Invalid phone number')
      .regex(phoneRegex, 'Invalid phone number'),
    policy: z.boolean(),
  })
  .refine((data) => data.policy === true, {
    message: 'You must accept Terms and Conditions',
    path: ['policy'],
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm'],
  })

const signUpFormDefaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  phone: '',
  policy: false,
}

export default function SignUpPage() {
  const { push } = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const formInstance = useForm({
    defaultValues: signUpFormDefaultValues,
    resolver: zodResolver(validationSignUpSchema),
  })
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = formInstance

  const { toast } = useToast()
  const { registerUser, isLogin } = useAuthContext()

  const onSubmit = async (data: typeof signUpFormDefaultValues) => {
    setIsLoading(true)
    try {
      await registerUser(
        data.firstName,
        data.lastName,
        data.email,
        data.password,
        data.passwordConfirm,
        data.phone,
      )
      toast({
        variant: 'success',
        title: 'Register success',
        description: `Great, we back to process`,
      })
    } catch (error) {
      toast({
        variant: 'error',
        title: 'Register Error',
        description: `${error}`,
      })
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isLogin) {
      setTimeout(() => {
        push('/')
      }, 2500)
    }
  }, [isLogin, push])

  return (
    <div>
      {isLoading ? (
        <div />
      ) : (
        <div className="w-full min-h-screen flex flex-col justify-center items-center">
          <div className="w-fit p-4 absolute top-2 left-2">
            <Link
              className="text-indigo-700 hover:opacity-80 underline underline-offset-4 font-bold text-lg"
              href="/login"
            >
              <ArrowLeftIcon className="inline-block mr-1" />
              Back to login
            </Link>
          </div>
          <div className="mb-4 flex flex-col justify-center items-center desktop2k:mb-8 ">
            <div className="transform object-cover">
              <Logo />
            </div>
            <div>
              <p className="font-semibold text-xl">
                Already for register new account 👋
              </p>
            </div>
          </div>
          <Card>
            <CardHeader className="">
              <CardTitle className="text-xl justify-center flex">
                Register
              </CardTitle>
            </CardHeader>
            <FormProvider {...formInstance}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="grid gap-4 space-y-0">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Input
                        id="First Name"
                        label="First Name"
                        placeholder="Enter your first name"
                        type="text"
                        {...register('firstName')}
                        error={errors.firstName && errors.firstName.message}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Input
                        id="Last Name"
                        label="Last Name"
                        placeholder="Enter your last name"
                        type="text"
                        {...register('lastName')}
                        error={errors.lastName && errors.lastName.message}
                      />
                    </div>
                  </div>

                  <Input
                    id="Email"
                    label="Email"
                    placeholder="Enter your email"
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

                  <Input
                    id="ConfirmPassword"
                    label="Confirm Password"
                    placeholder="Enter confirm password"
                    type="password"
                    {...register('passwordConfirm')}
                    error={
                      errors.passwordConfirm && errors.passwordConfirm.message
                    }
                  />

                  <Input
                    id="Phone"
                    label="Phone"
                    placeholder="Enter phone number"
                    type="string"
                    {...register('phone')}
                    error={errors.phone && errors.phone.message}
                  />

                  <div className="items-top flex space-x-2 ">
                    <Checkbox id="terms1" {...register('policy')} />
                    <div className="grid gap-1.5 leading-none">
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="terms1"
                      >
                        Accept terms and conditions
                      </label>

                      <p className="text-sm text-muted-foreground">
                        You agree to our{' '}
                        <Link href="/policy">
                          Terms of Service and Privacy Policy.
                        </Link>
                      </p>
                      {errors.policy && (
                        <p className="text-xs italic text-red-500 ">
                          {errors.policy?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    appearance="primary"
                    className="w-full"
                    size="lg"
                    type="submit"
                  >
                    Register
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
