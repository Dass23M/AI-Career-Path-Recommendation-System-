import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import MarqueeBar from "@/components/Marqueebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">

        <AuthProvider>
          <Navbar />

          <main className="pt-20 min-h-screen">
            {children}
          </main>
          

          <Footer />
        </AuthProvider>

      </body>
    </html>
  );
}