import { inside, point, polygon } from '@turf/turf';
import { Camera } from '../../../components/zone/Zone.objects';
import { LayerPoint } from '../../../components/map/Map.objects';

type LayerPoints = {
  [key: string]: LayerPoint[];
};

const calculateCameraInPolygon = (feature: GeoJSON.Feature<GeoJSON.Polygon>, layerPoints: LayerPoints): Camera[] => {
  const cameras: Camera[] = [];
  const coords = feature.geometry.coordinates as number[][][];
  const turfPoly = polygon(coords);
  
  Object.entries(layerPoints).forEach(([layerId, layerPointsArray]) => {
    layerPointsArray.forEach((lp) => {
      const turfPoint = point(lp.coordinates);
      if (inside(turfPoint, turfPoly)) {
        cameras.push({
          layerId: layerId,
          cameraId: lp.id,
          name: lp.name,
          coordinates: lp.coordinates,
          checked: true,
          tagged: true,
          zones: lp.zones,
        });
      }
    });
  });
  return cameras;
};

export default calculateCameraInPolygon;
