import Header from "./components/UI/Header";
import Footer from "./components/UI/Footer";
import { Outlet, ScrollRestoration } from "react-router-dom";

function App() {
  return (
    // <div className="flex flex-col max-w-screen-3xl mx-auto">
    <>
      <ScrollRestoration />
      <Header />
      <main className="pb-10">
      <Outlet />
      </main>
      <Footer />
    </>
    // </div>
  );
}

export default App;
