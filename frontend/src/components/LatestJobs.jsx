import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <section className='max-w-7xl mx-auto px-4 sm:px-6 my-16 sm:my-20'>
            <div className='mb-7'>
                <h1 className='text-3xl sm:text-4xl font-bold tracking-tight text-slate-900'>
                    <span className='text-[#6A38C2]'>Latest &amp; Top</span> Job Openings
                </h1>
                <p className='text-sm text-slate-500 mt-1.5'>
                    Explore handpicked roles from active companies hiring right now.
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    !allJobs || allJobs.length <= 0 ? (
                        <div className='col-span-full rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500'>
                            No Job Available
                        </div>
                    ) : (
                        allJobs.slice(0, 6).map((job) => (
                            <LatestJobCards key={job._id} job={job} />
                        ))
                    )
                }
            </div>
        </section>
    )
}

export default LatestJobs