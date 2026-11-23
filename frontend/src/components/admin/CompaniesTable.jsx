import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Calendar, Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const getInitials = (name = "") => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "CO";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
};

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies || []);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = (companies || []).filter((company) => {
            if (!searchCompanyByText) {
                return true;
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    return (
        <div className="w-full overflow-x-auto">
            <Table>
                <TableCaption className="text-slate-400 text-xs pt-3">
                    A list of your recent registered companies
                </TableCaption>
                <TableHeader className="bg-slate-50/90">
                    <TableRow className="hover:bg-slate-50/90 border-slate-200/80">
                        <TableHead className="w-20 font-semibold text-slate-600">Logo</TableHead>
                        <TableHead className="font-semibold text-slate-600">Name</TableHead>
                        <TableHead className="font-semibold text-slate-600">Date</TableHead>
                        <TableHead className="text-right font-semibold text-slate-600">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany && filterCompany.length > 0 ? (
                        filterCompany.map((company) => (
                            <TableRow
                                key={company._id}
                                className="group hover:bg-slate-50/80 transition-colors border-slate-100"
                            >
                                <TableCell className="py-3.5">
                                    <Avatar className="h-10 w-10 border border-slate-200 shadow-2xs">
                                        {company?.logo ? (
                                            <AvatarImage src={company.logo} alt={company.name} className="object-cover" />
                                        ) : null}
                                        <AvatarFallback className="bg-slate-900 text-white text-xs font-semibold tracking-wide">
                                            {getInitials(company?.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell className="py-3.5">
                                    <span className="font-semibold text-slate-800 group-hover:text-slate-950">
                                        {company?.name}
                                    </span>
                                </TableCell>
                                <TableCell className="py-3.5">
                                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                        {company?.createdAt ? company.createdAt.split("T")[0] : "—"}
                                    </span>
                                </TableCell>
                                <TableCell className="py-3.5 text-right">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button
                                                type="button"
                                                aria-label="Company actions"
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-200/70 hover:text-slate-900 transition-colors cursor-pointer"
                                            >
                                                <MoreHorizontal className="h-4 w-4" />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent align="end" className="w-36 p-1.5">
                                            <button
                                                type="button"
                                                onClick={() => navigate(`/admin/companies/${company._id}`)}
                                                className="flex w-full items-center gap-2 rounded-sm px-2.5 py-1.5 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                                            >
                                                <Edit2 className="h-3.5 w-3.5" />
                                                <span>Edit</span>
                                            </button>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="h-28 text-center text-sm text-slate-500">
                                No matching companies found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable