import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Calendar, Users, DollarSign } from "lucide-react";

export function OverviewCards() {
  const [sermons, setSermons] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState(0);
  const [ministries, setMinistries] = useState(0);
  const [monthlyDonations, setMonthlyDonations] = useState(0);

  useEffect(() => {
    // ✅ Total Sermons
    axios
      .get("http://localhost:5000/api/sermons/count")
      .then((res) => setSermons(res.data.count || 0))
      .catch((err) => console.error("Error fetching sermons:", err));

    // ✅ Upcoming Events
    axios
      .get("http://localhost:5000/api/events/upcoming/count")
      .then((res) => setUpcomingEvents(res.data.upcomingEventsCount || 0))
      .catch((err) => console.error("Error fetching events:", err));

    // ✅ Ministries
    axios
      .get("http://localhost:5000/api/ministries/count")
      .then((res) => setMinistries(res.data.count || 0))
      .catch((err) => console.error("Error fetching ministries:", err));

    // ✅ Donations (filter current month)
    axios
      .get("http://localhost:5000/api/donations")
      .then((res) => {
        const donations = res.data || [];
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const monthlyTotal = donations
          .filter((d: any) => {
            const date = new Date(d.date);
            return (
              date.getMonth() === currentMonth &&
              date.getFullYear() === currentYear
            );
          })
          .reduce((sum: number, d: any) => sum + d.amount, 0);

        setMonthlyDonations(monthlyTotal);
      })
      .catch((err) => console.error("Error fetching donations:", err));
  }, []);

  const stats = [
    {
      title: "Total Sermons",
      value: sermons,
      change: "+0%", // 🔹 placeholder until you calculate change
      changeType: "positive" as const,
      icon: Mic,
    },
    {
      title: "Upcoming Events",
      value: upcomingEvents,
      change: "+0",
      changeType: "positive" as const,
      icon: Calendar,
    },
    {
      title: "Active Ministries",
      value: ministries,
      change: "+0",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "Monthly Donations",
      value: `KES ${monthlyDonations}`,
      change: "+0%",
      changeType: "positive" as const,
      icon: DollarSign,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span
                className={
                  stat.changeType === "positive"
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {stat.change}
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
