import { useState } from 'react';
import SecurityTicker from './components/SecurityTicker';
import Sidebar from './components/Sidebar';
import LandingPage from './components/LandingPage';
import LiveDashboard from './components/LiveDashboard';
import FoodGastronomy from './components/FoodGastronomy';
import AROverlays from './components/AROverlays';
import QueryFeedback from './components/QueryFeedback';
import TournamentHub from './components/TournamentHub';
import ChatButton from './components/ChatButton';
import Footer from './components/Footer';

type Section = 'home' | 'dashboard' | 'food' | 'ar' | 'feedback' | 'tournament';

const sectionContent: Partial<Record<Section, React.ReactNode>> = {
  dashboard: <LiveDashboard />,
  food: <FoodGastronomy />,
  ar: <AROverlays />,
  feedback: <QueryFeedback />,
  tournament: <TournamentHub />,
};

export default function App() {
  const [active, setActive] = useState<Section>('home');

  const navigate = (id: string) => setActive(id as Section);

  if (active === 'home') {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <SecurityTicker />
        <LandingPage onEnter={navigate} />
        <ChatButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <SecurityTicker />
      <Sidebar active={active} onNavigate={navigate} />
      <main className="pl-16 pt-9 min-h-screen">
        <div className="max-w-6xl mx-auto px-8 py-10">
          {sectionContent[active]}
          <Footer />
        </div>
      </main>
      <ChatButton />
    </div>
  );
}
