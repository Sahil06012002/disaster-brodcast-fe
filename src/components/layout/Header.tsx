import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { useRef, useState } from "react";
import RegisterDisasterForm from "../RegisterDisasterForm";
import type { RegisterDisasterFormRef } from "../RegisterDisasterForm";
import { Plus, ShieldAlert } from "lucide-react";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<RegisterDisasterFormRef>(null);

  const handleSubmit = async () => {
    if (formRef.current) {
      const isValid = await formRef.current.submit();
      console.log("isValid", isValid);
      if (isValid) {
        setIsModalOpen(false);
      }
    }
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-gray-100 border-b border-gray-200">
      <a href="/app" className="flex justify-center items-center gap-2">
        <div className="p-2 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg group-hover:shadow-red-500/25 transition-all duration-300">
          <ShieldAlert className="text-white w-7 h-7" strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <div className="font-bold text-2xl bg-gradient-to-r from-gray-800 to-red-600 bg-clip-text text-transparent">
            Disaster Alert
          </div>
          <div className="text-sm text-gray-600 font-medium -mt-1">
            Real-time monitoring
          </div>
        </div>
      </a>
      <div className="flex items-center gap-6">
        <Button
          className="bg-red-700"
          variant="destructive"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="flex items-center gap-2">
            <div className="p-1 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors duration-300">
              <Plus className="w-4 h-4" strokeWidth={2.5} />
            </div>
            <span>Register Disaster</span>
          </div>
        </Button>

        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Register Disaster"
          positiveLabel="Submit"
          onPositive={handleSubmit}
          negativeLabel="Cancel"
          onNegative={() => setIsModalOpen(false)}
        >
          <RegisterDisasterForm ref={formRef} />
        </Modal>
      </div>
    </header>
  );
}
