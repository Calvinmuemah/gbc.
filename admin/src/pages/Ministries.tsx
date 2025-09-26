import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Users, Phone, Mail, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// const API_BASE_URL = import.meta.env.VITE_API_ENDPOINT;
import { API_BASE_URL } from "../api";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Ministry {
  _id: string;
  name: string;
  leader: string;
  email: string;
  phone: string;
  members: number;
  description: string;
  avatar: string;
  status: string;
}

const Ministries = () => {
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [loading, setLoading] = useState(false);

  // edit modal state
  const [editing, setEditing] = useState<Ministry | null>(null);
  const [form, setForm] = useState<Partial<Ministry>>({});
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  // Fetch ministries
  const fetchMinistries = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/ministries`);
      const data = await res.json();
      setMinistries(data);
    } catch (err) {
      console.error("Failed to load ministries", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMinistries();
  }, []);

  // Delete ministry
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this ministry?")) return;
    try {
      await fetch(`${API_BASE_URL}/api/ministries/${id}`, {
        method: "DELETE",
      });
      setMinistries((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // Open edit modal
  const handleEdit = (ministry: Ministry) => {
    setEditing(ministry);
    setForm(ministry);
    setAvatar(null);
    setPreview(ministry.avatar || null);
    setSuccess(null);
  };

  // Update ministry
  const handleUpdate = async () => {
    if (!editing) return;
    setUpdating(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== undefined) data.append(key, value as string);
      });
      if (avatar) data.append("avatar", avatar);

      const res = await fetch(
        `${API_BASE_URL}/api/ministries/${editing._id}`,
        {
          method: "PUT",
          body: data,
        }
      );

      if (res.ok) {
        await fetchMinistries();
        setSuccess("Ministry updated successfully!");
        setTimeout(() => {
          setEditing(null);
          setSuccess(null);
          setAvatar(null);
          setPreview(null);
        }, 1500);
      } else {
        const result = await res.json();
        console.error("Update failed:", result.message || res.statusText);
      }
    } catch (err) {
      console.error("Update error", err);
    } finally {
      setUpdating(false);
    }
  };

  // Handle file selection for avatar
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setAvatar(file);
      setPreview(URL.createObjectURL(file)); // show preview
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ministries</h1>
          <p className="text-muted-foreground">
            Manage church ministries and their leaders
          </p>
        </div>
        <Link to="/add-ministry">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Ministry
          </Button>
        </Link>
      </div>

      {/* Ministries Grid */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ministries.map((ministry) => (
            <Card key={ministry._id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{ministry.name}</CardTitle>
                  <Badge
                    variant={
                      ministry.status === "active" ? "default" : "secondary"
                    }
                  >
                    {ministry.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {ministry.description}
                </p>

                {/* Leader Info */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Ministry Leader</h4>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={ministry.avatar}
                        alt={ministry.leader}
                      />
                      <AvatarFallback>
                        {ministry.leader
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{ministry.leader}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        <span className="truncate">{ministry.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        <span>{ministry.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Members Count */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{ministry.members} members</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleEdit(ministry)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(ministry._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Ministry Modal */}
      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Ministry</DialogTitle>
          </DialogHeader>

          {success && (
            <p className="text-green-600 text-sm mb-2">{success}</p>
          )}

          <div className="space-y-4">
            <Input
              placeholder="Name"
              value={form.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
              placeholder="Leader"
              value={form.leader || ""}
              onChange={(e) => setForm({ ...form, leader: e.target.value })}
            />
            <Input
              placeholder="Email"
              value={form.email || ""}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Input
              placeholder="Phone"
              value={form.phone || ""}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <Textarea
              placeholder="Description"
              value={form.description || ""}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <div>
              <Input type="file" accept="image/*" onChange={handleFileChange} />
              {preview && (
                <img
                  src={preview}
                  alt="Avatar Preview"
                  className="mt-2 h-20 w-20 object-cover rounded-full"
                />
              )}
            </div>

            <Button onClick={handleUpdate} disabled={updating}>
              {updating ? "Updating..." : "Save Changes"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Ministries;
