import { Marker } from "../../../components/map/marker/Marker.objects";

export const ensureGeoJSONFeature = (marker: Marker) => {
  if (!marker.geoJSONFeature) {
    return {
      ...marker,
      geoJSONFeature: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [marker.lon, marker.lat],
        },
        properties: {
          markerId: marker.markerId,
          markerType: marker.markerType,
          address: marker.address,
          name: marker.name,
          timestamp: marker.timestamp,
        },
      },
    };
  }
  return marker;
};