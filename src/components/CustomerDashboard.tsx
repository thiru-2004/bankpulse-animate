import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  Send, 
  Download, 
  History, 
  User, 
  LogOut, 
  Eye,
  EyeOff,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft
} from "lucide-react";

interface CustomerDashboardProps {
  onLogout: () => void;
}

export function CustomerDashboard({ onLogout }: CustomerDashboardProps) {
  const [showBalance, setShowBalance] = useState(true);
  const [transferForm, setTransferForm] = useState({
    amount: '',
    recipientAccount: '',
    description: ''
  });

  // Mock data
  const customerData = {
    name: "John Doe",
    accountNumber: "1234567890",
    balance: 125000.50,
    accountType: "Savings Account"
  };

  const recentTransactions = [
    { id: 1, type: "credit", amount: 5000, description: "Salary Credit", date: "2024-01-30", balance: 125000.50 },
    { id: 2, type: "debit", amount: 1200, description: "Online Shopping", date: "2024-01-29", balance: 120000.50 },
    { id: 3, type: "credit", amount: 2500, description: "Freelance Payment", date: "2024-01-28", balance: 121200.50 },
    { id: 4, type: "debit", amount: 800, description: "Restaurant Bill", date: "2024-01-27", balance: 118700.50 },
    { id: 5, type: "debit", amount: 15000, description: "Rent Payment", date: "2024-01-26", balance: 119500.50 }
  ];

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate transfer
    alert(`Transfer of ₹${transferForm.amount} to account ${transferForm.recipientAccount} initiated successfully!`);
    setTransferForm({ amount: '', recipientAccount: '', description: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-banking text-white shadow-banking">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold">SecureBank</h1>
                <p className="text-white/80 text-sm">Customer Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-white/80 text-sm">Welcome back,</p>
                <p className="font-semibold">{customerData.name}</p>
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
        {/* Account Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="banking-card col-span-2 slide-in-left">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Account Overview</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBalance(!showBalance)}
                >
                  {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground">Account Number</p>
                  <p className="text-xl font-mono">{customerData.accountNumber}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Account Type</p>
                  <p className="text-lg">{customerData.accountType}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Available Balance</p>
                  <p className="text-3xl font-bold text-primary">
                    {showBalance ? `₹${customerData.balance.toLocaleString('en-IN')}` : '••••••••'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="banking-card slide-in-right">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full btn-banking justify-start">
                <Send className="w-4 h-4 mr-2" />
                Transfer Money
              </Button>
              <Button className="w-full btn-secondary-banking justify-start">
                <Download className="w-4 h-4 mr-2" />
                Download Statement
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <User className="w-4 h-4 mr-2" />
                Update Profile
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="transactions" className="slide-in-up">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="transfer">Transfer Money</TabsTrigger>
            <TabsTrigger value="statements">Statements</TabsTrigger>
          </TabsList>

          {/* Transactions Tab */}
          <TabsContent value="transactions">
            <Card className="banking-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <History className="w-5 h-5 mr-2" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div 
                      key={transaction.id} 
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'credit' ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
                        }`}>
                          {transaction.type === 'credit' ? 
                            <ArrowDownLeft className="w-5 h-5" /> : 
                            <ArrowUpRight className="w-5 h-5" />
                          }
                        </div>
                        <div>
                          <p className="font-semibold">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${
                          transaction.type === 'credit' ? 'text-success' : 'text-destructive'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Balance: ₹{transaction.balance.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transfer Tab */}
          <TabsContent value="transfer">
            <Card className="banking-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="w-5 h-5 mr-2" />
                  Transfer Money
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTransfer} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="amount">Amount</Label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="amount"
                          type="number"
                          className="banking-input pl-10"
                          placeholder="Enter amount"
                          value={transferForm.amount}
                          onChange={(e) => setTransferForm({...transferForm, amount: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="recipientAccount">Recipient Account Number</Label>
                      <Input
                        id="recipientAccount"
                        type="text"
                        className="banking-input"
                        placeholder="Enter account number"
                        value={transferForm.recipientAccount}
                        onChange={(e) => setTransferForm({...transferForm, recipientAccount: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Input
                      id="description"
                      type="text"
                      className="banking-input"
                      placeholder="Purpose of transfer"
                      value={transferForm.description}
                      onChange={(e) => setTransferForm({...transferForm, description: e.target.value})}
                    />
                  </div>

                  <Button type="submit" className="btn-banking w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Transfer Money
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statements Tab */}
          <TabsContent value="statements">
            <Card className="banking-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="w-5 h-5 mr-2" />
                  Account Statements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Download Statements</h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        Current Month Statement
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        Last 3 Months
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        Custom Date Range
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">Account Summary</h3>
                    <div className="space-y-2 p-4 bg-muted/50 rounded-xl">
                      <div className="flex justify-between">
                        <span>Total Credits (This Month)</span>
                        <span className="text-success font-semibold">₹7,500</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Debits (This Month)</span>
                        <span className="text-destructive font-semibold">₹17,000</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-semibold">Net Change</span>
                        <span className="text-destructive font-semibold">-₹9,500</span>
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