import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyEmailToken = async () => {
      if (!token) {
        setStatus('failed');
        setError('No verification token provided');
        toast.error('Verification link is invalid');
        return;
      }

      try {
        const response = await axios.post(
          'https://studyhub-api-p0q4.onrender.com/verify-email',
          { token },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.data.success) {
          setStatus('verified');
          toast.success('Email verified successfully!');
          setTimeout(() => navigate('/login'), 3000);
        } else {
          setStatus('failed');
          setError(response.data.message || 'Verification failed');
          toast.error(response.data.message || 'Verification failed');
        }
      } catch (err) {
        setStatus('failed');
        const errorMessage = err.response?.data?.message || 
                            err.message || 
                            'An error occurred during verification';
        setError(errorMessage);
        toast.error(errorMessage);
      }
    };

    verifyEmailToken();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 text-center">
        {status === 'verifying' && (
          <div className="space-y-4">
            <Loader2 className="w-12 h-12 mx-auto animate-spin text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-800">Verifying Your Email</h2>
            <p className="text-gray-600">Please wait while we verify your email address.</p>
          </div>
        )}

        {status === 'verified' && (
          <div className="space-y-4">
            <CheckCircle2 className="w-12 h-12 mx-auto text-green-500" />
            <h2 className="text-2xl font-bold text-gray-800">Email Verified!</h2>
            <p className="text-gray-600">
              Your account has been successfully verified. Redirecting to login...
            </p>
            <button
              onClick={() => navigate('/login')}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
            >
              Go to Login Now
            </button>
          </div>
        )}

        {status === 'failed' && (
          <div className="space-y-4">
            <XCircle className="w-12 h-12 mx-auto text-red-500" />
            <h2 className="text-2xl font-bold text-gray-800">Verification Failed</h2>
            <p className="text-red-500">{error}</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => navigate('/register')}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition"
              >
                Register Again
              </button>
              <button
                onClick={() => navigate('/login')}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
              >
                Go to Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;