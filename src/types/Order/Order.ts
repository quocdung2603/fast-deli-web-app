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
  images: any;
  status: string;
  createAt: Date;
  updateAt: Date;
  locationSender: GeoPoint;
  locationReciver: GeoPoint;
};

export { type Order };

export interface OrderResponse {
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
  imageUrls: string[]; // Assuming images is an array of any type
  status: string;
  createAt: Date | string; // Adjusted to allow for different date formats
  updateAt: Date | string; // Adjusted to allow for different date formats
  locationSender: GeoPoint;
  locationReciver: GeoPoint;
}

export interface OrderResponseId {
  code: number;
  message: string;
  data: OrderResponse[];
}

//FOR GET ORDER BY ID
export interface OrderResponseById {}

interface InfoUser {
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  dateOfBirth: string | null;
  address: string | null;
  gender: boolean;
  nationality: string | null;
  accountStatus: string;
  createdAt: string;
  updatedAt: string;
  role: string;
}

interface OrderData {
  id: string;
  infoUser: InfoUser;
  orderCode: string;
  senderAddress: string;
  reciverName: string;
  reciverPhone: string;
  receiverAddress: string;
  note: string;
  weight: number;
  deliveryFee: number;
  imageUrls: string[];
  status: string;
  createAt: string;
  updateAt: string;
}

export interface OrderResponseInfo {
  code: number;
  message: string;
  data: OrderData;
}
