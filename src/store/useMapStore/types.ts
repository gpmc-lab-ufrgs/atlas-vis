
export type MapStoreType = {

    center: mapboxgl.LngLatLike,
    zoom: number,
    drawerVisible: boolean;
    drawerLLMVisible: boolean;

    setDrawerVisible(drawerVisible: boolean): void;
    openDrawer(): void;
    closeDrawer(): void;

    openDrawerLLM(): void;
    closeDrawerLLM(): void;

    setCenter(center: mapboxgl.LngLatLike): void;
    setZoom(zoom: number): void;
    clearMapStore(): void;


  };
  