import { AggregatedMarkerType, Marker, Markers } from "../../../components/map/marker/Marker.objects";
/**
 * Computes aggregated markers from an array of markers. This function groups markers by their address and creates an aggregated marker for each address containing more than one marker. Each aggregated marker includes the total number of markers at that address and an array of those markers.
 *
 * @typedef {Object} Marker - Represents a single marker.
 * @property {string} address - The address of the marker.
 * @property {number} lat - The latitude of the marker.
 * @property {number} lon - The longitude of the marker.
 * 
 *
 * @typedef {Object} AggregatedMarker - Represents an aggregated marker.
 * @property {string} aggregatedMarkerId - The id of the aggregated marker.
 * @property {string} aggregatedMapId - The id of the map that the aggregated marker belongs to.
 * @property {string} address - The common address of the aggregated markers.
 * @property {number} lat - The latitude of the aggregated markers.
 * @property {number} lon - The longitude of the aggregated markers.
 * @property {number} count - The count of aggregated markers.
 * @property {Marker[]} markers - An array of markers that have been aggregated.
 *
 * @param {Marker[]} markersArray - An array of marker objects to be aggregated.
 * @param {string} currentMapId - The id of the map that the markers belong to.
 * @return {AggregatedMarker[]} An array of aggregated marker objects.
 */
export function computeAggregatedMarkers(markersArray: Markers, currentMapId: string): AggregatedMarkerType[] {
  const addressMap: { [key: string]: Marker[] } = {};
  // Group markers by address and mapId
  markersArray.forEach((marker: Marker) => {
    let key;
    if (marker.markerType === 'anpr') {
      // Use latitude and longitude as the key for ANPR markers
      key = `${marker.lat},${marker.lon}`;
    } else {
      // Use address as the key for other types of markers
      key = (marker.address || '').toLowerCase();
    }

    if (!addressMap[key]) {
      addressMap[key] = [marker];
    } else {
      addressMap[key].push(marker);
    }
  });
  // Create aggregated markers for keys with more than one marker
  const aggregatedMarkers: AggregatedMarkerType[] = Object.values(addressMap).map(markers => {
    if (markers.length > 1) {
      const markerTypes = markers.map(marker => marker.markerType);
      const aggregatedMarkerId = "agg_" + crypto.randomUUID().toString();
  
      return {
        aggregatedMarkerId: aggregatedMarkerId,
        aggregatedMapId: currentMapId,
        address: markers[0].address,
        lat: markers[0].lat,
        lon: markers[0].lon,
        count: markers.length,
        markers,
        markerTypes
      };
    }
    return null;
  }).filter((marker): marker is AggregatedMarkerType => marker !== null);
  

  return aggregatedMarkers;
}

  