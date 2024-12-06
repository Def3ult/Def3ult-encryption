import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CIPHER_METHODS, CipherConfig } from '../types/encryption';
import CipherForm from '../components/CipherForm';

export default function Decrypt() {
  const [selectedMethod, setSelectedMethod] = useState<CipherConfig>(CIPHER_METHODS[0]);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          فك التشفير
        </h1>

        <div className="app-card mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            اختر طريقة فك التشفير
          </label>
          <select
            value={selectedMethod.method}
            onChange={(e) => setSelectedMethod(
              CIPHER_METHODS.find(m => m.method === e.target.value) || CIPHER_METHODS[0]
            )}
            className="app-select w-full"
            dir="rtl"
          >
            {CIPHER_METHODS.map((method) => (
              <option key={method.method} value={method.method}>
                {method.name}
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-gray-500">
            {selectedMethod.description}
          </p>
        </div>

        <CipherForm mode="decrypt" selectedMethod={selectedMethod} />

        <div className="mt-8">
          <button
            onClick={() => navigate('/method-selection')}
            className="app-button-secondary w-full"
          >
            رجوع
          </button>
        </div>
      </div>
    </div>
  );
}