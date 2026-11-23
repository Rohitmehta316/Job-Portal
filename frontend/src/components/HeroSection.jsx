import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, Triangle } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);

    const searchJobHandler = (e) => {
        if (e) e.preventDefault();
        if (!user) {
            toast.info("Please sign up to search and browse jobs");
            navigate("/signup");
            return;
        }
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    const handleExploreCategories = () => {
        if (!user) {
            toast.info("Please sign up to explore job categories");
            navigate("/signup");
            return;
        }
        navigate("/browse");
    }

    return (
        <section className='text-center px-4 sm:px-6 pt-11 pb-8'>
            <div className='flex flex-col gap-5 max-w-4xl mx-auto my-4'>
                {/* Pill Badge with Triangle Icon */}
                <span className='mx-auto inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200/90 text-xs sm:text-sm font-semibold shadow-2xs'>
                    <Triangle className='h-3.5 w-3.5 sm:h-4 sm:w-4 fill-[#F83002] text-[#F83002] rotate-12' />
                    <span className='text-[#F83002]'>No. 1 Hiring Platform</span>
                </span>

                {/* Main Heading */}
                <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15]'>
                    Search, Apply &amp; <br />
                    Get Your <span className='text-[#6A38C2]'>Dream Job!</span>
                </h1>

                {/* Subtitle */}
                <p className='text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed'>
                    Find your perfect career opportunity among thousands of companies. Your dream job is just a search away!
                </p>

                {/* Search Bar */}
                <form
                    onSubmit={searchJobHandler}
                    className='flex w-full sm:w-[68%] md:w-[58%] lg:w-[52%] shadow-md border border-slate-200 bg-white pl-5 pr-1.5 py-1.5 rounded-full items-center gap-3 mx-auto mt-1 focus-within:border-[#6A38C2]/60 focus-within:ring-2 focus-within:ring-[#6A38C2]/15 transition-all'
                >
                    <input
                        type="text"
                        value={query}
                        placeholder='Find your dream job here...'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full text-sm sm:text-base text-slate-800 placeholder:text-slate-400 bg-transparent'
                    />
                    <Button
                        type="submit"
                        className="rounded-full bg-[#6A38C2] hover:bg-[#5b30a6] text-white h-10 px-5 sm:px-6 text-sm font-medium gap-1.5 shrink-0 cursor-pointer"
                    >
                        <Search className='h-4 w-4' />
                        <span>Search</span>
                    </Button>
                </form>

                {/* Explore Job Categories Link */}
                <div className='mt-1'>
                    <button
                        type="button"
                        onClick={handleExploreCategories}
                        className='inline-flex items-center gap-2 text-sm sm:text-base font-medium text-[#6A38C2] hover:underline cursor-pointer'
                    >
                        <Search className='h-4 w-4' />
                        <span>Explore Job Categories</span>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default HeroSection