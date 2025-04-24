import { Request } from "../../common/configs/Request";
import { Warehouse } from "../../types/Order/Warehouse";

export const WarehouseServices = {
  getAll: async () => {
    const res = await Request.get("/orderservice/warehouse");
    return res.data;
  },

  getById: async (id: string) => {
    const res = await Request.get(`/orderservice/warehouse/${id}`);
    return res.data;
  },

  create: async (data: Warehouse) => {
    console.log("data", data);
    const dataReq = {
      name: data.name,
      type: data.type,
      location: data.location,
    };
    console.log("Req", dataReq);
    const res = await Request.post("/orderservice/warehouse", dataReq);
    return res.data;
  },

  update: async (id: string, data: Warehouse) => {
    const dataReq = {
      name: data.name,
      type: data.type,
      location: data.location,
    };
    const res = await Request.put(`/orderservice/warehouse/${id}`, dataReq);
    return res.data;
  },

  delete: async (id: string) => {
    const res = await Request.delete(`/orderservice/warehouse/${id}`);
    return res.data;
  },
};
