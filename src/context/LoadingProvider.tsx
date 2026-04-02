import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import Loading from "../components/Loading";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(0);

  // Auto-complete loading since the 3D model is removed
  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      frame += 1;
      const progress = Math.min(frame * 5, 100);
      setLoading(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 1500);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const value = {
    isLoading,
    setIsLoading,
    setLoading,
  };

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      {isLoading && <Loading percent={loading} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};

const defaultLoading: LoadingType = {
  isLoading: true,
  setIsLoading: () => {},
  setLoading: () => {},
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  return context ?? defaultLoading;
};
