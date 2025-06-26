import { Outlet } from "react-router-dom";
import Header from "./Header";

export function Layout() {
  return (
    <div>
      <Header />
      <main className="px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
}
