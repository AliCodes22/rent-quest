import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import HomePage from "./page";
import PropertyPage from "./properties/page";

export const metadata = {
  title: "Property Pulse | Find The Perfect Rental",
  description: "Find The Perfect Rental",
  keywords: "rental, find rentals, find properties",
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
