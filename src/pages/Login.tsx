import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import apiClient from "@/services/ApiClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleCheckIn = () => {
    apiClient.post("/users", { name }).then((res: any) => {
      if (res.status === 200 || res.status === 201) {
        console.log(res.data);
        localStorage.setItem("user_id", res.data.data.id);
        navigate("/app");
      } else {
        console.log("error", res);
      }
    });
  };

  return (
    <div>
      <div className="bg-[url(/disaster-hero-section.jpg)] bg-cover bg-center h-screen w-full">
        <div className="flex flex-col justify-center h-screen w-full px-12 text-white">
          <h1 className="text-6xl font-bold  mb-4">
            <p>Stay Informed. Act Fast. </p>
            <p>Save Lives.</p>
          </h1>
          <p className="w-[50%] mb-4">
            Disaster Brodcaster is your real-time hub for reporting and tracking
            natural calamities. Empower communities by sharing verified updates,
            images, and eyewitness accounts to help authorities and citizens{" "}
          </p>
          <div className="flex justify-center items-center w-full max-w-md gap-2">
            <Input
              type="email"
              placeholder="Enter your Name"
              className="flex-1 px-5 py-3 text-lg bg-transparent text-white placeholder-white border border-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Button
              type="submit"
              onClick={handleCheckIn}
              className="px-6 py-3 text-lg text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-md shadow-md hover:bg-white/20 transition"
            >
              Check In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
