import { Marker } from "../../../components/map/marker/Marker.objects";
import { visibleColumnsANPR, visibleColumnsPV, visibleStandard } from "../../../components/map/marker/panel/table/markerColumns";
import { ColumnVisibility } from "../../components/table/TableComp";

interface MarkerColumn {
  key: string;
  label: string;
}


export const determineInitialColumnVisibility = (filteredMarkers: Marker[], markerColumns: MarkerColumn[], savedVisibility: ColumnVisibility): ColumnVisibility => {
  const columnVisibility: ColumnVisibility = {}; // Object to store the visibility of each column

  markerColumns.forEach(column => {
    columnVisibility[column.key] = savedVisibility.hasOwnProperty(column.key) ? savedVisibility[column.key] : false;
  });

  // Determine the presence of each marker type
  const hasANPR = filteredMarkers.some(marker => marker.markerType === 'anpr');
  const hasPV = filteredMarkers.some(marker => marker.markerType === 'pv');
  const hasInfo = filteredMarkers.some(marker => marker.markerType === 'info');

  // Function to set visibility for a given set of columns
  const setVisibleColumns = (columns: string[]) => {
    columns.forEach(columnKey => {
      columnVisibility[columnKey] = true;
    });
  };


  // If there are only 'info' markers or 'info' is mixed with other types
  if (hasInfo || filteredMarkers.length === 1) {
    setVisibleColumns(visibleStandard);
  }

  // For 'pv' type markers (alone or mixed with 'info'), add 'pv' specific columns on top of standard ones
  if (hasPV) {
    setVisibleColumns(visibleColumnsPV);
  }

  // Similarly, for 'anpr' type markers (alone or mixed with 'info'), add 'anpr' specific columns on top of standard ones
  if (hasANPR) {
    setVisibleColumns(visibleColumnsANPR);
  }

  return columnVisibility;
};