import { Request } from "../../common/configs/Request";

export const TrackingServices = {
  getByOrderId: async (orderId: string) => {
    const res = await Request.get(
      `/orderservice/tracking/getbyorder/${orderId}`
    );
    return res.data;
  },

  getByShipperId: async (userId: string) => {
    const res = await Request.get(
      `/orderservice/tracking/gettrackingbyshipperid/${userId}`
    );
    return res.data;
  },

  getHistoryShipperTracking: async (shipperId: string) => {
    const res = await Request.get(
      `/orderservice/tracking/getHistoryShipper/${shipperId}`
    );
    return res.data;
  },

  checkTrackingShipperAndOrderId: async (
    shipperId: string,
    orderId: string
  ) => {
    const res = await Request.get(
      `/orderservice/tracking/checkshipperIdandorderId/${shipperId}/${orderId}`
    );
    return res.data;
  },
};
