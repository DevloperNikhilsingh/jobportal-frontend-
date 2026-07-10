import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminSidebar from './AdminSidebar';
import { Menu, Search, Eye, Check, X as XIcon, Trash2 } from 'lucide-react';

const AdminHireRequests = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("authToken");

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/admin/want-to-hire-requests", {
        headers: { Authorization: "Bearer " + token },
      });
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error("Failed to fetch hire requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    setActionLoadingId(id);
    try {
      const res = await fetch(`http://localhost:8080/api/admin/approve-job/${id}`, {
        method: "POST",
        headers: { Authorization: "Bearer " + token },
      });
      if (!res.ok) throw new Error("Approve failed");
      await fetchRequests();
    } catch (err) {
      console.error(err);
      alert("Failed to approve request");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReject = async (id) => {
    setActionLoadingId(id);
    try {
      const res = await fetch(`http://localhost:8080/api/admin/reject-job/${id}`, {
        method: "POST",
        headers: { Authorization: "Bearer " + token },
      });
      if (!res.ok) throw new Error("Reject failed");
      await fetchRequests();
    } catch (err) {
      console.error(err);
      alert("Failed to reject request");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request? This cannot be undone.")) return;
    setActionLoadingId(id);
    try {
      const res = await fetch(`http://localhost:8080/api/admin/want-to-hire-requests/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      });
      if (!res.ok) throw new Error("Delete failed");
      // UI se turant hata do
      setRequests((prev) => prev.filter((req) => req.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete request");
    } finally {
      setActionLoadingId(null);
    }
  };

  const filteredRequests = requests.filter((req) =>
    req.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusColor = (status) => {
    if (status === "APPROVED") return "bg-green-100 text-green-700";
    if (status === "REJECTED") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

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
            <h1 className="text-xl font-bold text-gray-900">Want to Hire Requests</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <motion.div
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            {loading ? (
              <p className="text-center text-gray-500 py-10">Loading requests...</p>
            ) : filteredRequests.length === 0 ? (
              <p className="text-center text-gray-500 py-10">No hire requests found.</p>
            ) : (
              <div className="grid gap-4">
                {filteredRequests.map((req, index) => (
                  <motion.div
                    key={req.id}
                    className="border border-gray-200 rounded-xl p-6 hover:bg-gray-50"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex gap-4">
                        {/* Image thumbnail - click to preview */}
                        {req.imageUrl ? (
                          <img
                            src={`http://localhost:8080/uploads/${req.imageUrl}`}
                            alt={req.jobTitle}
                            onClick={() => setPreviewImage(`http://localhost:8080/uploads/${req.imageUrl}`)}
                            className="w-20 h-20 object-cover rounded-lg border cursor-pointer hover:opacity-80 transition"
                          />
                        ) : (
                          <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-lg text-xs text-gray-400 border">
                            No Image
                          </div>
                        )}

                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold text-gray-900">{req.companyName}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${statusColor(req.status)}`}>
                              {req.status}
                            </span>
                          </div>
                          <p className="text-violet-600 font-medium">{req.jobTitle}</p>
                          <p className="text-sm text-gray-600 mt-1">{req.jobDescription}</p>
                          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                            <span>📍 {req.location}</span>
                            <span>💼 {req.experience}</span>
                            <span>💰 {req.salary}</span>
                            <span>⏰ {req.workHour}</span>
                            <span>🧑‍💻 {req.jobType}</span>
                            <span>📧 {req.employerEmail}</span>
                          </div>
                          {req.skills && (
                            <p className="text-sm text-gray-500 mt-1">🛠 Skills: {req.skills}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">
                          {req.createdAt ? new Date(req.createdAt).toLocaleDateString() : ""}
                        </span>

                        {req.status === "PENDING" && (
                          <>
                            <motion.button
                              disabled={actionLoadingId === req.id}
                              onClick={() => handleApprove(req.id)}
                              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-green-600 text-white font-medium disabled:opacity-50"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Check className="w-4 h-4" />
                              Approve
                            </motion.button>

                            <motion.button
                              disabled={actionLoadingId === req.id}
                              onClick={() => handleReject(req.id)}
                              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-red-500 text-white font-medium disabled:opacity-50"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <XIcon className="w-4 h-4" />
                              Reject
                            </motion.button>
                          </>
                        )}

                        {/* Delete button - always available regardless of status */}
                        <motion.button
                          disabled={actionLoadingId === req.id}
                          onClick={() => handleDelete(req.id)}
                          className="flex items-center gap-1 px-3 py-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600 font-medium disabled:opacity-50"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          title="Delete this request"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </main>
      </div>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)}
          >
            <motion.img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-[85vh] rounded-xl shadow-2xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 rounded-full p-2"
            >
              <XIcon className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminHireRequests;