import { useTranslation } from 'react-i18next';
import { Alert, Button } from '@mantine/core';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const Error = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-[400px] flex items-center justify-center p-4 bg-gradient-to-br from-red-50 to-white">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="flex justify-center">
          <div className="bg-red-100 p-3 rounded-full">
            <AlertTriangle className="w-12 h-12 text-red-600" />
          </div>
        </div>

        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-gray-900">
            {t('error.title', 'Oops! Something went wrong')}
          </h2>
          <p className="text-gray-600">
            {t('error.description', 'We encountered an unexpected error')}
          </p>
        </div>

        <Alert variant="light" color="red" className="text-sm">
          {t('error.message', 'Please try again or contact support if the problem persists.')}
        </Alert>

        <div className="flex justify-center pt-2">
          <Button
            leftSection={<RefreshCw size={16} />}
            variant="filled"
            color="red"
            onClick={() => window.location.reload()}
          >
            {t('error.tryAgain', 'Try Again')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Error;
