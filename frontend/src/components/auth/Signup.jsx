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
import { setLoading } from '@/redux/authSlice'
import {
    Loader2,
    User,
    Mail,
    Phone,
    Lock,
    Briefcase,
    GraduationCap,
    Upload
} from 'lucide-react'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
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

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
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
        <div className='min-h-screen bg-slate-50/70 flex flex-col'>
            <Navbar />
            <div className='flex-1 flex items-center justify-center px-4 py-4'>
                <form
                    onSubmit={submitHandler}
                    className='w-full max-w-lg bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm'
                >
                    {/* Compact Header */}
                    <div className='mb-3.5 text-center'>
                        <h1 className='font-bold text-xl text-slate-900 tracking-tight'>
                            Create your <span className='text-[#6A38C2]'>HireNest</span> account
                        </h1>
                        <p className='text-xs text-slate-500 mt-0.5'>
                            Sign up to discover roles or hire top talent
                        </p>
                    </div>

                    {/* Full Name */}
                    <div className='mb-2.5'>
                        <Label className='text-slate-700 font-medium text-xs'>Full Name</Label>
                        <div className='relative mt-1'>
                            <User className='h-3.5 w-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2' />
                            <Input
                                type="text"
                                value={input.fullname}
                                name="fullname"
                                onChange={changeEventHandler}
                                placeholder="Rohit Mehta"
                                required
                                className='pl-9 h-9 text-sm border-slate-200 focus-visible:ring-[#6A38C2]/30 focus-visible:border-[#6A38C2]'
                            />
                        </div>
                    </div>

                    {/* Email & Phone Grid */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2.5'>
                        <div>
                            <Label className='text-slate-700 font-medium text-xs'>Email Address</Label>
                            <div className='relative mt-1'>
                                <Mail className='h-3.5 w-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2' />
                                <Input
                                    type="email"
                                    value={input.email}
                                    name="email"
                                    onChange={changeEventHandler}
                                    placeholder="name@example.com"
                                    required
                                    className='pl-9 h-9 text-sm border-slate-200 focus-visible:ring-[#6A38C2]/30 focus-visible:border-[#6A38C2]'
                                />
                            </div>
                        </div>

                        <div>
                            <Label className='text-slate-700 font-medium text-xs'>Phone Number</Label>
                            <div className='relative mt-1'>
                                <Phone className='h-3.5 w-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2' />
                                <Input
                                    type="text"
                                    value={input.phoneNumber}
                                    name="phoneNumber"
                                    onChange={changeEventHandler}
                                    placeholder="9876543210"
                                    required
                                    className='pl-9 h-9 text-sm border-slate-200 focus-visible:ring-[#6A38C2]/30 focus-visible:border-[#6A38C2]'
                                />
                            </div>
                        </div>
                    </div>

                    {/* Password */}
                    <div className='mb-3'>
                        <Label className='text-slate-700 font-medium text-xs'>Password</Label>
                        <div className='relative mt-1'>
                            <Lock className='h-3.5 w-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2' />
                            <Input
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="••••••••"
                                required
                                className='pl-9 h-9 text-sm border-slate-200 focus-visible:ring-[#6A38C2]/30 focus-visible:border-[#6A38C2]'
                            />
                        </div>
                    </div>

                    {/* Role & Profile Photo Row */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4'>
                        <div>
                            <Label className='text-slate-700 font-medium text-xs block mb-1'>
                                Select Role
                            </Label>
                            <div className='grid grid-cols-2 gap-2'>
                                <button
                                    type="button"
                                    onClick={() => selectRoleHandler("student")}
                                    className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                                        input.role === 'student'
                                            ? 'border-[#6A38C2] bg-purple-50 text-[#6A38C2] ring-1 ring-[#6A38C2]/30'
                                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                    <GraduationCap className='h-3.5 w-3.5 shrink-0' />
                                    <span>Student</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => selectRoleHandler("recruiter")}
                                    className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                                        input.role === 'recruiter'
                                            ? 'border-[#6A38C2] bg-purple-50 text-[#6A38C2] ring-1 ring-[#6A38C2]/30'
                                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                    <Briefcase className='h-3.5 w-3.5 shrink-0' />
                                    <span>Recruiter</span>
                                </button>
                            </div>
                        </div>

                        <div>
                            <Label className='text-slate-700 font-medium text-xs block mb-1'>
                                Profile Photo <span className='text-slate-400 font-normal'>(optional)</span>
                            </Label>
                            <label className='flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg border border-dashed border-slate-300 bg-slate-50/70 hover:bg-slate-100/70 transition-colors cursor-pointer h-[34px]'>
                                <div className='flex items-center gap-1.5 text-xs text-slate-600 truncate'>
                                    <Upload className='h-3.5 w-3.5 text-[#6A38C2] shrink-0' />
                                    <span className='truncate'>
                                        {input.file ? input.file.name : "Choose image"}
                                    </span>
                                </div>
                                <span className='text-[11px] font-semibold text-[#6A38C2] shrink-0'>
                                    Browse
                                </span>
                                <Input
                                    accept="image/*"
                                    type="file"
                                    onChange={changeFileHandler}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    {
                        loading ? (
                            <Button disabled className="w-full h-9 text-sm bg-[#6A38C2] text-white rounded-xl">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please wait...
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="w-full h-9 text-sm bg-[#6A38C2] hover:bg-[#5b30a6] text-white font-semibold rounded-xl shadow-xs cursor-pointer transition-all"
                            >
                                Signup
                            </Button>
                        )
                    }

                    {/* Footer Link */}
                    <p className='text-xs text-slate-600 text-center mt-3.5'>
                        Already have an account?{' '}
                        <Link to="/login" className='text-[#6A38C2] font-semibold hover:underline'>
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup