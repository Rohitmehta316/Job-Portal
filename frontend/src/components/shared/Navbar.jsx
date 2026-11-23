import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const getInitials = (name = "") => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "U";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
};

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleProtectedNav = (e, path) => {
        if (!user) {
            e.preventDefault();
            toast.info("Please sign up to access jobs");
            navigate("/signup");
            return;
        }
        navigate(path);
    };

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Logout failed");
        }
    }

    return (
        <header className='sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200/80'>
            <div className='flex items-center justify-between mx-auto max-w-7xl px-4 sm:px-6 h-16'>
                {/* Clickable Brand Logo -> Home Page */}
                <Link to="/" className='inline-flex items-center group focus:outline-none'>
                    <h1 className='text-2xl font-bold tracking-tight text-slate-900 group-hover:opacity-90 transition-opacity'>
                        Hire<span className='text-[#F83002]'>Nest</span>
                    </h1>
                </Link>

                <div className='flex items-center gap-6 sm:gap-10'>
                    <ul className='flex font-medium items-center gap-5 text-sm text-slate-700'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li>
                                        <Link to="/admin/companies" className='hover:text-slate-950 transition-colors'>
                                            Companies
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/jobs" className='hover:text-slate-950 transition-colors'>
                                            Jobs
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/" className='hover:text-slate-950 transition-colors'>
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/jobs"
                                            onClick={(e) => handleProtectedNav(e, "/jobs")}
                                            className='hover:text-slate-950 transition-colors'
                                        >
                                            Jobs
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/browse"
                                            onClick={(e) => handleProtectedNav(e, "/browse")}
                                            className='hover:text-slate-950 transition-colors'
                                        >
                                            Browse
                                        </Link>
                                    </li>
                                </>
                            )
                        }
                    </ul>

                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login">
                                    <Button variant="outline" size="sm">Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button size="sm" className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white">
                                        Signup
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer h-9 w-9 border border-slate-200">
                                        {user?.profile?.profilePhoto ? (
                                            <AvatarImage src={user.profile.profilePhoto} alt={user?.fullname || "User"} className="object-cover" />
                                        ) : null}
                                        <AvatarFallback className="bg-slate-900 text-white text-xs font-semibold">
                                            {getInitials(user?.fullname)}
                                        </AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent align="end" className="w-80">
                                    <div>
                                        <div className='flex items-start gap-3 pb-3 border-b border-slate-100'>
                                            <Avatar className="h-10 w-10 border border-slate-200">
                                                {user?.profile?.profilePhoto ? (
                                                    <AvatarImage src={user.profile.profilePhoto} alt={user?.fullname || "User"} className="object-cover" />
                                                ) : null}
                                                <AvatarFallback className="bg-slate-900 text-white text-xs font-semibold">
                                                    {getInitials(user?.fullname)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h4 className='font-semibold text-sm text-slate-900'>{user?.fullname}</h4>
                                                <p className='text-xs text-slate-500 mt-0.5'>{user?.profile?.bio || "HireNest member"}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col pt-2 gap-1 text-slate-700'>
                                            {
                                                user && user.role === 'student' && (
                                                    <Link
                                                        to="/profile"
                                                        className='flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-slate-100 transition-colors'
                                                    >
                                                        <User2 className='h-4 w-4 text-slate-500' />
                                                        <span>View Profile</span>
                                                    </Link>
                                                )
                                            }

                                            <button
                                                type="button"
                                                onClick={logoutHandler}
                                                className='flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer'
                                            >
                                                <LogOut className='h-4 w-4' />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </header>
    )
}

export default Navbar