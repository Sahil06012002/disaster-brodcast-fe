import { useEffect, useState } from "react";
import apiClient from "../services/ApiClient";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Clock, MapPin, User, AlertTriangle, Eye } from "lucide-react";

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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/30">
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-red-200 border-t-red-500 rounded-full animate-spin"></div>
          </div>
          <p className="mt-6 text-gray-600 text-lg font-medium">
            Loading disasters...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/30">
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="p-4 bg-red-100 rounded-full mb-4">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-red-600 text-lg font-medium">Error: {error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-500 hover:bg-red-600"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/30">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-8 w-64 h-64 bg-orange-400/20 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-16">
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <AlertTriangle className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="block mb-2">Ongoing Calamities</span>
              <span className="block text-red-200">You Should Know About</span>
            </h1>
            <p className="text-xl text-red-100 max-w-2xl mx-auto">
              Stay informed about active disasters and emergency situations
              affecting communities worldwide
            </p>
          </div>
        </div>
      </div>

      {/* Disasters Grid */}
      <div className="container mx-auto px-6 py-12">
        {disasters.length === 0 ? (
          <div className="text-center py-16">
            <div className="p-4 bg-gray-100 rounded-full inline-block mb-4">
              <AlertTriangle className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 text-lg">
              No active disasters reported
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {disasters.map((disaster, index) => (
              <div
                key={disaster.id}
                className="group bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-red-100 rounded-xl">
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                      {disaster.title}
                    </h2>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="font-medium">{disaster.location}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  {disaster.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {disaster.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-red-50 to-orange-50 text-red-700 border border-red-200/50"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200/50">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-4 h-4" />
                      <span>
                        Reported by{" "}
                        <span className="font-semibold text-gray-800">
                          {disaster.userName}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>
                        {new Date(disaster.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      navigate("/app/disaster-detail", {
                        state: {
                          disaster_id: disaster.id,
                          title: disaster.title,
                        },
                      });
                    }}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-red-500/25 transform hover:scale-105 transition-all duration-300"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
