import { parseAsFloat, useQueryStates } from "nuqs";
import { createContext, useContext, type PropsWithChildren } from "react";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface CoordinatesContextValue {
  coordinates: Coordinates;
  setCoordinates: (data: Coordinates) => void;
}

export const CoordinatesContext = createContext({} as CoordinatesContextValue);

export const search = {
  latitude: parseAsFloat.withDefault(-23.5505),
  longitude: parseAsFloat.withDefault(-46.6333),
}

export function CoordinatesProvider({ children }: PropsWithChildren) {
  const [coordinates, setCoordinates] = useQueryStates(search)

  return (
    <CoordinatesContext.Provider value={{ coordinates, setCoordinates }}>
      {children}
    </CoordinatesContext.Provider>
  )
}

export const useCoordinates = () => {
  const context = useContext(CoordinatesContext)

  if (!context) {
    throw new Error('useCoordinates must be used within a CoordinatesProvider')
  }

  return context
}