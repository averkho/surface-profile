'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
}