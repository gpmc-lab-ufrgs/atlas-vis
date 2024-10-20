import {create} from 'zustand';

import {MapStoreType} from './types';

const initialState = {
  center: [-58, -15] as mapboxgl.LngLatLike,
  zoom: 3, //12,
  drawerVisible: false,
  drawerLLMVisible: false,
};

export const useMapStore = create<MapStoreType>()(set => ({
  ...initialState,
  setDrawerVisible: (drawerVisible: boolean) => set({drawerVisible}),

  openDrawer: () => set({drawerVisible: true}),
  closeDrawer: () => set({drawerVisible: false}),

  openDrawerLLM: () => set({drawerLLMVisible: true}),
  closeDrawerLLM: () => set({drawerLLMVisible: false}),

  setCenter: (center: mapboxgl.LngLatLike) => set({center}),
  setZoom: (zoom: number) => set({zoom}),

  setHighlightedPolygonId: (
    highlightedPolygonId: number | string | null | undefined
  ) => set({highlightedPolygonId}),
  setSelectedState: (selectedState: string | null | undefined) =>
    set({selectedState}),
  setSelectedDistrict: (selectedDistrict: string | null | undefined) =>
    set({selectedDistrict}),

  clearMapStore: () => set(initialState),
}));
