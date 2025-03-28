import { useState } from "react";
import { notification, Button, Modal } from "antd";

const Notifications = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <h2 className="text-base font-bold mb-5">Thông tin thanh toán đấu giá</h2>
      <div className="space-y-4">
        {[1, 2, 3].map((id) => (
          <div
            key={id}
            className="border rounded-lg p-4 bg-white shadow-md flex justify-between items-stretch"
          >
            <div>
              <h3 className="text-sm font-semibold text-gray-800">
                Phiên đấu giá #{id}
              </h3>
              <div className="mt-2 space-y-2">
                <p className="text-gray-600">
                  Số tiền cần thanh toán:{" "}
                  <span className="text-sm font-semibold text-green-500">
                    1.000.000 VNĐ
                  </span>
                </p>
                <p className="text-gray-600">
                  Thời hạn thanh toán:{" "}
                  <span className="font-semibold">01/04/2025 12:00:00</span>
                </p>
                <p className="text-gray-600">
                  Trạng thái:{" "}
                  <span className="font-semibold text-yellow-500">
                    Chờ thanh toán
                  </span>
                </p>
                <p className="text-gray-600">
                  Thời gian kết thúc phiên:{" "}
                  <span className="font-semibold">31/03/2025 18:00</span>
                </p>
              </div>
            </div>
            <Button
              type="primary"
              className="bg-blue-600 hover:bg-blue-700 text-white h-full"
              onClick={() => setIsModalOpen(true)}
            >
              Thanh toán
            </Button>
          </div>
        ))}
      </div>

      <Modal
        width={1000}
        title="Xác nhận giao dịch"
        open={isModalOpen}
        onCancel={closeModal}
        cancelButtonProps={{ className: "hidden" }}
        okButtonProps={{ className: "hidden" }}
      >
        <div className="transaction-success-modal">
          <h2>Xác nhận giao dịch!</h2>
          <p>Bạn đang thực hiện giao dịch.</p>
          <div className="transaction-details">
            <p>
              <strong>Mã giao dịch:</strong> TX123456789
            </p>
            <p>
              <strong>Số tiền:</strong> 1.000.000 VNĐ
            </p>
            <p>
              <strong>Thời gian:</strong> {new Date().toLocaleString()}
            </p>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() =>
                notification.success({ message: "Giao dịch thành công!" })
              }
              className=" bg-green-500 text-white h-full p-3"
            >
              Giao dịch thành công
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Notifications;
