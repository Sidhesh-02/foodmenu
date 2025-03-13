import { CartProvider } from "@/context/CartContext";
import NavBar from "@/components/NavBar";
import "./globals.css"; 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <NavBar />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
