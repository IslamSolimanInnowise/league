import { FC } from 'react';
import AppContext from './contexts/global-context';
import Header from '@components/Header';
import GalleryView from '@components/GalleryView';

const App: FC = () => {
  return (
    <main>
      <AppContext>
        <Header />
        <h1>Image Gallery</h1>
        <GalleryView />
      </AppContext>
    </main>
  );
};
export default App;
