import { GeoPoint } from "../GeoPoint";

type Tracking = {
  id: string;
  orderId: string;
  description: string;
  status: string;
  location: GeoPoint;
  nextLocation: GeoPoint;
  timeStamp: Date;
  updateTimeStamp: Date;
  shipperId: string;
};

export { type Tracking };

export interface TrackingResponse {
  code: number;
  message: string;
  data: Tracking[];
}
