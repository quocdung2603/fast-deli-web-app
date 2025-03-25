import { GeoPoint } from "../GeoPoint";

type Warehouse = {
  id: string;
  name: string;
  type: string;
  location: GeoPoint;
};

export { type Warehouse };
