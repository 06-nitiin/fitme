import { AppShell } from "./components/AppShell";
import { Home } from "./pages/Home";

function App() {
  return (
    <AppShell currentSection="Home">
      <Home />
    </AppShell>
  );
}

export default App;