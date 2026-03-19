'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Styles
const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    minHeight: '100vh',
    background: '#fff',
    position: 'relative',
    paddingBottom: '80px',
  },
  header: {
    padding: '20px',
    borderBottom: '1px solid #E2E8F0',
  },
  title: {
    fontSize: '20px',
    fontWeight: 500,
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: '13px',
    color: '#64748b',
    marginTop: '4px',
  },
  content: {
    padding: '16px',
    minHeight: 'calc(100vh - 180px)',
  },
  nav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: '#fff',
    borderTop: '1px solid #E2E8F0',
    padding: '12px 16px 24px',
    zIndex: 100,
  },
  navInner: {
    maxWidth: '500px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-around',
  },
  navBtn: {
    background: 'none',
    border: 'none',
    padding: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
  navIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
  },
  navLabel: {
    fontSize: '10px',
  },
  card: {
    background: '#fff',
    border: '1px solid #E2E8F0',
    borderRadius: '16px',
    padding: '14px',
    marginBottom: '10px',
  },
  badge: {
    fontSize: '11px',
    padding: '4px 12px',
    borderRadius: '20px',
    fontWeight: 500,
    display: 'inline-block',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    background: '#F8FAFC',
    border: '1px solid #E2E8F0',
    borderRadius: '24px',
    fontSize: '14px',
  },
  select: {
    width: '100%',
    padding: '12px 16px',
    background: '#F8FAFC',
    border: '1px solid #E2E8F0',
    borderRadius: '24px',
    fontSize: '14px',
    marginBottom: '16px',
  },
  button: {
    width: '100%',
    padding: '14px',
    background: '#1a1a1a',
    color: '#fff',
    border: 'none',
    borderRadius: '28px',
    fontSize: '14px',
    fontWeight: 500,
  },
};

// Badge colors
const badgeStyles = {
  red: { background: '#FCEBEB', color: '#791F1F' },
  yellow: { background: '#FEF3E2', color: '#B45309' },
  green: { background: '#E1F5EE', color: '#085041' },
  blue: { background: '#E8F0FE', color: '#64748b' },
  gray: { background: '#F8FAFC', color: '#64748b' },
};

// ============================================
// LOGIN PAGE
// ============================================

function LoginPage({ team, onLogin }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [showUserSelect, setShowUserSelect] = useState(true);

  function selectUser(user) {
    setSelectedUser(user);
    setShowUserSelect(false);
    setPin('');
    setError('');
  }

  function handleKeyPress(digit) {
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      setError('');
      
      // Check PIN when 4 digits entered
      if (newPin.length === 4) {
        if (newPin === selectedUser.pin) {
          onLogin(selectedUser);
        } else {
          setError('Feil PIN-kode');
          setTimeout(() => setPin(''), 500);
        }
      }
    }
  }

  function handleBackspace() {
    setPin(pin.slice(0, -1));
    setError('');
  }

  function goBack() {
    setShowUserSelect(true);
    setSelectedUser(null);
    setPin('');
    setError('');
  }

  // User selection screen
  if (showUserSelect) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#F0F4F8', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '20px',
      }}>
        <div style={{ width: '100%', maxWidth: '340px' }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ fontSize: '32px', fontWeight: 500, letterSpacing: '3px', color: '#1a1a1a' }}>BOXO</div>
            <div style={{ fontSize: '14px', color: '#64748b', marginTop: '6px' }}>Annonseadministrasjon</div>
          </div>

          {/* User list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {team.map(user => (
              <button
                key={user.id}
                onClick={() => selectUser(user)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '16px 20px',
                  background: '#fff',
                  border: '1px solid #E2E8F0',
                  borderRadius: '28px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: '#E8F0FE',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 500,
                  fontSize: '15px',
                  color: '#185FA5',
                }}>
                  {user.name.charAt(0)}
                </div>
                <span style={{ fontSize: '15px', fontWeight: 500, color: '#1a1a1a' }}>{user.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // PIN entry screen
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#F0F4F8', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{ width: '100%', maxWidth: '340px' }}>
        {/* Back button */}
        <button
          onClick={goBack}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '14px',
            color: '#64748b',
            marginBottom: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          ← Tilbake
        </button>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '32px', fontWeight: 500, letterSpacing: '3px', color: '#1a1a1a' }}>BOXO</div>
        </div>

        {/* Selected user */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '32px',
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: '#E8F0FE',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 500,
            fontSize: '18px',
            color: '#185FA5',
          }}>
            {selectedUser.name.charAt(0)}
          </div>
          <span style={{ fontSize: '18px', fontWeight: 500, color: '#1a1a1a' }}>{selectedUser.name}</span>
        </div>

        {/* PIN dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '12px' }}>
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: i < pin.length ? '#1a1a1a' : 'transparent',
                border: i < pin.length ? 'none' : '2px solid #CBD5E1',
                transition: 'all 0.15s ease',
              }}
            />
          ))}
        </div>

        {/* Error message */}
        <div style={{ 
          height: '24px', 
          textAlign: 'center', 
          marginBottom: '20px',
        }}>
          {error && (
            <span style={{ fontSize: '13px', color: '#E24B4A' }}>{error}</span>
          )}
        </div>

        {/* PIN keypad */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '14px',
          maxWidth: '260px',
          margin: '0 auto',
        }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(digit => (
            <button
              key={digit}
              onClick={() => handleKeyPress(String(digit))}
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                border: '1px solid #E2E8F0',
                background: '#fff',
                fontSize: '26px',
                fontWeight: 400,
                color: '#1a1a1a',
                cursor: 'pointer',
                margin: '0 auto',
                transition: 'all 0.1s ease',
              }}
            >
              {digit}
            </button>
          ))}
          <div style={{ width: '72px', height: '72px' }} />
          <button
            onClick={() => handleKeyPress('0')}
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              border: '1px solid #E2E8F0',
              background: '#fff',
              fontSize: '26px',
              fontWeight: 400,
              color: '#1a1a1a',
              cursor: 'pointer',
              margin: '0 auto',
            }}
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              border: 'none',
              background: 'transparent',
              fontSize: '20px',
              color: '#64748b',
              cursor: 'pointer',
              margin: '0 auto',
            }}
          >
            ⌫
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN APP
// ============================================

export default function Home() {
  const [activePage, setActivePage] = useState('tasks');
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [team, setTeam] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInitialData();
  }, []);

  async function loadInitialData() {
    setLoading(true);
    
    // Load team
    const { data: teamData } = await supabase
      .from('team_members')
      .select('*')
      .order('id');
    
    if (teamData) {
      setTeam(teamData);
      
      // Check for saved session
      const savedUserId = localStorage.getItem('boxo_user_id');
      if (savedUserId) {
        const user = teamData.find(t => t.id === parseInt(savedUserId));
        if (user) {
          setCurrentUser(user);
          setIsLoggedIn(true);
          await loadAppData();
        }
      }
    }

    setLoading(false);
  }

  async function loadAppData() {
    // Load products
    const { data: productsData } = await supabase
      .from('products')
      .select('*')
      .order('name');
    
    if (productsData) setProducts(productsData);

    // Load orders with steps
    const { data: ordersData } = await supabase
      .from('orders')
      .select(`
        *,
        product:products(*),
        steps:order_steps(*)
      `)
      .order('created_at', { ascending: false });
    
    if (ordersData) setOrders(ordersData);

    // Load ads
    const { data: adsData } = await supabase
      .from('ads')
      .select(`
        *,
        product:products(*)
      `)
      .order('created_at', { ascending: false });
    
    if (adsData) setAds(adsData);
  }

  function handleLogin(user) {
    setCurrentUser(user);
    setIsLoggedIn(true);
    localStorage.setItem('boxo_user_id', user.id.toString());
    loadAppData();
  }

  function handleLogout() {
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('boxo_user_id');
    setActivePage('tasks');
  }

  // Get tasks for current user
  function getMyTasks() {
    if (!currentUser) return [];
    
    const tasks = [];
    orders.forEach(order => {
      if (!order.steps) return;
      
      order.steps.forEach((step, index) => {
        // Find the first incomplete step
        const previousStepsComplete = order.steps
          .filter(s => s.step_index < step.step_index)
          .every(s => s.is_completed);
        
        if (!step.is_completed && previousStepsComplete && step.assigned_to === currentUser.id) {
          tasks.push({
            ...step,
            order,
            productName: order.product?.name || 'Ukjent produkt',
            orderType: order.order_type,
          });
        }
      });
    });

    // Sort by due date
    return tasks.sort((a, b) => {
      if (!a.due_date) return 1;
      if (!b.due_date) return -1;
      return new Date(a.due_date) - new Date(b.due_date);
    });
  }

  async function completeStep(stepId, primaryText = null, headline = null) {
    const updates = {
      is_completed: true,
      completed_at: new Date().toISOString(),
    };
    
    if (primaryText !== null) updates.primary_text = primaryText;
    if (headline !== null) updates.headline = headline;

    await supabase
      .from('order_steps')
      .update(updates)
      .eq('id', stepId);

    // Find the order this step belongs to and check if all steps are now complete
    const step = orders.flatMap(o => o.steps || []).find(s => s.id === stepId);
    if (step) {
      const order = orders.find(o => o.id === step.order_id);
      if (order && order.order_type !== 'task') {
        // Reload steps to check completion
        const { data: updatedSteps } = await supabase
          .from('order_steps')
          .select('*')
          .eq('order_id', order.id);
        
        const allComplete = updatedSteps?.every(s => s.is_completed);
        
        if (allComplete) {
          // Get the last step's text (copy step)
          const copyStep = updatedSteps.find(s => s.step_type === 'copy');
          
          // Create ad in library
          await supabase
            .from('ads')
            .insert({
              name: order.ad_name || order.product?.name || 'Ny annonse',
              product_id: order.product_id,
              ad_type: order.order_type,
              status: 'ready',
              primary_text: copyStep?.primary_text || primaryText,
              headline: copyStep?.headline || headline,
              completion_date: new Date().toISOString(),
            });

          // Mark order as completed
          await supabase
            .from('orders')
            .update({ is_completed: true })
            .eq('id', order.id);
        }
      }
    }

    // Reload data
    loadAppData();
  }

  async function reloadTeam() {
    const { data: teamData } = await supabase
      .from('team_members')
      .select('*')
      .order('id');
    
    if (teamData) {
      setTeam(teamData);
      // Update current user data
      if (currentUser) {
        const updatedUser = teamData.find(t => t.id === currentUser.id);
        if (updatedUser) setCurrentUser(updatedUser);
      }
    }
  }

  const pages = {
    tasks: { title: 'Mine oppgaver', subtitle: `${getMyTasks().length} venter på deg` },
    order: { title: 'Bestill annonse', subtitle: '' },
    library: { title: 'Annonsebibliotek', subtitle: `${ads.length} annonser` },
    products: { title: 'Produkter', subtitle: `${products.length} produkter` },
    settings: { title: 'Innstillinger', subtitle: '' },
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#F0F4F8', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 500, letterSpacing: '3px', color: '#1a1a1a', marginBottom: '16px' }}>BOXO</div>
          <p style={{ color: '#64748b' }}>Laster...</p>
        </div>
      </div>
    );
  }

  // Show login if not logged in
  if (!isLoggedIn) {
    return <LoginPage team={team} onLogin={handleLogin} />;
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={styles.title}>{pages[activePage].title}</h1>
            {pages[activePage].subtitle && (
              <p style={styles.subtitle}>{pages[activePage].subtitle}</p>
            )}
          </div>
          <div style={{
            width: '36px',
            height: '36px',
            background: '#E8F0FE',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 500,
            fontSize: '14px',
            color: '#185FA5',
          }}>
            {currentUser?.name?.charAt(0)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {activePage === 'tasks' && (
          <TasksPage 
            tasks={getMyTasks()} 
            team={team}
            onComplete={completeStep}
          />
        )}
        {activePage === 'order' && (
          <OrderPage 
            products={products} 
            team={team}
            currentUser={currentUser}
            onOrderCreated={loadAppData}
          />
        )}
        {activePage === 'library' && (
          <LibraryPage ads={ads} onUpdate={loadAppData} />
        )}
        {activePage === 'products' && (
          <ProductsPage 
            products={products} 
            ads={ads}
            onUpdate={loadAppData}
          />
        )}
        {activePage === 'settings' && (
          <SettingsPage 
            team={team}
            currentUser={currentUser}
            products={products}
            onUpdate={loadAppData}
            onLogout={handleLogout}
            onTeamUpdate={reloadTeam}
          />
        )}
      </div>

      {/* Navigation */}
      <div style={styles.nav}>
        <div style={styles.navInner}>
          {[
            { id: 'tasks', label: 'Oppgaver', icon: '✓' },
            { id: 'order', label: 'Bestill', icon: '+' },
            { id: 'library', label: 'Bibliotek', icon: '◎' },
            { id: 'products', label: 'Produkter', icon: '▤' },
            { id: 'settings', label: 'Settings', icon: '⚙' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              style={{
                ...styles.navBtn,
                opacity: activePage === item.id ? 1 : 0.5,
              }}
            >
              <div style={{
                ...styles.navIcon,
                background: activePage === item.id ? '#E8F0FE' : 'transparent',
                border: activePage === item.id ? 'none' : '1.5px solid #CBD5E1',
              }}>
                {item.icon}
              </div>
              <span style={{
                ...styles.navLabel,
                color: activePage === item.id ? '#1a1a1a' : '#64748b',
                fontWeight: activePage === item.id ? 500 : 400,
              }}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================
// TASKS PAGE
// ============================================

function TasksPage({ tasks, team, onComplete }) {
  const [expandedTask, setExpandedTask] = useState(null);
  const [primaryText, setPrimaryText] = useState('');
  const [headline, setHeadline] = useState('');

  function getStatus(dueDate) {
    if (!dueDate) return { label: 'Ingen frist', style: badgeStyles.gray };
    
    const now = new Date();
    const due = new Date(dueDate);
    const daysLeft = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 0) return { label: 'Over frist', style: badgeStyles.red };
    if (daysLeft <= 1) return { label: 'Haster', style: badgeStyles.red };
    if (daysLeft <= 3) return { label: 'Venter', style: badgeStyles.yellow };
    return { label: 'God tid', style: badgeStyles.green };
  }

  function formatDate(dueDate) {
    if (!dueDate) return '';
    const now = new Date();
    const due = new Date(dueDate);
    const daysLeft = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 0) return `${Math.abs(daysLeft)} dager siden`;
    if (daysLeft === 0) return 'I dag';
    if (daysLeft === 1) return 'I morgen';
    return `Om ${daysLeft} dager`;
  }

  function handleComplete(task) {
    if (task.step_type === 'copy') {
      onComplete(task.id, primaryText, headline);
    } else {
      onComplete(task.id);
    }
    setExpandedTask(null);
    setPrimaryText('');
    setHeadline('');
  }

  if (tasks.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
        <p>Ingen oppgaver</p>
        <p style={{ fontSize: '13px', marginTop: '8px' }}>Du har ingen ventende oppgaver</p>
      </div>
    );
  }

  return (
    <div>
      {tasks.map(task => {
        const status = getStatus(task.due_date);
        const isExpanded = expandedTask === task.id;
        const borderColor = status.style === badgeStyles.red ? '#E24B4A' :
                           status.style === badgeStyles.yellow ? '#EF9F27' :
                           status.style === badgeStyles.green ? '#5DCAA5' : '#E2E8F0';

        return (
          <div
            key={task.id}
            style={{
              ...styles.card,
              borderLeft: `3px solid ${borderColor}`,
              cursor: 'pointer',
            }}
            onClick={() => setExpandedTask(isExpanded ? null : task.id)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <span style={{ ...styles.badge, ...status.style }}>{status.label}</span>
              <span style={{ fontSize: '11px', color: '#64748b' }}>{formatDate(task.due_date)}</span>
            </div>
            <p style={{ fontSize: '14px', fontWeight: 500, margin: '8px 0 4px' }}>{task.step_name}</p>
            <p style={{ fontSize: '12px', color: '#64748b' }}>{task.productName}</p>
            <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
              <span style={{ ...styles.badge, ...badgeStyles.blue }}>
                {task.orderType === 'video' ? 'Video' : task.orderType === 'image' ? 'Bilde' : 'Oppgave'}
              </span>
            </div>

            {isExpanded && (
              <div style={{ marginTop: '16px', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}
                   onClick={e => e.stopPropagation()}>
                {task.step_type === 'copy' && (
                  <>
                    <label style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, display: 'block', marginBottom: '8px' }}>
                      Primary Text
                    </label>
                    <textarea
                      value={primaryText}
                      onChange={e => setPrimaryText(e.target.value)}
                      placeholder="Skriv annonsetekst..."
                      style={{ ...styles.input, minHeight: '80px', marginBottom: '16px', resize: 'vertical', borderRadius: '16px' }}
                    />
                    
                    <label style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, display: 'block', marginBottom: '8px' }}>
                      Headline
                    </label>
                    <input
                      type="text"
                      value={headline}
                      onChange={e => setHeadline(e.target.value)}
                      placeholder="Skriv overskrift..."
                      style={{ ...styles.input, marginBottom: '16px' }}
                    />
                  </>
                )}
                
                <button
                  onClick={() => handleComplete(task)}
                  style={styles.button}
                >
                  Marker som ferdig
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ============================================
// ORDER PAGE
// ============================================

function OrderPage({ products, team, currentUser, onOrderCreated }) {
  const [orderType, setOrderType] = useState('video');
  const [productId, setProductId] = useState('');
  const [adName, setAdName] = useState('');
  const [comment, setComment] = useState('');
  const [description, setDescription] = useState('');
  const [steps, setSteps] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // Get available people for each step type
  function getPeopleForStep(stepType) {
    switch (stepType) {
      case 'filming': return team.filter(t => t.can_film);
      case 'editing': return team.filter(t => t.can_edit);
      case 'image': return team.filter(t => t.can_create_image);
      case 'copy': return team.filter(t => t.can_write_copy);
      case 'task': return team;
      default: return team;
    }
  }

  // Update steps when order type changes
  useEffect(() => {
    if (orderType === 'video') {
      setSteps([
        { type: 'filming', name: 'Filming', assignedTo: '', dueDate: '' },
        { type: 'editing', name: 'Klipping', assignedTo: '', dueDate: '' },
        { type: 'copy', name: 'Tekst', assignedTo: '', dueDate: '' },
      ]);
    } else if (orderType === 'image') {
      setSteps([
        { type: 'image', name: 'Lag bilde', assignedTo: '', dueDate: '' },
        { type: 'copy', name: 'Tekst', assignedTo: '', dueDate: '' },
      ]);
    } else {
      setSteps([
        { type: 'task', name: 'Oppgave', assignedTo: '', dueDate: '' },
      ]);
    }
  }, [orderType]);

  function updateStep(index, field, value) {
    const newSteps = [...steps];
    newSteps[index][field] = value;
    setSteps(newSteps);
  }

  async function submitOrder() {
    if (!productId && orderType !== 'task') {
      alert('Velg et produkt');
      return;
    }

    setSubmitting(true);

    // Check if all steps are completed - if so, create ad directly
    const allStepsCompleted = steps.every(step => step.assignedTo === 'completed');
    
    if (allStepsCompleted && orderType !== 'task') {
      // Create ad directly in library
      const product = products.find(p => p.id === parseInt(productId));
      await supabase
        .from('ads')
        .insert({
          name: adName || product?.name || 'Ny annonse',
          product_id: parseInt(productId),
          ad_type: orderType,
          status: 'ready',
          completion_date: new Date().toISOString(),
        });
      
      setProductId('');
      setAdName('');
      setComment('');
      setDescription('');
      setOrderType('video');
      setSubmitting(false);
      onOrderCreated();
      alert('Annonse lagt til i biblioteket!');
      return;
    }

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        product_id: productId ? parseInt(productId) : null,
        order_type: orderType,
        description: comment || description || null,
        ad_name: adName || null,
        created_by: currentUser?.id,
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      setSubmitting(false);
      return;
    }

    // Create steps
    const stepsToInsert = steps.map((step, index) => ({
      order_id: order.id,
      step_index: index,
      step_type: step.type,
      step_name: step.name,
      assigned_to: step.assignedTo && step.assignedTo !== 'completed' ? parseInt(step.assignedTo) : null,
      due_date: step.assignedTo === 'completed' ? null : (step.dueDate || null),
      is_completed: step.assignedTo === 'completed',
      completed_at: step.assignedTo === 'completed' ? new Date().toISOString() : null,
    }));

    await supabase.from('order_steps').insert(stepsToInsert);

    // Reset form
    setProductId('');
    setAdName('');
    setComment('');
    setDescription('');
    setOrderType('video');
    setSubmitting(false);
    
    onOrderCreated();
    alert('Bestilling opprettet!');
  }

  return (
    <div>
      {/* Order type selector */}
      <label style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, display: 'block', marginBottom: '8px' }}>
        Type
      </label>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {[
          { id: 'video', label: 'Video' },
          { id: 'image', label: 'Bilde' },
          { id: 'task', label: 'Oppgave' },
        ].map(type => (
          <button
            key={type.id}
            onClick={() => setOrderType(type.id)}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '24px',
              fontSize: '13px',
              border: orderType === type.id ? '2px solid #1a1a1a' : '1px solid #E2E8F0',
              background: orderType === type.id ? '#E8F0FE' : '#F8FAFC',
              color: orderType === type.id ? '#1a1a1a' : '#64748b',
              fontWeight: orderType === type.id ? 500 : 400,
              cursor: 'pointer',
            }}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Product selector (not for tasks) */}
      {orderType !== 'task' && (
        <>
          <label style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, display: 'block', marginBottom: '8px' }}>
            Produkt
          </label>
          <select
            value={productId}
            onChange={e => setProductId(e.target.value)}
            style={styles.select}
          >
            <option value="">Velg produkt...</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          <label style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, display: 'block', marginBottom: '8px' }}>
            Annonsenavn (valgfritt)
          </label>
          <input
            type="text"
            value={adName}
            onChange={e => setAdName(e.target.value)}
            placeholder="Gi annonsen et navn..."
            style={{ ...styles.input, marginBottom: '16px' }}
          />

          <label style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, display: 'block', marginBottom: '8px' }}>
            Kommentar (valgfritt)
          </label>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Legg til kommentar til bestillingen..."
            style={{ ...styles.input, minHeight: '60px', marginBottom: '16px', resize: 'vertical', borderRadius: '16px' }}
          />
        </>
      )}

      {/* Description for tasks */}
      {orderType === 'task' && (
        <>
          <label style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, display: 'block', marginBottom: '8px' }}>
            Beskrivelse
          </label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Beskriv oppgaven..."
            style={{ ...styles.input, minHeight: '80px', marginBottom: '16px', resize: 'vertical', borderRadius: '16px' }}
          />
        </>
      )}

      {/* Steps */}
      <label style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, display: 'block', marginBottom: '8px' }}>
        Steg
      </label>
      {steps.map((step, index) => (
        <div
          key={index}
          style={{
            ...styles.card,
            borderLeft: step.assignedTo === 'completed' ? '3px solid #5DCAA5' : '3px solid #E8F0FE',
            marginBottom: '8px',
            opacity: step.assignedTo === 'completed' ? 0.7 : 1,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{
              width: '24px',
              height: '24px',
              border: step.assignedTo === 'completed' ? 'none' : '2px solid #1a1a1a',
              background: step.assignedTo === 'completed' ? '#5DCAA5' : 'transparent',
              color: step.assignedTo === 'completed' ? '#fff' : '#1a1a1a',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 500,
            }}>
              {step.assignedTo === 'completed' ? '✓' : index + 1}
            </div>
            <span style={{
              fontSize: '12px',
              background: step.assignedTo === 'completed' ? '#E1F5EE' : '#E8F0FE',
              color: step.assignedTo === 'completed' ? '#085041' : '#1a1a1a',
              padding: '4px 12px',
              borderRadius: '20px',
              fontWeight: 500,
            }}>
              {step.name}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <select
              value={step.assignedTo}
              onChange={e => updateStep(index, 'assignedTo', e.target.value)}
              style={{ ...styles.select, flex: 1, marginBottom: 0 }}
            >
              <option value="">Hvem?</option>
              <option value="completed">✓ Fullført</option>
              {getPeopleForStep(step.type).map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <input
              type="date"
              value={step.dueDate}
              onChange={e => updateStep(index, 'dueDate', e.target.value)}
              style={{ ...styles.input, width: '140px' }}
              disabled={step.assignedTo === 'completed'}
            />
          </div>
        </div>
      ))}

      <button
        onClick={submitOrder}
        disabled={submitting}
        style={{
          ...styles.button,
          marginTop: '16px',
          opacity: submitting ? 0.5 : 1,
          cursor: submitting ? 'not-allowed' : 'pointer',
        }}
      >
        {submitting ? 'Oppretter...' : 'Bestill'}
      </button>
    </div>
  );
}

// ============================================
// LIBRARY PAGE
// ============================================

function LibraryPage({ ads, onUpdate }) {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    status: [],
    performance: [],
  });

  function toggleFilter(type, value) {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value],
    }));
  }

  function clearFilters() {
    setFilters({ status: [], performance: [] });
  }

  const filteredAds = ads.filter(ad => {
    // Search filter
    if (search && !ad.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    // Status filter
    if (filters.status.length > 0 && !filters.status.includes(ad.status)) {
      return false;
    }
    // Performance filter
    if (filters.performance.length > 0 && !filters.performance.includes(ad.performance)) {
      return false;
    }
    return true;
  });

  const hasFilters = filters.status.length > 0 || filters.performance.length > 0;

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  const statusLabels = { ready: 'Klar', online: 'Online', offline: 'Offline' };
  const statusStyles = { ready: badgeStyles.blue, online: badgeStyles.green, offline: badgeStyles.gray };
  const perfLabels = { good: 'Bra', neutral: 'Nøytral', bad: 'Dårlig' };
  const perfStyles = { good: badgeStyles.green, neutral: badgeStyles.gray, bad: badgeStyles.red };

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Søk annonser..."
        style={{ ...styles.input, marginBottom: '12px' }}
      />

      {/* Filter tags - all on one line */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        {['online', 'ready', 'offline'].map(status => (
          <button
            key={status}
            onClick={() => toggleFilter('status', status)}
            style={{
              padding: '6px 14px',
              background: filters.status.includes(status) ? '#E8F0FE' : '#fff',
              border: filters.status.includes(status) ? '2px solid #1a1a1a' : '1px solid #E2E8F0',
              borderRadius: '20px',
              fontSize: '12px',
              color: filters.status.includes(status) ? '#1a1a1a' : '#64748b',
              fontWeight: filters.status.includes(status) ? 500 : 400,
              cursor: 'pointer',
            }}
          >
            {statusLabels[status]}
          </button>
        ))}
        {['good', 'neutral', 'bad'].map(perf => (
          <button
            key={perf}
            onClick={() => toggleFilter('performance', perf)}
            style={{
              padding: '6px 14px',
              background: filters.performance.includes(perf) ? '#E8F0FE' : '#fff',
              border: filters.performance.includes(perf) ? '2px solid #1a1a1a' : '1px solid #E2E8F0',
              borderRadius: '20px',
              fontSize: '12px',
              color: filters.performance.includes(perf) ? '#1a1a1a' : '#64748b',
              fontWeight: filters.performance.includes(perf) ? 500 : 400,
              cursor: 'pointer',
            }}
          >
            {perfLabels[perf]}
          </button>
        ))}
        {hasFilters && (
          <button
            onClick={clearFilters}
            style={{
              padding: '6px 14px',
              background: 'transparent',
              border: 'none',
              fontSize: '12px',
              color: '#64748b',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            Nullstill
          </button>
        )}
      </div>

      {/* Ads list */}
      {filteredAds.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
          <p>Ingen annonser funnet</p>
        </div>
      ) : (
        filteredAds.map(ad => (
          <div key={ad.id} style={styles.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <p style={{ fontSize: '14px', fontWeight: 500 }}>{ad.name}</p>
              <span style={{ ...styles.badge, ...statusStyles[ad.status] }}>
                {statusLabels[ad.status]}
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
              {ad.product?.name || 'Ukjent produkt'}
            </p>
            <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
              <span style={{ ...styles.badge, ...badgeStyles.blue }}>
                {ad.ad_type === 'video' ? 'Video' : 'Bilde'}
              </span>
              {ad.performance && (
                <span style={{ ...styles.badge, ...perfStyles[ad.performance] }}>
                  {perfLabels[ad.performance]}
                </span>
              )}
            </div>

            {/* Copy buttons for text */}
            {(ad.primary_text || ad.headline) && (
              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #E2E8F0' }}>
                {ad.primary_text && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Primary Text</span>
                    <button
                      onClick={() => copyToClipboard(ad.primary_text)}
                      style={{
                        padding: '4px 12px',
                        background: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        borderRadius: '16px',
                        fontSize: '11px',
                        color: '#64748b',
                        cursor: 'pointer',
                      }}
                    >
                      Kopier
                    </button>
                  </div>
                )}
                {ad.headline && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Headline</span>
                    <button
                      onClick={() => copyToClipboard(ad.headline)}
                      style={{
                        padding: '4px 12px',
                        background: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        borderRadius: '16px',
                        fontSize: '11px',
                        color: '#64748b',
                        cursor: 'pointer',
                      }}
                    >
                      Kopier
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

// ============================================
// PRODUCTS PAGE
// ============================================

function ProductsPage({ products, ads, onUpdate }) {
  const [search, setSearch] = useState('');

  function getAdCount(productId) {
    return ads.filter(a => a.product_id === productId).length;
  }

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Søk produkter..."
        style={{ ...styles.input, marginBottom: '16px' }}
      />

      {filteredProducts.map(product => (
        <div
          key={product.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px',
            background: '#fff',
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
            marginBottom: '10px',
          }}
        >
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                objectFit: 'cover',
              }}
            />
          ) : (
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              background: '#E8F0FE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b',
              fontSize: '20px',
            }}>
              📦
            </div>
          )}
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '14px', fontWeight: 500 }}>{product.name}</p>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
              {getAdCount(product.id)} annonser
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================
// SETTINGS PAGE
// ============================================

function SettingsPage({ team, currentUser, products, onUpdate, onLogout, onTeamUpdate }) {
  const [activeTab, setActiveTab] = useState('team');
  const [newProductName, setNewProductName] = useState('');
  const [editingPin, setEditingPin] = useState(null);
  const [newPin, setNewPin] = useState('');
  const [newUserName, setNewUserName] = useState('');

  const isAdmin = currentUser?.is_admin;

  async function togglePermission(memberId, permission) {
    const member = team.find(t => t.id === memberId);
    if (!member) return;

    await supabase
      .from('team_members')
      .update({ [permission]: !member[permission] })
      .eq('id', memberId);

    onTeamUpdate();
  }

  async function updatePin(memberId) {
    if (newPin.length !== 4 || !/^\d{4}$/.test(newPin)) {
      alert('PIN må være 4 siffer');
      return;
    }

    await supabase
      .from('team_members')
      .update({ pin: newPin })
      .eq('id', memberId);

    setEditingPin(null);
    setNewPin('');
    onTeamUpdate();
  }

  async function addUser() {
    if (!newUserName.trim()) return;

    await supabase
      .from('team_members')
      .insert({ 
        name: newUserName.trim(),
        pin: '0000',
        is_admin: false,
      });

    setNewUserName('');
    onTeamUpdate();
  }

  async function addProduct() {
    if (!newProductName.trim()) return;

    await supabase
      .from('products')
      .insert({ name: newProductName.trim() });

    setNewProductName('');
    onUpdate();
  }

  async function deleteProduct(productId) {
    if (!confirm('Er du sikker på at du vil slette dette produktet?')) return;

    await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    onUpdate();
  }

  async function deleteUser(userId) {
    if (!confirm('Er du sikker på at du vil slette denne brukeren?')) return;

    await supabase
      .from('team_members')
      .delete()
      .eq('id', userId);

    onTeamUpdate();
  }

  const permissions = [
    { key: 'can_film', label: 'Filming' },
    { key: 'can_edit', label: 'Klipping' },
    { key: 'can_create_image', label: 'Lag bilde' },
    { key: 'can_write_copy', label: 'Tekst' },
  ];

  // Tabs available - admin gets extra "Brukere" tab
  const tabs = isAdmin
    ? [
        { id: 'team', label: 'Team' },
        { id: 'users', label: 'Brukere' },
        { id: 'permissions', label: 'Tillatelser' },
        { id: 'products', label: 'Produkter' },
      ]
    : [
        { id: 'team', label: 'Team' },
        { id: 'permissions', label: 'Tillatelser' },
        { id: 'products', label: 'Produkter' },
      ];

  return (
    <div>
      {/* Logged in as */}
      <div style={{
        background: '#E8F0FE',
        borderRadius: '16px',
        padding: '14px',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: '#fff',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 500,
            color: '#185FA5',
          }}>
            {currentUser?.name?.charAt(0)}
          </div>
          <div>
            <p style={{ fontSize: '14px', fontWeight: 500 }}>{currentUser?.name}</p>
            <p style={{ fontSize: '12px', color: '#64748b' }}>Innlogget</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          style={{
            padding: '8px 16px',
            background: '#fff',
            border: '1px solid #E2E8F0',
            borderRadius: '20px',
            fontSize: '12px',
            color: '#64748b',
            cursor: 'pointer',
          }}
        >
          Logg ut
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              minWidth: '70px',
              padding: '12px 8px',
              borderRadius: '24px',
              fontSize: '12px',
              border: activeTab === tab.id ? '2px solid #1a1a1a' : '1px solid #E2E8F0',
              background: activeTab === tab.id ? '#E8F0FE' : '#F8FAFC',
              color: activeTab === tab.id ? '#1a1a1a' : '#64748b',
              fontWeight: activeTab === tab.id ? 500 : 400,
              cursor: 'pointer',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Team tab */}
      {activeTab === 'team' && (
        <div>
          {team.map(member => (
            <div
              key={member.id}
              style={{
                ...styles.card,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                background: '#E8F0FE',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 500,
              }}>
                {member.name.charAt(0)}
              </div>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 500 }}>{member.name}</p>
                <p style={{ fontSize: '12px', color: '#64748b' }}>{member.role || 'Teammedlem'}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Users tab (admin only) - view/edit PINs */}
      {activeTab === 'users' && isAdmin && (
        <div>
          {/* Add new user */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <input
              type="text"
              value={newUserName}
              onChange={e => setNewUserName(e.target.value)}
              placeholder="Nytt navn..."
              style={{ ...styles.input, flex: 1 }}
            />
            <button
              onClick={addUser}
              style={{
                padding: '12px 20px',
                background: '#1a1a1a',
                color: '#fff',
                border: 'none',
                borderRadius: '24px',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Legg til
            </button>
          </div>

          {team.map(member => (
            <div
              key={member.id}
              style={{
                ...styles.card,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: member.is_admin ? '#E1F5EE' : '#E8F0FE',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 500,
                  color: member.is_admin ? '#085041' : '#185FA5',
                }}>
                  {member.name.charAt(0)}
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 500 }}>
                    {member.name}
                    {member.is_admin && (
                      <span style={{ 
                        fontSize: '10px', 
                        background: '#E1F5EE', 
                        color: '#085041',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        marginLeft: '8px',
                      }}>
                        Admin
                      </span>
                    )}
                  </p>
                  {editingPin === member.id ? (
                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                      <input
                        type="text"
                        value={newPin}
                        onChange={e => setNewPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        placeholder="4 siffer"
                        maxLength={4}
                        style={{ 
                          padding: '6px 12px',
                          border: '1px solid #E2E8F0',
                          borderRadius: '12px',
                          fontSize: '14px',
                          width: '80px',
                          textAlign: 'center',
                          letterSpacing: '4px',
                        }}
                      />
                      <button
                        onClick={() => updatePin(member.id)}
                        style={{
                          padding: '6px 12px',
                          background: '#1a1a1a',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '12px',
                          fontSize: '12px',
                          cursor: 'pointer',
                        }}
                      >
                        Lagre
                      </button>
                      <button
                        onClick={() => { setEditingPin(null); setNewPin(''); }}
                        style={{
                          padding: '6px 12px',
                          background: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          borderRadius: '12px',
                          fontSize: '12px',
                          cursor: 'pointer',
                        }}
                      >
                        Avbryt
                      </button>
                    </div>
                  ) : (
                    <p style={{ fontSize: '12px', color: '#64748b' }}>
                      PIN: {member.pin}
                    </p>
                  )}
                </div>
              </div>
              {editingPin !== member.id && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => { setEditingPin(member.id); setNewPin(member.pin); }}
                    style={{
                      padding: '6px 14px',
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: '16px',
                      fontSize: '12px',
                      color: '#64748b',
                      cursor: 'pointer',
                    }}
                  >
                    Endre PIN
                  </button>
                  {!member.is_admin && (
                    <button
                      onClick={() => deleteUser(member.id)}
                      style={{
                        padding: '6px 14px',
                        background: '#FCEBEB',
                        border: '1px solid #E2E8F0',
                        borderRadius: '16px',
                        fontSize: '12px',
                        color: '#791F1F',
                        cursor: 'pointer',
                      }}
                    >
                      Slett
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Permissions tab */}
      {activeTab === 'permissions' && (
        <div>
          {permissions.map(perm => (
            <div key={perm.key} style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: 500, display: 'block', marginBottom: '8px' }}>
                {perm.label}
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {team.map(member => (
                  <button
                    key={member.id}
                    onClick={() => togglePermission(member.id, perm.key)}
                    style={{
                      padding: '6px 14px',
                      background: member[perm.key] ? '#E1F5EE' : '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: '20px',
                      fontSize: '12px',
                      color: member[perm.key] ? '#085041' : '#64748b',
                      cursor: 'pointer',
                    }}
                  >
                    {member.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Products tab */}
      {activeTab === 'products' && (
        <div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <input
              type="text"
              value={newProductName}
              onChange={e => setNewProductName(e.target.value)}
              placeholder="Nytt produkt..."
              style={{ ...styles.input, flex: 1 }}
            />
            <button
              onClick={addProduct}
              style={{
                padding: '12px 20px',
                background: '#1a1a1a',
                color: '#fff',
                border: 'none',
                borderRadius: '24px',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Legg til
            </button>
          </div>

          {products.slice(0, 20).map(product => (
            <div
              key={product.id}
              style={{
                ...styles.card,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: '14px' }}>{product.name}</span>
              <button
                onClick={() => deleteProduct(product.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '16px',
                  padding: '4px',
                  opacity: 0.5,
                  cursor: 'pointer',
                }}
              >
                🗑
              </button>
            </div>
          ))}
          {products.length > 20 && (
            <p style={{ textAlign: 'center', color: '#64748b', fontSize: '13px', marginTop: '12px' }}>
              ...og {products.length - 20} flere produkter
            </p>
          )}
        </div>
      )}
    </div>
  );
}
