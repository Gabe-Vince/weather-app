import { create } from 'zustand';

interface CurrentCity {
  lat: number;
  lon: number;
  cityName: string;
}

interface CurrentCityState {
  currentCity: CurrentCity;
  setCurrentCity: (city: CurrentCity) => void;
}

export const useCurrentCityStore = create<CurrentCityState>((set) => ({
  currentCity: { lat: 52.0799838, lon: 4.3113461, cityName: 'Den Haag' },
  setCurrentCity: (city) => set({ currentCity: city }),
}));
