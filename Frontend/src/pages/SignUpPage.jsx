import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { User, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react'

import AuthImagePattern from '../components/AuthImagePattern'
import toast from 'react-hot-toast'

const SingUpPage = () => {

  const [ showPassword, setShowPassword ] = useState(false)

  const [ formData, setFormData ] = useState({
    username: "",
    email: "",
    password: ""
  })

  const { signUp, isSigningUp } = useAuthStore()

  const validateForm = () => {
    if(!formData.username.trim()) {
      return toast.error("Username is required")
    }

    if(!formData.email.trim()) {
      return toast.error("Email is required")
    }

    if(!formData.password.trim()) {
      return toast.error("Password is required")
    }

    if(formData.password.trim().length < 6) {
      return toast.error("Password must be at least 6 characters")
    }

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const success = validateForm()
    if(success === true) {
      signUp(formData)
    }
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
              className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group:hover:bg-primary/20 transition-colors'>
                <img
                src='/JinetLogo.png'
                alt='Logo'
                className='size-10 text-primary'/>
              </div>

              <h1
              className='text-2xl font-bold mt-2'>
                Create Account
              </h1>

              <p
              className='text-base-content/60'>
                Get started with your free account
              </p>

            </div>
          </div>

          {/* FORM */}
          <form
          onSubmit={handleSubmit}
          className='space-y-6'>


            {/*----USERNAME----*/}
            <div
            className='form-control'>

              {/* Username Label */}
              <label className="label">
                <span
                className='label-text font-medium'>
                  Username
                </span>
              </label>

              {/* Username Field Container */}
              <div
              className='relative'>

                {/* Username Icon */}
                <div
                className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <User
                  className='size-5 text-base-content/40'/>
                </div>

                {/* Username Field */}
                <input
                type="text"
                placeholder='Enter your username'
                className='input input-bordered w-full pl-10'
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value})}
                />
              </div>
            </div>


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
                  className='size-5 text-base-content/40'/>
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
                  className='size-5 text-base-content/40'/>
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
                      <EyeOff className='size-5 text-base-content/40' /> 
                    ) :
                    (
                      <Eye className='size-5 text-base-content/40' />
                    )
                  }
                </button>
              </div>
            </div>


            {/*----SUBMIT BUTTON----*/}
            <button
            type='submit'
            className='btn btn-primary w-full'
            disabled={isSigningUp}>
              
              {isSigningUp ? (
                  <>
                    <Loader2 className='size-5 animate-spin' />
                    Loading...
                  </>
                  ) :
                  (
                    "Create Account"
                  )
              }
            </button>

          </form>


          {/*----REDIRECTING TO LOGIN PAGE----*/}
          <div
          className='text-center'>
            <p
            className='text-base-content/60'>
              Already have an account?{" "}
              <Link
              to="/login"
              className='link link-primary'>
                Log In
              </Link>
            </p>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE OF THE FORM CONTAINER */}
      <AuthImagePattern
      title="Join our community"
      subtitle="Connect with friends, share moments and stay in touch with your loved ones"/>

    </div>
  )
}

export default SingUpPage