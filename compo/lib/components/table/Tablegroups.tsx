import React, { useEffect, useState } from 'react';
import { EuiComboBox, EuiComboBoxOptionOption } from '@elastic/eui';
import { Marker } from '../../../components/map/marker/Marker.objects';
import { MarkerProps } from '../../../components/map/Map.objects';
import { selectGroups, selectMarker } from '../../../components/map/marker/markerSlice';
import { useAppSelector } from '../../../app/hooks';

interface Props extends MarkerProps {
  handleChangeGroups: (groups: string[]) => void;
  handleNewgroup:(group:string)=>void;
  markerLocal:Marker
}

/**
 * Groups to show in marker popover
 * @return {JSX.Element}
 * @author Stéphane
 */
function Tablegroups({ markerId,handleChangeGroups,markerLocal,handleNewgroup }: Props): JSX.Element {
  
  const groups = useAppSelector((state) => selectGroups(state));
  const [groupsLocal, setGroupsLocal] = useState<string[]>(groups);
  const marker = useAppSelector((state) => selectMarker(state, markerId) as Marker);
  const [options, setOptions] = useState<EuiComboBoxOptionOption[]>([]);

  // Update options if groups change
  useEffect(() => {
    const newOptions = groupsLocal.map((x) => ({
      label: x,
    }));
    setOptions(newOptions);
  }, [groupsLocal]);

  /**
   * Function to handle a change in selected groups
   * @param {EuiComboBoxOptionOption[]} selection
   */
  function handleChange(selection: EuiComboBoxOptionOption[]) {
     handleChangeGroups(selection.map((x) => x.label));
     setGroupsLocal(selection.map((x) => x.label));
  }

  /**
   * Function to create a new option (group)
   * @param {string} searchValue
   */
  function onCreateOption(searchValue: string) {
    // Limit to max 128 characters
    const newGroup = searchValue.length > 128 ? searchValue.slice(0, 128).trim() : searchValue.trim();

    // Add group to marker unless already present
    // This will trigger an update of group via useeffect in marker panel
    if (!marker.groups.includes(newGroup)) {
      handleNewgroup(newGroup);
    }
  }

  return (
    <>
      <div className='w-full'>
          <EuiComboBox
            className="w-full truncate"
            compressed={true}
            fullWidth={true}
            options={options}
            selectedOptions={markerLocal.groups.map((x) => ({
              key: x,
              label: x,
            }))}
            onChange={handleChange}
            onCreateOption={onCreateOption}
          />
      </div>
    </>
  );
}

export default Tablegroups;
