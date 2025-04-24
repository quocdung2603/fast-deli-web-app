import { GeoPoint } from "../GeoPoint";

type Warehouse = {
  id: string;
  name: string;
  type: string;
  address?: string;
  location: GeoPoint;
};

export { type Warehouse };
