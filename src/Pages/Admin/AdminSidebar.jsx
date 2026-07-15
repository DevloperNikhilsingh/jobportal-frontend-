import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Briefcase, FileText, Users, Mail, User, LogOut, Menu, X, Award } from 'lucide-react';

const AdminSidebar = ({ isMobile, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: Home },
    { path: '/admin/jobs', label: 'Jobs', icon: Briefcase },
    { path: '/admin/applications', label: 'Applications', icon: FileText },
    { path: '/admin/hire-requests', label: 'Want to Hire', icon: Users },
    { path: '/admin/messages', label: 'Contact Messages', icon: Mail },
    { path: '/admin/placements', label: 'Add Placement', icon: Award },
    { path: '/admin/profile', label: 'Admin Profile', icon: User },
  ];


  const handleLogout = () => {
      localStorage.removeItem('authToken');
      navigate("/home");
  };

  return (
    <motion.div
      className={`h-screen  bg-white border-r border-gray-200 shadow-lg ${
        isMobile ? 'fixed inset-y-0 left-0 z-50 w-64' : 'hidden md:flex'
      } flex-col`}
      initial={isMobile ? { x: -300 } : false}
      animate={isMobile ? { x: 0 } : false}
    >
      {isMobile && (
        <div className="flex justify-end p-4">
          <motion.button
            onClick={onClose}
            className="p-2 text-gray-600"
            whileHover={{ scale: 1.1 }}
          >
            <X />
          </motion.button>
        </div>
      )}
      
      <div className="p-6 border-b border-gray-100">
        <Link to="/home" className="flex items-center gap-2">
         
          <span className="font-bold text-gray-900">Admin Panel</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link key={item.path} to={item.path}>
              <motion.div
                className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
                  isActive
                    ? 'bg-linear-to-r from-[#4338CA] via-[#6D28D9] to-[#9333EA] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}

        <motion.div
          className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all text-gray-600 hover:bg-red-50 hover:text-red-600 mt-8"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </motion.div>
      </nav>
    </motion.div>
  );
};

export default AdminSidebar;