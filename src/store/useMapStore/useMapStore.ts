import {create} from 'zustand';

import { MapStoreType } from './types';

const initialState = {
    center: [-58, -15] as mapboxgl.LngLatLike,
    zoom: 12,
};

export const useMapStore = create<MapStoreType>()(set => ({
    ...initialState,
    setCenter: (center: mapboxgl.LngLatLike) => set({center}),
    setZoom: (zoom: number) => set({zoom}),
    clearMapStore: () => set(initialState),

}));
