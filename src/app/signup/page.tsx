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

export default function SignUpPage() {
  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center">
        <Card className="w-[400px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl justify-center flex">
              Register
            </CardTitle>
            <CardDescription className="text-md justify-center flex font-medium">
              Already for register new account 👋
            </CardDescription>
          </CardHeader>
          <form>
            <CardContent className="grid gap-4 space-y-2">
              <Input
                id="Name"
                label="Name"
                placeholder="Enter your username"
                type="text"
              />
              <Input
                id="Email"
                label="Email"
                placeholder="Enter your email"
                type="email"
              />
              <Input
                id="Password"
                label="Password"
                placeholder="Enter password"
                type="password"
              />

              <Input
                id="ConfirmPassword"
                label="Confirm Password"
                placeholder="Enter confirm password"
                type="password"
              />

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <label htmlFor="picture" className="text-md font-medium">
                  Picture
                </label>
                <InputShadcn id="picture" type="file" />
              </div>

              <div className="items-top flex space-x-2">
                <Checkbox id="terms1" />
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
          <CardFooter></CardFooter>
        </Card>
      </div>
    </>
  )
}
