import { Outlet } from "react-router";
import Header from "./components/UI/Header";
import Footer from "./components/UI/Footer";

function App() {
  return (
    <div className="flex flex-col max-w-screen-3xl mx-auto">
      <Header />
      <main className="grow pb-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
