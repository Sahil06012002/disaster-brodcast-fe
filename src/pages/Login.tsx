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
    <div className="flex flex-col justify-center items-center h-screen w-full bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        Stay Updated on Disasters
      </h1>
      <p className="text-gray-600 mb-8 text-center">
        Get the latest disaster news and alerts directly to your inbox.
      </p>
      <div className="flex justify-center items-center w-full max-w-md gap-2">
        <Input
          type="email"
          placeholder="Enter your Name"
          className="flex-1 rounded-md border border-gray-300 px-5 py-3 text-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button
          type="submit"
          className="px-6 py-3 text-lg text-white bg-green-600 hover:bg-green-700"
          onClick={handleCheckIn}
        >
          Check In
        </Button>
      </div>
    </div>
  );
}
