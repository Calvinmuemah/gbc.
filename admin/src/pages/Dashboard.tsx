import { useEffect, useState } from "react";
import axios from "axios";
import { OverviewCards } from "@/components/overview-cards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Clock, Users, MapPin } from "lucide-react";
// const API_BASE_URL = import.meta.env.VITE_API_ENDPOINT;
import { API_BASE_URL } from "../api";

const Dashboard = () => {
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);

  useEffect(() => {
    // Fetch Recent Activity (logs)
    axios
      .get(`${API_BASE_URL}/api/logs`)
      .then((res) => setRecentActivity(res.data))
      .catch((err) => console.error("Error fetching logs:", err));

    // Fetch Upcoming Events
    axios
      .get(`${API_BASE_URL}/api/events`)
      .then((res) => {
        // Only include upcoming
        const upcoming = res.data.filter(
          (event: any) => event.status === "upcoming"
        );
        setUpcomingEvents(upcoming);
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening at your church.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Quick Add
        </Button>
      </div>

      {/* Overview Cards (they will fetch sermons/events/ministries/donations internally) */}
      <OverviewCards />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 border-b pb-2"
                  >
                    <div className="flex h-2 w-2 mt-2 bg-primary rounded-full" />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.title}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>
                          {new Date(activity.time).toLocaleString("en-KE", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </span>
                        <span>•</span>
                        <span>{activity.type}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No recent activity yet.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <div
                    key={event._id}
                    className="flex items-center justify-between space-x-4 border-b pb-2"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {event.title}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>
                          {new Date(event.date).toLocaleDateString("en-KE", {
                            dateStyle: "medium",
                          })}{" "}
                          at {event.time}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        <Users className="mr-1 h-3 w-3" />
                        {event.attendees}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No upcoming events found.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
