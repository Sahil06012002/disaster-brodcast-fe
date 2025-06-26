import { Button } from "@/components/ui/button";
import { AlertTriangle, Users, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <div className="bg-[url(/disaster-hero-section.jpg)] bg-cover bg-center h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-red-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-8 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 min-h-screen px-6 sm:px-12 lg:px-16 py-12">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-16 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-red-500/20 backdrop-blur-sm rounded-full border border-red-500/30">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <span className="text-red-300/80 font-medium text-xl tracking-wide">
                DISASTER BROADCASTER
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              About Our Mission
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Empowering communities through real-time disaster communication
              and verified information sharing
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-12 animate-fade-in delay-200">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Our Mission
            </h2>
            <p className="text-lg text-gray-200 leading-relaxed text-center max-w-4xl mx-auto">
              In times of natural disasters, information can be the difference
              between life and death. Disaster Broadcaster was created to bridge
              the critical communication gap during emergencies, providing
              communities with a reliable platform to share real-time updates,
              coordinate rescue efforts, and keep everyone informed when
              traditional communication channels fail.
            </p>
          </div>

          <div className="mb-12 animate-fade-in delay-400">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              How We Help Communities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-8 h-8 text-yellow-400" />
                  <h3 className="text-xl font-semibold text-white">
                    Real-time Updates
                  </h3>
                </div>
                <p className="text-gray-300">
                  Instant notifications and live updates about disasters,
                  weather conditions, and emergency situations in your area and
                  beyond.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-8 h-8 text-blue-400" />
                  <h3 className="text-xl font-semibold text-white">
                    Community Network
                  </h3>
                </div>
                <p className="text-gray-300">
                  Connect with neighbors, local authorities, and emergency
                  responders to coordinate help and share resources during
                  crises.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-green-400" />
                  <h3 className="text-xl font-semibold text-white">
                    Verified Reports
                  </h3>
                </div>
                <p className="text-gray-300">
                  All disaster reports are verified through our community
                  validation system, ensuring accurate and trustworthy
                  information.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                  <h3 className="text-xl font-semibold text-white">
                    Emergency Alerts
                  </h3>
                </div>
                <p className="text-gray-300">
                  Receive critical emergency alerts and evacuation notices
                  directly from official sources and verified community members.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 animate-fade-in delay-600">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Why It Matters
              </h3>
              <div className="space-y-4 text-gray-200">
                <p>
                  Natural disasters affect millions of people worldwide each
                  year. During these critical moments, access to accurate,
                  timely information can save lives and reduce suffering.
                </p>
                <p>
                  Traditional communication channels often fail during disasters
                  due to infrastructure damage. Our platform provides a
                  resilient, community-driven alternative that keeps people
                  connected when they need it most.
                </p>
                <p>
                  By crowdsourcing disaster information from verified community
                  members, we create a comprehensive, real-time picture of
                  developing situations that helps everyone make informed
                  decisions.
                </p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Our Impact</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                    <span className="text-red-400 font-bold text-lg">50K+</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Active Users</h4>
                    <p className="text-gray-300 text-sm">
                      Community members staying connected
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <span className="text-yellow-400 font-bold text-lg">
                      1M+
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">
                      Reports Verified
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Accurate disaster information shared
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                    <span className="text-green-400 font-bold text-lg">
                      24/7
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Monitoring</h4>
                    <p className="text-gray-300 text-sm">
                      Continuous disaster tracking
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center animate-fade-in delay-800">
            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 backdrop-blur-xl border border-red-500/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Join Our Community
              </h2>
              <p className="text-lg text-gray-200 mb-6 max-w-2xl mx-auto">
                Be part of a network that's making a real difference. Help us
                build stronger, more resilient communities prepared for any
                disaster.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate("/")}
                  className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl shadow-lg hover:shadow-red-500/25 transform hover:scale-[1.02] transition-all duration-300"
                >
                  Get Started Today
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/app")}
                  className="px-8 py-3 text-lg font-semibold bg-white/5 border-white/20 text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                >
                  View Live Reports
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
