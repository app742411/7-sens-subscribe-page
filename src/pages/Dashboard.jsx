import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Users,
  Search,
  Download,
  LogOut,
  RefreshCw,
  Check,
  Copy,
  Mail,
  Calendar,
  ShieldCheck,
  Database,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

function formatRelativeTime(dateInput) {
  if (!dateInput) return 'N/A';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return 'N/A';

  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'min' : 'mins'} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} ${diffInWeeks === 1 ? 'week' : 'weeks'} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [adminEmail, setAdminEmail] = useState('');

  // Pagination State
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Check authentication guard using session memory
    const token = sessionStorage.getItem('7sens_admin_token');
    if (!token) {
      navigate('/login');
      return;
    }

    const savedEmail = sessionStorage.getItem('7sens_admin_email') || 'admin@7-sens.com';
    setAdminEmail(savedEmail);

    fetchContacts(1, 50);
  }, [navigate]);

  const fetchContacts = async (targetPage = page, targetLimit = limit) => {
    setLoading(true);
    setError('');

    try {
      const baseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
      const endpoint = `/api/admin/contacts/get-all-contact?page=${targetPage}&limit=${targetLimit}`;
      const apiUrl = baseUrl ? `${baseUrl}${endpoint}` : endpoint;

      const token = sessionStorage.getItem('7sens_admin_token');
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();

      // Parse list from server payload matching data.data.data response structure
      let apiList = [];
      let totalCount = 0;
      let pagesCount = 1;

      if (data.data && Array.isArray(data.data.data)) {
        apiList = data.data.data;
        totalCount = data.data.total !== undefined ? data.data.total : apiList.length;
        pagesCount = data.data.totalPages || Math.ceil(totalCount / targetLimit) || 1;
      } else if (Array.isArray(data.data)) {
        apiList = data.data;
        totalCount = apiList.length;
      } else if (Array.isArray(data.contacts)) {
        apiList = data.contacts;
        totalCount = apiList.length;
      } else if (Array.isArray(data)) {
        apiList = data;
        totalCount = apiList.length;
      }

      setContacts(apiList);
      setTotal(totalCount);
      setTotalPages(pagesCount);
      setPage(targetPage);
      setLimit(targetLimit);
    } catch (err) {
      console.warn('API fetch error:', err);
      setContacts([]);
      setError('Unable to fetch contacts from API endpoint.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
  };

  const handleCopyEmail = (email, id) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportCSV = () => {
    if (contacts.length === 0) return;
    const csvRows = ['ID,Email,Date Joined'];

    contacts.forEach((c, idx) => {
      const email = typeof c === 'string' ? c : (c.email || '');
      const rawDate = typeof c === 'string' ? 'N/A' : (c.created_at || c.createdAt || c.date || 'N/A');
      const date = rawDate !== 'N/A' ? new Date(rawDate).toLocaleString() : 'N/A';
      csvRows.push(`${c.id || idx + 1},"${email}","${date}"`);
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `7sens_contacts_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter contacts by search query
  const filteredContacts = contacts.filter(c => {
    const email = typeof c === 'string' ? c : (c.email || '');
    return email.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="dashboard-container">
      {/* Dashboard Top Navigation Bar */}
      <header className="dashboard-header">
        <div className="dashboard-header-left">
          <Link to="/">
            <img src="/7sens.webp" alt="7Sens" style={{ height: '38px', width: 'auto' }} />
          </Link>
          <div className="dashboard-header-badge">
            <ShieldCheck size={14} color="#C5A059" />
            <span>Admin Console</span>
          </div>
        </div>

        <div className="dashboard-header-right">
          <span className="admin-email-pill">{adminEmail}</span>
          <button onClick={handleLogout} className="btn-logout" title="Sign Out">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="dashboard-main">
        <div className="dashboard-title-row">
          <div>
            <h1 className="dashboard-heading">Contacts & Priority Subscribers</h1>
            <p className="dashboard-subheading">Manage and view all incoming priority launch requests.</p>
          </div>

          <div className="dashboard-actions-row">
            <button onClick={() => fetchContacts(page, limit)} className="btn-secondary-dash" disabled={loading}>
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>

            <button onClick={handleExportCSV} className="btn-primary-dash" disabled={contacts.length === 0}>
              <Download size={15} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="dashboard-banner-notice">
            <Database size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Metrics Cards Grid */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-card-header">
              <span className="metric-label">Total Subscribers</span>
              <Users size={18} color="#C5A059" />
            </div>
            <div className="metric-value">{total || contacts.length}</div>
            <div className="metric-footer">Priority launch sign-ups</div>
          </div>

          <div className="metric-card">
            <div className="metric-card-header">
              <span className="metric-label">API Endpoint</span>
              <Database size={18} color="#0B1B36" />
            </div>
            <div className="metric-value-sm">/api/admin/contacts/get-all-contact</div>
            <div className="metric-footer">GET status: {loading ? 'Fetching...' : 'Connected (Limit: ' + limit + ')'}</div>
          </div>

          <div className="metric-card">
            <div className="metric-card-header">
              <span className="metric-label">Live Site</span>
              <ArrowUpRight size={18} color="#10B981" />
            </div>
            <div className="metric-value-sm">7Sens Coming Soon</div>
            <div className="metric-footer">
              <Link to="/" style={{ color: '#C5A059', textDecoration: 'none', fontWeight: 600 }}>
                View Coming Soon Page →
              </Link>
            </div>
          </div>
        </div>

        {/* Table & Filter Card */}
        <div className="table-card">
          <div className="table-header-row">
            <div className="search-box-dash">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search subscriber emails..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="search-clear-btn">×</button>
              )}
            </div>

            <div className="showing-count">
              Showing <strong>{filteredContacts.length}</strong> of {total || contacts.length} entries
            </div>
          </div>

          {loading ? (
            <div className="loading-state-dash">
              <RefreshCw size={24} className="animate-spin" color="#C5A059" />
              <p>Fetching contacts from endpoint (Page {page}, Limit {limit})...</p>
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="empty-state-dash">
              <Mail size={32} color="#CBD5E1" />
              <h3>No contacts found</h3>
              <p>{searchQuery ? `No matches found for "${searchQuery}"` : 'No subscriber emails submitted yet.'}</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="contacts-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Subscriber Email</th>
                    <th>Date Registered</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map((contact, index) => {
                    const email = typeof contact === 'string' ? contact : (contact.email || '');
                    const rawDate = typeof contact === 'string' ? null : (contact.created_at || contact.createdAt || contact.date);
                    const formattedDate = rawDate ? new Date(rawDate).toLocaleString() : 'N/A';
                    const relativeAge = formatRelativeTime(rawDate);
                    const rowId = contact.id || contact._id || index;

                    return (
                      <tr key={rowId}>
                        <td className="col-index">{contact.id || index + 1}</td>
                        <td className="col-email">
                          <div className="email-cell">
                            <Mail size={15} color="#94A3B8" />
                            <span>{email}</span>
                          </div>
                        </td>
                        <td className="col-date">
                          <div className="date-cell" style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, color: '#0B1B36' }}>
                              <Calendar size={14} color="#C5A059" />
                              <span>{relativeAge}</span>
                            </div>
                            <span style={{ fontSize: '0.76rem', color: '#94A3B8', paddingLeft: '1.25rem' }}>
                              {formattedDate}
                            </span>
                          </div>
                        </td>
                        <td className="col-actions">
                          <button
                            onClick={() => handleCopyEmail(email, rowId)}
                            className="btn-action-icon"
                            title="Copy Email"
                          >
                            {copiedId === rowId ? <Check size={15} color="#10B981" /> : <Copy size={15} />}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Controls Footer */}
          <div className="table-pagination-row" style={{ padding: '1rem 1.5rem', borderTop: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#64748B' }}>
              <span>Show</span>
              <select
                value={limit}
                onChange={(e) => {
                  const newLimit = Number(e.target.value);
                  setLimit(newLimit);
                  fetchContacts(1, newLimit);
                }}
                style={{ padding: '0.35rem 0.6rem', border: '1px solid #CBD5E1', borderRadius: 0, background: '#ffffff', fontSize: '0.82rem', color: '#0B1B36', outline: 'none' }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span>entries per page (Total: {total || contacts.length})</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <span style={{ fontSize: '0.82rem', color: '#64748B' }}>
                Page <strong>{page}</strong> of <strong>{totalPages}</strong>
              </span>

              <div style={{ display: 'flex', gap: '0.35rem' }}>
                <button
                  onClick={() => fetchContacts(page - 1, limit)}
                  disabled={page <= 1 || loading}
                  className="btn-action-icon"
                  style={{ opacity: page <= 1 ? 0.4 : 1, cursor: page <= 1 ? 'not-allowed' : 'pointer' }}
                  title="Previous Page"
                >
                  <ChevronLeft size={16} />
                </button>

                <button
                  onClick={() => fetchContacts(page + 1, limit)}
                  disabled={page >= totalPages || loading}
                  className="btn-action-icon"
                  style={{ opacity: page >= totalPages ? 0.4 : 1, cursor: page >= totalPages ? 'not-allowed' : 'pointer' }}
                  title="Next Page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

