import { AggregatedMarkerType, Marker } from "../../../components/map/marker/Marker.objects";
import { Filter } from "../../../components/map/marker/markerSlice";


export const filteredAggregatedMarkersFn = (aggregatedMarkers: AggregatedMarkerType[], filter: Filter): AggregatedMarkerType[] => {
  const filteredAggregatedMarkers = aggregatedMarkers.filter((aggregatedMarker: AggregatedMarkerType) => {
    // Check if any marker within the aggregated marker meets the filter criteria
    const hasFilteredMarker = aggregatedMarker.markers.some((marker: Marker) => {
      let isFiltered = true;
      if (filter.name.value.length > 0) {
        isFiltered = isFiltered && filter.name.value.includes(marker.name);
      }
      if (filter.type.value.length > 0) {
        isFiltered = isFiltered && filter.type.value.includes(marker.markerType);
      }
      if (filter.group.value.length > 0) {
        isFiltered = isFiltered && filter.group.value.some((g) => marker.groups.includes(g));
      }
      if (filter.address.value.length > 0) {
        isFiltered = isFiltered && marker.address.toLowerCase().includes(filter.address.value.toLowerCase());
      }
      if (filter.postalCode.value.length > 0 && marker.location) {
        isFiltered = isFiltered && filter.postalCode.value.includes(marker.location.postalCode);
      }
      if (filter.street.value.length > 0 && marker.location) {
        isFiltered = isFiltered && filter.street.value.includes(marker.location.street);
      }
      if (filter.createdBy.value.length > 0) {
        isFiltered = isFiltered && filter.createdBy.value.includes(marker.createdBy!.fullName);
      }
      if (filter.qlfFact.value.length > 0) {
        isFiltered = isFiltered && filter.qlfFact.value.includes(marker.qlfFact!);
      }
      if (filter.SMACluster.value.length > 0) {
        isFiltered = isFiltered && filter.SMACluster.value.includes(marker.SMACluster);
      }
      if (filter.destination.value.length > 0) {
        isFiltered = isFiltered && filter.destination.value.includes(marker.destination!);
      }
      if (filter.tags.value.length > 0 && marker.tags) {
        const tags = marker.tags || [];
        isFiltered = isFiltered && filter.tags.value.some((t) => tags.includes(t));
      }
      if (filter.reports.value.length > 0 && marker.reports) {
        isFiltered = isFiltered && filter.reports.value.some((r) => marker.reports.some((report) => report.name === r));
      }
      if (filter.customOne.value.length > 0 && marker.custom_1?.label !== undefined) {
        isFiltered = isFiltered && filter.customOne.value.includes(marker.custom_1.label);
      }
      if (filter.customTwo.value.length > 0 && marker.custom_2?.label !== undefined) {
        isFiltered = isFiltered && filter.customTwo.value.includes(marker.custom_2.label);
      }
      if (filter.customThree.value.length > 0 && marker.custom_3?.label !== undefined) {
        isFiltered = isFiltered && filter.customThree.value.includes(marker.custom_3.label);
      }
      if (filter.customFour.value.length > 0 && marker.custom_4?.label !== undefined) {
        isFiltered = isFiltered && filter.customFour.value.includes(marker.custom_4.label);
      }
      if (filter.customFive.value.length > 0 && marker.custom_5?.label !== undefined) {
        isFiltered = isFiltered && filter.customFive.value.includes(marker.custom_5.label);
      }

      return isFiltered;
    });

    return hasFilteredMarker;
  });

  return filteredAggregatedMarkers;
};
