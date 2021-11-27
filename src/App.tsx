import { TopBar } from './Components/TopBar';
import { FilesExplorer } from './Pages/FilesExplorer';

export const App = function App() {
  return (
    <div className="page-container">
      <TopBar />
      <FilesExplorer />
    </div>
  );
};
