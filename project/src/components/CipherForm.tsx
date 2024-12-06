import React, { useState } from 'react';
import { CipherConfig } from '../types/encryption';
import { caesarEncrypt, caesarDecrypt } from '../utils/ciphers/caesarCipher';
import { playfairEncrypt, playfairDecrypt } from '../utils/ciphers/playfairCipher';
import { vigenereEncrypt, vigenereDecrypt } from '../utils/ciphers/vigenereCipher';
import { transpositionEncrypt, transpositionDecrypt } from '../utils/ciphers/transpositionCipher';
import toast from 'react-hot-toast';

interface CipherFormProps {
  mode: 'encrypt' | 'decrypt';
  selectedMethod: CipherConfig;
}

export default function CipherForm({ mode, selectedMethod }: CipherFormProps) {
  const [text, setText] = useState('');
  const [key, setKey] = useState('');
  const [shift, setShift] = useState(3);
  const [result, setResult] = useState('');

  const handleProcess = () => {
    if (!text) {
      toast.error('الرجاء إدخال النص');
      return;
    }

    if (selectedMethod.requiresKey && !key) {
      toast.error('الرجاء إدخال كلمة المفتاح');
      return;
    }

    try {
      let processedText = '';
      
      switch (selectedMethod.method) {
        case 'caesar':
          processedText = mode === 'encrypt' 
            ? caesarEncrypt(text, shift)
            : caesarDecrypt(text, shift);
          break;
        case 'playfair':
          processedText = mode === 'encrypt'
            ? playfairEncrypt(text, key)
            : playfairDecrypt(text, key);
          break;
        case 'vigenere':
          processedText = mode === 'encrypt'
            ? vigenereEncrypt(text, key)
            : vigenereDecrypt(text, key);
          break;
        case 'transposition':
          processedText = mode === 'encrypt'
            ? transpositionEncrypt(text, shift)
            : transpositionDecrypt(text, shift);
          break;
      }

      setResult(processedText);
      toast.success(mode === 'encrypt' ? 'تم التشفير بنجاح' : 'تم فك التشفير بنجاح');
    } catch (error) {
      toast.error('حدث خطأ أثناء المعالجة');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {mode === 'encrypt' ? 'النص المراد تشفيره' : 'النص المشفر'}
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="app-input w-full h-32"
          dir={mode === 'encrypt' ? 'rtl' : 'ltr'}
        />
      </div>

      {selectedMethod.requiresKey && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            كلمة المفتاح
          </label>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="app-input w-full"
            dir="rtl"
          />
        </div>
      )}

      {selectedMethod.requiresShift && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {selectedMethod.method === 'transposition' ? 'عدد الأعمدة' : 'مقدار الإزاحة'}
          </label>
          <input
            type="number"
            value={shift}
            onChange={(e) => setShift(parseInt(e.target.value) || 0)}
            className="app-input w-full"
            min="1"
            max={selectedMethod.method === 'caesar' ? 25 : 10}
          />
        </div>
      )}

      <button
        onClick={handleProcess}
        className="app-button w-full"
      >
        {mode === 'encrypt' ? 'تشفير' : 'فك التشفير'}
      </button>

      {result && (
        <div className="mt-6">
          <h2 className="text-lg font-medium text-blue-600 mb-2">النتيجة:</h2>
          <div className="app-card">
            <p className="text-gray-800 break-all" dir={mode === 'encrypt' ? 'ltr' : 'rtl'}>
              {result}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}