import React, { useEffect, useState } from 'react'
import { EditIcon } from '../../icons/edit';
import { Marker, Report } from '../../../components/map/marker/Marker.objects';
import { putMarkerByCollabId, selectMarker, upsertMarker } from '../../../components/map/marker/markerSlice';
import { addMarkerToMultiMap, deletMarkerFromMultiMapByMarkerId, selectAllMapsByMarkerId } from '../../../components/map/mapSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { VmarkIcon } from '../../icons/vmark';
import { XmarkIcon } from '../../icons/xmark';
import Mapnames from '../../../components/map/marker/slideOver/slideOverFields/Mapnames';
import TableMaps from '../../../components/map/marker/panel/table/TableMaps';
import { selectCaseId } from '../../../components/general/caseSlice';
import { selectUserPnumber } from '../../../components/general/userSlice';
import QuestionCircleIcon from '../../icons/questionMark';
import { useTranslation } from 'react-i18next';

interface CellProps {
  width?: string;
  maxWidth?: string;
  className?: string;
  pill?: boolean;
  value: Report[];
  id?: string;
  column: Marker;
}

const EditMaps = ({ column, value, maxWidth, width }: CellProps) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState(false);
  const [hover, setHover] = useState(false);
  const marker = useAppSelector((state) => selectMarker(state, column.markerId)) as Marker;
  const [localMarker, setLocalMarker] = useState<Marker>(marker as Marker);
  const markerPerMap = useAppSelector((state) => selectAllMapsByMarkerId(state, column.markerId))
  const collaborationId = useAppSelector(selectCaseId)
  const pNumber = useAppSelector(selectUserPnumber)

  const [help, setHelp] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  }
  const handleMouseLeave = () => {
    setHover(false);
  }
  const styleHover = (hover) ? 'fill-[#CDD1D8] hover:fill-primary' : 'fill-none'

  const handleChangeMaps = (maps: Report[]) => {
    setLocalMarker({ ...localMarker, reports: maps });
  }
  const onCancelClick = () => {
    setEdit(false)
  }
  const reportMapIds = new Set(localMarker.reports.map((report) => report.id));

  // Create a set of unique mapIds from the markerPerMap array
  const markerMapIds = new Set(markerPerMap.map((map) => map.mapId));
  const onSubmit = () => {
    dispatch(upsertMarker({
      markerId: column.markerId,
      marker: localMarker
    }))
    markerPerMap.forEach((map) => {
      if (!reportMapIds.has(map.mapId)) {
        dispatch(deletMarkerFromMultiMapByMarkerId({ markerId: localMarker.markerId, mapId: map.mapId }));
      }
    });

    // Remove markers from markerPerMap if localMarker.reports is empty
    if (localMarker.reports.length === 0) {
      markerPerMap.forEach((map) => {
        dispatch(deletMarkerFromMultiMapByMarkerId({ markerId: localMarker.markerId, mapId: map.mapId }));
      });
    }

    // Add markers to markerPerMap for mapIds in localMarker.reports but not in markerPerMap
    localMarker.reports.forEach((report) => {
      if (!markerMapIds.has(report.id)) {
        dispatch(addMarkerToMultiMap({ marker: localMarker, mapId: report.id }));
      }
    });
    dispatch(putMarkerByCollabId({ marker: localMarker, collaborationId, pNumber }))
    setEdit(false)
  }

  useEffect(() => {
    setLocalMarker(column as Marker)
  }, [marker]
  )

  const handleHoverHelp = () => {
    setHelp(true)
  }
  const handleLeaveHelp = () => {
    setHelp(false)
  }

  if(marker.lat === 0 && marker.lon === 0){
    return <>
    <div className="flex flex-row items-center gap-3">
      <p>{t('multiMap.bulkUploadNotAvailable')}</p>
      <QuestionCircleIcon className='fill-primary' onMouseEnter={handleHoverHelp} onMouseLeave={handleLeaveHelp} />
    </div>
    {
      help && <div className="absolute p-2 bg-white rounded-lg shadow-lg">
        <p>{t('multiMap.bulkUploadNotAvailableText1')}</p>
        <p>{t('multiMap.bulkUploadNotAvailableText2')}</p>
      </div>
    }
    </>
  }

  return (
    <>
      {
        edit ?
          <div className='flex flex-row items-center justify-start h-full gap-2' style={{
            width: width,
            maxWidth: maxWidth,
          }}>
            <TableMaps markerId={column.markerId} handleChangeMaps={handleChangeMaps} />
            <div className='z-50 flex flex-row gap-1 mr-5'>
              <button onClick={onSubmit}><VmarkIcon className='hover:fill-[#0073E6] fill-[#BAC3D4]' /></button>
              <button onClick={onCancelClick}><XmarkIcon className='hover:fill-[#ff0008] fill-[#BAC3D4]' /></button>
            </div>
          </div>
          :
          <div className="flex flex-row items-center justify-between w-full " onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
            <Mapnames reports={value as Report[]} />
            <EditIcon className={`w-3 h-3 mx-2 cursor-pointer ${styleHover} `} height="15" width="15" onClick={() => setEdit(true)} />
          </div>
      }
    </>
  )
}

export default EditMaps