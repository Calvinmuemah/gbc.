import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreditCard, Heart, Smartphone, DollarSign, Loader2 } from "lucide-react";
const API_BASE_URL = import.meta.env.VITE_API_ENDPOINT;


const Giving = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    donor: "",
    email: "",
    phone: "",
    amount: 0,
    category: "General Fund",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const categories = ["Church Operations", "Offerings", "Global Missions", "Community Outreach", "Youth & Children"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");
    try {
      await axios.post(`${API_BASE_URL}/api/donations/initiate`, {
        ...form,
        method: "M-Pesa",
        status: "pending",
      });

      setMessage("✅ Check your phone and enter your M-Pesa PIN to complete the donation.");
      setSubmitted(true);
      setCountdown(60);

      setForm({
        donor: "",
        email: "",
        phone: "",
        amount: 0,
        category: "General Fund",
      });
    } catch (error) {
      console.error(error);
      setMessage("Error processing donation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (submitted && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [submitted, countdown]);

  return (
    <section id="give" className="section-padding bg-background">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-green-700 mb-4">
            Give Generously
          </h2>
          <p className="text-xl text-content-gray max-w-2xl mx-auto">
            Your generosity helps us fulfill our mission to share God's love in our community and beyond
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Giving Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-serif font-semibold text-green-700">Where Your Gifts Go</h3>
              <div className="space-y-4">
                {["Community Outreach", "Youth & Children", "Global Missions", "Church Operations"].map(
                  (title, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Heart className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-700">{title}</h4>
                        <p className="text-content-gray">
                          {title === "Community Outreach"
                            ? "Supporting local families, food assistance, and community programs"
                            : title === "Youth & Children"
                            ? "Programs, camps, and activities that nurture the next generation"
                            : title === "Global Missions"
                            ? "Supporting missionaries and mission trips around the world"
                            : "Maintaining our facilities and supporting our ministry staff"}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h4 className="font-serif text-lg font-semibold text-green-700 mb-2">
                "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
              </h4>
              <p className="text-content-gray text-sm">— 2 Corinthians 9:7</p>
            </div>
          </div>

          {/* Giving Methods */}
          <div className="space-y-6">
            <Card className="card-gradient shadow-soft border-0">
              <CardHeader className="text-center">
                <CardTitle className="font-serif text-2xl text-green-700">Ways to Give</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button
                  size="lg"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 text-lg transition-bounce hover:scale-105 flex items-center justify-center"
                  onClick={() => {
                    setModalOpen(true);
                    setSubmitted(false);
                    setMessage("");
                    setCountdown(0);
                  }}
                >
                  <CreditCard className="mr-3 h-5 w-5" />
                  Give Online Now
                </Button>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-background rounded-lg">
                    <Smartphone className="h-6 w-6 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-700">Text to Give</h4>
                      <p className="text-sm text-content-gray">Text "GIVE" to (254) 0110975075</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-background rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-700">In-Person</h4>
                      <p className="text-sm text-content-gray">Sunday offering during service</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-background rounded-lg">
                    <CreditCard className="h-6 w-6 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-700">Mail</h4>
                      <p className="text-sm text-content-gray">kelvinmuemah855@gmail.com</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center">
                    Glory BibleChurch is a 501(c)(3) organization. All donations are tax-deductible.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={modalOpen} onOpenChange={() => setModalOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-green-700">Give Online Now</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <input
              type="text"
              name="donor"
              placeholder="Your Name"
              className="w-full p-2 border rounded"
              value={form.donor}
              onChange={handleChange}
              disabled={submitted}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              value={form.email}
              onChange={handleChange}
              disabled={submitted}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              className="w-full p-2 border rounded"
              value={form.phone}
              onChange={handleChange}
              disabled={submitted}
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              className="w-full p-2 border rounded"
              value={form.amount}
              onChange={handleChange}
              disabled={submitted}
            />
            <select
              name="category"
              className="w-full p-2 border rounded"
              value={form.category}
              onChange={handleChange}
              disabled={submitted}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-semibold flex items-center justify-center"
              onClick={handleSubmit}
              disabled={loading || submitted}
            >
              {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              {loading
                ? "Processing..."
                : submitted
                ? `Awaiting M-Pesa Confirmation${countdown > 0 ? ` (${countdown}s)` : ""}`
                : "Give Now"}
            </Button>

            {message && (
              <p className="mt-2 text-center text-sm text-green-700 font-medium">{message}</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Giving;
