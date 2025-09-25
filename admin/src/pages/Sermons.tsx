import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Edit, Trash2, Play, X } from "lucide-react";
const API_BASE_URL = import.meta.env.VITE_API_ENDPOINT;

import { Link } from "react-router-dom";

const Sermons = () => {
  const [sermons, setSermons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [editingSermon, setEditingSermon] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch sermons
  useEffect(() => {
    fetchSermons();
  }, []);

  const fetchSermons = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/sermons`);
      setSermons(res.data);
    } catch (error) {
      console.error("Error fetching sermons", error);
    }
  };

  // Delete Sermon
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sermon?")) return;
    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/api/sermons/${id}`);
      setSermons(sermons.filter((s) => s._id !== id));
    } catch (error) {
      console.error("Error deleting sermon", error);
    } finally {
      setLoading(false);
    }
  };

  // Update Sermon
  const handleUpdate = async () => {
    try {
      setLoading(true);
      const res = await axios.put(
        `${API_BASE_URL}/api/sermons/${editingSermon._id}`,
        editingSermon
      );
      setSermons(
        sermons.map((s) => (s._id === editingSermon._id ? res.data : s))
      );
      setEditingSermon(null);
    } catch (error) {
      console.error("Error updating sermon", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSermons = sermons.filter((sermon) => {
    const matchesSearch =
      sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sermon.speaker.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || sermon.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sermons</h1>
          <p className="text-muted-foreground">
            Manage your church sermons and messages
          </p>
        </div>
        <Link
        to="/add-sermon" 
        >
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Sermon
        </Button>
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search sermons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Sermons Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredSermons.map((sermon) => (
          <Card key={sermon._id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={sermon.thumbnail}
                alt={sermon.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setPreviewUrl(sermon.videoUrl)}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </div>
            </div>

            <CardHeader className="space-y-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg leading-tight">
                  {sermon.title}
                </CardTitle>
                <Badge
                  variant={
                    sermon.status === "published" ? "default" : "secondary"
                  }
                >
                  {sermon.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                by {sermon.speaker}
              </p>
            </CardHeader>

            <CardContent>
              <p className="text-sm mb-2">{sermon.description}</p>
              {sermon.tags && sermon.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {sermon.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-200 text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <span>{new Date(sermon.date).toLocaleDateString()}</span>
                <span>{sermon.duration || "N/A"}</span>
                <span>{sermon.views} views</span>
              </div>

              {editingSermon?._id === sermon._id ? (
                <div className="space-y-2">
                  <Input
                    value={editingSermon.title}
                    onChange={(e) =>
                      setEditingSermon({
                        ...editingSermon,
                        title: e.target.value,
                      })
                    }
                  />
                  <Input
                    value={editingSermon.speaker}
                    onChange={(e) =>
                      setEditingSermon({
                        ...editingSermon,
                        speaker: e.target.value,
                      })
                    }
                  />
                  <Input
                    value={editingSermon.description}
                    onChange={(e) =>
                      setEditingSermon({
                        ...editingSermon,
                        description: e.target.value,
                      })
                    }
                  />
                  <Input
                    value={editingSermon.videoUrl}
                    onChange={(e) =>
                      setEditingSermon({
                        ...editingSermon,
                        videoUrl: e.target.value,
                      })
                    }
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={handleUpdate}
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingSermon(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => setEditingSermon(sermon)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(sermon._id)}
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSermons.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No sermons found matching your criteria.
          </p>
        </div>
      )}

      {/* Video Preview Modal */}
      {previewUrl && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-full max-w-2xl relative">
            <button
              className="absolute top-2 right-2"
              onClick={() => setPreviewUrl(null)}
            >
              <X className="h-5 w-5" />
            </button>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={previewUrl.replace("watch?v=", "embed/")}
                title="Sermon Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sermons;
