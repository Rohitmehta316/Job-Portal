import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { toast } from 'sonner';

const category = [
    "Software Engineer",
    "Product Manager",
    "Data Analyst",
    "HR Manager",
    "Frontend Developer",
    "Backend Developer",
    "FullStack Developer",
    "Data Science",
    "Graphic Designer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);

    const searchJobHandler = (query) => {
        if (!user) {
            toast.info("Please sign up to explore jobs by category");
            navigate("/signup");
            return;
        }
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <section className='max-w-4xl mx-auto px-4 sm:px-6 my-12'>
            {/* Section Title */}
            <div className='flex items-center justify-center gap-2 mb-6'>
                <Search className='h-4 w-4 text-[#6A38C2]' />
                <h2 className='text-lg sm:text-xl font-bold tracking-tight text-slate-900'>
                    Explore Job Categories
                </h2>
            </div>

            {/* Carousel Pills */}
            <Carousel className="w-full max-w-2xl mx-auto">
                <CarouselContent className="-ml-2 md:-ml-3 items-center">
                    {
                        category.map((cat, index) => (
                            <CarouselItem
                                key={index}
                                className="pl-2 md:pl-3 basis-1/2 sm:basis-1/3 md:basis-1/4 flex justify-center"
                            >
                                <Button
                                    type="button"
                                    onClick={() => searchJobHandler(cat)}
                                    className="rounded-full bg-[#6A38C2] hover:bg-[#582ba8] text-white text-xs sm:text-sm font-medium px-5 py-2.5 h-auto shadow-xs cursor-pointer transition-all"
                                >
                                    {cat}
                                </Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer" />
                <CarouselNext className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer" />
            </Carousel>
        </section>
    );
};

export default CategoryCarousel;