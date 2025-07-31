import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  Users, 
  Activity, 
  LogOut, 
  Search,
  UserPlus,
  Shield,
  TrendingUp,
  IndianRupee,
  Eye,
  Trash2,
  Edit
} from "lucide-react";

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    initialDeposit: ''
  });

  // Mock admin data
  const adminStats = {
    totalCustomers: 15432,
    totalDeposits: 2500000000,
    activeTransactions: 1247,
    systemHealth: 99.8
  };

  const customers = [
    { id: 1, name: "John Doe", accountNumber: "1234567890", balance: 125000.50, email: "john@example.com", status: "Active" },
    { id: 2, name: "Jane Smith", accountNumber: "1234567891", balance: 85000.75, email: "jane@example.com", status: "Active" },
    { id: 3, name: "Mike Johnson", accountNumber: "1234567892", balance: 45000.25, email: "mike@example.com", status: "Inactive" },
    { id: 4, name: "Sarah Wilson", accountNumber: "1234567893", balance: 195000.00, email: "sarah@example.com", status: "Active" },
    { id: 5, name: "David Brown", accountNumber: "1234567894", balance: 67500.50, email: "david@example.com", status: "Active" }
  ];

  const recentActivities = [
    { id: 1, type: "account_created", description: "New account created for John Doe", timestamp: "2024-01-30 14:30" },
    { id: 2, type: "transaction", description: "Large transaction: ₹50,000 transfer", timestamp: "2024-01-30 13:45" },
    { id: 3, type: "login", description: "Admin login from new IP", timestamp: "2024-01-30 12:15" },
    { id: 4, type: "system", description: "System backup completed", timestamp: "2024-01-30 02:00" }
  ];

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Customer account created successfully for ${newCustomer.name}!`);
    setNewCustomer({ name: '', email: '', phone: '', initialDeposit: '' });
  };

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.accountNumber.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-banking text-white shadow-banking">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold">SecureBank Admin</h1>
                <p className="text-white/80 text-sm">Administrative Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-white/80 text-sm">Administrator</p>
                <p className="font-semibold">Admin User</p>
              </div>
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/10"
                onClick={onLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="banking-card slide-in-left">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Customers</p>
                  <p className="text-2xl font-bold text-primary">{adminStats.totalCustomers.toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="banking-card slide-in-left" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Deposits</p>
                  <p className="text-2xl font-bold text-secondary">₹{(adminStats.totalDeposits / 10000000).toFixed(1)}Cr</p>
                </div>
                <IndianRupee className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card className="banking-card slide-in-left" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Active Transactions</p>
                  <p className="text-2xl font-bold text-accent">{adminStats.activeTransactions}</p>
                </div>
                <Activity className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="banking-card slide-in-left" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">System Health</p>
                  <p className="text-2xl font-bold text-success">{adminStats.systemHealth}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="customers" className="slide-in-up">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="customers">Customer Management</TabsTrigger>
            <TabsTrigger value="create">Create Account</TabsTrigger>
            <TabsTrigger value="activities">System Activities</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Customer Management Tab */}
          <TabsContent value="customers">
            <Card className="banking-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Customer Accounts
                  </CardTitle>
                  <div className="relative w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search customers..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredCustomers.map((customer) => (
                    <div 
                      key={customer.id} 
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-banking rounded-full flex items-center justify-center text-white font-semibold">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-semibold">{customer.name}</p>
                          <p className="text-sm text-muted-foreground">{customer.email}</p>
                          <p className="text-sm text-muted-foreground font-mono">{customer.accountNumber}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-bold text-primary">₹{customer.balance.toLocaleString('en-IN')}</p>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            customer.status === 'Active' 
                              ? 'bg-success/20 text-success' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {customer.status}
                          </span>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Create Account Tab */}
          <TabsContent value="create">
            <Card className="banking-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Create New Customer Account
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateCustomer} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="customerName">Full Name</Label>
                      <Input
                        id="customerName"
                        type="text"
                        className="banking-input"
                        placeholder="Enter customer name"
                        value={newCustomer.name}
                        onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="customerEmail">Email Address</Label>
                      <Input
                        id="customerEmail"
                        type="email"
                        className="banking-input"
                        placeholder="Enter email address"
                        value={newCustomer.email}
                        onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="customerPhone">Phone Number</Label>
                      <Input
                        id="customerPhone"
                        type="tel"
                        className="banking-input"
                        placeholder="Enter phone number"
                        value={newCustomer.phone}
                        onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="initialDeposit">Initial Deposit</Label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="initialDeposit"
                          type="number"
                          className="banking-input pl-10"
                          placeholder="Minimum ₹1000"
                          value={newCustomer.initialDeposit}
                          onChange={(e) => setNewCustomer({...newCustomer, initialDeposit: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="btn-banking w-full">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create Customer Account
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities">
            <Card className="banking-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  System Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div 
                      key={activity.id} 
                      className="flex items-center space-x-4 p-4 rounded-xl bg-muted/50"
                    >
                      <div className={`w-3 h-3 rounded-full ${
                        activity.type === 'account_created' ? 'bg-success' :
                        activity.type === 'transaction' ? 'bg-accent' :
                        activity.type === 'login' ? 'bg-info' : 'bg-muted-foreground'
                      }`} />
                      <div className="flex-1">
                        <p className="font-medium">{activity.description}</p>
                        <p className="text-sm text-muted-foreground">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="banking-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  System Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Security Settings</h3>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          <Shield className="w-4 h-4 mr-2" />
                          Change Admin Password
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Shield className="w-4 h-4 mr-2" />
                          Two-Factor Authentication
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Shield className="w-4 h-4 mr-2" />
                          Session Management
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold">System Maintenance</h3>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          <Activity className="w-4 h-4 mr-2" />
                          Database Backup
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Activity className="w-4 h-4 mr-2" />
                          System Logs
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Activity className="w-4 h-4 mr-2" />
                          Performance Monitor
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}