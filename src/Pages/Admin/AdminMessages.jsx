import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdminSidebar from './AdminSidebar';
import { Menu, Bell, Search, Eye, Mail, Phone, MapPin, Trash2, Send, CheckCircle } from 'lucide-react';

const AdminMessages = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // ---- Reply ke liye naye states ----
  const [replyText, setReplyText] = useState('');
  const [sendingReply, setSendingReply] = useState(false);
  const [replyError, setReplyError] = useState(null);

  const handleDelete = async (id, e) => {
    e.stopPropagation(); // card ke onClick ko trigger hone se roke

    const confirmed = window.confirm('Are you sure you want to delete this message?');
    if (!confirmed) return;

    setDeletingId(id);
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:8080/api/admin/contact-enquiries/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete: ${response.status}`);
      }

      setMessages((prev) => prev.filter((msg) => msg.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (err) {
      console.error('Error deleting message:', err);
      alert('Failed to delete the message. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  // ---- Naya reply handler ----
  const handleSendReply = async () => {
    if (!replyText.trim()) return;

    setSendingReply(true);
    setReplyError(null);

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(
        `http://localhost:8080/api/admin/contact-enquiries/${selectedMessage.id}/reply`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ replyMessage: replyText }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to send reply: ${response.status}`);
      }

      const updated = await response.json();

      // list aur selected message dono update karo taaki "Replied" badge turant dikhe
      setMessages((prev) =>
        prev.map((msg) => (msg.id === updated.id ? updated : msg))
      );
      setSelectedMessage(updated);
      setReplyText('');
    } catch (err) {
      console.error('Error sending reply:', err);
      setReplyError('Failed to send reply. Please try again.');
    } finally {
      setSendingReply(false);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('http://localhost:8080/api/admin/contact-enquiries', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch messages: ${response.status}`);
        }

        const data = await response.json();
        setMessages(data);
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError('Failed to load messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // jab dusra message select ho, purana reply textbox clear ho jaye
  useEffect(() => {
    setReplyText('');
    setReplyError(null);
  }, [selectedMessage?.id]);

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
            <h1 className="text-xl font-bold text-gray-900">Contact Messages</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                className="pl-10 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {loading ? (
            <div className="text-center text-gray-500 py-12">Loading messages...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-12">{error}</div>
          ) : messages.length === 0 ? (
            <div className="text-center text-gray-500 py-12">No messages yet.</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Messages List */}
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    onClick={() => setSelectedMessage(msg)}
                    className={`bg-white rounded-xl shadow-lg border border-gray-200 p-6 cursor-pointer transition-all ${
                      selectedMessage?.id === msg.id ? 'border-violet-500 ring-2 ring-violet-500/20' : ''
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold text-gray-900">{msg.name}</p>
                        <p className="text-sm text-gray-500">{msg.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          msg.role === 'JOBSEEKER' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {msg.role === 'JOBSEEKER' ? 'Job Seeker' : 'Employer'}
                        </span>
                        {/* ---- Naya Replied badge ---- */}
                        {msg.replied && (
                          <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                            <CheckCircle className="w-3 h-3" />
                            Replied
                          </span>
                        )}
                        <motion.button
                          onClick={(e) => handleDelete(msg.id, e)}
                          disabled={deletingId === msg.id}
                          className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="Delete message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                    <p className="font-medium text-gray-800 mb-2">{msg.subject}</p>
                    <p className="text-sm text-gray-600 line-clamp-2">{msg.message}</p>
                    <p className="text-xs text-gray-400 mt-3">
                      {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : ''}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Selected Message Detail */}
              <div>
                {selectedMessage ? (
                  <motion.div
                    className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-bold text-gray-900">Message Details</h2>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedMessage.role === 'JOBSEEKER' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {selectedMessage.role === 'JOBSEEKER' ? 'Job Seeker' : 'Employer'}
                      </span>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center gap-3 text-gray-700">
                        <Mail className="w-5 h-5" />
                        <span>{selectedMessage.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <Phone className="w-5 h-5" />
                        <span>{selectedMessage.phone || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <MapPin className="w-5 h-5" />
                        <span>
                          {selectedMessage.createdAt
                            ? new Date(selectedMessage.createdAt).toLocaleString()
                            : ''}
                        </span>
                      </div>
                      {selectedMessage.jobSector && (
                        <div className="flex items-center gap-3 text-gray-700">
                          <span className="text-sm">Job Sector: {selectedMessage.jobSector}</span>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                      <h3 className="font-medium text-gray-900 mb-2">Subject: {selectedMessage.subject}</h3>
                      <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
                    </div>

                    {/* ---- Agar pehle se reply ho chuka hai, wo dikhao ---- */}
                    {selectedMessage.replied && selectedMessage.replyMessage && (
                      <div className="mt-4 border-t border-gray-100 pt-4">
                        <h3 className="font-medium text-emerald-700 mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Your Reply
                        </h3>
                        <p className="text-gray-700 whitespace-pre-wrap bg-emerald-50 rounded-lg p-3">
                          {selectedMessage.replyMessage}
                        </p>
                        {selectedMessage.repliedAt && (
                          <p className="text-xs text-gray-400 mt-2">
                            Sent on {new Date(selectedMessage.repliedAt).toLocaleString()}
                          </p>
                        )}
                      </div>
                    )}

                    {/* ---- Naya reply textarea ---- */}
                    <div className="mt-6 border-t border-gray-100 pt-4">
                      <label className="font-medium text-gray-900 mb-2 block">
                        {selectedMessage.replied ? 'Send another reply' : 'Write a reply'}
                      </label>
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        rows={4}
                        placeholder="Type your reply here..."
                        className="w-full rounded-xl border border-gray-200 p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                      />
                      {replyError && (
                        <p className="text-red-500 text-sm mt-2">{replyError}</p>
                      )}
                      <motion.button
                        onClick={handleSendReply}
                        disabled={sendingReply || !replyText.trim()}
                        className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-linear-to-r from-[#4338CA] via-[#6D28D9] to-[#9333EA] text-white font-medium disabled:opacity-50"
                        whileHover={{ scale: sendingReply ? 1 : 1.02 }}
                        whileTap={{ scale: sendingReply ? 1 : 0.98 }}
                      >
                        <Send className="w-4 h-4" />
                        {sendingReply ? 'Sending...' : 'Send Reply'}
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 flex flex-col items-center justify-center text-center text-gray-500">
                    <Mail className="w-16 h-16 text-gray-300 mb-4" />
                    <p>Select a message to view details</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminMessages;