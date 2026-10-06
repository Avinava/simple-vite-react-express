import { useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from './theme/theme';
import { AppProvider, useAppContext } from './context/AppContext';
import ErrorBoundary from './components/ErrorBoundary';

import './app.css';
import Header from './components/Header';
import NewContact from './pages/NewContact';
import Contacts from './pages/Contacts';
import ContactDetail from './pages/ContactDetail';
import Tasks from './pages/Tasks';
import Projects from './pages/Projects';
import NotFound from './pages/NotFound';
import Home from './pages/Home';

/**
 * Reads the color mode from context and applies it to MUI and the toasts.
 */
const ThemedApp = () => {
  const { isDarkMode } = useAppContext();
  const theme = useMemo(() => getTheme(isDarkMode ? 'dark' : 'light'), [isDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer position="bottom-right" theme={isDarkMode ? 'dark' : 'light'} />
      <BrowserRouter>
        <Header />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/new-contact" element={<NewContact />} />
            <Route path="/contact/:id" element={<ContactDetail />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </ThemeProvider>
  );
};

const root = document.getElementById('root');
if (root !== null) {
  createRoot(root).render(
    <AppProvider>
      <ThemedApp />
    </AppProvider>
  );
}
