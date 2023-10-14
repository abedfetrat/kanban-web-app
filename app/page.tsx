import RouteGuard from "./RouteGuard";
import Home from "./home/Home";

export default function Page() {
  return (
    <RouteGuard>
      <Home />
    </RouteGuard>
  );
}
