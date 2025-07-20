import React from 'react';
import styled from 'styled-components';
import { ErrorOutline, Refresh, Home } from '@mui/icons-material';
import Button from './Button';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: ${({ theme }) => theme.spacing[8]};
  text-align: center;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  margin: ${({ theme }) => theme.spacing[4]};
`;

const ErrorIcon = styled.div`
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  
  svg {
    width: 64px;
    height: 64px;
  }
`;

const ErrorTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  max-width: 500px;
  line-height: 1.6;
`;

const ErrorDetails = styled.details`
  margin-top: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.errorLight};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.error};
  max-width: 600px;
  width: 100%;
  
  summary {
    cursor: pointer;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.error};
    margin-bottom: ${({ theme }) => theme.spacing[2]};
  }
  
  pre {
    background: ${({ theme }) => theme.colors.surface};
    padding: ${({ theme }) => theme.spacing[3]};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    overflow-x: auto;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.text};
    white-space: pre-wrap;
    word-break: break-word;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[4]};
  
  ${({ theme }) => theme.media.maxMobile} {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { 
      hasError: true,
      errorId: Date.now().toString()
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    this.setState({
      error,
      errorInfo
    });

    // Log to console for development
    console.error('Error Boundary caught an error:', error, errorInfo);

    // In production, you would send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to error reporting service
      // errorReportingService.captureException(error, {
      //   extra: errorInfo,
      //   tags: { errorBoundary: this.props.name || 'Unknown' }
      // });
    }
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null
    });
  };

  handleGoHome = () => {
    window.location.href = '/dashboard';
  };

  render() {
    if (this.state.hasError) {
      const { fallback: Fallback, showDetails = true } = this.props;
      const { error, errorInfo } = this.state;

      // If a custom fallback is provided, use it
      if (Fallback) {
        return <Fallback error={error} errorInfo={errorInfo} onRetry={this.handleRetry} />;
      }

      // Default error UI
      return (
        <ErrorContainer>
          <ErrorIcon>
            <ErrorOutline />
          </ErrorIcon>
          
          <ErrorTitle>Something went wrong</ErrorTitle>
          
          <ErrorMessage>
            We're sorry, but something unexpected happened. This error has been logged 
            and we'll look into it. You can try refreshing the page or go back to the dashboard.
          </ErrorMessage>

          <ActionButtons>
            <Button 
              variant="primary" 
              startIcon={<Refresh />}
              onClick={this.handleRetry}
            >
              Try Again
            </Button>
            <Button 
              variant="secondary" 
              startIcon={<Home />}
              onClick={this.handleGoHome}
            >
              Go to Dashboard
            </Button>
          </ActionButtons>

          {showDetails && process.env.NODE_ENV === 'development' && error && (
            <ErrorDetails>
              <summary>Error Details (Development Only)</summary>
              <div>
                <strong>Error:</strong>
                <pre>{error.toString()}</pre>
              </div>
              {errorInfo && (
                <div>
                  <strong>Component Stack:</strong>
                  <pre>{errorInfo.componentStack}</pre>
                </div>
              )}
            </ErrorDetails>
          )}
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for easier usage
export const withErrorBoundary = (Component, errorBoundaryProps = {}) => {
  const WrappedComponent = (props) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};

// Hook for error reporting in functional components
export const useErrorHandler = () => {
  const handleError = React.useCallback((error, errorInfo = {}) => {
    console.error('Error caught by useErrorHandler:', error, errorInfo);
    
    // In production, send to error reporting service
    if (process.env.NODE_ENV === 'production') {
      // errorReportingService.captureException(error, { extra: errorInfo });
    }
  }, []);

  return handleError;
};

export default ErrorBoundary;