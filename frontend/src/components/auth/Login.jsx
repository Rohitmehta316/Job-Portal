import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, Lock, Mail, Briefcase, GraduationCap } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const selectRoleHandler = (role) => {
        setInput({ ...input, role });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!input.role) {
            toast.error("Please select a role (Student or Recruiter)");
            return;
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate])

    return (
        <div className='min-h-screen bg-slate-50/70'>
            <Navbar />
            <div className='flex items-center justify-center px-4 py-12'>
                <form
                    onSubmit={submitHandler}
                    className='w-full max-w-md bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm'
                >
                    {/* Header */}
                    <div className='mb-6 text-center'>
                        <span className='inline-block px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-[#6A38C2] mb-2'>
                            HireNest Account
                        </span>
                        <h1 className='font-bold text-2xl text-slate-900 tracking-tight'>
                            Welcome back
                        </h1>
                        <p className='text-sm text-slate-500 mt-1'>
                            Sign in to continue exploring and applying for jobs
                        </p>
                    </div>

                    {/* Email */}
                    <div className='mb-4'>
                        <Label className='text-slate-700 font-medium text-sm'>Email Address</Label>
                        <div className='relative mt-1.5'>
                            <Mail className='h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2' />
                            <Input
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                placeholder="name@example.com"
                                required
                                className='pl-10 h-10 border-slate-200 focus-visible:ring-[#6A38C2]/30 focus-visible:border-[#6A38C2]'
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className='mb-5'>
                        <Label className='text-slate-700 font-medium text-sm'>Password</Label>
                        <div className='relative mt-1.5'>
                            <Lock className='h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2' />
                            <Input
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="••••••••"
                                required
                                className='pl-10 h-10 border-slate-200 focus-visible:ring-[#6A38C2]/30 focus-visible:border-[#6A38C2]'
                            />
                        </div>
                    </div>

                    {/* Role Selection Pills */}
                    <div className='mb-6'>
                        <Label className='text-slate-700 font-medium text-sm block mb-2'>
                            Select Role
                        </Label>
                        <div className='grid grid-cols-2 gap-3'>
                            <button
                                type="button"
                                onClick={() => selectRoleHandler("student")}
                                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
                                    input.role === 'student'
                                        ? 'border-[#6A38C2] bg-purple-50/80 text-[#6A38C2] ring-2 ring-[#6A38C2]/15'
                                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                <GraduationCap className='h-4 w-4' />
                                <span>Student</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => selectRoleHandler("recruiter")}
                                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
                                    input.role === 'recruiter'
                                        ? 'border-[#6A38C2] bg-purple-50/80 text-[#6A38C2] ring-2 ring-[#6A38C2]/15'
                                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                <Briefcase className='h-4 w-4' />
                                <span>Recruiter</span>
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    {
                        loading ? (
                            <Button disabled className="w-full h-10 bg-[#6A38C2] text-white rounded-xl">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please wait...
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="w-full h-10 bg-[#6A38C2] hover:bg-[#5b30a6] text-white font-semibold rounded-xl shadow-xs cursor-pointer transition-all"
                            >
                                Login
                            </Button>
                        )
                    }

                    {/* Footer Link */}
                    <p className='text-sm text-slate-600 text-center mt-5'>
                        Don&apos;t have an account?{' '}
                        <Link to="/signup" className='text-[#6A38C2] font-semibold hover:underline'>
                            Signup
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login