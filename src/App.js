import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import GlobalStyles from './styles/GlobalStyles';
import ThemeProvider from './styles/ThemeProvider';
import { ToastProvider } from './components/common/Toast';
import { ErrorBoundary } from './components/common';
import Layout from './components/layout/Layout';

// Lazy load pages for better performance
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Presentations = React.lazy(() => import('./pages/Presentations'));
const Editor = React.lazy(() => import('./pages/Editor'));

// Loading component
const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    fontSize: '18px',
    color: '#D4AF37'
  }}>
    Loading...
  </div>
);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ToastProvider>
          <ErrorBoundary>
            <Router>
              <GlobalStyles />
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
                  <Route path="/presentations" element={<Layout><Presentations /></Layout>} />
                  <Route path="/starred" element={<Layout><Presentations /></Layout>} />
                  <Route path="/links" element={<Layout><div style={{ padding: '20px' }}><h1>Links Overview</h1><p>Manage your presentation links and sharing settings.</p></div></Layout>} />
                  <Route path="/trash" element={<Layout><div style={{ padding: '20px' }}><h1>Trash</h1><p>Your deleted presentations will appear here.</p></div></Layout>} />
                  <Route path="/team" element={<Layout><div style={{ padding: '20px' }}><h1>Team Members</h1><p>Manage your team members and permissions.</p></div></Layout>} />
                  <Route path="/editor/:id" element={<Editor />} />
                </Routes>
              </Suspense>
            </Router>
          </ErrorBoundary>
        </ToastProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
