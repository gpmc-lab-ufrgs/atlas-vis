import React, { useRef, useEffect, ReactNode } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { AimOutlined } from '@ant-design/icons';

import { CONSTANTS } from '../../utils/constants';
import { Button, Layout } from 'antd';
import { useMapStore } from '../../store/useMapStore';
import Theme from '../../styles/Theme';
import { useUserStore } from '../../store/useUserStore';

mapboxgl.accessToken = CONSTANTS.MAPBOX_KEY;

interface MapProps {
    children?: ReactNode;
}

const Map: React.FC<MapProps> = ({ children }) => {
  const { center, zoom, setCenter } = useMapStore();
  const { location, followLocation, getUserLocation } = useUserStore();
  
  const mapContainerRef = useRef<any>();
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    // Initialize map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: CONSTANTS.MAPBOX_STYLE,
      center: center,
      zoom: zoom,
    });

    mapRef.current = map;
    
    // Add navigation control (the +/- zoom buttons)
    // map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    // Clean up on unmount
    return () => map.remove();
  }, []);

    const goToUserLocation = () => {
        getUserLocation(followLocation);
        if (location.lat !== 0 && location.long !== 0)
            setCenter([location.long, location.lat]);
    }

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: center,
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      });
    }
  }, [center]);

  return(
    <Layout style={{ height: '100vh', position: 'relative', backgroundColor: Theme.colors.main }}>
      <Layout.Content style={{ height: '100vh', opacity: 0.8 }} ref={mapContainerRef} />
      <Layout.Content style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        {children}
      </Layout.Content>
      <Button
        type="primary"
        icon={<AimOutlined />}
        style={{ position: 'absolute', bottom: 10, right: 10, zIndex: 1 }}
        onClick={goToUserLocation}
       />
    </Layout>
  );
};

export default Map;