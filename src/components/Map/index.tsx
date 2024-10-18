import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, {ReactNode, useEffect, useRef} from 'react';

import PolygonsBR from './../../assets/map/br-uf.json';

import {AimOutlined} from '@ant-design/icons';

import {Button, Layout} from 'antd';
import {useMapStore} from '../../store/useMapStore';
import {useUserStore} from '../../store/useUserStore';
import Theme from '../../styles/Theme';
import {CONSTANTS} from '../../utils/constants';

mapboxgl.accessToken = CONSTANTS.MAPBOX_KEY;

interface MapProps {
  children?: ReactNode;
}

const Map: React.FC<MapProps> = ({children}) => {
  const {center, zoom, setCenter} = useMapStore();
  const {location, followLocation, getUserLocation} = useUserStore();

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

    mapRef.current.on('load', e => {
      e.target.addSource('state', {
        type: 'geojson',
        data: PolygonsBR,
        promoteId: 'CD_UF',
      });

      e.target.addLayer({
        id: 'fill-state',
        type: 'fill',
        source: 'state',
        layout: {
          visibility: 'visible',
        },
        paint: {
          'fill-color': {
            property: 'POPULATION',
            stops: [
              [0, '#ADDC91'],
              [2570160, '#6CC24A'],
              [3766528, '#509E2F'],
              [10444526, '#4A7729'],
            ],
          },
          //@ts-ignore
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'click'], false],
            1,
            ['boolean', ['feature-state', 'highlight'], false],
            1,
            ['boolean', ['feature-state', 'hover'], false],
            1,
            0.8,
          ],
        },
      });

      e.target.addLayer({
        id: 'state-borders',
        type: 'line',
        source: 'state',
        layout: {
          visibility: 'visible',
        },
        paint: {
          'line-color': '#ffffff',
          //@ts-ignore
          'line-width': [
            'case',
            ['boolean', ['feature-state', 'click'], false],
            1.8,
            ['boolean', ['feature-state', 'highlight'], false],
            1.8,
            ['boolean', ['feature-state', 'hover'], false],
            1.8,
            0.75,
          ],
          //@ts-ignore
          'line-opacity': [
            'case',
            ['boolean', ['feature-state', 'click'], false],
            1.5,
            ['boolean', ['feature-state', 'highlight'], false],
            1.5,
            ['boolean', ['feature-state', 'hover'], false],
            1.5,
            0.5,
          ],
        },
      });
    });

    // Add navigation control (the +/- zoom buttons)
    // map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Clean up on unmount
    return () => map.remove();
  }, []);

  const goToUserLocation = () => {
    getUserLocation(followLocation);
    if (location.lat !== 0 && location.long !== 0)
      setCenter([location.long, location.lat]);
  };

  useEffect(() => {
    console.log('center', center);
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: center,
        zoom: zoom,
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      });
    }
  }, [center]);

  return (
    <Layout
      style={{
        height: '100vh',
        position: 'relative',
        backgroundColor: Theme.colors.main,
      }}
    >
      <Layout.Content
        style={{height: '100vh', opacity: 0.8}}
        ref={mapContainerRef}
      />
      <Layout.Content
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        {children}
      </Layout.Content>
      <Button
        type="primary"
        icon={<AimOutlined />}
        style={{position: 'absolute', bottom: 10, right: 10, zIndex: 1}}
        onClick={goToUserLocation}
      />
    </Layout>
  );
};

export default Map;
