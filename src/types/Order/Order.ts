import { GeoPoint } from "../GeoPoint";

type Order = {
  id: string;
  userId: string;
  orderCode: string;
  senderAddress: string;
  reciverName: string;
  reciverPhone: string;
  receiverAddress: string;
  note: string;
  weight: number;
  deliveryFee: number;
  imageUrls: Array<string>;
  status: string;
  createAt: Date;
  updateAt: Date;
  locationSender: GeoPoint;
  locationReciver: GeoPoint;
};

export { type Order };
