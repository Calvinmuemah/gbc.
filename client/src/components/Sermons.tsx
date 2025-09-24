import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Play, Calendar, Clock, X } from "lucide-react";

type Sermon = {
  _id: string;
  title: string;
  speaker: string;
  date: string;
  duration: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  status?: string; // NEW
};

const Sermons = () => {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null);

  const fetchSermons = () => {
    axios
      .get("http://localhost:5000/api/sermons")
      .then((res) => setSermons(res.data || []))
      .catch((err) => console.error("Error fetching sermons:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSermons();
    const interval = setInterval(fetchSermons, 30000);
    return () => clearInterval(interval);
  }, []);

  const displayedSermons = showAll ? sermons : sermons.slice(0, 3);

  // Badge colors based on status
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-green-100 text-green-800";
      case "popular":
        return "bg-yellow-100 text-yellow-800";
      case "series":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderVideoPlayer = (url: string) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      let videoId = "";
      if (url.includes("v=")) {
        videoId = new URL(url).searchParams.get("v") || "";
      } else if (url.includes("youtu.be")) {
        videoId = url.split("/").pop() || "";
      }
      return (
        <iframe
          width="100%"
          height="480"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="Sermon Video"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="rounded-lg"
        />
      );
    }
    return (
      <video
        src={url}
        controls
        autoPlay
        className="w-full max-h-[480px] rounded-lg"
      />
    );
  };

  return (
    <section id="sermons" className="section-padding section-gradient">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Recent Sermons
          </h2>
          <p className="text-xl text-content-gray max-w-2xl mx-auto">
            Be encouraged and challenged as we explore God&apos;s Word together
          </p>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Loading sermons...</p>
        ) : sermons.length === 0 ? (
          <p className="text-center text-muted-foreground">No sermons found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedSermons.map((sermon) => (
              <Card
                key={sermon._id}
                className="card-gradient shadow-soft hover:shadow-medium transition-smooth hover:scale-105 border-0 overflow-hidden relative"
              >
                {/* Status Badge */}
                {sermon.status && (
                  <span
                    className={`absolute top-3 right-3 px-2 py-1 text-xs rounded ${getStatusColor(
                      sermon.status
                    )}`}
                  >
                    {sermon.status}
                  </span>
                )}

                <div className="relative">
                  <img
                    src={sermon.thumbnail}
                    alt={sermon.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-smooth">
                    <Button
                      size="lg"
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => setSelectedSermon(sermon)}
                    >
                      <Play className="mr-2 h-5 w-5" />
                      Play
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6 space-y-3">
                  <h3 className="font-serif text-xl font-semibold text-primary text-center">
                    {sermon.title}
                  </h3>
                  <p className="text-content-gray text-center line-clamp-2">
                    {sermon.description}
                  </p>
                  <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(sermon.date).toLocaleDateString("en-KE", {
                        dateStyle: "medium",
                      })}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {sermon.duration}
                    </div>
                  </div>
                  <p className="text-sm font-medium text-center text-primary">
                    Speaker: {sermon.speaker}
                  </p>
                </CardContent>

                <CardFooter className="px-6 pb-6">
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => setSelectedSermon(sermon)}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Listen Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {sermons.length > 3 && (
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="px-8 border-green-600 text-green-600 hover:bg-green-50"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "View All Sermons"}
            </Button>
          </div>
        )}
      </div>

      {/* Modal Player */}
      {selectedSermon && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelectedSermon(null)}
        >
          <div
            className="bg-white rounded-xl p-4 max-w-3xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedSermon(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X className="h-6 w-6" />
            </button>
            <h3 className="text-xl font-bold mb-4">{selectedSermon.title}</h3>
            {renderVideoPlayer(selectedSermon.videoUrl)}
          </div>
        </div>
      )}
    </section>
  );
};

export default Sermons;
