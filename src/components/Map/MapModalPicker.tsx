// components/Input/MapModalPicker.tsx
import React, { useState } from "react";
import { Modal, Button } from "antd";
import InputMapPicker from "../Input/InputMapPicker";
import { GeoPoint } from "../../types/GeoPoint";

interface SingleMapModalPickerProps {
  value: GeoPoint;
  onChange: (val: GeoPoint) => void;
  label: string;
  multiple?: false;
  maxMarkers?: number;
  AdditionalLocations?: GeoPoint[];
}

interface MultiMapModalPickerProps {
  value: GeoPoint[];
  onChange: (val: GeoPoint[]) => void;
  label: string;
  multiple: true;
  maxMarkers?: number;
  AdditionalLocations?: GeoPoint[];
}

type MapModalPickerProps = SingleMapModalPickerProps | MultiMapModalPickerProps;

const MapModalPicker: React.FC<MapModalPickerProps> = ({
  value,
  onChange,
  label,
  multiple = false,
  maxMarkers = 5,
  AdditionalLocations = [],
}) => {
  const [open, setOpen] = useState(false);

  const handleOk = () => setOpen(false);
  const handleCancel = () => setOpen(false);

  return (
    <>
      <Button type="dashed" onClick={() => setOpen(true)}>
        {label}
      </Button>
      <Modal
        title={label}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        width={900}
      >
        {multiple ? (
          <InputMapPicker
            value={value as GeoPoint[]}
            onChange={onChange as (val: GeoPoint[]) => void}
            multiple={true}
            maxMarkers={maxMarkers}
            AdditionalLocations={AdditionalLocations as GeoPoint[]}
          />
        ) : (
          <InputMapPicker
            value={value as GeoPoint}
            onChange={onChange as (val: GeoPoint) => void}
            multiple={false}
            maxMarkers={maxMarkers}
            AdditionalLocations={AdditionalLocations as GeoPoint[]}
          />
        )}
      </Modal>
    </>
  );
};

export default MapModalPicker;
