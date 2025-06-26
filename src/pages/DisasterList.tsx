import { useEffect, useState } from "react";
import apiClient from "../services/ApiClient";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Disaster {
  id: number;
  title: string;
  location: string;
  description: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  userName: string;
}

export default function DisasterList() {
  const [disasters, setDisasters] = useState<Disaster[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDisasters = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/disasters");
        setDisasters(response.data.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch disasters.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDisasters();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-gray-500 text-lg">
        Loading disasters...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-red-500 text-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Recent Disasters
      </h1>
      <div className="grid grid-cols-1 gap-6">
        {disasters.map((disaster) => (
          <div
            key={disaster.id}
            className="border rounded-lg p-5 shadow-md bg-white hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              {disaster.title}
            </h2>
            <p className="text-gray-500 text-sm">{disaster.location}</p>
            <p className="mt-3 text-gray-700">{disaster.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {disaster.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <div className="flex justify-between">
              <div className="text-sm text-gray-500 mt-4 space-y-1">
                <p>
                  Reported by:{" "}
                  <span className="font-medium text-gray-700">
                    {disaster.userName}
                  </span>
                </p>
                <p>
                  Reported on:{" "}
                  {new Date(disaster.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center">
                <Button
                  variant={"link"}
                  onClick={() => {
                    navigate("/app/disaster-detail", {
                      state: {
                        disaster_id: disaster.id,
                        title: disaster.title,
                      },
                    });
                  }}
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
