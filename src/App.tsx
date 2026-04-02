import { lazy, Suspense } from "react";
import "./App.css";

const HeroVisual = lazy(() => import("./components/Globe/Globe"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  return (
    <>
      <LoadingProvider>
        <Suspense>
          <MainContainer>
            <Suspense>
              <div className="character-model">
                <HeroVisual />
              </div>
            </Suspense>
          </MainContainer>
        </Suspense>
      </LoadingProvider>
    </>
  );
};

export default App;
