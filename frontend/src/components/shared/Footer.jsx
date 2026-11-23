import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Phone, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0b1021] text-slate-300 border-t border-slate-800/80 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-slate-800">
          {/* Column 1: Developer Bio */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Developer</h3>

            <div className="flex items-center gap-3 mb-4">
              <div className="h-11 w-11 rounded-full bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 font-bold flex items-center justify-center shrink-0">
                RM
              </div>
              <div className="text-lg font-bold tracking-tight">
                <span className="text-white">Rohit </span>
                <span className="text-indigo-400">Mehta</span>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-slate-300/90 max-w-md">
              Hi, I&apos;m <span className="text-rose-400 font-medium">Rohit Mehta</span>,
              a full-stack MERN developer passionate about building clean, responsive,
              and scalable web applications with MongoDB, Express.js, React, and Node.js.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-5 text-sky-400">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="hover:text-sky-300 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="hover:text-sky-300 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="hover:text-sky-300 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Brand & Quick Links */}
          <div className="md:pl-8">
            <h2 className="text-2xl font-extrabold tracking-tight mb-4">
              <span className="text-white">Hire</span>
              <span className="text-[#F83002]">Nest</span>
            </h2>

            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:text-white transition-colors">
                  Jobs
                </Link>
              </li>
              <li>
                <Link to="/browse" className="hover:text-white transition-colors">
                  Browse
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Get In Touch */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Get In Touch</h3>

            <div className="space-y-2.5 text-sm text-slate-300">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span>+91 98765 43210</span>
              </p>
              <p className="flex items-center gap-2 break-all">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span>rohitmehta.dev@example.com</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} HireNest. All rights reserved.</p>
          <p>Built by Rohit Mehta</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;