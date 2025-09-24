import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, Twitter } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    if (!email) {
      setMessage("Please enter a valid email");
      return;
    }
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("🎉 Thanks for subscribing! Check your email.");
        setEmail("");
      } else {
        setMessage(data.message || "Subscription failed");
      }
    } catch (error) {
      console.error("Subscribe error:", error);
      setMessage("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer id="footer" className="bg-green-700 text-white relative">
      <style jsx>{`
        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes dance {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(-5deg) scale(1.05); }
          50% { transform: rotate(5deg) scale(1.05); }
          75% { transform: rotate(-3deg) scale(1.02); }
        }

        @keyframes glow {
          0% { box-shadow: 0 0 5px #ff0, 0 0 10px #f0f, 0 0 15px #0ff; }
          50% { box-shadow: 0 0 20px #0ff, 0 0 30px #ff0, 0 0 40px #f0f; }
          100% { box-shadow: 0 0 5px #ff0, 0 0 10px #f0f, 0 0 15px #0ff; }
        }

        .rainbow-glow {
          background: linear-gradient(270deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff);
          background-size: 1400% 1400%;
          animation: rainbow 6s ease infinite, dance 1.5s infinite;
          color: white;
          font-weight: 600;
          border-radius: 0.375rem;
          padding: 0.5rem 1.5rem;
          text-align: center;
          display: inline-block;
          border: none;
        }

        .input-rainbow {
          background: linear-gradient(270deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff);
          background-size: 1400% 1400%;
          animation: rainbow 6s ease infinite, glow 2s infinite alternate;
          border: 2px solid transparent;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          color: white;
          outline: none;
          text-align: left;
          ::placeholder { color: rgba(255,255,255,0.6); }
        }
      `}</style>

      <div className="container mx-auto container-padding">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Church Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold mb-4">
              Glory Bible Church
            </h3>
            <p className="text-white/80 leading-relaxed">
              A welcoming community where faith meets fellowship, and every
              heart finds a home in God's love.
            </p>
            <div className="flex space-x-3">
              {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
                <button key={i} className="p-2 hover:bg-white/20 text-white rounded-full">
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-xl font-serif font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/90">Beuela Bookshop</p>
                  <p className="text-white/90">Your City, ST 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-yellow-300 flex-shrink-0" />
                <p className="text-white/90">(+254) 110975075</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-yellow-300 flex-shrink-0" />
                <p className="text-white/90">info@gbccommunity.org</p>
              </div>
            </div>
          </div>

          {/* Service Times */}
          <div className="space-y-4">
            <h4 className="text-xl font-serif font-semibold mb-4">
              Service Times
            </h4>
            <div className="space-y-3">
              {[
                { title: "Sunday Worship", time: "11:00 AM - 1:00 PM" },
                { title: "Prayer Meeting", time: "Monday 6:00 PM" },
                { title: "Tuesday Bible Study", time: "2:00 PM" },
                { title: "Doctrinal Studies", time: "Thursday 6:00 PM" },
                { title: "Books Club", time: "Friday 6:00 PM" },
              ].map((service, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">{service.title}</p>
                    <p className="text-white/80 text-sm">{service.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xl font-serif font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {[
                { href: "#about", label: "About Us" },
                { href: "#sermons", label: "Latest Sermons" },
                { href: "#events", label: "Upcoming Events" },
                { href: "#ministries", label: "Ministries" },
                { href: "#give", label: "Give Online" },
                { href: "/prayer-request", label: "Prayer Requests" },
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="block text-white/90 hover:text-yellow-300 transition-smooth"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-white/20 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-xl font-serif font-semibold mb-2">Stay Connected</h4>
            <p className="text-white/80 mb-6">
              Subscribe to our newsletter for updates on services, events, and community news.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 input-rainbow"
              />
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="rainbow-glow"
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
            {message && <p className="mt-3 text-sm text-yellow-200">{message}</p>}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/70 text-sm">© 2025 Glory Bible Church. All rights reserved.</p>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-white/70 hover:text-yellow-300 transition-smooth">Privacy Policy</a>
              <a href="/terms" className="text-white/70 hover:text-yellow-300 transition-smooth">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
