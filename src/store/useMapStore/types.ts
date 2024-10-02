
export type MapStoreType = {

    center: mapboxgl.LngLatLike,
    zoom: number,

    setCenter(center: mapboxgl.LngLatLike): void;
    setZoom(zoom: number): void;
    clearMapStore(): void;

  };
  