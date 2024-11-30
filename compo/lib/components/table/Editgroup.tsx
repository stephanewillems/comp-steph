import React, { useState } from 'react';
import { EditIcon } from '../../icons/edit';
import { Marker } from '../../../components/map/marker/Marker.objects';
import Tablegroups from './Tablegroups';
import { putMarkerByCollabId, upsertMarker } from '../../../components/map/marker/markerSlice';
import { updateMarkerinAllMultiMaps } from '../../../components/map/mapSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { VmarkIcon } from '../../icons/vmark';
import { XmarkIcon } from '../../icons/xmark';
import GroupNames from '../../../components/map/marker/slideOver/slideOverFields/GroupNames';
import { selectCaseId } from '../../../components/general/caseSlice';
import { selectUserPnumber } from '../../../components/general/userSlice';

interface CellProps {
  width?: string;
  maxWidth?: string;
  className?: string;
  pill?: boolean;
  value: string[];
  id?: string;
  column: Marker;
}

const Editgroup = ({ column, value, maxWidth, width }: CellProps) => {
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState(false);
  const [hover, setHover] = useState(false);
  const [localMarker, setLocalMarker] = useState<Marker>(column as Marker);
  const collaborationId = useAppSelector(selectCaseId);
  const pNumber = useAppSelector(selectUserPnumber);

  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };
  const styleHover = hover ? 'fill-[#CDD1D8] hover:fill-primary' : 'fill-none';

  const handleNewgroup = (group: string) => {
    setLocalMarker({ ...localMarker, groups: [...localMarker.groups, group] });
    setEdit(true);
  };

  const handleGroups = (groups: string[]) => {
    setLocalMarker({ ...localMarker, groups: groups });
    setEdit(true);
  };
  const onCancelClick = () => {
    setEdit(false);
  };
  const onSubmit = () => {
    const marker: Marker = {
      ...column,
      groups: localMarker.groups,
    };
    dispatch(
      upsertMarker({
        markerId: column.markerId,
        marker,
      })
    );
    dispatch(updateMarkerinAllMultiMaps({ marker }));
    dispatch(putMarkerByCollabId({ marker, collaborationId, pNumber }));
    setEdit(false);
  };

  return (
    <>
      {edit ? (
        <div className="flex w-full flex-row items-center gap-2 ">
          <Tablegroups
            markerId={column.markerId}
            handleChangeGroups={handleGroups}
            markerLocal={localMarker}
            handleNewgroup={handleNewgroup}
          />
          <div className="z-50 flex flex-row gap-1">
            <button onClick={onSubmit}>
              <VmarkIcon className="fill-[#BAC3D4] hover:fill-[#0073E6]" />
            </button>
            <button onClick={onCancelClick}>
              <XmarkIcon className="fill-[#BAC3D4] hover:fill-[#ff0008]" />
            </button>
          </div>
        </div>
      ) : (
        <div
          className="flex flex-row items-center justify-between truncate"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            width: width,
            maxWidth: maxWidth,
          }}
        >
          <GroupNames groups={value as string[]} />
          <EditIcon
            className={`mx-2 h-3 w-3 cursor-pointer ${styleHover} `}
            height="15"
            width="15"
            onClick={() => setEdit(true)}
          />
        </div>
      )}
    </>
  );
};

export default Editgroup;
