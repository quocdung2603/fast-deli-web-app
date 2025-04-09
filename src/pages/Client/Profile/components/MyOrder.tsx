import { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import CreateOrderForm from "./CreateOrderForm";
import { useAuth } from "../../../../common/context/AuthContext";
import { OrderServices } from "../../../../services/Order/OrderServices";
import {
  Order,
  OrderResponse,
  OrderResponseId,
} from "../../../../types/Order/Order";
import UpdateOrderForm from "./UpdateOrderForm";
import { Link } from "react-router-dom";
import { ClientRouterLink } from "../../../../utils/RouterLink";

const MyOrder = () => {
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
      setModalEdit({
        isOpen: false,
        data: undefined,
      });
      return;
    }
    setIsModalOpen(false);
  };
  const showModalEdit = (isOpen: boolean, data: any) => {
    setModalEdit({
      isOpen,
      data,
    });
  };

  const getAll = async () => {
    const req: OrderResponseId = await OrderServices.getAll();
    setListData(req.data);
    console.log("req", req.data);
  };

  useEffect(() => {
    if (user) getAll();
  }, [user]);

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <h2 className="text-base font-bold mb-5">
        Sản phẩm đã gửi ({listData.length})
      </h2>
      <div className="flex justify-end m-5">
        <Button onClick={showModal}>Thêm mới</Button>
      </div>
      <Modal
        width={1000}
        title="Thêm mới thông tin"
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
      <Modal
        width={1000}
        title="Sửa Thông tin"
        open={modalEdit.isOpen}
        onCancel={closeModal}
        cancelButtonProps={{ className: "hidden" }}
        okButtonProps={{ className: "hidden" }}
      >
        <UpdateOrderForm
          initForm={modalEdit.data}
          closeModal={closeModal}
          getAll={getAll}
        />
      </Modal>
      {listData.length === 0 ? (
        <p className="text-gray-500 text-sm">Chưa có sản phẩm nào được gửi</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {listData.map((item) => (
            <Link
              to={`/order-information/${item.id}`}
              target="_blank"
              key={item.id}
              className="border rounded-lg overflow-hidden bg-white shadow-md flex flex-col"
            >
              <img
                src={`${import.meta.env.VITE_KEY_IMAGEURL}${item.imageUrls[0]}`}
                alt={`Mã đơn: ${item.orderCode}`}
                className="w-full h-36 object-cover"
              />
              <div className="p-4 flex flex-row justify-center items-center">
                <div className="flex flex-col flex-start w-3/4">
                  <p className="text-gray-600 text-sm">
                    Trạng thái: {/* Ignore spell-check */}
                    <span className="font-bold text-blue-500">
                      {item.status}
                    </span>
                  </p>
                  <p className="text-gray-600 text-sm">
                    Giá: {item.deliveryFee.toString()} VNĐ
                  </p>
                </div>
                {(item.status === "waiting" || item.status === "canceled") && (
                  <div className="w-1/4">
                    <Button
                      className="bg-red-500 text-white"
                      onClick={() => showModalEdit(true, item)}
                    >
                      Edit
                    </Button>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrder;
