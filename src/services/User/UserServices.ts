import { Request } from "../../common/configs/Request";

export const UserServices = {
  getAll: async () => {
    const response = await Request.get("/userservice");
    return response.data;
  },

  login: async (email: string, password: string) => {
    const res = await Request.post("/userservice/auth", { email, password });
    return res.data;
  },

  checktoken: async (token: string | null | undefined) => {
    const response = await Request.post("/userservice/auth/checktoken", {
      token,
    });
    return response.data;
  },

  findUserByToken: async (token: string | null | undefined) => {
    const response = await Request.get(`/userservice/findbytoken/${token}`);
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await Request.put(`/userservice/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await Request.delete(`/userservice/${id}`);
    return response.data;
  },
};
