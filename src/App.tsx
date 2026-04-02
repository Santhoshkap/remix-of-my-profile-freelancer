import { Suspense } from "react";
import "./App.css";

import EarthGlobe from "./components/EarthGlobe";
import MainContainer from "./components/MainContainer";
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  return (
    <>
      <LoadingProvider>
        <Suspense>
          <MainContainer>
            <Suspense>
              <EarthGlobe />
            </Suspense>
          </MainContainer>
        </Suspense>
      </LoadingProvider>
    </>
  );
};

export default App;
