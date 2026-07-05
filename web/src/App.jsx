import Header from "./components/Header";
import Hero from "./components/Hero";
import BeforeAfter from "./components/BeforeAfter";
import SocialProof from "./components/SocialProof";
import CourseContent from "./components/CourseContent";
import Instructor from "./components/Instructor";
import Pricing from "./components/Pricing";
import Faq from "./components/Faq";
import RegistrationCta from "./components/RegistrationCta";
import AgendaAppendix from "./components/AgendaAppendix";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";
import { TicketCountsProvider } from "./context/TicketCountsContext";
import { useReveal } from "./hooks/useReveal";
import "./styles/shared.css";
import "./App.css";

function App() {
  useReveal();

  return (
    <TicketCountsProvider>
      <div className="page">
        <Header />
        <Hero />
        <BeforeAfter />
        <SocialProof />
        <CourseContent />
        <Instructor />
        <Pricing />
        <Faq />
        <RegistrationCta />
        <AgendaAppendix />
        <Footer />
        <FloatingActions />
      </div>
    </TicketCountsProvider>
  );
}

export default App;
