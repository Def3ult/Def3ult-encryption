import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Unlock } from 'lucide-react';

export default function MethodSelection() {
  const navigate = useNavigate();
  const visitorName = localStorage.getItem('visitorName');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-8">
            مرحباً {visitorName}
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            اختر العملية التي تريد تنفيذها
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/encrypt')}
            className="app-card hover:bg-blue-50 group"
          >
            <Lock className="w-16 h-16 text-blue-600 mb-4 mx-auto group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-semibold text-blue-600 mb-2 text-center">تشفير</h2>
            <p className="text-gray-600 text-center">
              قم بتشفير رسالتك باستخدام خوارزميات متعددة
            </p>
          </button>

          <button
            onClick={() => navigate('/decrypt')}
            className="app-card hover:bg-blue-50 group"
          >
            <Unlock className="w-16 h-16 text-blue-600 mb-4 mx-auto group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-semibold text-blue-600 mb-2 text-center">فك التشفير</h2>
            <p className="text-gray-600 text-center">
              قم بفك تشفير الرسائل المشفرة
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}