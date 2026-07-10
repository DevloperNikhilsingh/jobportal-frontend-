import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdminSidebar from './AdminSidebar';
import { Menu, Upload, Trash2, Award, X } from 'lucide-react';

const AdminPlacements = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    studentName: '',
    companyName: '',
    jobRole: '',
    packageCtc: '',
    batchYear: '',
    location: '',
    testimonial: '',
  });
  const [imageFile, setImageFile] = useState(null);

  const fetchPlacements = async () => {
    try {
      const response = await fetch('http://https://jobportal-backend-cm33.onrender.com/api/placements');
      if (!response.ok) throw new Error('Failed to fetch placements');
      const data = await response.json();
      setPlacements(data);
    } catch (err) {
      console.error('Error fetching placements:', err);
      setError('Failed to load placements');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlacements();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setFormData({
      studentName: '',
      companyName: '',
      jobRole: '',
      packageCtc: '',
      batchYear: '',
      location: '',
      testimonial: '',
    });
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem('authToken');
      const data = new FormData();
      data.append('studentName', formData.studentName);
      data.append('companyName', formData.companyName);
      data.append('jobRole', formData.jobRole);
      data.append('packageCtc', formData.packageCtc);
      data.append('batchYear', formData.batchYear);
      data.append('location', formData.location);
      data.append('testimonial', formData.testimonial);
      if (imageFile) {
        data.append('image', imageFile);
      }

      const response = await fetch('http://https://jobportal-backend-cm33.onrender.com/api/admin/placements', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (!response.ok) throw new Error('Failed to add placement');

      const newPlacement = await response.json();
      setPlacements((prev) => [newPlacement, ...prev]);
      resetForm();
    } catch (err) {
      console.error('Error adding placement:', err);
      setError('Failed to add placement. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this placement record?');
    if (!confirmed) return;

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://https://jobportal-backend-cm33.onrender.com/api/admin/placements/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete');
      setPlacements((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Error deleting placement:', err);
      alert('Failed to delete. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f3f8] flex">
      <AdminSidebar />

      {isMobileMenuOpen && (
        <AdminSidebar isMobile onClose={() => setIsMobileMenuOpen(false)} />
      )}

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-4 flex items-center gap-4">
          <motion.button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMobileMenuOpen(true)}
            whileHover={{ scale: 1.1 }}
          >
            <Menu />
          </motion.button>
          <h1 className="text-xl font-bold text-gray-900">Add Placement</h1>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 space-y-4 h-fit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-violet-600" />
                Placement Details
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Student Name</label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Job Role</label>
                  <input
                    type="text"
                    name="jobRole"
                    value={formData.jobRole}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Package / CTC</label>
                  <input
                    type="text"
                    name="packageCtc"
                    value={formData.packageCtc}
                    onChange={handleChange}
                    placeholder="e.g. 6 LPA"
                    required
                    className="w-full rounded-xl border border-gray-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Batch / Year</label>
                  <input
                    type="text"
                    name="batchYear"
                    value={formData.batchYear}
                    onChange={handleChange}
                    placeholder="e.g. 2024"
                    required
                    className="w-full rounded-xl border border-gray-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Testimonial / Message</label>
                <textarea
                  name="testimonial"
                  value={formData.testimonial}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-xl border border-gray-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Student Photo</label>
                {imagePreview ? (
                  <div className="relative w-24 h-24">
                    <img
                      src={imagePreview}
                      alt="preview"
                      className="w-24 h-24 object-cover rounded-xl border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-24 h-24 rounded-xl border-2 border-dashed border-gray-300 cursor-pointer hover:border-violet-400 transition-colors">
                    <Upload className="w-5 h-5 text-gray-400" />
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                )}
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <motion.button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 rounded-xl bg-linear-to-r from-[#4338CA] via-[#6D28D9] to-[#9333EA] text-white font-medium disabled:opacity-50"
                whileHover={{ scale: submitting ? 1 : 1.02 }}
                whileTap={{ scale: submitting ? 1 : 0.98 }}
              >
                {submitting ? 'Submitting...' : 'Add Placement'}
              </motion.button>
            </motion.form>

            {/* List */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900">All Placements</h2>
              {loading ? (
                <div className="text-center text-gray-500 py-12">Loading...</div>
              ) : placements.length === 0 ? (
                <div className="text-center text-gray-500 py-12 bg-white rounded-xl border border-gray-200">
                  No placements added yet.
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                  {placements.map((p) => (
                    <motion.div
                      key={p.id}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {p.imageUrl ? (
                        <img
                          src={`http://https://jobportal-backend-cm33.onrender.com${p.imageUrl}`}
                          alt={p.studentName}
                          className="w-14 h-14 rounded-full object-cover border border-gray-200"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                          <Award className="w-6 h-6" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 truncate">{p.studentName}</p>
                        <p className="text-sm text-gray-600 truncate">
                          {p.jobRole} at {p.companyName}
                        </p>
                        <p className="text-xs text-gray-400">{p.packageCtc} · {p.batchYear}</p>
                      </div>
                      <motion.button
                        onClick={() => handleDelete(p.id)}
                        className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPlacements;