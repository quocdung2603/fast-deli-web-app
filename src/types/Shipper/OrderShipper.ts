type OrderShipper = {
  id: string;
  orderId: string;
  shipperId: string;
  locationCurrent: string;
  locationDelivery: string;
  assignedAt: Date;
  status: string;
};

export { type OrderShipper };
