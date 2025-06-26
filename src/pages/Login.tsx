import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import apiClient from "@/services/ApiClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Users, Shield, Zap } from "lucide-react";

export default function Login() {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckIn = async () => {
    if (!name.trim()) return;

    setIsLoading(true);
    try {
      const res = await apiClient.post("/users", { name });
      if (res.status === 200 || res.status === 201) {
        console.log(res.data);
        localStorage.setItem("user_id", res.data.data.id);
        navigate("/app");
      } else {
        console.log("error", res);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCheckIn();
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <div className="bg-[url(/disaster-hero-section.jpg)] bg-cover bg-center h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-red-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-8 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 flex flex-col justify-center min-h-screen px-6 sm:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex justify-around">
            <div className="mb-6 animate-fade-in">
              <div className="flex items-center gap-3 my-6">
                <div className="p-3 bg-red-500/20 backdrop-blur-sm rounded-full border border-red-500/30">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <span className="text-red-300/80 font-medium text-lg tracking-wide">
                  DISASTER BROADCASTER
                </span>
              </div>

              <h1 className="text-5xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                <div className="animate-fade-in delay-200">
                  <span className="block">Stay Informed.</span>
                  <span className="block">Act Fast.</span>
                  <span className="block">
                    Save{" "}
                    <span className="text-red-400 drop-shadow-lg">Lives.</span>
                  </span>
                </div>
              </h1>

              <p className="text-l text-gray-200 max-w-xl leading-relaxed mb-12 animate-fade-in delay-500">
                Your real-time hub for reporting and tracking natural
                calamities. Empower communities by sharing verified updates,
                images, and eyewitness accounts to help authorities and citizens
                respond effectively.
              </p>
            </div>
            {/* Login Form */}
            {/* <div className="animate-fade-in delay-700"> */}
            <div className="flex flex-col justify-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-lg shadow-2xl">
              <h2 className="text-5xl font-semibold text-white mb-3 text-center">
                Join the Network
              </h2>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 block">
                    Your Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-4 text-lg bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 border border-white/20 rounded-xl focus:border-red-400/50 focus:ring-2 focus:ring-red-400/20 transition-all duration-300"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                  />
                </div>

                <Button
                  onClick={handleCheckIn}
                  disabled={!name.trim() || isLoading}
                  className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl shadow-lg hover:shadow-red-500/25 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Checking In...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Check In
                      <span className="transform group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
            {/* </div> */}
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 animate-fade-in delay-1000">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-6 h-6 text-yellow-400" />
                <h3 className="text-lg font-semibold text-white">
                  Real-time Updates
                </h3>
              </div>
              <p className="text-gray-300 text-sm">
                Get instant notifications about disasters in your area
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-6 h-6 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">
                  Community Network
                </h3>
              </div>
              <p className="text-gray-300 text-sm">
                Connect with neighbors and local authorities
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-6 h-6 text-green-400" />
                <h3 className="text-lg font-semibold text-white">
                  Verified Reports
                </h3>
              </div>
              <p className="text-gray-300 text-sm">
                Share and receive authenticated disaster information
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
