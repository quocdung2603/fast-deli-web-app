import { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import CreateOrderForm from "./CreateOrderForm";
import { useAuth } from "../../../../common/context/AuthContext";

const MyOrder = () => {
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

  const getAll = () => {};

  const mockData = [
    {
      assetID: 1,
      assetName: "Laptop Dell XPS 15",
      mainImage: "https://via.placeholder.com/150",
      status: "Pending",
      assetPrice: 30000000,
    },
    {
      assetID: 2,
      assetName: "iPhone 15 Pro Max",
      mainImage: "https://via.placeholder.com/150",
      status: "available",
      assetPrice: 35000000,
    },
  ];

  useEffect(() => {
    if (user) getAll();
  }, [user]);

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <h2 className="text-base font-bold mb-5">
        Sản phẩm đã gửi ({mockData.length}) {/* Ignore spell-check */}
      </h2>
      <div className="flex justify-end m-5">
        <Button onClick={showModal}>Thêm mới</Button> {/* Ignore spell-check */}
      </div>
      <Modal
        width={1000}
        title="Thêm mới thông tin" {/* Ignore spell-check */}
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
        title="Sửa Thông tin" {/* Ignore spell-check */}
        open={modalEdit.isOpen}
        onCancel={closeModal}
        cancelButtonProps={{ className: "hidden" }}
        okButtonProps={{ className: "hidden" }}
      >
        {/* <UpdateForm initForm={modalEdit.data} closeModal={closeModal} /> */}
      </Modal>
      {mockData.length === 0 ? (
        <p className="text-gray-500 text-sm">Chưa có sản phẩm nào được gửi</p> {/* Ignore spell-check */}
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mockData.map((asset) => (
            <div
              key={asset.assetID}
              className="border rounded-lg overflow-hidden bg-white shadow-md flex flex-col"
            >
              <img
                src={asset.mainImage}
                alt={asset.assetName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {asset.assetName}
                </h3>
                <p className="text-gray-600">
                  Trạng thái:{" "} {/* Ignore spell-check */}
                  <span className="font-bold text-blue-500">
                    {asset.status}
                  </span>
                </p>
                <p className="text-gray-600">
                  Giá: {asset.assetPrice.toLocaleString()} VNĐ
                </p>
                {asset.status !== "available" && (
                  <div className="flex justify-end">
                    <Button
                      className="bg-red text-white"
                      onClick={() => showModalEdit(true, asset)}
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
