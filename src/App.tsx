import { useState } from "react";
import Header from "./components/Header";
import GalleryView from "./components/GalleryView";

const App: React.FC = () => {
  const [inputVal, setInputVal] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  return (
    <main>
      <Header onChange={handleChange} inputVal={inputVal} />
      <h1>Image Gallery</h1>
      <GalleryView inputVal={inputVal} />
    </main>
  );
};
export default App;
