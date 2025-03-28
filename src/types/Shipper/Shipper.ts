import { GeoPoint } from "../GeoPoint";
import { Vehicle } from "./Vehicle";

type Shipper = {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: boolean;
  address: string;
  vehicle: Vehicle;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  shipperArea: GeoPoint[];
};

export { type Shipper };

export interface ShipperResponse {
  code: number;
  message: string;
  data: Shipper;
}
