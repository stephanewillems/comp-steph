import { User } from './generateLayerPoints.d';
import { LayerPoint } from '../../../components/map/Map.objects';

const generateLayerPoints = (
  layerData: GeoJSON.FeatureCollection,
  user: User,
  zoneExtension: boolean
): LayerPoint[] => {
  const layerPointsArray: LayerPoint[] = [];
  layerData.features.forEach((x) => {
    if ('coordinates' in x.geometry && x.geometry.type === 'Point' && x.properties) {
      if (x.properties.zones.includes(user.zone) || zoneExtension) {
        const newPoint: LayerPoint = {
          coordinates: x.geometry.coordinates as [number, number],
          id: x.properties.id,
          name: x.properties.name,
          zones: x.properties.zones,
        };
        layerPointsArray.push(newPoint);
      }
    }
  });

  return layerPointsArray;
};

export default generateLayerPoints;
