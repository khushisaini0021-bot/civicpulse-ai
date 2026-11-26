import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Activity, ArrowDownRight, ArrowRight, Bell, Camera, Check, CheckCircle2,
  ChevronDown, ChevronLeft, ChevronRight, CircleHelp, Clock3, FileText,
  Filter, MapPin, Menu, MessageSquareText, MoreHorizontal, Navigation,
  Plus, Search, Send, ShieldCheck, Sparkles, Target, TrendingUp, Upload,
  Users, X, Zap,
} from 'lucide-react';

const seedReports = [
  { id: 'CP-24081', title: 'Pothole on University Road', category: 'Roads', place: 'Near GLA University, Mathura', status: 'In progress', priority: 'High', date: 'Today, 9:42 AM', owner: 'Aarav Sharma', initials: 'AS', color: '#e4a545', x: 56, y: 39, description: 'A deep pothole is making it difficult for two-wheelers to pass safely.', department: 'Roads & Transport', updates: 3 },
  { id: 'CP-24080', title: 'Overflowing bins at market', category: 'Sanitation', place: 'City Centre Market, Mathura', status: 'Submitted', priority: 'Medium', date: 'Today, 8:18 AM', owner: 'Meera Kapoor', initials: 'MK', color: '#63a585', x: 70, y: 58, description: 'The public bins have been full since yesterday evening.', department: 'Sanitation', updates: 1 },
  { id: 'CP-24079', title: 'Streetlight not working', category: 'Streetlights', place: 'Radhapuram crossing, Mathura', status: 'Verified', priority: 'Low', date: 'Yesterday, 6:30 PM', owner: 'Ishaan Verma', initials: 'IV', color: '#7479bd', x: 36, y: 58, description: 'The light at the crossing has been out for three nights.', department: 'Electrical', updates: 2 },
  { id: 'CP-24078', title: 'Water leaking near the park', category: 'Water', place: 'Shanti Nagar Park, Mathura', status: 'Resolved', priority: 'Medium', date: 'Yesterday, 2:12 PM', owner: 'Riya Singh', initials: 'RS', color: '#d47b63', x: 43, y: 30, description: 'A small pipe leak is creating a puddle beside the park entrance.', department: 'Water Works', updates: 5 },
  { id: 'CP-24077', title: 'Drain cover is displaced', category: 'Sanitation', place: 'Krishna Nagar, Mathura', status: 'Submitted', priority: 'High', date: 'Nov 20, 11:05 AM', owner: 'Kabir Joshi', initials: 'KJ', color: '#b077aa', x: 78, y: 34, description: 'The open drain is a hazard for pedestrians after dark.', department: 'Sanitation', updates: 1 },
];

const navItems = [
  { id: 'overview', label: 'Overview', icon: Activity },
  { id: 'report', label: 'Report an issue', icon: Plus },
  { id: 'complaints', label: 'My complaints', icon: FileText, count: '4' },
  { id: 'map', label: 'City map', icon: MapPin },
  { id: 'admin', label: 'Admin dashboard', icon: ShieldCheck },
];

const statusSteps = ['Submitted', 'Verified', 'Assigned', 'In progress', 'Resolved'];
const statusClass = (s) => s.toLowerCase().replaceAll(' ', '-');

function BrandMark() {
  return <div className="brand-mark"><span /><span /><span /><span /></div>;
}

function IconButton({ icon: Icon, label, onClick, className = '' }) {
  return <button className={`icon-button ${className}`} aria-label={label} title={label} onClick={onClick}><Icon size={18} strokeWidth={1.8} /></button>;
}

function StatusBadge({ status }) {
  const Icon = status === 'Resolved' ? CheckCircle2 : status === 'In progress' ? Activity : Clock3;
  return <span className={`status-badge ${statusClass(status)}`}><Icon size={13} />{status}</span>;
}

function Priority({ value }) {
  return <span className={`priority priority-${value.toLowerCase()}`}><i />{value}</span>;
}

function Avatar({ initials, color, size = 'normal' }) {
  return <span className={`avatar avatar-${size}`} style={{ '--avatar-color': color }}>{initials}</span>;
}

function MapArtwork({ reports, selectedId, onSelect, large = false }) {
  const streets = [
    'M-40 90 C110 105 160 28 330 50 S550 110 740 46',
    'M-20 185 C140 150 230 217 395 178 S590 130 760 195',
    'M-15 290 C140 250 230 295 380 264 S590 285 770 240',
    'M95 -15 C125 80 115 140 160 205 S185 300 150 410',
    'M275 -12 C245 70 285 132 260 200 S300 305 275 410',
    'M490 -20 C440 72 470 130 445 205 S495 325 465 415',
    'M655 -15 C620 70 663 145 620 220 S650 320 625 420',
    'M35 40 C170 60 200 110 315 105 S480 25 610 62 S700 115 750 120',
  ];
  return <div className={`map-art ${large ? 'map-art-large' : ''}`}>
    <svg viewBox="0 0 740 360" preserveAspectRatio="xMidYMid slice" aria-label="Map of reported civic issues around Mathura">
      <rect width="740" height="360" fill="#eaf0e8" />
      <path d="M0 312 C78 280 145 330 216 310 S337 280 420 302 S566 344 740 300 V360 H0Z" fill="#d8e9e0" />
      <path d="M505 0 C478 50 530 75 513 119 S492 173 536 205 S590 270 568 360" fill="none" stroke="#c5e1d7" strokeWidth="20" />
      <g fill="#dfe9d9"><path d="M28 18h72v43H28z"/><path d="M210 27h38v27h-38z"/><path d="M350 29h72v31h-72z"/><path d="M580 23h50v33h-50z"/><path d="M60 220h53v38H60z"/><path d="M329 223h72v30h-72z"/><path d="M594 236h76v42h-76z"/></g>
      <g fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round">{streets.map((d, i) => <path key={i} d={d} />)}</g>
      <g fill="none" stroke="#d5ddd3" strokeWidth="1.2">{streets.map((d, i) => <path key={`edge-${i}`} d={d} />)}</g>
      <g className="map-labels" fill="#859187" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600">
        <text x="68" y="125">RADHAPURAM</text><text x="270" y="148">CIVIL LINES</text><text x="497" y="264">SHANTI NAGAR</text><text x="565" y="103">CITY CENTRE</text><text x="146" y="278">KRISHNA NAGAR</text>
      </g>
      {reports.map((r) => <g key={r.id} className={`map-pin ${selectedId === r.id ? 'map-pin-selected' : ''}`} transform={`translate(${r.x * 7.4} ${r.y * 3.6})`} onClick={() => onSelect?.(r)} role="button" tabIndex="0" aria-label={`${r.title}, ${r.status}`}>
        <circle r={selectedId === r.id ? 17 : 14} fill={selectedId === r.id ? '#1f6b51' : '#fff'} opacity=".95" />
        <circle r="9" fill={r.status === 'Resolved' ? '#68a989' : r.priority === 'High' ? '#d78355' : '#577f6e'} />
        <circle r="3" fill="#fff" />
      </g>)}
    </svg>
    <div className="map-credit"><MapPin size={12} /> Mathura, Uttar Pradesh</div>
  </div>;
}

function ReportModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({ title: '', category: '', description: '', place: '' });
  const [photo, setPhoto] = useState(null);
  const [locating, setLocating] = useState(false);
  const [ai, setAi] = useState(false);
  const fileRef = useRef(null);
  const patch = (key, value) => setForm((old) => ({ ...old, [key]: value }));
  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.category || !form.place.trim()) return;
    const likelyHigh = /danger|deep|open|broken|leak/i.test(`${form.title} ${form.description}`);
    onSubmit({ ...form, photo: photo?.url || null, priority: likelyHigh ? 'High' : 'Medium', status: 'Submitted' });
  };
  const analyze = () => {
    setAi(true);
    window.setTimeout(() => {
      const s = `${form.title} ${form.description}`.toLowerCase();
      if (!form.category) patch('category', s.includes('light') ? 'Streetlights' : s.includes('water') || s.includes('leak') ? 'Water' : s.includes('garbage') || s.includes('bin') || s.includes('drain') ? 'Sanitation' : 'Roads');
      setAi(false);
    }, 650);
  };
  const getLocation = () => {
    setLocating(true);
    if ('geolocation' in navigator) navigator.geolocation.getCurrentPosition(
      ({ coords }) => { patch('place', `${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)} · Current location`); setLocating(false); },
      () => { patch('place', 'GLA University, Mathura'); setLocating(false); }, { timeout: 5000 },
    );
    else { patch('place', 'GLA University, Mathura'); setLocating(false); }
  };
  return <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
    <section className="report-modal" role="dialog" aria-modal="true" aria-labelledby="report-title">
      <div className="modal-head"><div><span className="eyebrow">CITIZEN REPORT</span><h2 id="report-title">Report a local issue</h2><p>Help your neighborhood get the attention it needs.</p></div><IconButton icon={X} label="Close" onClick={onClose} /></div>
      <form onSubmit={submit} className="report-form">
        <label className="field-label">What’s the issue called?<input value={form.title} onChange={(e) => patch('title', e.target.value)} placeholder="e.g. Pothole near the main gate" required /></label>
        <div className="field-row"><label className="field-label">Issue type<select value={form.category} onChange={(e) => patch('category', e.target.value)} required><option value="">Select a category</option>{['Roads', 'Sanitation', 'Water', 'Streetlights', 'Public spaces', 'Other'].map(x => <option key={x}>{x}</option>)}</select></label><label className="field-label">Location<div className="input-with-action"><input value={form.place} onChange={(e) => patch('place', e.target.value)} placeholder="Area, landmark or address" required /><button type="button" onClick={getLocation} title="Use current location"><Navigation size={16} className={locating ? 'spin' : ''} /></button></div></label></div>
        <label className="field-label">A little more detail <span className="optional">Optional</span><textarea value={form.description} onChange={(e) => patch('description', e.target.value)} placeholder="Tell us what you noticed and how it affects the area…" rows="3" /></label>
        <div className="upload-row"><input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) setPhoto({ name: f.name, url: URL.createObjectURL(f) }); }} />{photo ? <div className="photo-preview"><img src={photo.url} alt="Issue preview"/><span>{photo.name}</span><button type="button" onClick={() => setPhoto(null)} aria-label="Remove photo"><X size={14}/></button></div> : <button className="upload-box" type="button" onClick={() => fileRef.current?.click()}><span className="upload-icon"><Camera size={18}/></span><span><b>Add a photo</b><small>A photo helps the team understand the issue</small></span><Upload size={17} className="upload-end"/></button>}</div>
        <div className="ai-note"><span className="ai-note-icon"><Sparkles size={16}/></span><div><b>AI can help organize this report</b><p>We’ll suggest a category and urgency for an administrator to review.</p></div><button type="button" className="text-button" onClick={analyze}>{ai ? 'Reviewing…' : 'Suggest'} <ArrowRight size={14}/></button></div>
        <div className="modal-actions"><span><ShieldCheck size={15}/> Your personal details stay private</span><button className="button button-primary" type="submit">Submit report <ArrowRight size={16}/></button></div>
      </form>
    </section>
  </div>;
}

function DetailModal({ report, onClose, onStatus }) {
  return <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}><section className="detail-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title">
    <div className="detail-top"><span className="eyebrow">REPORT {report.id}</span><IconButton icon={X} label="Close" onClick={onClose}/></div>
    <div className="detail-title-row"><div><h2 id="detail-title">{report.title}</h2><p><MapPin size={15}/>{report.place}</p></div><Priority value={report.priority}/></div>
    <div className="detail-tags"><StatusBadge status={report.status}/><span className="category-tag">{report.category}</span><span className="category-tag">{report.date}</span></div>
    <p className="detail-description">{report.description || 'No additional description was provided.'}</p>
    <div className="timeline"><div className="timeline-head"><h3>Progress updates</h3><span>{report.updates || 1} updates</span></div>{statusSteps.map((step, i) => { const current = statusSteps.indexOf(report.status); const isDone = i <= current; return <div className={`timeline-step ${isDone ? 'step-done' : ''} ${i === current ? 'step-current' : ''}`} key={step}><span className="timeline-dot">{isDone && i < current ? <Check size={12}/> : null}</span><div><b>{step}</b><small>{i === 0 ? report.date : isDone ? (i === current ? 'Current status' : 'Updated by the civic team') : 'Waiting for the previous step'}</small></div></div>; })}</div>
    {onStatus && <div className="detail-admin"><label>Update status<select value={report.status} onChange={(e) => onStatus(report.id, e.target.value)}>{statusSteps.map(s => <option key={s}>{s}</option>)}</select></label><label>Assigned team<select defaultValue={report.department}><option>Roads & Transport</option><option>Sanitation</option><option>Water Works</option><option>Electrical</option><option>Public Works</option></select></label></div>}
    <div className="detail-footer"><Avatar initials={report.initials} color={report.color}/><span><b>{report.owner}</b><small>Community member</small></span><button className="button button-soft" onClick={onClose}>Done</button></div>
  </section></div>;
}

function Sidebar({ page, setPage, role, setRole, open, close }) {
  return <><div className={`sidebar-scrim ${open ? 'visible' : ''}`} onClick={close}/><aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
    <div className="brand"><BrandMark/><span>CivicPulse<span className="brand-ai">AI</span><small>BETTER, TOGETHER</small></span><button className="mobile-close" onClick={close}><X size={18}/></button></div>
    <div className="workspace-switch"><div className="workspace-avatar">M</div><span><b>Mathura City</b><small>Community workspace</small></span><ChevronDown size={15}/></div>
    <div className="nav-label">WORKSPACE</div>
    <nav className="main-nav">{navItems.map(({ id, label, icon: Icon, count }) => <button key={id} className={`nav-link ${page === id ? 'active' : ''}`} onClick={() => {setPage(id); close();}}><Icon size={18} strokeWidth={1.8}/><span>{label}</span>{count && <span className="nav-count">{count}</span>}</button>)}</nav>
    <div className="side-bottom"><div className="community-card"><div className="community-badge"><Users size={16}/></div><b>Small actions add up.</b><p>Your reports help the city see what needs attention.</p><div className="community-avatars"><Avatar initials="AS" color="#e4a545" size="tiny"/><Avatar initials="MK" color="#63a585" size="tiny"/><Avatar initials="IV" color="#7479bd" size="tiny"/><span>+1.2k neighbors</span></div></div>
      <div className="role-switch"><span>VIEW AS</span><button onClick={() => setRole(role === 'citizen' ? 'admin' : 'citizen')}><span className={`role-dot ${role}`}/>{role === 'citizen' ? 'Citizen view' : 'Admin view'}<ChevronDown size={14}/></button></div>
      <button className="help-link"><CircleHelp size={17}/>Help & support<ArrowRight size={14}/></button>
      <div className="user-profile"><Avatar initials="AS" color="#e4a545"/><span><b>Aarav Sharma</b><small>{role === 'admin' ? 'City administrator' : 'Community member'}</small></span><MoreHorizontal size={19}/></div>
    </div>
  </aside></>;
}

function ReportRow({ report, onClick }) {
  return <button className="report-row" onClick={() => onClick(report)}><span className="report-type-icon" data-category={report.category}>{report.category === 'Roads' ? '⌁' : report.category === 'Sanitation' ? '◌' : report.category === 'Water' ? '≈' : '☼'}</span><span className="report-main"><b>{report.title}</b><small><MapPin size={12}/>{report.place}</small></span><span className="row-date">{report.date}</span><StatusBadge status={report.status}/><Priority value={report.priority}/><ChevronRight size={17} className="row-chevron"/></button>;
}

function Overview({ reports, onOpen, onReport, setPage }) {
  const active = reports.filter(r => r.status !== 'Resolved').length;
  const resolved = reports.filter(r => r.status === 'Resolved').length;
  return <>
    <div className="welcome-row"><div><div className="eyebrow greeting"><span className="sun-dot"/> MONDAY, NOVEMBER 23</div><h1>Good morning, Aarav <span className="wave">✳</span></h1><p>Here’s what’s happening around your neighborhood today.</p></div><button className="button button-primary" onClick={onReport}><Plus size={17}/> Report an issue</button></div>
    <div className="stats-grid">
      <div className="stat-card"><div className="stat-top"><span>Open reports nearby</span><span className="stat-icon green"><Activity size={16}/></span></div><div className="stat-number">{active + 124}<span className="stat-trend"><TrendingUp size={14}/> 12.8%</span></div><div className="stat-foot">vs. last month <span className="foot-muted">in your area</span></div><div className="sparkline"><svg viewBox="0 0 160 32"><path d="M1 25 C16 21 18 18 30 20 S48 15 61 18 S75 7 90 13 S110 20 121 11 S140 13 159 3" fill="none" stroke="#4f9979" strokeWidth="2"/><path d="M1 25 C16 21 18 18 30 20 S48 15 61 18 S75 7 90 13 S110 20 121 11 S140 13 159 3 V32 H1Z" fill="url(#sparkfill)"/><defs><linearGradient id="sparkfill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#a8d7bd" stopOpacity=".48"/><stop offset="1" stopColor="#a8d7bd" stopOpacity="0"/></linearGradient></defs></svg></div></div>
      <div className="stat-card"><div className="stat-top"><span>Resolved this month</span><span className="stat-icon amber"><CheckCircle2 size={16}/></span></div><div className="stat-number">{resolved + 86}<span className="stat-trend"><TrendingUp size={14}/> 8.4%</span></div><div className="stat-foot">vs. last month <span className="foot-muted">across Mathura</span></div><div className="mini-bars">{[36,55,43,68,49,73,57,88,66,77,61,94].map((h,i)=><i key={i} style={{height:`${h}%`,opacity: i===11 ? 1 : .48}}/>)}</div></div>
      <div className="stat-card stat-wide"><div className="stat-top"><span>Community pulse</span><span className="stat-icon lilac"><Users size={16}/></span></div><div className="stat-number">1,284<span className="stat-trend"><TrendingUp size={14}/> 16.2%</span></div><div className="stat-foot">neighbors taking action <span className="foot-muted">this month</span></div><div className="pulse-people"><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/></div></div>
    </div>
    <div className="overview-grid"><section className="panel recent-panel"><div className="panel-heading"><div><span className="eyebrow">THE NEIGHBORHOOD</span><h2>Recent reports <span className="small-count">{reports.length}</span></h2></div><button className="link-button" onClick={() => setPage('complaints')}>View all <ArrowRight size={15}/></button></div><div className="reports-list">{reports.slice(0,4).map(r => <ReportRow key={r.id} report={r} onClick={onOpen}/>)}</div><button className="list-footer" onClick={() => setPage('complaints')}>See all community reports <ArrowRight size={15}/></button></section>
      <section className="panel map-panel"><div className="panel-heading"><div><span className="eyebrow">ISSUES AROUND YOU</span><h2>Community map</h2></div><button className="icon-button small-icon" onClick={() => setPage('map')} aria-label="Open city map"><ArrowRight size={16}/></button></div><MapArtwork reports={reports.slice(0,4)} onSelect={onOpen}/><div className="map-legend"><span><i className="legend-open"/>Open <b>{active + 82}</b></span><span><i className="legend-resolved"/>Resolved <b>{resolved + 42}</b></span><button onClick={() => setPage('map')}>Explore map <ArrowRight size={14}/></button></div></section></div>
    <div className="bottom-grid"><section className="insight-banner"><div className="insight-icon"><Sparkles size={20}/></div><div><span className="eyebrow">A QUICK INSIGHT</span><p>Road concerns are up <b>18% around Civil Lines</b> this week. The city team has been notified.</p></div><button className="text-button" onClick={() => setPage('map')}>See area <ArrowRight size={14}/></button><span className="insight-orb"/></section><section className="impact-card"><div className="impact-icon"><Target size={18}/></div><span><b>Your neighborhood impact</b><small>You’ve helped close <strong>3 local issues</strong> this month.</small></span><div className="impact-ring"><span>75%</span></div></section></div>
  </>;
}

function Complaints({ reports, onOpen, onReport, isAdmin = false }) {
  const [filter, setFilter] = useState('All reports');
  const [query, setQuery] = useState('');
  const filtered = reports.filter(r => (filter === 'All reports' || r.status === filter) && `${r.title} ${r.place} ${r.id} ${r.category}`.toLowerCase().includes(query.toLowerCase()));
  return <><div className="page-heading"><div><span className="eyebrow">{isAdmin ? 'CITY OPERATIONS' : 'YOUR ACTIVITY'}</span><h1>{isAdmin ? 'Admin dashboard' : 'My complaints'}</h1><p>{isAdmin ? 'Review incoming reports and coordinate a clear path to resolution.' : 'Follow the progress of the issues you’ve reported to the city.'}</p></div>{isAdmin && <div className="admin-quick"><span><i/> Service status: <b>All systems normal</b></span></div>}</div>
    {isAdmin && <div className="admin-stats"><div><span>Needs review</span><b>12</b><small>4 new today</small></div><div><span>In progress</span><b>38</b><small>Across 6 departments</small></div><div><span>Resolved this month</span><b>86</b><small className="green-text">↑ 8.4% from October</small></div><div><span>Avg. response time</span><b>1.8 <em>days</em></b><small className="green-text">↓ 12% from October</small></div></div>}
    <section className="panel table-panel"><div className="table-toolbar"><div className="filter-tabs">{['All reports','Submitted','In progress','Resolved'].map(x=><button key={x} className={filter===x?'selected':''} onClick={()=>setFilter(x)}>{x}{x==='All reports'&&<span>{reports.length}</span>}</button>)}</div><div className="table-actions"><label className="table-search"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search reports"/></label><button className="button button-outline filter-button"><Filter size={15}/>Filter</button>{!isAdmin&&<button className="button button-primary compact-button" onClick={onReport}><Plus size={16}/>New report</button>}</div></div>
      <div className="table-head"><span>ISSUE</span><span>REPORTED BY</span><span>DATE</span><span>PRIORITY</span><span>STATUS</span><span/></div>
      <div className="table-body">{filtered.length ? filtered.map(r=><button className="table-row" key={r.id} onClick={()=>onOpen(r)}><span className="table-issue"><span className="report-type-icon" data-category={r.category}>{r.category === 'Roads'?'⌁':r.category==='Sanitation'?'◌':r.category==='Water'?'≈':'☼'}</span><span><b>{r.title}</b><small>{r.id} · {r.place}</small></span></span><span className="table-owner"><Avatar initials={r.initials} color={r.color} size="small"/>{r.owner}</span><span className="table-date">{r.date}</span><Priority value={r.priority}/><StatusBadge status={r.status}/><ChevronRight size={16} className="row-chevron"/></button>) : <div className="empty-state"><Search size={22}/><b>No reports found</b><span>Try a different search or filter.</span></div>}</div>
      <div className="table-foot"><span>Showing <b>{filtered.length}</b> of <b>{reports.length}</b> reports</span><div><button disabled><ChevronLeft size={16}/></button><span>1</span><button disabled><ChevronRight size={16}/></button></div></div>
    </section>
  </>;
}

function CityMap({ reports, onOpen }) {
  const [selected, setSelected] = useState(null);
  const [mapFilter, setMapFilter] = useState('All issues');
  const visible = reports.filter(r => mapFilter === 'All issues' || r.category === mapFilter);
  return <><div className="page-heading"><div><span className="eyebrow">MATHURA · UTTAR PRADESH</span><h1>City map</h1><p>See what neighbors have reported across the community.</p></div><button className="button button-primary" onClick={()=>onOpen(reports[0])}><MapPin size={16}/>View a report</button></div><div className="map-page-layout"><section className="panel full-map-panel"><div className="map-toolbar"><div><b>Community issues</b><small><span className="live-dot"/> Updated just now</small></div><select value={mapFilter} onChange={e=>setMapFilter(e.target.value)}>{['All issues','Roads','Sanitation','Water','Streetlights'].map(x=><option key={x}>{x}</option>)}</select></div><MapArtwork reports={visible} selectedId={selected?.id} onSelect={setSelected} large/><div className="full-map-footer"><span><i className="legend-open"/>Open issue</span><span><i className="legend-resolved"/>Resolved</span><span><MapPin size={15}/> Mathura, India</span></div></section><aside className="panel map-issue-list"><div className="panel-heading"><div><span className="eyebrow">NEARBY</span><h2>{visible.length} reports</h2></div><button className="icon-button small-icon"><MoreHorizontal size={17}/></button></div>{visible.slice(0,4).map(r=><button key={r.id} className={`map-issue ${selected?.id===r.id?'map-issue-active':''}`} onClick={()=>setSelected(r)}><span className="map-issue-pin"><MapPin size={16}/></span><span><b>{r.title}</b><small>{r.place}</small><StatusBadge status={r.status}/></span></button>)}{selected&&<button className="button button-soft map-selected-button" onClick={()=>onOpen(selected)}>View selected report <ArrowRight size={15}/></button>}</aside></div></>;
}

function App() {
  const [page, setPage] = useState('overview');
  const [role, setRole] = useState('citizen');
  const [reports, setReports] = useState(() => { try { const saved = localStorage.getItem('civicpulse-reports'); return saved ? JSON.parse(saved) : seedReports; } catch { return seedReports; } });
  const [reportOpen, setReportOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [globalSearch, setGlobalSearch] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  useEffect(() => { localStorage.setItem('civicpulse-reports', JSON.stringify(reports)); }, [reports]);
  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(''), 3600); return () => clearTimeout(t); } }, [toast]);
  useEffect(() => { if (role === 'admin' && page === 'overview') setPage('admin'); if (role === 'citizen' && page === 'admin') setPage('overview'); }, [role]);
  const currentNav = navItems.find(n => n.id === page)?.label || 'Overview';
  const openReport = (r) => setSelected(r);
  const createReport = (data) => {
    const newReport = { ...data, id: `CP-${Math.floor(24082 + Math.random() * 700)}`, date: 'Just now', owner: 'Aarav Sharma', initials: 'AS', color: '#e4a545', x: 52 + Math.random()*18, y: 38 + Math.random()*24, department: data.category === 'Roads' ? 'Roads & Transport' : data.category === 'Water' ? 'Water Works' : data.category === 'Streetlights' ? 'Electrical' : 'Sanitation', updates: 1 };
    setReports(old => [newReport, ...old]); setReportOpen(false); setPage('complaints'); setToast(`Report submitted · ${newReport.id}`);
  };
  const updateStatus = (id, status) => { setReports(old => old.map(r => r.id === id ? { ...r, status, updates: (r.updates || 1) + 1 } : r)); setSelected(old => old?.id === id ? { ...old, status } : old); setToast(`Report status updated to ${status}`); };
  const searchMatches = useMemo(() => globalSearch.trim() ? reports.filter(r => `${r.title} ${r.place} ${r.id} ${r.category}`.toLowerCase().includes(globalSearch.toLowerCase())).slice(0,4) : [], [globalSearch,reports]);
  return <div className="app-shell">
    <Sidebar page={page} setPage={setPage} role={role} setRole={setRole} open={menuOpen} close={()=>setMenuOpen(false)}/>
    <main className="main-area"><header className="topbar"><div className="topbar-left"><button className="mobile-menu" onClick={()=>setMenuOpen(true)} aria-label="Open menu"><Menu size={20}/></button><span className="crumb-muted">Workspace</span><ChevronRight size={15}/><span>{currentNav}</span></div><div className="topbar-right"><div className="global-search"><Search size={16}/><input value={globalSearch} onChange={e=>setGlobalSearch(e.target.value)} placeholder="Search anything…"/><kbd>⌘ K</kbd>{globalSearch&&<div className="search-dropdown">{searchMatches.length?searchMatches.map(r=><button key={r.id} onClick={()=>{setSelected(r);setGlobalSearch('')}}><span className="report-type-icon">⌁</span><span><b>{r.title}</b><small>{r.id} · {r.place}</small></span><ChevronRight size={15}/></button>):<span className="search-empty">No matching reports</span>}</div>}</div><div className="notification-wrap"><IconButton icon={Bell} label="Notifications" onClick={()=>setNotificationsOpen(!notificationsOpen)}/><i className="notification-dot"/>{notificationsOpen&&<div className="notification-pop"><b>You’re all caught up</b><span>We’ll let you know when a report changes.</span></div>}</div><span className="topbar-divider"/><button className="topbar-avatar" onClick={()=>setRole(role==='citizen'?'admin':'citizen')} title="Switch to the other view"><Avatar initials="AS" color="#e4a545" size="small"/><ChevronDown size={13}/></button></div></header>
      <div className="content-area" key={page}>{page==='overview'?<Overview reports={reports} onOpen={openReport} onReport={()=>setReportOpen(true)} setPage={setPage}/>:page==='complaints'?<Complaints reports={reports} onOpen={openReport} onReport={()=>setReportOpen(true)}/>:page==='admin'?<Complaints reports={reports} onOpen={openReport} isAdmin/>:<CityMap reports={reports} onOpen={openReport}/>}</div>
      <footer className="app-footer"><span>© 2026 CivicPulse AI</span><span><span className="live-dot"/> Demo workspace <span className="footer-sep">·</span> <a href="#privacy">Privacy</a> <a href="#help">Support</a></span></footer>
    </main>
    {reportOpen&&<ReportModal onClose={()=>setReportOpen(false)} onSubmit={createReport}/>}
    {selected&&<DetailModal report={reports.find(r=>r.id===selected.id)||selected} onClose={()=>setSelected(null)} onStatus={role==='admin'?updateStatus:null}/>}
    {toast&&<div className="toast"><span className="toast-check"><Check size={14}/></span>{toast}<button onClick={()=>setToast('')} aria-label="Dismiss"><X size={14}/></button></div>}
  </div>;
}

export default App;
