export type CipherMethod = 'caesar' | 'playfair' | 'vigenere' | 'transposition';

export interface CipherConfig {
  name: string;
  method: CipherMethod;
  requiresKey: boolean;
  requiresShift: boolean;
  description: string;
}

export const CIPHER_METHODS: CipherConfig[] = [
  {
    name: 'شفرة قيصر',
    method: 'caesar',
    requiresKey: false,
    requiresShift: true,
    description: 'تشفير بسيط يعتمد على إزاحة الحروف'
  },
  {
    name: 'شفرة بلاي فير',
    method: 'playfair',
    requiresKey: true,
    requiresShift: false,
    description: 'تشفير يستخدم مصفوفة 5×5 من الحروف'
  },
  {
    name: 'شفرة فيجنر',
    method: 'vigenere',
    requiresKey: true,
    requiresShift: false,
    description: 'تشفير متعدد الأبجدية باستخدام كلمة مفتاح'
  },
  {
    name: 'مصفوفة النقل',
    method: 'transposition',
    requiresKey: false,
    requiresShift: true,
    description: 'تشفير يعتمد على إعادة ترتيب الحروف'
  }
];