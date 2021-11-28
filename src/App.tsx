import { TopBar } from './Pages/FilesExplorer/Components/TopBar';
import { FilesExplorer } from './Pages/FilesExplorer/FilesExplorer';

export const App = function App() {
  return (
    <div className="page-container">
      <TopBar />
      <FilesExplorer />
    </div>
  );
};
