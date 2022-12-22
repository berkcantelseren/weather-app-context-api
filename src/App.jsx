import { useState } from "react";
import Container from "./components/Container";
import { WeatherProvider } from "./context/Weather";
import "./App.css";

function App() {
  return (
    <div className="App">
      <WeatherProvider>
        <Container />
      </WeatherProvider>
    </div>
  );
}

export default App;
