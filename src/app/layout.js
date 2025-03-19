// src/app/layout.js
import { ClerkProvider } from '@clerk/nextjs';
import { CartProvider } from '@/context/CartContext';
import NavBar from '@/components/NavBar';
import "./globals.css";
import { ToastContainer } from 'react-toastify';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>{/* Your head elements here */}</head>
      <body>
        <ClerkProvider>
          <ToastContainer />
          <CartProvider>
            <NavBar />
            <main>{children}</main>
          </CartProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
