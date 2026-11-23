import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

const getInitials = (name = "") => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "CO";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
};

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);

    const handleCardClick = () => {
        if (!user) {
            toast.info("Please sign up to view job details");
            navigate("/signup");
            return;
        }
        navigate(`/description/${job._id}`);
    };

    return (
        <div
            onClick={handleCardClick}
            className='group p-5 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer flex flex-col justify-between'
        >
            <div>
                {/* Company Header */}
                <div className='flex items-center gap-3'>
                    <div className='h-10 w-10 rounded-lg bg-slate-900 text-white text-xs font-semibold flex items-center justify-center shrink-0'>
                        {getInitials(job?.company?.name)}
                    </div>
                    <div>
                        <h2 className='font-semibold text-base text-slate-900 group-hover:text-[#6A38C2] transition-colors'>
                            {job?.company?.name}
                        </h2>
                        <p className='text-xs text-slate-500'>
                            {job?.location || "India"}
                        </p>
                    </div>
                </div>

                {/* Role & Description */}
                <div className='mt-4'>
                    <h3 className='font-bold text-lg text-slate-900'>
                        {job?.title}
                    </h3>
                    <p className='text-sm text-slate-600 mt-1.5 line-clamp-2 leading-relaxed'>
                        {job?.description}
                    </p>
                </div>
            </div>

            {/* Badges */}
            <div className='flex flex-wrap items-center gap-2 mt-5 pt-3 border-t border-slate-100'>
                <Badge className='bg-blue-50 text-blue-700 hover:bg-blue-50 font-semibold border-0'>
                    {job?.position} Positions
                </Badge>
                <Badge className='bg-orange-50 text-[#F83002] hover:bg-orange-50 font-semibold border-0'>
                    {job?.jobType}
                </Badge>
                <Badge className='bg-purple-50 text-[#7209b7] hover:bg-purple-50 font-semibold border-0'>
                    {job?.salary} LPA
                </Badge>
            </div>
        </div>
    )
}

export default LatestJobCards