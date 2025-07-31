import { useState } from "react";
import { BankingHero } from "@/components/BankingHero";
import { CustomerDashboard } from "@/components/CustomerDashboard";
import { AdminDashboard } from "@/components/AdminDashboard";

type UserType = 'guest' | 'customer' | 'admin';

const Index = () => {
  const [currentUser, setCurrentUser] = useState<UserType>('guest');

  const handleLoginSuccess = (userType: 'customer' | 'admin') => {
    setCurrentUser(userType);
  };

  const handleLogout = () => {
    setCurrentUser('guest');
  };

  // Render appropriate component based on user type
  switch (currentUser) {
    case 'customer':
      return <CustomerDashboard onLogout={handleLogout} />;
    case 'admin':
      return <AdminDashboard onLogout={handleLogout} />;
    default:
      return <BankingHero onLoginSuccess={handleLoginSuccess} />;
  }
};

export default Index;
