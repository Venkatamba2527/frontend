import React, { useState } from 'react';

// ═══════════════════════════════════════════════════════════
// DESIGN TOKENS
// ═══════════════════════════════════════════════════════════
const colors = {
  bg: '#f9fafb',
  card: '#fff',
  border: '#e5e7eb',
  textPrimary: '#111827',
  textSecondary: '#6b7280',
  textMuted: '#9ca3af',
  primary: '#4f46e5',
  primaryLight: '#eef2ff',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
};

const S = {
  card: { background: '#fff', borderRadius: 12, border: `1px solid ${colors.border}`, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' },
  input: { width: '100%', padding: '8px 12px', borderRadius: 8, border: `1px solid ${colors.border}`, fontSize: 14, outline: 'none', fontFamily: 'inherit', background: '#fff', color: colors.textPrimary },
  label: { display: 'block', fontSize: 13, fontWeight: 500, color: colors.textPrimary, marginBottom: 6 },
};

// ═══════════════════════════════════════════════════════════
// INLINE ICONS
// ═══════════════════════════════════════════════════════════
const I = ({ d, size = 16, style, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={style} {...rest}>
    <path d={d} />
  </svg>
);

const paths = {
  dashboard: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  filter: 'M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 12.414V19a1 1 0 01-.553.894l-4 2A1 1 0 019 21v-8.586L3.293 6.707A1 1 0 013 6V4z',
  chart: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  calendar: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  plus: 'M12 4v16m8-8H4',
  x: 'M18 6L6 18M6 6l12 12',
  menu: 'M3 12h18M3 6h18M3 18h18',
  bell: 'M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0',
  settings: 'M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 008 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H2a2 2 0 110-4h.09A1.65 1.65 0 004.6 8a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V2a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H22a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z',
  check: 'M5 13l4 4L19 7',
};

// ═══════════════════════════════════════════════════════════
// SMALL UI PRIMITIVES
// ═══════════════════════════════════════════════════════════
function Button({ children, variant = 'primary', icon, onClick, fullWidth, disabled }) {
  const variants = {
    primary:   { background: colors.primary, color: '#fff', border: '1px solid transparent' },
    secondary: { background: '#fff', color: colors.textPrimary, border: `1px solid ${colors.border}` },
    ghost:     { background: 'transparent', color: colors.textSecondary, border: '1px solid transparent' },
  };
  return (
    <button type="button" onClick={onClick} disabled={disabled}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500,
        fontFamily: 'inherit', cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1, transition: 'all 0.15s',
        width: fullWidth ? '100%' : 'auto',
        ...variants[variant],
      }}>
      {icon}{children}
    </button>
  );
}

function IconButton({ children, onClick, style }) {
  const [hover, setHover] = useState(false);
  return (
    <button type="button" onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 32, height: 32, borderRadius: 8, border: 'none',
        background: hover ? '#f3f4f6' : 'transparent',
        color: colors.textSecondary, cursor: 'pointer', transition: 'all 0.15s',
        ...style,
      }}>
      {children}
    </button>
  );
}

function Input({ label, value, onChange, placeholder, type = 'text', prefix }) {
  return (
    <div style={{ width: '100%' }}>
      {label && <label style={S.label}>{label}</label>}
      <div style={{ position: 'relative' }}>
        {prefix && <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: colors.textMuted, fontSize: 14 }}>{prefix}</span>}
        <input type={type} value={value} onChange={onChange} placeholder={placeholder}
          style={{ ...S.input, paddingLeft: prefix ? 36 : 12 }} />
      </div>
    </div>
  );
}

function Select({ label, value, onChange, options = [] }) {
  return (
    <div style={{ width: '100%' }}>
      {label && <label style={S.label}>{label}</label>}
      <select value={value} onChange={onChange} style={{ ...S.input, cursor: 'pointer' }}>
        {options.map((opt) => {
          const val = opt.value ?? opt;
          const lbl = opt.label ?? opt;
          return <option key={val} value={val}>{lbl}</option>;
        })}
      </select>
    </div>
  );
}

function DatePicker({ label, value, onChange }) {
  return (
    <div style={{ width: '100%' }}>
      {label && <label style={S.label}>{label}</label>}
      <input type="date" value={value} onChange={onChange} style={S.input} />
    </div>
  );
}

function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
      <div style={{
        position: 'relative', background: '#fff', borderRadius: 12,
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        width: '100%', maxWidth: 520, maxHeight: '90vh', display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: `1px solid ${colors.border}` }}>
          <h3 style={{ fontSize: 16, fontWeight: 600 }}>{title}</h3>
          <IconButton onClick={onClose}><I d={paths.x} size={18} /></IconButton>
        </div>
        <div style={{ padding: 20, overflowY: 'auto' }}>{children}</div>
        {footer && (
          <div style={{ padding: '16px 20px', borderTop: `1px solid ${colors.border}`, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// EMPTY-STATE HELPERS
// ═══════════════════════════════════════════════════════════
function EmptyStatCard({ iconKey, label }) {
  return (
    <div style={S.card}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ padding: 10, borderRadius: 10, background: colors.primaryLight, color: colors.primary }}>
          <I d={paths[iconKey]} size={18} />
        </div>
        <span style={{ fontSize: 14, fontWeight: 500, color: colors.textSecondary }}>{label}</span>
      </div>
      <div style={{ marginTop: 16, height: 28, borderRadius: 6, background: '#f3f4f6' }} />
    </div>
  );
}

function EmptyChart({ title, height = 260, subtitle }) {
  return (
    <div style={S.card}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 style={{ fontSize: 14, fontWeight: 600 }}>{title}</h2>
        {subtitle && <span style={{ fontSize: 12, color: colors.textMuted }}>{subtitle}</span>}
      </div>
      <div style={{
        height, borderRadius: 8, background: '#f9fafb',
        border: `1px dashed ${colors.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: colors.textMuted, fontSize: 13,
      }}>
        No data yet
      </div>
    </div>
  );
}

function EmptyTable({ columns, emptyText = 'No campaigns yet' }) {
  return (
    <div style={{ ...S.card, padding: 0, overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#f9fafb', borderBottom: `1px solid ${colors.border}` }}>
              {columns.map((h, i) => (
                <th key={i} style={{
                  padding: '12px 16px', textAlign: 'left',
                  fontSize: 11, fontWeight: 500, textTransform: 'uppercase',
                  letterSpacing: 0.5, color: colors.textSecondary,
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={columns.length} style={{ padding: 48, textAlign: 'center', color: colors.textMuted }}>
                {emptyText}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════
export default function CampaignManagementPlatform() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [form, setForm] = useState({
    name: '', channel: 'Email', budget: '', startDate: '', endDate: '',
  });

  const navItems = [
    { key: 'dashboard', label: 'Dashboard', iconKey: 'dashboard' },
    { key: 'campaigns', label: 'Campaigns', iconKey: 'filter' },
    { key: 'analytics', label: 'Analytics', iconKey: 'chart' },
    { key: 'calendar',  label: 'Calendar',  iconKey: 'calendar' },
  ];

  const resetForm = () => setForm({ name: '', channel: 'Email', budget: '', startDate: '', endDate: '' });

  const handleSubmit = () => {
    // TODO: wire to API later
    console.log('Would create:', form);
    resetForm();
    setShowNewModal(false);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: colors.bg }}>
      {/* SIDEBAR */}
      <aside style={{
        position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 40,
        width: 256, background: '#fff', borderRight: `1px solid ${colors.border}`,
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.2s',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ height: 64, display: 'flex', alignItems: 'center', padding: '0 24px', borderBottom: `1px solid ${colors.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>C</div>
            <span style={{ fontWeight: 700, color: colors.textPrimary }}>CampaignIO</span>
          </div>
          <IconButton onClick={() => setSidebarOpen(false)} style={{ marginLeft: 'auto' }}>
            <I d={paths.x} size={18} />
          </IconButton>
        </div>

        <nav style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {navItems.map((item) => {
            const active = activeTab === item.key;
            return (
              <button key={item.key}
                onClick={() => { setActiveTab(item.key); setSidebarOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 12px', borderRadius: 8, border: 'none',
                  fontSize: 14, fontWeight: 500, textAlign: 'left', fontFamily: 'inherit',
                  background: active ? colors.primaryLight : 'transparent',
                  color: active ? colors.primary : colors.textSecondary,
                  cursor: 'pointer',
                }}>
                <I d={paths[item.iconKey]} size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div style={{ marginTop: 'auto', padding: 16, borderTop: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 14, fontWeight: 600,
          }}>MR</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: colors.textPrimary }}>Maya Rodriguez</div>
            <div style={{ fontSize: 12, color: colors.textMuted }}>Marketing Lead</div>
          </div>
          <I d={paths.settings} size={16} style={{ color: colors.textMuted }} />
        </div>
      </aside>

      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 30 }} />
      )}

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* TOPBAR */}
        <header style={{
          height: 64, background: '#fff', borderBottom: `1px solid ${colors.border}`,
          display: 'flex', alignItems: 'center', padding: '0 24px', gap: 16,
          position: 'sticky', top: 0, zIndex: 20,
        }}>
          <IconButton onClick={() => setSidebarOpen(true)}>
            <I d={paths.menu} size={20} />
          </IconButton>
          <h1 style={{ fontSize: 18, fontWeight: 600, color: colors.textPrimary, textTransform: 'capitalize' }}>
            {navItems.find((n) => n.key === activeTab)?.label}
          </h1>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
            <IconButton><I d={paths.bell} size={20} /></IconButton>
            <Button icon={<I d={paths.plus} size={16} />} onClick={() => setShowNewModal(true)}>
              New Campaign
            </Button>
          </div>
        </header>

        <main style={{ flex: 1, padding: 24, overflowY: 'auto' }}>
          {/* DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                <EmptyStatCard iconKey="dashboard" label="Total Budget" />
                <EmptyStatCard iconKey="chart"     label="Spent" />
                <EmptyStatCard iconKey="chart"     label="Impressions" />
                <EmptyStatCard iconKey="chart"     label="Conversions" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
                <EmptyChart title="Spend & Conversions Trend" subtitle="Last 6 weeks" />
                <EmptyChart title="Campaign Status" />
              </div>

              <EmptyChart title="Channel Performance" height={280} />
            </div>
          )}

          {/* CAMPAIGNS */}
          {activeTab === 'campaigns' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ flex: 1, maxWidth: 400 }}>
                  <Input placeholder="Search campaigns..." />
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['All', 'Active', 'Scheduled', 'Paused', 'Draft', 'Completed'].map((s) => (
                    <button key={s}
                      style={{
                        padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 500,
                        border: `1px solid ${colors.border}`,
                        background: '#fff', color: colors.textSecondary, cursor: 'pointer', fontFamily: 'inherit',
                      }}>{s}</button>
                  ))}
                </div>
              </div>

              <EmptyTable columns={['Campaign', 'Channel', 'Status', 'Budget', 'Spent', 'Conversions', 'Progress', '']} />
            </div>
          )}

          {/* ANALYTICS */}
          {activeTab === 'analytics' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                <EmptyStatCard iconKey="chart" label="Click-Through Rate" />
                <EmptyStatCard iconKey="chart" label="Cost per Conversion" />
                <EmptyStatCard iconKey="chart" label="ROI" />
              </div>
              <EmptyChart title="Conversions by Channel" height={300} />
            </div>
          )}

          {/* CALENDAR */}
          {activeTab === 'calendar' && (
            <div style={S.card}>
              <h2 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Campaign Schedule</h2>
              <div style={{
                padding: 40, textAlign: 'center',
                border: `1px dashed ${colors.border}`, borderRadius: 8,
                color: colors.textMuted, fontSize: 13,
              }}>
                No scheduled campaigns
              </div>
            </div>
          )}
        </main>
      </div>

      {/* NEW CAMPAIGN MODAL */}
      <Modal
        open={showNewModal}
        onClose={() => { setShowNewModal(false); resetForm(); }}
        title="Create New Campaign"
        footer={
          <>
            <Button variant="secondary" onClick={() => { setShowNewModal(false); resetForm(); }}>Cancel</Button>
            <Button onClick={handleSubmit} icon={<I d={paths.check} size={16} />}>Create Campaign</Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input label="Campaign Name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Summer Sale 2025" />
          <Select label="Channel" value={form.channel}
            onChange={(e) => setForm({ ...form, channel: e.target.value })}
            options={['Email', 'Social', 'Display', 'Search']} />
          <Input label="Budget" prefix="$" type="number" value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })} placeholder="5000" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <DatePicker label="Start Date" value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
            <DatePicker label="End Date" value={form.endDate}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
          </div>
        </div>
      </Modal>
    </div>
  );
}