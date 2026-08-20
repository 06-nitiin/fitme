import { useState } from "react";
import { AppShell, type AppSection } from "./components/AppShell";
import { Avatar } from "./pages/Avatar";
import { Home } from "./pages/Home";
import { OutfitBuilder } from "./pages/OutfitBuilder";
import { SavedOutfits } from "./pages/SavedOutfits";
import { Wardrobe } from "./pages/Wardrobe";
import type { SavedOutfit } from "./types/fitme";

function App() {
  const [activeSection, setActiveSection] = useState<AppSection>("home");
  const [editingOutfit, setEditingOutfit] = useState<SavedOutfit | null>(null);

  function handleNavigate(section: AppSection) {
    if (section === "builder") {
      setEditingOutfit(null);
    }

    setActiveSection(section);
  }

  function openSavedOutfitInBuilder(outfit: SavedOutfit) {
    setEditingOutfit(outfit);
    setActiveSection("builder");
  }

  function startFreshOutfit() {
    setEditingOutfit(null);
  }

  return (
    <AppShell activeSection={activeSection} onNavigate={handleNavigate}>
      {activeSection === "home" && <Home />}
      {activeSection === "avatar" && <Avatar />}
      {activeSection === "wardrobe" && <Wardrobe />}
      {activeSection === "builder" && (
        <OutfitBuilder
          key={editingOutfit?.id ?? "new-outfit"}
          editingOutfit={editingOutfit}
          onStartFresh={startFreshOutfit}
        />
      )}
      {activeSection === "outfits" && <SavedOutfits onEdit={openSavedOutfitInBuilder} />}
    </AppShell>
  );
}

export default App;
