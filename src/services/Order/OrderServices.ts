import axios from "axios";
import { Request } from "../../common/configs/Request";
import { Order } from "../../types/Order/Order";

const API_URL = "http://localhost:8181/api/orderservice";

export const OrderServices = {
  getAll: async () => {
    const res = await Request.get("/orderservice");
    return res.data;
  },

  getById: async (id: string) => {
    const res = await Request.get(`/orderservice/${id}`);
    return res.data;
  },

  create: async (data: Order) => {
    const order = {
      userId: data.userId,
      senderAddress: data.senderAddress,
      reciverName: data.reciverName,
      reciverPhone: data.reciverPhone,
      receiverAddress: data.receiverAddress,
      weight: data.weight,
      deliveryFee: data.deliveryFee,
      status: data.status,
      images: data.images,
      "locationSender.latitude": data.locationSender.latitude,
      "locationSender.longitude": data.locationSender.longitude,
      "locationReciver.latitude": data.locationReciver.latitude,
      "locationReciver.longitude": data.locationReciver.longitude,
      note: data.note,
    };
    const res = await Request.post("/orderservice", order, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("res", res.data);
    return res.data;
  },

  // create: async (data: Order) => {
  //   const formData = new FormData();

  //   // Append dữ liệu thông thường
  //   formData.append("userId", data.userId);
  //   formData.append("senderAddress", data.receiverAddress);
  //   formData.append("reciverName", data.reciverName);
  //   formData.append("reciverPhone", data.reciverPhone);
  //   formData.append("receiverAddress", data.receiverAddress);
  //   formData.append("note", data.note);
  //   formData.append("weight", data.weight.toString()); // Chuyển đổi số thành chuỗi
  //   formData.append("deliveryFee", data.deliveryFee.toString());
  //   formData.append("status", data.status);

  //   // Append GeoPoint (chuyển thành JSON string vì FormData không hỗ trợ object)
  //   formData.append(
  //     "locationSender.latitude",
  //     data.locationSender.latitude.toString()
  //   );
  //   formData.append(
  //     "locationSender.longitude",
  //     data.locationSender.longitude.toString()
  //   );
  //   formData.append(
  //     "locationReciver.latitude",
  //     data.locationReciver.latitude.toString()
  //   );
  //   formData.append(
  //     "locationReciver.longitude",
  //     data.locationReciver.longitude.toString()
  //   );

  //   // Append images (nếu có)
  //   formData.append("images", data.images); // Giả sử images là một mảng các file, bạn có thể lặp qua và append từng file nếu cần

  //   // Gửi request
  //   const response = await Request.post(API_URL, formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   });

  //   return response.data;
  // },

  update: async (id: string, data: Order) => {
    const res = await Request.put(`/orderservice/${id}`, data);
    return res.data;
  },

  delete: async (id: string) => {
    const res = await Request.delete(`/orderservice/${id}`);
    return res.data;
  },
};
