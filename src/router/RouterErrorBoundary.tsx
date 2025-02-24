// RouterErrorBoundary.tsx
import { 
    useRouteError, 
    isRouteErrorResponse, 
    useNavigate 
  } from 'react-router-dom';
  import { Alert, Button } from '@mantine/core';
  import { AlertCircle, RefreshCw, Home } from 'lucide-react';
  import { useTranslation } from 'react-i18next';
  
  export const RouterErrorBoundary = () => {
    const error = useRouteError();
    const navigate = useNavigate();
    const { t } = useTranslation();
  
    let errorMessage = t('errorBoundary.unexpectedError');
    let statusCode = 500;
  
    if (isRouteErrorResponse(error)) {
      statusCode = error.status;
      errorMessage = error.statusText || error.data?.message || t('errorBoundary.defaultError');
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
  
    const getErrorTitle = (status: number) => {
      switch (status) {
        case 404:
          return t('errorBoundary.title.404');
        case 401:
          return t('errorBoundary.title.401');
        case 403:
          return t('errorBoundary.title.403');
        default:
          return t('errorBoundary.title.default');
      }
    };
  
    const getErrorDescription = (status: number) => {
      switch (status) {
        case 404:
          return t('errorBoundary.description.404');
        case 401:
          return t('errorBoundary.description.401');
        case 403:
          return t('errorBoundary.description.403');
        default:
          return t('errorBoundary.description.default');
      }
    };
  
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl h-dvh flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="flex flex-col items-center space-y-6">
            {/* Icon */}
            <div className="text-red-500">
              <AlertCircle size={50} />
            </div>
            
            {/* Error Title and Description */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">
                {getErrorTitle(statusCode)}
              </h2>
              <p className="text-lg text-gray-600">
                {getErrorDescription(statusCode)}
              </p>
            </div>
  
            {/* Error Alert */}
            <div className="w-full">
              <Alert 
                variant="light" 
                color="red" 
                title={t('errorBoundary.details')}
                styles={{ root: { maxWidth: '100%' } }}
              >
                {errorMessage}
              </Alert>
            </div>
  
            {/* Action Buttons */}
            <div className="flex gap-4 pt-2">
              <Button
                leftSection={<RefreshCw size={20} />}
                onClick={() => navigate(0)}
                variant="filled"
              >
                {t('errorBoundary.tryAgain')}
              </Button>
  
              <Button
                leftSection={<Home size={20} />}
                onClick={() => navigate('/')}
                variant="light"
              >
                {t('errorBoundary.goHome')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default RouterErrorBoundary;