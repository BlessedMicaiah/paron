import React, { createContext, useContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes, css } from 'styled-components';
import { 
  CheckCircle, 
  Error, 
  Warning, 
  Info, 
  Close 
} from '@mui/icons-material';

// Animation keyframes
const slideInRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOutRight = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

// Toast Container
const ToastContainer = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.spacing[6]};
  right: ${({ theme }) => theme.spacing[6]};
  z-index: ${({ theme }) => theme.zIndex.toast};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
  max-width: 400px;
  
  ${({ theme }) => theme.media.maxTablet} {
    top: ${({ theme }) => theme.spacing[4]};
    right: ${({ theme }) => theme.spacing[4]};
    left: ${({ theme }) => theme.spacing[4]};
    max-width: none;
  }
`;

// Individual Toast
const ToastItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border-left: 4px solid ${({ theme, $variant }) => {
    switch ($variant) {
      case 'success': return theme.colors.success;
      case 'error': return theme.colors.error;
      case 'warning': return theme.colors.warning;
      case 'info': return theme.colors.info;
      default: return theme.colors.primary;
    }
  }};
  
  animation: ${({ $isExiting }) => 
    $isExiting ? slideOutRight : slideInRight
  } 0.3s ease-out forwards;
  
  ${({ theme }) => theme.media.maxTablet} {
    padding: ${({ theme }) => theme.spacing[3]};
  }
`;

const ToastIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  color: ${({ theme, $variant }) => {
    switch ($variant) {
      case 'success': return theme.colors.success;
      case 'error': return theme.colors.error;
      case 'warning': return theme.colors.warning;
      case 'info': return theme.colors.info;
      default: return theme.colors.primary;
    }
  }};
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const ToastContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const ToastTitle = styled.div`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const ToastMessage = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;
`;

const ToastCloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.fast};
  flex-shrink: 0;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
    color: ${({ theme }) => theme.colors.text};
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: ${({ theme, $variant }) => {
    switch ($variant) {
      case 'success': return theme.colors.success;
      case 'error': return theme.colors.error;
      case 'warning': return theme.colors.warning;
      case 'info': return theme.colors.info;
      default: return theme.colors.primary;
    }
  }};
  border-radius: 0 0 ${({ theme }) => theme.borderRadius.lg} ${({ theme }) => theme.borderRadius.lg};
  transition: width linear;
  width: ${({ $progress }) => $progress}%;
`;

// Toast Context
const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Individual Toast Component
const Toast = ({ toast, onRemove }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  const getIcon = (variant) => {
    switch (variant) {
      case 'success': return <CheckCircle />;
      case 'error': return <Error />;
      case 'warning': return <Warning />;
      case 'info': return <Info />;
      default: return <Info />;
    }
  };

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onRemove(toast.id), 300);
  };

  // Auto-dismiss timer
  React.useEffect(() => {
    if (!toast.autoClose) return;

    const duration = toast.duration || 5000;
    const interval = 50;
    const decrement = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev - decrement;
        if (newProgress <= 0) {
          handleClose();
          return 0;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [toast.autoClose, toast.duration]);

  return (
    <ToastItem $variant={toast.variant} $isExiting={isExiting}>
      <ToastIcon $variant={toast.variant}>
        {getIcon(toast.variant)}
      </ToastIcon>
      
      <ToastContent>
        {toast.title && (
          <ToastTitle>{toast.title}</ToastTitle>
        )}
        <ToastMessage>{toast.message}</ToastMessage>
      </ToastContent>
      
      <ToastCloseButton onClick={handleClose} aria-label="Close notification">
        <Close />
      </ToastCloseButton>
      
      {toast.autoClose && (
        <ProgressBar $variant={toast.variant} $progress={progress} />
      )}
    </ToastItem>
  );
};

// Toast Provider Component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      variant: 'info',
      autoClose: true,
      duration: 5000,
      ...toast,
    };
    
    setToasts(prev => [...prev, newToast]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const removeAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Convenience methods
  const toast = {
    success: (message, options = {}) => addToast({ ...options, message, variant: 'success' }),
    error: (message, options = {}) => addToast({ ...options, message, variant: 'error', autoClose: false }),
    warning: (message, options = {}) => addToast({ ...options, message, variant: 'warning' }),
    info: (message, options = {}) => addToast({ ...options, message, variant: 'info' }),
    custom: (options) => addToast(options),
  };

  const contextValue = {
    toast,
    removeToast,
    removeAllToasts,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {toasts.length > 0 && createPortal(
        <ToastContainer>
          {toasts.map(toastItem => (
            <Toast
              key={toastItem.id}
              toast={toastItem}
              onRemove={removeToast}
            />
          ))}
        </ToastContainer>,
        document.body
      )}
    </ToastContext.Provider>
  );
};

export default Toast;