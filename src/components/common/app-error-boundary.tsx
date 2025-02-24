// ErrorBoundary.tsx
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { TriangleAlert, RefreshCw, Home } from 'lucide-react';

interface FallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="flex justify-center">
          <div className="bg-purple-100 p-3 rounded-full">
            <TriangleAlert  className="w-12 h-12 text-purple-600" />
          </div>
        </div>

        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-gray-900">
            {t('error.title', 'Oops! Something went wrong')}
          </h2>
          
          <p className="text-gray-600">
            {t('error.description', 'We encountered an unexpected issue')}
          </p>

          <div className="bg-purple-50 rounded-lg p-4 mt-4">
            <p className="text-sm font-mono text-purple-800 break-all">
              {error.message}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={resetErrorBoundary}
            className="flex-1 inline-flex justify-center items-center px-4 py-2.5 rounded-lg
                     bg-purple-600 hover:bg-purple-700 
                     text-white font-medium transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            {t('error.tryAgain', 'Try Again')}
          </button>

          <button
            onClick={() => window.location.href = '/'}
            className="flex-1 inline-flex justify-center items-center px-4 py-2.5 rounded-lg
                     border border-purple-200 hover:border-purple-300 
                     text-purple-600 font-medium transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            {t('error.goHome', 'Go Home')}
          </button>
        </div>
      </div>
    </div>
  );
};

export const AppErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const handleError = (error: Error) => {
    console.error('Error caught by boundary:', error);
  };

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={handleError}
  
    >
      {children}
    </ErrorBoundary>
  );
};

export default AppErrorBoundary;