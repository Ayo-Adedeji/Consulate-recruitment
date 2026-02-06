import { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 5000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const styles = {
    success: {
      bg: 'bg-gradient-to-r from-green-500 to-emerald-500',
      icon: CheckCircle,
      iconColor: 'text-white'
    },
    error: {
      bg: 'bg-gradient-to-r from-red-500 to-rose-500',
      icon: XCircle,
      iconColor: 'text-white'
    }
  };

  const config = styles[type];
  const Icon = config.icon;

  return (
    <div className="fixed top-24 right-4 z-[100] animate-slideInRight">
      <div className={`${config.bg} text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 min-w-[320px] max-w-md`}>
        <div className="flex-shrink-0">
          <Icon className={`h-6 w-6 ${config.iconColor}`} />
        </div>
        <p className="flex-1 font-medium text-sm">{message}</p>
        <button
          onClick={onClose}
          className="flex-shrink-0 hover:bg-white/20 rounded-full p-1 transition-all duration-200"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
