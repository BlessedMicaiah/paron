import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Presentations from './pages/Presentations';
import Editor from './pages/Editor';
import PresentationProvider from './context/PresentationContext';

function App() {
  return (
    <PresentationProvider>
      <Router>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/presentations" element={<Layout><Presentations /></Layout>} />
          <Route path="/starred" element={<Layout><Presentations /></Layout>} />
          <Route path="/trash" element={<Layout><div style={{ padding: '20px' }}><h1>Trash</h1><p>Your deleted presentations will appear here.</p></div></Layout>} />
          <Route path="/team" element={<Layout><div style={{ padding: '20px' }}><h1>Team Members</h1><p>Manage your team members and permissions.</p></div></Layout>} />
          <Route path="/editor/:id" element={<Editor />} />
        </Routes>
      </Router>
    </PresentationProvider>
  );
}

export default App;
