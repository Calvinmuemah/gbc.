import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
const API_BASE_URL = import.meta.env.VITE_API_ENDPOINT;

export default function AddMinistry() {
  const [formData, setFormData] = useState({
    name: "",
    leader: "",
    email: "",
    phone: "",
    members: "",
    description: "",
    status: "active",
  });
  const [avatar, setAvatar] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      if (avatar) data.append("avatar", avatar);

      // ✅ Get token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in again.");
      }

      const res = await fetch(`${API_BASE_URL}/api/ministries/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ attach token
        },
        body: data,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to add ministry");

      setSuccessMessage("✅ Ministry added successfully! Redirecting...");
      setFormData({
        name: "",
        leader: "",
        email: "",
        phone: "",
        members: "",
        description: "",
        status: "active",
      });
      setAvatar(null);

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/ministries");
      }, 2000);
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Ministry</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {successMessage && (
              <Alert className="bg-green-100 border-green-400 text-green-800">
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}
            {errorMessage && (
              <Alert variant="destructive">
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            <div>
              <Label>Name</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Leader</Label>
              <Input
                name="leader"
                value={formData.leader}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Phone</Label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Members</Label>
              <Input
                name="members"
                type="number"
                value={formData.members}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Status</Label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full"
              >
                <option value="active">Active</option>
                <option value="recruiting">Recruiting</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div>
              <Label>Upload Avatar</Label>
              <Input type="file" accept="image/*" onChange={handleFileChange} />
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Add Ministry"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
