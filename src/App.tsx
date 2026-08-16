import { useState } from "react";
import { AppShell } from "./components/AppShell";
import { Avatar } from "./pages/Avatar";
import { Home } from "./pages/Home";

type AppSection = "home" | "avatar";

function App() {
  const [activeSection, setActiveSection] = useState<AppSection>("home");

  return (
    <AppShell activeSection={activeSection} onNavigate={setActiveSection}>
      {activeSection === "home" ? <Home /> : <Avatar />}
    </AppShell>
  );
}

export default App;
