'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/Input'
import { InputShadcn } from '@/components/ui/input'
import { Button } from '@/components/Button'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/components/ui/use-toast'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'

const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]
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
    image: z
      .any()
      .refine(
        (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
        'Only .jpg, .jpeg, .png and .webp formats are supported.',
      )
      .refine((files) => {
        return files?.[0]?.size <= MAX_FILE_SIZE
      }, `Max image size is 5MB.`),
    isVerified: z.boolean().optional(),
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
  image: z.any,
  isVerified: false,
}

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const formInstance = useForm({
    defaultValues: signUpFormDefaultValues,
    resolver: zodResolver(validationSignUpSchema),
  })
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = formInstance

  const onSubmit = (data: typeof signUpFormDefaultValues) => {
    setIsLoading(true)
    try {
      console.log(data)
      toast({
        variant: 'success',
        title: 'Success',
        description: `Signup success`,
      })
    } catch (error) {
      toast({
        variant: 'error',
        title: 'Error',
        description: `Login fail`,
      })
    }
  }

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center py-4">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl justify-center flex">
              Register
            </CardTitle>
            <CardDescription className="text-md justify-center flex font-medium">
              Already for register new account 👋
            </CardDescription>
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
                <InputShadcn
                  id="Picture"
                  label="Picture"
                  type="file"
                  {...register('image')}
                  error={errors.image && errors.image.message}
                />

                <div className="items-top flex space-x-2">
                  <Checkbox id="terms1" {...register('isVerified')} />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms1"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Accept terms and conditions
                    </label>
                    <p className="text-sm text-muted-foreground">
                      You agree to our Terms of Service and Privacy Policy.
                    </p>
                  </div>
                </div>
                <Button
                  appearance="primary"
                  className="w-full"
                  type="submit"
                  size="lg"
                >
                  Register
                </Button>
              </CardContent>
            </form>
          </FormProvider>
        </Card>
      </div>
    </>
  )
}
