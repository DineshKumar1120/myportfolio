import React, { useState, useEffect } from 'react';
import { Mail, Trash2, CheckCircle, Clock } from 'lucide-react';
import api from '../../../services/api';
import { ContactMessage } from '../../../types';

export const MessagesInbox: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const fetchMessages = async () => {
    try {
      const res = await api.get('/admin/messages');
      if (res.data.success) {
        setMessages(res.data.data);
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleOpenMessage = async (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (!msg.isRead && msg._id) {
      try {
        await api.put(`/admin/messages/${msg._id}/read`);
        fetchMessages();
      } catch (err) {}
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id || !window.confirm('Delete message?')) return;
    try {
      await api.delete(`/admin/messages/${id}`);
      setSelectedMessage(null);
      fetchMessages();
    } catch (err) {}
  };

  return (
    <div className="glass-card p-4 p-sm-5 shadow-sm">
      <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
        <div>
          <h4 className="fw-bold m-0 d-flex align-items-center gap-2">
            <Mail className="text-primary" size={24} /> Contact Messages Inbox
          </h4>
          <p className="text-muted small m-0">View submitted contact inquiries from the website form.</p>
        </div>
      </div>

      <div className="row g-4">
        {/* Messages List */}
        <div className="col-lg-5">
          <div className="list-group list-group-flush border rounded-3 overflow-hidden">
            {messages.map((msg) => (
              <button
                key={msg._id}
                onClick={() => handleOpenMessage(msg)}
                className={`list-group-item list-group-item-action p-3 d-flex flex-column align-items-start ${
                  selectedMessage?._id === msg._id ? 'active' : ''
                } ${!msg.isRead ? 'fw-bold bg-primary-subtle' : ''}`}
              >
                <div className="d-flex w-100 justify-content-between align-items-center mb-1">
                  <span className="text-truncate">{msg.name}</span>
                  {!msg.isRead && <span className="badge bg-primary rounded-pill">New</span>}
                </div>
                <small className="text-truncate w-100 opacity-75 mb-1">{msg.subject}</small>
                <small className="opacity-50 font-monospace">{msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : ''}</small>
              </button>
            ))}

            {messages.length === 0 && (
              <div className="p-4 text-center text-muted">No messages received yet.</div>
            )}
          </div>
        </div>

        {/* Message Detail Viewer */}
        <div className="col-lg-7">
          {selectedMessage ? (
            <div className="bg-body-tertiary p-4 rounded-3 border">
              <div className="d-flex justify-content-between align-items-start mb-3 border-bottom pb-2">
                <div>
                  <h5 className="fw-bold m-0">{selectedMessage.subject}</h5>
                  <small className="text-muted">From: <strong>{selectedMessage.name}</strong> ({selectedMessage.email})</small>
                  {selectedMessage.phone && <div><small className="text-muted">Phone: {selectedMessage.phone}</small></div>}
                </div>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(selectedMessage._id)}>
                  <Trash2 size={16} /> Delete
                </button>
              </div>

              <div className="bg-body p-3 rounded border text-body whitespace-pre-line lh-lg">
                {selectedMessage.message}
              </div>
            </div>
          ) : (
            <div className="bg-body-tertiary p-5 text-center text-muted rounded-3 border">
              Select a message from the inbox to read details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
