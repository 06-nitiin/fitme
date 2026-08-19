import { useState } from "react";
import { AppShell, type AppSection } from "./components/AppShell";
import { Avatar } from "./pages/Avatar";
import { Home } from "./pages/Home";
import { OutfitBuilder } from "./pages/OutfitBuilder";
import { Wardrobe } from "./pages/Wardrobe";

function App() {
  const [activeSection, setActiveSection] = useState<AppSection>("home");

  return (
    <AppShell activeSection={activeSection} onNavigate={setActiveSection}>
      {activeSection === "home" && <Home />}
      {activeSection === "avatar" && <Avatar />}
      {activeSection === "wardrobe" && <Wardrobe />}
      {activeSection === "builder" && <OutfitBuilder />}
    </AppShell>
  );
}

export default App;
