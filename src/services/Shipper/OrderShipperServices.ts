import { Request } from "../../common/configs/Request";

export const OrderShipperServices = {
  getByShipperId: async (shipperId: string) => {
    const res = await Request.get(
      `shipperservice/ordershipper/findbyshipperid/${shipperId}`
    );
    return res.data;
  },
};
