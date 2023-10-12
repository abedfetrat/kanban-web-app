import Home from "./home/Home";
import Login from "./login/Login";

export default function Page() {
  /* TODO: Conditionally render Login or Home page based on auth state */
  return (
    <Login />
    /* <Home /> */
  );
}
