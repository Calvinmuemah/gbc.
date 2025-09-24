import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

type Event = {
  _id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
  attendees: string;
};

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const fetchEvents = () => {
    axios
      .get("http://localhost:5000/api/events")
      .then((res) => {
        setEvents(res.data || []);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEvents();

    const interval = setInterval(() => {
      fetchEvents();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Special Service":
        return "bg-green-100 text-green-800";
      case "Outreach":
        return "bg-green-200 text-green-900";
      case "Youth":
        return "bg-emerald-100 text-emerald-800";
      case "Marriage":
        return "bg-lime-100 text-lime-800";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const displayedEvents = showAll ? events : events.slice(0, 2);

  return (
    <section id="events" className="section-padding bg-background">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join us for fellowship, worship, and community connection
          </p>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-center text-muted-foreground">No events found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayedEvents.map((event) => (
              <Card
                key={event._id}
                className="shadow-soft hover:shadow-medium transition-smooth hover:scale-102 border border-gray-200"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <Badge className={getCategoryColor(event.category)}>
                        {event.category}
                      </Badge>
                      <CardTitle className="font-serif text-xl text-gray-900">
                        {event.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-green-600" />
                      {new Date(event.date).toLocaleDateString("en-KE", {
                        dateStyle: "medium",
                      })}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-green-600" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-green-600" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2 text-green-600" />
                      {event.attendees}
                    </div>
                  </div>

                  <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">
                    Learn More & RSVP
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {events.length > 2 && (
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="px-8 border-green-600 text-green-700 hover:bg-green-50"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "View Full Calendar"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
