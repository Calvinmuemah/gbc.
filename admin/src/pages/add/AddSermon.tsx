import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ for navigation
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
// const API_BASE_URL = import.meta.env.VITE_API_ENDPOINT;
import { API_BASE_URL } from "../../api";

const AddSermon = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    speaker: "",
    description: "",
    date: "",
    videoUrl: "",
    audioUrl: "",
    thumbnail: "",
    tags: "",
    status: "draft",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        ...formData,
        tags: formData.tags
          ? formData.tags.split(",").map((t) => t.trim())
          : [],
      };

      await axios.post(`${API_BASE_URL}/api/sermons/create`, payload);

      setMessage("✅ Sermon added successfully!");
      setFormData({
        title: "",
        speaker: "",
        description: "",
        date: "",
        videoUrl: "",
        audioUrl: "",
        thumbnail: "",
        tags: "",
        status: "draft",
      });

      // ⏳ wait a bit then navigate back
      setTimeout(() => navigate("/sermons"), 1200);
    } catch (error) {
      console.error(error);
      setMessage("Error adding sermon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Add New Sermon</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter sermon title"
                required
              />
            </div>

            <div>
              <Label>Speaker</Label>
              <Input
                name="speaker"
                value={formData.speaker}
                onChange={handleChange}
                placeholder="Enter speaker name"
                required
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter sermon description"
                required
              />
            </div>

            <div>
              <Label>Date</Label>
              <Input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Video URL</Label>
              <Input
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>

            <div>
              <Label>Audio URL</Label>
              <Input
                name="audioUrl"
                value={formData.audioUrl}
                onChange={handleChange}
                placeholder="https://example.com/audio.mp3"
              />
            </div>

            <div>
              <Label>Thumbnail URL</Label>
              <Input
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <Label>Tags (comma separated)</Label>
              <Input
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="faith, hope, love"
              />
            </div>

            <div>
              <Label>Status</Label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Saving..." : "Add Sermon"}
            </Button>
          </form>

          {message && (
            <p
              className={`mt-4 text-sm ${
                message.startsWith("✅")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AddSermon;
