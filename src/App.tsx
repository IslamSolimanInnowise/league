import { FC } from "react";
import Header from "./components/Header";
import GalleryView from "./components/GalleryView";
import AppContext from "./contexts/global-context";

const App: FC = () => {
  return (
    <AppContext>
      <main>
        <Header />
        <h1>Image Gallery</h1>
        <GalleryView />
      </main>
    </AppContext>
  );
};
export default App;
