import { Request } from "../../common/configs/Request";

export const ShipperServices = {
  getAll: async () => {
    const res = await Request.get("/shipperservice/shipper");
    return res.data;
  },

  getById: async (userId: string) => {
    const res = await Request.get(
      `/shipperservice/shipper/findByUserId/${userId}`
    );
    return res.data;
  },
};
