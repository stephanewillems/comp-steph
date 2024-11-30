import { Dispatch } from 'redux';


import moment from 'moment';
import { MultiMap } from '../../../components/map/mapSlice';
import { reverseGeocoding } from '../../../components/general/helperFunctions';
import { Marker, MarkerType, Report } from '../../../components/map/marker/Marker.objects';
import { postMarkerByCollabId, upSertMarkerAddToMap } from '../../../components/map/marker/markerSlice';

interface PlotMarkerOnMapParams {
  lat: number;
  lon: number;
  currentMapId: string;
  multiMap: MultiMap;
  currentPNumber: string;
  userName: string;
  dispatch: Dispatch<any>;
  collaborationId: string;
  markerType?: MarkerType;
  marker?: Partial<Marker>;
}

export const plotMarkerOnMap = async ({
  lat,
  lon,
  currentMapId,
  multiMap,
  currentPNumber,
  userName,
  dispatch,
  collaborationId,
  markerType,
  marker
}: PlotMarkerOnMapParams) => {
  let newMarkerId = '';
  if(marker?.markerId === undefined) {
  newMarkerId = crypto.randomUUID();
  } else {
    newMarkerId = marker?.markerId as string;
  }


  const timestamp = marker?.timestamp ? marker.timestamp :  moment().format('YYYY-MM-DDTHH:mm');
  const name = marker ? marker.name as string : '';

  const reports: Report[] = [
    {
        id: currentMapId,
        name: multiMap.mapName,
      },
  ];
  const { address, location } = await reverseGeocoding(lat, lon);
  const newGeoJSONFeature: GeoJSON.Feature = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [lon, lat],
    },
    properties: {
      markerId: newMarkerId,
      markerType: 'info',
      name: ' ',
      timestamp,
    },
  };




  const newMarker: Marker = {
    address: address,
    groups: [],
    lat: lat,
    lon: lon,
    markerId: newMarkerId,
    markerType: markerType ? markerType :'info',
    name,
    timestamp: timestamp,
    date: moment().format('DD/MM/YYYY'),
    time: moment().format('HH:MM'),
    isoChrone: undefined,
    isoChroneEnabled: false,
    isoChroneMode: undefined,
    isoChroneTime: undefined,
    isoChroneColor: undefined,
    geoJSONFeature: newGeoJSONFeature,
    reports: reports,
    district: '',
    region: '',
    followNumber: '',
    note: '',
    objectCode: '',
    pvId: '',
    reportComponentType: '',
    SMACluster: '',
    displayNumber: '',
    imageUrls: [],
    docId: '',
    country: '',
    lpn: '',
    createdBy: {
      pNumber: currentPNumber,
      fullName: userName,
      email: '',
    },
    createdAt: moment().format('YYYY-MM-DDTHH:mm:ss'),
    location: location,
    tags: [],
    isAttempted: false,
    destination: '',
    qlfFact: '',
    updatedAt: moment().format('YYYY-MM-DDTHH:mm:ss'),
    updatedBy: {
      pNumber: '',
      fullName: '',
      email: '',
    },
    camera: '',
    isVisible: true,
    isRemovable: true,
    privateIp: marker?.privateIp || '',
    publicIp: marker?.publicIp || '',
    reference: marker?.reference || '',
    isp: marker?.isp || '',
    ispData: marker?.ispData || { ipId: '', ipAddressSourceType: '' }
  };


  dispatch(upSertMarkerAddToMap({ marker: newMarker, mapId: currentMapId }));
  dispatch(
    postMarkerByCollabId({
      marker: newMarker,
      collaborationId: collaborationId,
      pNumber: currentPNumber,
      currentMapId: currentMapId,
    })
  );
};
