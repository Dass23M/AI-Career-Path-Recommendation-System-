
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { AuthProvider } from "@/context/AuthContext";


export const metadata = {
  title: "AI Career Prediction Platform",
  description: "AI-powered career path recommendation platform",
}; 
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
          <CookieBanner />
        </AuthProvider>

      </body>
    </html>
  );
}