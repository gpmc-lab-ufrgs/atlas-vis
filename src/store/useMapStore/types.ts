export type MapStoreType = {
  center: mapboxgl.LngLatLike;
  zoom: number;
  drawerVisible: boolean;
  drawerLLMVisible: boolean;
  highlightedPolygonId?: number | string | null | undefined;
  selectedState?: string | null | undefined;
  selectedDistrict?: string | null | undefined;

  setDrawerVisible(drawerVisible: boolean): void;
  openDrawer(): void;
  closeDrawer(): void;

  openDrawerLLM(): void;
  closeDrawerLLM(): void;

  setCenter(center: mapboxgl.LngLatLike): void;
  setZoom(zoom: number): void;

  setHighlightedPolygonId(
    highlightedPolygonId: number | string | null | undefined
  ): void;
  setSelectedState(selectedState: string | null | undefined): void;
  setSelectedDistrict(selectedDistrict: string | null | undefined): void;

  clearMapStore(): void;
};
