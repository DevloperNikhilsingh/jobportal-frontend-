import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminSidebar from './AdminSidebar';
import { Menu, Bell, Search, Plus, Edit, Trash2, X } from 'lucide-react';

const AdminJobs = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [jobList, setJobList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [editingJob, setEditingJob] = useState(null); // job currently being edited
  const [editForm, setEditForm] = useState({
    companyName: '',
    jobTitle: '',
    jobDescription: '',
    location: '',
    salary: '',
  });

  const token = localStorage.getItem('authToken');

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://https://jobportal-backend-cm33.onrender.com/api/admin/jobs', {
        headers: { Authorization: 'Bearer ' + token },
      });
      if (!res.ok) {
        const text = await res.text();
        console.error('Server error:', res.status, text);
        setJobList([]);
        return;
      }
      const data = await res.json();
      setJobList(data);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
      setJobList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      const res = await fetch(`http://https://jobportal-backend-cm33.onrender.com/api/admin/jobs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: 'Bearer ' + token },
      });
      if (!res.ok) {
        const text = await res.text();
        console.error('Delete failed:', res.status, text);
        alert('Failed to delete job');
        return;
      }
      // UI se turant hata do, dobara fetch karne ki zaroorat nahi
      setJobList((prev) => prev.filter((job) => job.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      alert('Server error while deleting job');
    }
  };

  const openEditModal = (job) => {
    setEditingJob(job);
    setEditForm({
      companyName: job.companyName || '',
      jobTitle: job.jobTitle || '',
      jobDescription: job.jobDescription || '',
      location: job.location || '',
      salary: job.salary || '',
    });
  };

  const closeEditModal = () => {
    setEditingJob(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://https://jobportal-backend-cm33.onrender.com/api/admin/jobs/${editingJob.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) {
        const text = await res.text();
        console.error('Update failed:', res.status, text);
        alert('Failed to update job');
        return;
      }
      const updatedJob = await res.json();
      setJobList((prev) =>
        prev.map((job) => (job.id === updatedJob.id ? updatedJob : job))
      );
      closeEditModal();
    } catch (err) {
      console.error('Update error:', err);
      alert('Server error while updating job');
    }
  };

  const filteredJobList = jobList.filter((job) =>
    (job.jobTitle || '').toLowerCase().includes(searchText.toLowerCase()) ||
    (job.companyName || '').toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f4f3f8] flex">
      <AdminSidebar />

      {isMobileMenuOpen && (
        <AdminSidebar isMobile onClose={() => setIsMobileMenuOpen(false)} />
      )}

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMobileMenuOpen(true)}
              whileHover={{ scale: 1.1 }}
            >
              <Menu />
            </motion.button>
            <h1 className="text-xl font-bold text-gray-900">Manage Jobs</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <motion.button
              className="px-4 py-2 rounded-xl bg-linear-to-r from-[#4338CA] via-[#6D28D9] to-[#9333EA] text-white font-medium flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-5 h-5" />
              Add Job
            </motion.button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {loading ? (
            <p className="text-gray-500 text-center mt-10">Loading jobs...</p>
          ) : filteredJobList.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">No jobs found.</p>
          ) : (
            <div className="grid gap-4">
              {filteredJobList.map((job, index) => (
                <motion.div
                  key={job.id}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -2 }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={
                          job.imageUrl
                            ? `http://https://jobportal-backend-cm33.onrender.com/uploads/${job.imageUrl}`
                            : '/placeholder.jpg'
                        }
                        alt={job.jobTitle}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{job.jobTitle}</h3>
                        <p className="text-gray-600">{job.companyName}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="text-sm text-gray-500">📍 {job.location}</span>
                          <span className="text-sm text-gray-500">💰 {job.salary}</span>
                          <span className="text-sm text-gray-500">⏰ {job.workHour}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <motion.button
                        className="p-2 rounded-lg bg-blue-50 text-blue-600"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => openEditModal(job)}
                      >
                        <Edit className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        className="p-2 rounded-lg bg-red-50 text-red-600"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(job.id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingJob && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeEditModal}
          >
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Edit Job</h2>
                <button onClick={closeEditModal}>
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={editForm.companyName}
                  onChange={(e) => setEditForm({ ...editForm, companyName: e.target.value })}
                  className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <input
                  type="text"
                  placeholder="Job Title"
                  value={editForm.jobTitle}
                  onChange={(e) => setEditForm({ ...editForm, jobTitle: e.target.value })}
                  className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <textarea
                  placeholder="Job Description"
                  value={editForm.jobDescription}
                  onChange={(e) => setEditForm({ ...editForm, jobDescription: e.target.value })}
                  className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  rows={3}
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <input
                  type="text"
                  placeholder="Salary"
                  value={editForm.salary}
                  onChange={(e) => setEditForm({ ...editForm, salary: e.target.value })}
                  className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />

                <motion.button
                  type="submit"
                  className="mt-2 px-4 py-2 rounded-xl bg-linear-to-r from-[#4338CA] via-[#6D28D9] to-[#9333EA] text-white font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Save Changes
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminJobs;