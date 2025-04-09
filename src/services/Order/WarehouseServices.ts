import { Request } from "../../common/configs/Request";

export const WarehouseServices = {
  getAll: async () => {
    const res = await Request.get("/orderservice/warehouse");
    return res.data;
  },

  getById: async (id: string) => {
    const res = await Request.get(`/orderservice/warehouse/${id}`);
    return res.data;
  },
};
