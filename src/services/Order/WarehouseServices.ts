import { Request } from "../../common/configs/Request";

export const WarehouseServices = {
  getAll: async () => {
    const res = await Request.get("/orderservice/warehouse");
    return res.data;
  },

  
};
