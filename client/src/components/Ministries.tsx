import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// const API_BASE_URL = import.meta.env.VITE_API_ENDPOINT;
import { API_BASE_URL } from "../api";



type Ministry = {
  _id: string;
  name: string;
  leader: string;
  email: string;
  phone: string;
  members: number;
  description: string;
  avatar?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

const Ministries = () => {
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);

  const fetchMinistries = () => {
    axios
      .get(`${API_BASE_URL}/api/ministries`)
      .then((res) => setMinistries(res.data || []))
      .catch((err) => console.error("Error fetching ministries:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMinistries();
    const interval = setInterval(fetchMinistries, 30000);
    return () => clearInterval(interval);
  }, []);

  const displayedMinistries = showAll ? ministries : ministries.slice(0, 3);

  // Badge/status color theme
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "recruiting":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section id="ministries" className="section-padding bg-background">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Our Ministries
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover meaningful ways to grow in faith and serve our community
          </p>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Loading ministries...</p>
        ) : ministries.length === 0 ? (
          <p className="text-center text-muted-foreground">No ministries found.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedMinistries.map((ministry) => (
                <Card
                  key={ministry._id}
                  className="shadow-soft hover:shadow-medium transition-smooth hover:scale-105 border border-gray-200 h-full"
                >
                  <CardHeader className="text-center pb-4 relative">
                    {ministry.status && (
                      <span
                        className={`absolute top-2 right-2 px-2 py-1 text-xs rounded ${getStatusColor(
                          ministry.status
                        )}`}
                      >
                        {ministry.status}
                      </span>
                    )}
                    <CardTitle className="font-serif text-xl text-gray-900">
                      {ministry.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {ministry.avatar && (
                      <img
                        src={ministry.avatar}
                        alt={ministry.name}
                        className="w-full h-40 object-cover rounded-lg shadow"
                      />
                    )}
                    <p className="text-gray-700 leading-relaxed text-center">
                      {ministry.description}
                    </p>
                    <p className="text-sm text-gray-600 text-center">
                      Leader: <span className="font-medium">{ministry.leader}</span>
                    </p>
                    <p className="text-sm text-gray-600 text-center">
                      Members: <span className="font-medium">{ministry.members}</span>
                    </p>

                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => setSelectedMinistry(ministry)}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {ministries.length > 3 && (
              <div className="text-center mt-12">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 border-green-600 text-green-700 hover:bg-green-50"
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? "Show Less" : "View All Ministries"}
                </Button>
              </div>
            )}
          </>
        )}

        {/* Details Modal */}
        <Dialog open={!!selectedMinistry} onOpenChange={() => setSelectedMinistry(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedMinistry?.name}</DialogTitle>
            </DialogHeader>
            {selectedMinistry && (
              <div className="space-y-4">
                {selectedMinistry.avatar && (
                  <img
                    src={selectedMinistry.avatar}
                    alt={selectedMinistry.name}
                    className="w-full h-48 object-cover rounded-lg shadow"
                  />
                )}
                <p className="text-gray-700">{selectedMinistry.description}</p>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    <strong>Leader:</strong> {selectedMinistry.leader}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedMinistry.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selectedMinistry.phone}
                  </p>
                  <p>
                    <strong>Members:</strong> {selectedMinistry.members}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className={getStatusColor(selectedMinistry.status)}>
                      {selectedMinistry.status}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Ministries;

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Heart, Users, Music, BookOpen, Globe, Baby } from "lucide-react";

// const Ministries = () => {
//   const ministries = [
//     {
//       id: 1,
//       title: "Youth Ministry",
//       description: "Empowering the next generation through engaging worship, biblical teaching, and authentic community for students grades 6-12.",
//       icon: Users,
//       highlights: ["Weekly Youth Nights", "Summer Camps", "Mission Trips", "Leadership Development"]
//     },
//     {
//       id: 2,
//       title: "Worship & Music",
//       description: "Creating an atmosphere of heartfelt worship through contemporary and traditional music that honors God and encourages believers.",
//       icon: Music,
//       highlights: ["Sunday Worship Team", "Choir Ministry", "Instrument Lessons", "Special Events"]
//     },
//     {
//       id: 3,
//       title: "Community Outreach",
//       description: "Serving our local community with love and compassion through practical help, food assistance, and community partnerships.",
//       icon: Heart,
//       highlights: ["Food Pantry", "Community Events", "Volunteer Programs", "Local Partnerships"]
//     },
//     {
//       id: 4,
//       title: "Children's Ministry",
//       description: "Providing a safe, fun, and engaging environment where children can learn about God's love and develop lasting friendships.",
//       icon: Baby,
//       highlights: ["Sunday School", "VBS Program", "Children's Choir", "Family Events"]
//     },
//     {
//       id: 5,
//       title: "Adult Bible Study",
//       description: "Deepening faith through systematic Bible study, theological discussion, and practical application of God's Word in daily life.",
//       icon: BookOpen,
//       highlights: ["Weekly Studies", "Seasonal Classes", "Men's Groups", "Women's Groups"]
//     },
//     {
//       id: 6,
//       title: "Global Missions",
//       description: "Supporting missionaries worldwide and organizing mission trips to share the Gospel and serve communities in need around the globe.",
//       icon: Globe,
//       highlights: ["Mission Trips", "Missionary Support", "Global Partnerships", "Prayer Teams"]
//     }
//   ];

//   return (
//     <section id="ministries" className="section-padding section-gradient">
//       <div className="container mx-auto container-padding">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
//             Our Ministries
//           </h2>
//           <p className="text-xl text-content-gray max-w-2xl mx-auto">
//             Discover meaningful ways to grow in faith and serve our community
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {ministries.map((ministry) => {
//             const IconComponent = ministry.icon;
//             return (
//               <Card 
//                 key={ministry.id} 
//                 className="card-gradient shadow-soft hover:shadow-medium transition-smooth hover:scale-105 border-0 h-full"
//               >
//                 <CardHeader className="text-center pb-4">
//                   <div className="mx-auto w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mb-4">
//                     <IconComponent className="h-8 w-8 text-gold" />
//                   </div>
//                   <CardTitle className="font-serif text-xl text-primary">
//                     {ministry.title}
//                   </CardTitle>
//                 </CardHeader>

//                 <CardContent className="space-y-6">
//                   <p className="text-content-gray leading-relaxed text-center">
//                     {ministry.description}
//                   </p>

//                   <div className="space-y-2">
//                     <h4 className="font-semibold text-primary text-sm uppercase tracking-wide">
//                       What We Offer:
//                     </h4>
//                     <ul className="space-y-1">
//                       {ministry.highlights.map((highlight, index) => (
//                         <li key={index} className="text-sm text-muted-foreground flex items-center">
//                           <div className="w-1.5 h-1.5 bg-gold rounded-full mr-2 flex-shrink-0"></div>
//                           {highlight}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   <Button className="w-full bg-primary hover:bg-primary/90 text-white">
//                     Learn More
//                   </Button>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>

//         <div className="text-center mt-16">
//           <div className="max-w-3xl mx-auto">
//             <h3 className="text-2xl font-serif font-semibold text-primary mb-4">
//               Get Involved Today
//             </h3>
//             <p className="text-content-gray mb-8">
//               Whether you're looking to serve, learn, or connect, there's a place for you in our church family. 
//               Contact us to learn more about any of these ministries.
//             </p>
//             <Button size="lg" className="bg-gold hover:bg-gold/90 text-primary font-semibold px-8">
//               Contact Us About Ministries
//             </Button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Ministries;