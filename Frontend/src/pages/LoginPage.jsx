import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { Mail, Eye, EyeOff, Lock, Loader2 } from 'lucide-react'

import AuthImagePattern from '../components/AuthImagePattern'

const LoginPage = () => {

  const [ showPassword, setShowPassword ] = useState(false)

  const [ formData, setFormData ] = useState({
    email: "",
    password: ""
  })

  const { logIn, isLoggingIn } = useAuthStore()

  const handleSubmit = (e) => {
    e.preventDefault()
    logIn(formData)
  }

  return (
    <div
    className='min-h-screen grid lg:grid-cols-2 mt-16'>

      {/* LEFT SIDE OF THE FORM CONTAINER */}
      <div
      className='flex flex-col justify-center items-center p-6 sm:p-12'>

        <div
        className='w-full max-w-md space-y-8'>

          {/* LOGO */}
          <div
          className='text-center mb-8'>
            <div
            className='flex flex-col items-center gap-2 group'>

              <div
              className='h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group:hover:bg-primary/20 transition-colors'>
                <img
                src='/JinetLogo.png'
                alt='Logo'
                className='h-10 w-10 text-primary'/>
              </div>

              <h1
              className='text-2xl font-bold mt-2'>
                Welcome Back
              </h1>

              <p
              className='text-base-content/60'>
                Log in to your account
              </p>

            </div>
          </div>

          {/* FORM */}
          <form
          onSubmit={handleSubmit}
          className='space-y-6'>


            {/*----EMAIL----*/}
            <div
            className='form-control'>

              {/* Email Label */}
              <label className="label">
                <span
                className='label-text font-medium'>
                  Email
                </span>
              </label>

              {/* Email Field Container */}
              <div
              className='relative'>

                {/* Email Icon */}
                <div
                className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail
                  className='h-5 w-5 text-base-content/40'/>
                </div>

                {/* Email Field */}
                <input
                type="email"
                placeholder='Enter your email'
                className='input input-bordered w-full pl-10'
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value})}
                />
              </div>
            </div>


            {/*----PASSWORD----*/}
            <div
            className='form-control'>

              {/* Password Label */}
              <label className="label">
                <span
                className='label-text font-medium'>
                  Password
                </span>
              </label>

              {/* Password Field Container */}
              <div
              className='relative'>

                {/* Password Icon */}
                <div
                className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock
                  className='h-5 w-5 text-base-content/40'/>
                </div>

                {/* Password Field */}
                <input
                type={ showPassword ? "text" : "password" }
                placeholder='Enter your password'
                className='input input-bordered w-full pl-10'
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value})}
                />
   
                {/* Button to show password */}
                <button
                type='button'
                className='absolute inset-y-0 right-0 pr-3 flex items-center'
                onClick={() => setShowPassword(!showPassword)}>
                  {
                    showPassword ? (
                      <EyeOff className='h-5 w-5 text-base-content/40' /> 
                    ) :
                    (
                      <Eye className='h-5 w-5 text-base-content/40' />
                    )
                  }
                </button>
              </div>
            </div>


            {/*----SUBMIT BUTTON----*/}
            <button
            type='submit'
            className='btn btn-primary w-full'
            disabled={isLoggingIn}>
              
              {isLoggingIn ? (
                  <>
                    <Loader2 className='h-5 w-5  animate-spin' />
                    Loading...
                  </>
                  ) :
                  (
                    "Sign In"
                  )
              }
            </button>

          </form>


          {/*----REDIRECTING TO SIGN UP PAGE----*/}
          <div
          className='text-center'>
            <p
            className='text-base-content/60'>
              Don't have an account?{" "}
              <Link
              to="/signup"
              className='link link-primary'>
                Create Account
              </Link>
            </p>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE OF THE FORM CONTAINER */}
      <AuthImagePattern
      title="Welcome back!"
      subtitle="Sign in to continue your conversations and catch up with your messages."/>

    </div>
  )
}

export default LoginPage