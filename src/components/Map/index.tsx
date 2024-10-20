import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, {ReactNode, useEffect, useRef} from 'react';

import PolygonsBR from './../../assets/map/br-uf.json';

import {AimOutlined} from '@ant-design/icons';

import {Button, Layout} from 'antd';
import {useTranslation} from 'react-i18next';
import {useMapStore} from '../../store/useMapStore';
import {useUserStore} from '../../store/useUserStore';
import Theme from '../../styles/Theme';
import {CONSTANTS} from '../../utils/constants';

mapboxgl.accessToken = CONSTANTS.MAPBOX_KEY;

interface MapProps {
  children?: ReactNode;
}

const Map: React.FC<MapProps> = ({children}) => {
  const {
    center,
    zoom,
    setCenter,
    highlightedPolygonId,
    setHighlightedPolygonId,
  } = useMapStore();
  const {location, followLocation, getUserLocation} = useUserStore();
  const {i18n} = useTranslation();
  const [hoveredId, setHoveredId] = React.useState<number | null>(null);

  const mapContainerRef = useRef<any>();
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (hoveredId && hoveredId !== highlightedPolygonId?.id) {
      mapRef.current?.setFeatureState(
        {
          source: 'state',
          id: hoveredId as number,
        },
        {hover: false}
      );
      setHoveredId(null);
    }
    if (highlightedPolygonId) {
      mapRef.current?.setFeatureState(
        {
          source: 'state',
          id: highlightedPolygonId?.id as number,
        },
        {hover: true}
      );
      setHoveredId(highlightedPolygonId?.id as number);
    }
  }, [highlightedPolygonId, mapRef.current]);

  useEffect(() => {
    // Initialize map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: CONSTANTS.MAPBOX_STYLE,
      center: center,
      zoom: zoom,
    });

    mapRef.current = map;

    mapRef.current.on('load', () => {
      mapRef.current?.addSource('state', {
        type: 'geojson',
        data: PolygonsBR,
        promoteId: 'CD_UF',
      });

      mapRef?.current?.addLayer({
        id: 'fill-state',
        type: 'fill',
        source: 'state',
        layout: {
          visibility: 'visible',
        },
        paint: {
          'fill-color': '#1cbea9',
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'click'], false],
            0,
            ['boolean', ['feature-state', 'highlight'], false],
            0,
            ['boolean', ['feature-state', 'hover'], false],
            0.3,
            0,
          ],
        },
      });

      mapRef?.current?.addLayer({
        id: 'state-borders',
        type: 'line',
        source: 'state',
        layout: {
          visibility: 'visible',
        },
        paint: {
          'line-color': '#000',
          //   'line-width': 2,
          //@ts-ignore
          'line-width': [
            'case',
            ['boolean', ['feature-state', 'click'], false],
            1.5,
            ['boolean', ['feature-state', 'highlight'], false],
            1.5,
            ['boolean', ['feature-state', 'hover'], false],
            1.5,
            0.75,
          ],
          //@ts-ignore
          'line-opacity': [
            'case',
            ['boolean', ['feature-state', 'click'], false],
            1.5,
            ['boolean', ['feature-state', 'highlight'], false],
            3,
            ['boolean', ['feature-state', 'hover'], false],
            1.5,
            0.5,
          ],
        },
      });

      mapRef?.current?.on('mousemove', 'fill-state', (e: any) => {
        if (e.features.length > 0) {
          setHighlightedPolygonId(e.features[0]);
          //   setCenter(e.lngLat);
        }
      });

      mapRef?.current?.on('mouseleave', 'fill-state', () => {
        setHighlightedPolygonId(null);
      });

      e.target.on('click', 'fill-state', (e: mapboxgl.EventData) => {
        if (e.features.length > 0) {
          console.log(e.features[0]);
        }
      });
    });

    // Add navigation control (the +/- zoom buttons)
    // map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Clean up on unmount
    return () => map.remove();
  }, []);

  useEffect(() => {
    mapRef.current?.setLanguage(i18n.language);
  }, [i18n.language]);

  const goToUserLocation = () => {
    getUserLocation(followLocation);
    if (location.lat !== 0 && location.long !== 0)
      setCenter([location.long, location.lat]);
  };

  useEffect(() => {
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
