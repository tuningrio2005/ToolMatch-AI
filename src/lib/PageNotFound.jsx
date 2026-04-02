import { useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
 
export default function PageNotFound() {
  const location = useLocation();
  const pageName = location.pathname.substring(1);
  const { user, isAuthenticated } = useAuth();
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-8xl font-bold text-slate-200 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-slate-700 mb-2">Page Not Found</h2>
        <p className="text-slate-500 mb-6">
          The page "{pageName}" could not be found.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
