import { useForm,  SubmitHandler  } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { LogoSecurity } from './components/Logo'
import { GithubButton } from './components/Button'
import { FormInput } from './components/FormInput'
import { SignUpSchemaType, SignUpSchema } from './schemas/Users'



function App() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) })

  const onSubmit: SubmitHandler<SignUpSchemaType> = (data) => console.log(data)

  return (
    <div className=" w-full min-h-screen flex flex-col justify-center items-center space-y-6 bg-gray-100 pt-8 pb-28">
        <div className="scale-100 transform">
            <LogoSecurity />
        </div>

        <div className="text-justify font-medium text-2xl text-black ">
            Sign in to your account
        </div>

        <div className="bg-white w-full max-w-[460px] !p-10 border rounded-lg flex flex-col">
            <form className="space-y-6"  onSubmit={handleSubmit(onSubmit)}>

                      <FormInput 
                        type="text" 
                        label="Email" 
                        placeholder='Enter email here' 
                        hasError={errors?.email?.message} 
                        {...register("email")}
                        />


                      <FormInput 
                        type="password" 
                        label="Password" 
                        placeholder='Enter password here' 
                        hasError={errors?.password?.message} 
                        {...register("password")}
                        />
                  <div className='mt-8 flex justify-between items-center'>
                    <div className='flex flex-row '>
                        <input  type="checkbox" id='remember' 
                            className=' h-auto w-4 cursor-pointer '/>
                        <label className='mx-2 text-justify font-medium text-sm text-gray-600' htmlFor="remember">Remember for 30 days</label>
                    </div>
                    <button className='font-medium text-sm text-pink-500'>Forgot password</button>
                  </div>

                  <button type="submit" className='w-full h-10 bg-pink-600 text-white font-medium rounded shadow-md 
                  hover-bg-pink-700 hover-shadow-lg focus:bg-pink-700 focus:outline-none focus:ring-0 active:bg-pink-700'>Sign In</button>

                  <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-base">
                          <span className="px-2 bg-white text-gray-600">
                              Or continue by
                          </span>
                      </div>
                  </div>
                  <GithubButton />
            </form>
        </div>
    </div>
  )
}

export default App
