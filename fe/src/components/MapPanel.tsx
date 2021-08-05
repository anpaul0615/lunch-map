import React, { useEffect } from 'react';

import 'ol/ol.css';

import * as OpenLayers from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZSource from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

import OpenLayersStyle from 'ol/style/Style';
import FillStyle from 'ol/style/Fill';
import StrokeStyle from 'ol/style/Stroke';
import CircleStyle from 'ol/style/Circle';
import TextStyle from 'ol/style/Text';

import WKTFormat from 'ol/format/WKT';

import Proj4 from 'proj4';
import * as Proj4ForOpenLayers from 'ol/proj/proj4';
import * as OpenLayersProjection from 'ol/proj';

import StoreFormModal from './StoreFormModal';

import { useStore, useStoreForm } from '../hooks/store';


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
 * Store Layer
 */
export const olStoreLayerFeatureSource = new VectorSource();
export const olStoreLayer = new VectorLayer({
  source: olStoreLayerFeatureSource,
  style: function (storeFeature) {
    const { name } = storeFeature.getProperties();
    return new OpenLayersStyle({
      image: new CircleStyle({
        radius: 30,
        fill: new FillStyle({
          color: '#04ACEB',
        }),
        stroke: new StrokeStyle({
          color: 'rgba(255, 255, 255, 0.6)',
          width: 4,
        }),
      }),
      text: new TextStyle({
        text: name ?? 'no-name',
        font: 'bold 16px gothic',
        fill: new FillStyle({
          color: '#fff',
        }),
      }),
      zIndex: 10,
    });
  },
});

/**
 * Map
 */
const olMap = new OpenLayers.Map({
  target: undefined,
  layers: [
    olBasemapLayer,
    olStoreLayer,
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
  const {stores} = useStore();
  const {openStoreRegistrationModal, updateStoreFormInput} = useStoreForm();

  /* useEffect :: stores */
  useEffect(() => {
    // 식당 목록 지도표출
    const wktFormatter = new WKTFormat();
    const features = stores.map((_store) => {
      const storeFeature = wktFormatter.readFeature(_store.locationWKT);
      storeFeature.setProperties({ ..._store });
      return storeFeature;
    });
    olStoreLayerFeatureSource.addFeatures(features);

    return () => {
      olStoreLayerFeatureSource.clear();
    };
  }, [stores]);

  /* useEffect :: event handler */
  useEffect(() => {
    // 식당 클릭이벤트 핸들러
    const storeClickEventHander = (ev: OpenLayers.MapBrowserEvent<any>) => {
      const locationWKT = `POINT (${ev.coordinate[0]} ${ev.coordinate[1]})`;
      updateStoreFormInput({ locationWKT });
      openStoreRegistrationModal();
    };
    olMap.on('singleclick', storeClickEventHander);

    return () => {
      olMap.un('singleclick', storeClickEventHander);
    };
  }, [updateStoreFormInput, openStoreRegistrationModal]);

  /* useEffect :: map.target */
  useEffect(() => {
    olMap.setTarget(document.getElementById('map') || undefined);
    return () => {
      olMap.setTarget(undefined);
    };
  }, []);

  return (
    <div id='map' style={{ width: '100%', height: '100%' }}>
      <StoreFormModal />
    </div>
  );
};

export default MapPanel;
