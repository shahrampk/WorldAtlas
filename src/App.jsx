import { Outlet } from "react-router";
import Header from "./components/UI/Header";

function App() {
  return (
    <div className="flex flex-col max-w-screen-3xl mx-auto">
      <Header />
      <main className="grow pb-10">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
