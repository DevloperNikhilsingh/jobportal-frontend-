import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminSidebar from './AdminSidebar';
import { Menu, Search, Eye, CheckCircle, XCircle, X, FileText } from 'lucide-react';

const AdminApplications = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [viewingApp, setViewingApp] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const token = localStorage.getItem('authToken');

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/api/admin/applications', {
        headers: { Authorization: 'Bearer ' + token },
      });
      if (!res.ok) {
        const text = await res.text();
        console.error('Server error:', res.status, text);
        setApplications([]);
        return;
      }
      const data = await res.json();
      setApplications(data);
    } catch (err) {
      console.error('Failed to fetch applications:', err);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleShortlist = async (id) => {
    setActionLoadingId(id);
    try {
      const res = await fetch(`http://localhost:8080/api/admin/applications/${id}/shortlist`, {
        method: 'PUT',
        headers: { Authorization: 'Bearer ' + token },
      });
      if (!res.ok) {
        const text = await res.text();
        console.error('Shortlist failed:', res.status, text);
        alert('Failed to shortlist application');
        return;
      }
      const updated = await res.json();
      setApplications((prev) => prev.map((app) => (app.id === updated.id ? updated : app)));
      if (viewingApp && viewingApp.id === updated.id) setViewingApp(updated);
    } catch (err) {
      console.error('Shortlist error:', err);
      alert('Server error while shortlisting application');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm('Reject this application? An email will be sent to the applicant.')) return;
    setActionLoadingId(id);
    try {
      const res = await fetch(`http://localhost:8080/api/admin/applications/${id}/reject`, {
        method: 'PUT',
        headers: { Authorization: 'Bearer ' + token },
      });
      if (!res.ok) {
        const text = await res.text();
        console.error('Reject failed:', res.status, text);
        alert('Failed to reject application');
        return;
      }
      const updated = await res.json();
      setApplications((prev) => prev.map((app) => (app.id === updated.id ? updated : app)));
      if (viewingApp && viewingApp.id === updated.id) setViewingApp(updated);
    } catch (err) {
      console.error('Reject error:', err);
      alert('Server error while rejecting application');
    } finally {
      setActionLoadingId(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'SHORTLISTED':
        return 'bg-green-100 text-green-700';
      case 'REJECTED':
        return 'bg-red-100 text-red-700';
      case 'PENDING':
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  const filteredApplications = applications.filter((app) => {
    const jobTitle = app.job?.jobTitle || '';
    return (
      (app.applicantName || '').toLowerCase().includes(searchText.toLowerCase()) ||
      jobTitle.toLowerCase().includes(searchText.toLowerCase())
    );
  });

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
            <h1 className="text-lg md:text-xl font-bold text-gray-900 truncate">Job Applications</h1>
          </div>

          <div className="relative w-full max-w-[200px] sm:max-w-xs">
            <Search className="w-4 h-4 md:w-5 md:h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-9 md:pl-10 pr-3 py-2 text-sm rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-3 sm:p-4 md:p-8 overflow-y-auto">
          {loading ? (
            <p className="text-gray-500 text-center py-10">Loading applications...</p>
          ) : filteredApplications.length === 0 ? (
            <p className="text-gray-500 text-center py-10">No applications found.</p>
          ) : (
            <>
              {/* ---------- MOBILE / TABLET: Card layout ---------- */}
              <div className="grid gap-4 md:hidden">
                {filteredApplications.map((app, index) => (
                  <motion.div
                    key={app.id}
                    className="bg-white rounded-xl shadow-lg border border-gray-200 p-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{app.applicantName}</p>
                        <p className="text-xs text-gray-500 truncate">{app.applicantEmail}</p>
                        <p className="text-xs text-gray-500 truncate">{app.applicantPhone}</p>
                      </div>
                      <span className={`shrink-0 px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(app.status)}`}>
                        {app.status}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-col gap-1 text-sm text-gray-700">
                      <p className="truncate"><span className="font-medium">Job: </span>{app.job?.jobTitle || '-'}</p>
                      <p className="truncate"><span className="font-medium">Qualification: </span>{app.qualification || '-'}</p>
                      <p className="truncate">
                        <span className="font-medium">Date: </span>
                        {app.applyDate || (app.appliedAt ? app.appliedAt.split('T')[0] : '-')}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <motion.button
                        className="flex-1 py-2 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center gap-1 text-sm font-medium"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setViewingApp(app)}
                      >
                        <Eye className="w-4 h-4" />
                        Review
                      </motion.button>
                      <motion.button
                        className="p-2 rounded-lg bg-green-50 text-green-600 disabled:opacity-50"
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleShortlist(app.id)}
                        disabled={actionLoadingId === app.id}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        className="p-2 rounded-lg bg-red-50 text-red-600 disabled:opacity-50"
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleReject(app.id)}
                        disabled={actionLoadingId === app.id}
                      >
                        <XCircle className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* ---------- DESKTOP: Table layout ---------- */}
              <motion.div
                className="hidden md:block bg-white rounded-xl shadow-lg border border-gray-200 p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Applicant</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Job Title</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Qualification</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredApplications.map((app, index) => (
                        <motion.tr
                          key={app.id}
                          className="border-b border-gray-100 hover:bg-gray-50"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <td className="py-4 px-4 max-w-[200px]">
                            <p className="font-medium text-gray-900 truncate">{app.applicantName}</p>
                            <p className="text-sm text-gray-500 truncate">
                              {app.applicantEmail} • {app.applicantPhone}
                            </p>
                          </td>
                          <td className="py-4 px-4 text-gray-700 max-w-[150px] truncate">{app.job?.jobTitle || '-'}</td>
                          <td className="py-4 px-4 text-gray-700 max-w-[120px] truncate">{app.qualification || '-'}</td>
                          <td className="py-4 px-4 text-gray-700 whitespace-nowrap">
                            {app.applyDate || (app.appliedAt ? app.appliedAt.split('T')[0] : '-')}
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusBadge(app.status)}`}>
                              {app.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <motion.button
                                className="p-2 rounded-lg bg-blue-50 text-blue-600"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setViewingApp(app)}
                                title="Review"
                              >
                                <Eye className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                className="p-2 rounded-lg bg-green-50 text-green-600 disabled:opacity-50"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleShortlist(app.id)}
                                disabled={actionLoadingId === app.id}
                                title="Shortlist"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                className="p-2 rounded-lg bg-red-50 text-red-600 disabled:opacity-50"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleReject(app.id)}
                                disabled={actionLoadingId === app.id}
                                title="Reject"
                              >
                                <XCircle className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </>
          )}
        </main>
      </div>

      {/* View / Review Modal */}
      <AnimatePresence>
        {viewingApp && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewingApp(null)}
          >
            <motion.div
              className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Application Details</h2>
                <button onClick={() => setViewingApp(null)}>
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="flex flex-col gap-3 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Name: </span>
                  <span className="text-gray-900">{viewingApp.applicantName}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Email: </span>
                  <span className="text-gray-900 break-all">{viewingApp.applicantEmail}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Phone: </span>
                  <span className="text-gray-900">{viewingApp.applicantPhone}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Job Applied For: </span>
                  <span className="text-gray-900">
                    {viewingApp.job?.jobTitle} {viewingApp.job?.companyName ? `@ ${viewingApp.job.companyName}` : ''}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Qualification: </span>
                  <span className="text-gray-900">{viewingApp.qualification || '-'}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Experience: </span>
                  <span className="text-gray-900">{viewingApp.experience || '-'}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Preferred Location: </span>
                  <span className="text-gray-900">{viewingApp.location || '-'}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Work Hours: </span>
                  <span className="text-gray-900">{viewingApp.workHour || '-'}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Job Type: </span>
                  <span className="text-gray-900">{viewingApp.jobType || '-'}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Skills: </span>
                  <span className="text-gray-900">{viewingApp.skills || '-'}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Address: </span>
                  <span className="text-gray-900">{viewingApp.address || '-'}</span>
                </div>
                {viewingApp.coverLetter && (
                  <div>
                    <span className="font-semibold text-gray-700">Cover Letter: </span>
                    <p className="text-gray-900 mt-1 whitespace-pre-wrap">{viewingApp.coverLetter}</p>
                  </div>
                )}
                <div>
                  <span className="font-semibold text-gray-700">Status: </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(viewingApp.status)}`}>
                    {viewingApp.status}
                  </span>
                </div>

                {/* Resume Link */}
                <div className="mt-2">
                  {viewingApp.resumeUrl ? (
                    <a
                      href={`http://localhost:8080/uploads/${viewingApp.resumeUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-[#4338CA] via-[#6D28D9] to-[#9333EA] text-white font-medium"
                    >
                      <FileText className="w-4 h-4" />
                      View Resume
                    </a>
                  ) : (
                    <p className="text-gray-400 italic">No resume uploaded</p>
                  )}
                </div>
              </div>

              {/* Action buttons inside modal */}
              <div className="flex items-center gap-3 mt-6">
                <motion.button
                  className="flex-1 px-4 py-2 rounded-xl bg-green-600 text-white font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleShortlist(viewingApp.id)}
                  disabled={actionLoadingId === viewingApp.id}
                >
                  <CheckCircle className="w-4 h-4" />
                  Shortlist
                </motion.button>
                <motion.button
                  className="flex-1 px-4 py-2 rounded-xl bg-red-600 text-white font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleReject(viewingApp.id)}
                  disabled={actionLoadingId === viewingApp.id}
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminApplications;