import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Menu, Bell, Search, Briefcase, FileText, Users, Mail, Eye } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [statsData, setStatsData] = useState({
    totalJobs: 0,
    totalApplications: 0,
    totalRequests: 0,
    totalSubscribers: 0,
  });
  const [applications, setApplications] = useState([]);
  const [hireRequests, setHireRequests] = useState([]);
  const [messagesCount, setMessagesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const headers = { Authorization: `Bearer ${token}` };

        const [statsRes, applicationsRes, requestsRes, messagesRes] = await Promise.all([
          fetch('http://localhost:8080/api/admin/dashboard-stats', { headers }),
          fetch('http://localhost:8080/api/admin/applications', { headers }),
          fetch('http://localhost:8080/api/admin/want-to-hire-requests', { headers }),
          fetch('http://localhost:8080/api/admin/contact-enquiries', { headers }),
        ]);

        if (!statsRes.ok || !applicationsRes.ok || !requestsRes.ok || !messagesRes.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const stats = await statsRes.json();
        const applicationsData = await applicationsRes.json();
        const requestsData = await requestsRes.json();
        const messagesData = await messagesRes.json();

        setStatsData(stats);
        setApplications(applicationsData);
        setHireRequests(requestsData);
        setMessagesCount(messagesData.length);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = [
    { label: 'Total Jobs', value: statsData.totalJobs ?? 0, icon: Briefcase, color: 'from-blue-500 to-blue-600' },
    { label: 'Total Applications', value: statsData.totalApplications ?? 0, icon: FileText, color: 'from-purple-500 to-purple-600' },
    { label: 'Want to Hire', value: statsData.totalRequests ?? 0, icon: Users, color: 'from-indigo-500 to-indigo-600' },
    { label: 'Contact Messages', value: messagesCount, icon: Mail, color: 'from-violet-500 to-violet-600' },
  ];

  // Dashboard preview par sirf latest 3 records dikhane hain
  const recentApplications = applications.slice(0, 3);
  const recentHireRequests = hireRequests.slice(0, 3);

  const statusBadgeClass = (status) => {
    if (status === 'PENDING') return 'bg-yellow-100 text-yellow-700';
    if (status === 'SHORTLISTED') return 'bg-green-100 text-green-700';
    if (status === 'REJECTED') return 'bg-red-100 text-red-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-[#f4f3f8] flex">
      <AdminSidebar />

      {isMobileMenuOpen && (
        <AdminSidebar isMobile onClose={() => setIsMobileMenuOpen(false)} />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-4 min-w-0">
            <motion.button
              className="md:hidden p-2 text-gray-600 shrink-0"
              onClick={() => setIsMobileMenuOpen(true)}
              whileHover={{ scale: 1.1 }}
            >
              <Menu />
            </motion.button>
            <h1 className="text-xl font-bold text-gray-900 truncate">Dashboard</h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <div className="relative hidden sm:block">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 w-40 lg:w-56"
              />
            </div>
            <motion.button
              className="relative p-2 text-gray-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
            </motion.button>
            <div className="w-10 h-10 rounded-full bg-linear-to-r from-[#4338CA] via-[#6D28D9] to-[#9333EA] flex items-center justify-center text-white font-bold shrink-0">
              A
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {loading ? (
            <div className="text-center text-gray-500 py-12">Loading dashboard...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-12">{error}</div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
                    >
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-linear-to-r ${stat.color} flex items-center justify-center text-white mb-3 sm:mb-4`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-gray-500 font-medium text-sm sm:text-base">{stat.label}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Recent Job Applications */}
              <motion.div
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center justify-between mb-6 gap-3">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recent Job Applications</h2>
                  <motion.button
                    onClick={() => navigate('/admin/applications')}
                    className="px-3 sm:px-4 py-2 rounded-xl bg-linear-to-r from-[#4338CA] via-[#6D28D9] to-[#9333EA] text-white font-medium text-sm sm:text-base shrink-0"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View All
                  </motion.button>
                </div>

                {recentApplications.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No applications yet.</p>
                ) : (
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <table className="w-full min-w-[600px]">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Name</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Job Title</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentApplications.map((app, index) => (
                          <motion.tr
                            key={app.id}
                            className="border-b border-gray-100 hover:bg-gray-50"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                          >
                            <td className="py-4 px-4">
                              <div>
                                <p className="font-medium text-gray-900">{app.applicantName}</p>
                                <p className="text-sm text-gray-500">{app.applicantEmail}</p>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-gray-700">{app.job?.jobTitle || '—'}</td>
                            <td className="py-4 px-4 text-gray-700">
                              {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : ''}
                            </td>
                            <td className="py-4 px-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadgeClass(app.status)}`}>
                                {app.status}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <motion.button
                                onClick={() => navigate('/admin/applications')}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Eye className="w-4 h-4" />
                                View
                              </motion.button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>

              {/* Want to Hire Requests */}
              <motion.div
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center justify-between mb-6 gap-3">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">Want to Hire Requests</h2>
                  <motion.button
                    onClick={() => navigate('/admin/hire-requests')}
                    className="px-3 sm:px-4 py-2 rounded-xl bg-linear-to-r from-[#4338CA] via-[#6D28D9] to-[#9333EA] text-white font-medium text-sm sm:text-base shrink-0"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View All
                  </motion.button>
                </div>

                {recentHireRequests.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No hire requests yet.</p>
                ) : (
                  <div className="grid gap-4">
                    {recentHireRequests.map((req, index) => (
                      <motion.div
                        key={req.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                      >
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 truncate">{req.companyName || req.company}</p>
                          <p className="text-sm text-gray-500 truncate">{req.jobTitle || req.role} • {req.employerEmail || req.email}</p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-sm text-gray-500">
                            {req.createdAt ? new Date(req.createdAt).toLocaleDateString() : (req.date || '')}
                          </span>
                          <motion.button
                            onClick={() => navigate('/admin/hire-requests')}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
