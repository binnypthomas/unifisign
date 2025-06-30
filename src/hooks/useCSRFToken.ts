// useCSRFToken.ts
import { useEffect, useState } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;
let inMemoryToken: string | null = null;

export function getCSRFToken() {
  return inMemoryToken;
}

export function useCSRFToken() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    axios.get(`${API}/auth/csrf-token`, { withCredentials: true })
      .then(res => {
        inMemoryToken = res.data.csrf_token;   // store it
        setReady(true);
      })
      .catch(console.error);
  }, []);

  return ready;
}