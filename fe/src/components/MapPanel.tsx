import React, { useEffect } from 'react';

import 'ol/ol.css';

import * as OpenLayers from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZSource from 'ol/source/XYZ';

import Proj4 from 'proj4';
import * as Proj4ForOpenLayers from 'ol/proj/proj4';
import * as OpenLayersProjection from 'ol/proj';

/**
 * Proj4
 */
Proj4.defs('EPSG:5181', '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');
Proj4ForOpenLayers.register(Proj4);

/**
 * Basemap Layer
 */
export const olBasemapLayerSource = new XYZSource({
  url: 'http://xdworld.vworld.kr:8080/2d/Base/201802/{z}/{x}/{y}.png',
});
export const olBasemapLayer = new TileLayer({
  source: olBasemapLayerSource,
});

/**
 * Map
 */
const olMap = new OpenLayers.Map({
  target: undefined,
  layers: [
    olBasemapLayer,
  ],
  view: new OpenLayers.View({
    projection: OpenLayersProjection.get('EPSG:5181'),
    extent: [-571788.2791710637, -118088.35180366022, 966821.1122766702, 1009872.7140915857], // vworld bbox 좌표
    center: [198089.1532405267, 451902.48625725874], // 서울시청 좌표
    minZoom: 8,
    maxZoom: 16,
    zoom: 14
  }),
  controls: [],
});

/* Component Props/State */
type Props = {};

/* Component */
const MapPanel: React.FC<Props> = () => {
  /* useEffect :: map.target */
  useEffect(() => {
    olMap.setTarget(document.getElementById('map') || undefined);
    return () => {
      olMap.setTarget(undefined);
    };
  }, []);

  return (
    <div id='map' style={{ width: '100%', height: '100%' }} />
  );
};

export default MapPanel;
