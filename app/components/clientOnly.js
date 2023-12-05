// components/ClientOnly.js
import { useEffect } from 'react';

export default function ClientOnly({ children }) {
  useEffect(() => {
    // Ensure this effect runs only on the client side
    // You can add any client-specific logic here if needed
  }, []);

  return <>{children}</>;
}
