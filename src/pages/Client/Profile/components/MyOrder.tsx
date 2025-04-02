import { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import CreateOrderForm from "./CreateOrderForm";
import { useAuth } from "../../../../common/context/AuthContext";
import { OrderServices } from "../../../../services/Order/OrderServices";
import { Order } from "../../../../types/Order/Order";

const MyOrder = () => {
  const [listData, setListData] = useState<Order[]>([]);
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
    OrderServices.getAll().then((res) => {
      setListData(res.data);
      //console.log(res.data);
    });
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
        <p>ALO</p>
        {/* <UpdateForm initForm={modalEdit.data} closeModal={closeModal} /> */}
      </Modal>
      {listData.length === 0 ? (
        <p className="text-gray-500 text-sm">Chưa có sản phẩm nào được gửi</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {listData.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg overflow-hidden bg-white shadow-md flex flex-col"
            >
              <img
                src={item.images}
                alt={`Mã đơn: ${item.orderCode}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                {/* <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {asset.assetName}
                </h3> */}
                <p className="text-gray-600">
                  Trạng thái: {/* Ignore spell-check */}
                  <span className="font-bold text-blue-500">{item.status}</span>
                </p>
                <p className="text-gray-600">
                  Giá: {item.deliveryFee.toString()} VNĐ
                </p>
                {item.status !== "available" && (
                  <div className="flex justify-end">
                    <Button
                      className="bg-red text-white"
                      onClick={() => showModalEdit(true, item)}
                    >
                      Edit
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrder;
