import "./App.css";

import { WeatherProvider } from "./context/WeatherProvider";
import WeatherPage from "./components/pages/WeatherPage";

function App() {
  return (
    <>
      <WeatherProvider>
        <WeatherPage />
      </WeatherProvider>
    </>
  );
}

export default App;
