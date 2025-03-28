import { Request } from "../../common/configs/Request";

export const OrderService = {
  getAll: async () => {
    const res = await Request.get("/orderservice");
    return res.data;
  },

  getById: async (id: string) => {
    const res = await Request.get(`/orderservice/${id}`);
    return res.data;
  },
};
