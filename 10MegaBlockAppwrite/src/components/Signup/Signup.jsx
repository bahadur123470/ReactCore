import React, { useState } from 'react'
import { data, Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { login } from '../../store/auth/authSlice'
import { Button, Input, Logo } from '../index'
import { useForm } from 'react-hook-form'

function Signup() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit} = useForm()

    const [error, setError] = useState("")

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if(userData){
                const userData = await authService.getCurrentUser()
                if(userData){
                    dispatch(login(userData))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex item-center justify-center'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%'/>
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>
                    Sign in to your account
                </h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Don&apos;t have an account?&nbsp;
                    <Link 
                    to="/signup" 
                    className='font-medium text-primary transition-all duration-200 hover:underline'>
                        Sign up
                    </Link>
                </p>
                {error && <p className='text-red-500 mt-8 text-center'>{error}</p>}
                <form 
                onSubmit={handleSubmit(create)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: "Full name is required",
                        })}
                        />
                        <Input 
                        label="Email:"
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate:{
                                matchPattern: (value) => 
                                    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,63}$/
                                .test(value) || "Email address must be a valid",
                            }
                        })}
                        />
                        <Input 
                        label="password"
                        placeholder="Enter your password"
                        type="password"
                        {...register("password", {
                            required: true,
                            validate:{
                                matchPattern: (value) => 
                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};:'",.<>\/?\\|`~\-]).{8,}$/
                                .test(value) || "Password must be at least 8 characters, include upper & lowercase letters, a number, and a special character"
                            }
                        })}
                        />
                        <Button 
                        type='submit'
                        className='w-full'
                        >Create account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup