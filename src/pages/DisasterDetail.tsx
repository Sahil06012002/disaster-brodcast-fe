import { useLocation } from "react-router-dom";

import Reports from "@/components/ui/Reports";

export default function DisasterDetail() {
  const location = useLocation();
  const { disaster_id, title } = location.state;

  return (
    <div>
      <Reports disaster_id={disaster_id} title={title}></Reports>
    </div>
  );
}
