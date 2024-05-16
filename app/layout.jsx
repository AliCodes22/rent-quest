import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import HomePage from "./page";
import PropertyPage from "./properties/page";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";

export const metadata = {
  title: "Property Pulse | Find The Perfect Rental",
  description: "Find The Perfect Rental",
  keywords: "rental, find rentals, find properties",
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
