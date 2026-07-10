import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import UltraHD from "./components/UltraHD/UltraHD";
import Memory from "./components/Memory/Memory";
import Capture from "./components/Capture/Capture";
import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "./components/Footer/Footer";

export default function Home() {
  return (
    <div style={{ position: "relative" }}>
      <Navbar />
      <Hero />
      <UltraHD />
      <Memory />
      <Capture />
      <Testimonials />
      <Footer />
    </div>
  );
}
