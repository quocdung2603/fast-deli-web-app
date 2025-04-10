import { Request } from "../../common/configs/Request";
import { Shipper } from "../../types/Shipper/Shipper";

export const ShipperServices = {
  getAll: async () => {
    const res = await Request.get("/shipperservice/shipper");
    return res.data;
  },

  getByUserId: async (userId: string) => {
    const res = await Request.get(
      `/shipperservice/shipper/findByUserId/${userId}`
    );
    return res.data;
  },

  getByShipperId: async (shipperId: string) => {
    const res = await Request.get(`/shipperservice/shipper/${shipperId}`);
    return res.data;
  },

  create: async (data: any) => {
    const req = {
      ...data,
      password: "123456",
      role: "shipper",
      accountStatus: "Active",
    };
    const res = await Request.post("/shipperservice/shipper", req);
    return res.data;
  },

  update: async (id: string, data: Shipper) => {
    const res = await Request.put(`/shipperservice/shipper/${id}`, data);
    return res.data;
  },

  delete: async (id: string) => {
    const res = await Request.delete(`/shipperservice/shipper/${id}`);
    return res.data;
  },
};
