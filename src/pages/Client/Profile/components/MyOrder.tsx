import { useEffect, useState } from "react";
import { Button, Modal, notification } from "antd";
import CreateOrderForm from "./CreateOrderForm";
import confirm from "antd/es/modal/confirm";
import { useAuth } from "../../../../common/context/AuthContext";
import { OrderServices } from "../../../../services/Order/OrderServices";
import { OrderResponseId } from "../../../../types/Order/Order";
import UpdateOrderForm from "./UpdateOrderForm";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MyOrder = () => {
  const { t } = useTranslation();
  const [listData, setListData] = useState<any[]>([]);
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalEdit, setModalEdit] = useState({
    isOpen: false,
    data: undefined,
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (modalEdit.data) {
      setModalEdit({ isOpen: false, data: undefined });
      return;
    }
    setIsModalOpen(false);
  };

  const showModalEdit = (isOpen: boolean, data: any) => {
    setModalEdit({ isOpen, data });
  };

  const getAll = async () => {
    const req: OrderResponseId = await OrderServices.getAll();
    setListData(req.data);
  };

  useEffect(() => {
    if (user) getAll();
  }, [user]);

  const showDeleteConfirm = (id: string) => {
    confirm({
      title: t("Client.MyOrder.confirm.title"),
      content: t("Client.MyOrder.confirm.content"),
      okText: t("Client.MyOrder.confirm.okText"),
      cancelText: t("Client.MyOrder.confirm.cancelText"),
      okType: "danger",
      maskClosable: true,
      closable: true,
      onOk() {
        OrderServices.delete(id)
          .then(() => {
            notification.success({
              message: t("Client.MyOrder.confirm.success"),
            });
            getAll();
            closeModal();
          })
          .catch(() => {
            notification.error({ message: t("Client.MyOrder.confirm.error") });
          });
      },
    });
  };

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <h2 className="text-base font-bold mb-5">
        {t("Client.MyOrder.title", { count: listData.length })}
      </h2>
      <div className="flex justify-end m-5">
        <Button onClick={showModal}>{t("Client.MyOrder.addNew")}</Button>
      </div>

      {/* Modal thêm mới */}
      <Modal
        width={1000}
        title={t("Client.MyOrder.modal.create")}
        open={isModalOpen}
        onCancel={closeModal}
        cancelButtonProps={{ className: "hidden" }}
        okButtonProps={{ className: "hidden" }}
      >
        <CreateOrderForm
          closeModal={closeModal}
          getAll={getAll}
          initForm={modalEdit.data}
        />
      </Modal>

      {/* Modal chỉnh sửa */}
      <Modal
        width={1000}
        title={t("Client.MyOrder.modal.update")}
        open={modalEdit.isOpen}
        onCancel={closeModal}
        cancelButtonProps={{ className: "hidden" }}
        okButtonProps={{ className: "hidden" }}
      >
        <CreateOrderForm
          closeModal={closeModal}
          getAll={getAll}
          initForm={modalEdit.data}
        />
      </Modal>

      {/* Danh sách sản phẩm */}
      {listData.length === 0 ? (
        <p className="text-gray-500 text-sm">{t("Client.MyOrder.noOrder")}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {listData.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg overflow-hidden bg-white shadow-md flex flex-col"
            >
              <Link to={`/order-information/${item.id}`} target="_blank">
                <img
                  src={`${import.meta.env.VITE_KEY_IMAGEURL}${
                    item.imageUrls[0]
                  }`}
                  alt={`Mã đơn: ${item.orderCode}`}
                  className="w-full h-36 object-cover"
                />
              </Link>
              <div className="p-4 flex flex-col justify-center items-center">
                <div className="w-full">
                  <p className="text-gray-600 text-sm">
                    {t("Client.MyOrder.status")}:{" "}
                    <span className="font-bold text-blue-500">
                      {item.status}
                    </span>
                  </p>
                  <p className="text-gray-600 text-sm">
                    {t("Client.MyOrder.price")}: {item.deliveryFee.toString()}{" "}
                    VNĐ
                  </p>
                </div>
                <div className="flex flex-row justify-center items-center w-full">
                  {(item.status === "waiting" ||
                    item.status === "canceled") && (
                    <div className="w-1/2 flex justify-center items-center">
                      <Button
                        className="bg-red-500 text-white"
                        onClick={() => showModalEdit(true, item)}
                      >
                        {t("Client.MyOrder.edit")}
                      </Button>
                    </div>
                  )}
                  {item.status === "waiting" && (
                    <div className="w-1/2 justify-center items-center">
                      <Button
                        className="bg-gray-300 text-white"
                        onClick={() => showDeleteConfirm(item.id.toString())}
                      >
                        {t("Client.MyOrder.cancel")}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrder;
