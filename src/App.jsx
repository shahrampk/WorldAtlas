import { Outlet } from "react-router";
import Header from "./components/UI/Header";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow pb-10">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
