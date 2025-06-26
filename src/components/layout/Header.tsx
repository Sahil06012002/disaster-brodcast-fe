import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { useRef, useState } from "react";
import RegisterDisasterForm from "../RegisterDisasterForm";
import type { RegisterDisasterFormRef } from "../RegisterDisasterForm";

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
      // If invalid, modal stays open and validation errors are shown
    }
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-gray-100 border-b border-gray-200">
      <div className="font-bold text-2xl">Disaster Broadcast System</div>
      <div className="flex items-center gap-6">
        {/* <nav>
          <ul className="flex gap-6 list-none m-0 p-0">
            <li>
              <a
                href="#"
                className="no-underline text-gray-800 hover:text-blue-600"
              >
                Home
              </a>
            </li>
          </ul>
        </nav> */}
        <Button
          className="bg-red-700"
          variant="destructive"
          onClick={() => setIsModalOpen(true)}
        >
          Register Disaster
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
