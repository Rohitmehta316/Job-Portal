import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { Building2, Plus, Search } from 'lucide-react'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { companies } = useSelector(store => store.company);

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input, dispatch]);

    return (
        <div className="min-h-screen bg-slate-50/70">
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
                {/* Top Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <div className="flex items-center gap-2.5">
                            <div className="h-9 w-9 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-sm">
                                <Building2 className="h-4 w-4" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                                Companies
                            </h1>
                            <span className="ml-1 inline-flex items-center rounded-full bg-slate-200/80 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                                {companies?.length || 0}
                            </span>
                        </div>
                        <p className="text-sm text-slate-500 mt-1">
                            Manage registered companies, brand identities, and job listings.
                        </p>
                    </div>

                    <Button
                        onClick={() => navigate("/admin/companies/create")}
                        className="bg-slate-900 hover:bg-slate-800 text-white shadow-sm gap-2 self-start sm:self-auto"
                    >
                        <Plus className="h-4 w-4" />
                        New Company
                    </Button>
                </div>

                {/* Main Card Container */}
                <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
                    <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between gap-4">
                        <div className="relative w-full sm:w-72">
                            <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Filter by name..."
                                className="pl-9 bg-slate-50/60 border-slate-200 focus-visible:ring-slate-400"
                            />
                        </div>
                    </div>

                    <div className="p-2 sm:p-4">
                        <CompaniesTable />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Companies