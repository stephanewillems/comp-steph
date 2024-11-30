import { Marker } from "../../../components/map/marker/Marker.objects";

export  const getMarkersCountForMap = (mapId: string, markers: Marker[]) => {
    return markers.filter((marker : Marker) => marker.reports.some(report => report.id === mapId)).length;
  };
