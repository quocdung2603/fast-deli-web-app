import { useEffect, useState } from "react";
import { notification } from "antd";
import { useAuth } from "../../../../common/context/AuthContext";

// Định nghĩa interface
interface AuctionSession {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  paymentDeadline: number;
  assetId: number;
  depositFee: string;
  bidStep: string;
  isDelete: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface HistoryEntry {
  id: number;
  userId: number;
  bidAmount: string;
  bidTime: string;
  auctionSession: AuctionSession;
}

interface ResponseData{
  code: number,
  message: string,
  metadata: {
    historyEntries: HistoryEntry[]
  }
}

const History = () => {
  const {user}=useAuth();
  const [historyEntries,setHistoryEntries] = useState<HistoryEntry[]>([]);

  // Hàm định dạng ngày giờ
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("vi-VN", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  // Hàm định dạng số tiền
  const formatCurrency = (amount: string) => {
    return parseFloat(amount).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const getAllBidPrice= async ()=>{
    // try {
    //   const res:ResponseData = await AuctionSessionServices.getAllHistoryBid();
    //   const filterUser= res.metadata.historyEntries.filter((item)=>item.userId===user?.id)
    //   setHistoryEntries(filterUser);
    // } catch (error) {
    //   notification.error({message: "Lỗi lấy dữ liệu"})
    // }
  }

  useEffect(()=>{
    getAllBidPrice();
  },[user])

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-semibold mb-4">Lịch sử</h1>
      {historyEntries.length === 0 ? (
        <p className="text-gray-500">Không có lịch sử nào.</p>
      ) : (
        <div className="space-y-4">
          {historyEntries.map((entry) => (
            <div
              key={entry.id}
              className="border border-gray-200 rounded-md p-4 shadow-sm"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">
                  {entry.auctionSession.name}
                </h2>
                <span
                  className={`px-2 py-1 text-sm rounded ${
                    new Date() < new Date(entry.auctionSession.endTime)
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {new Date() < new Date(entry.auctionSession.endTime)
                    ? "Đang diễn ra"
                    : "Đã kết thúc"}
                </span>
              </div>
              <div className="mt-2 text-gray-600">
                <p>
                  <strong>Số tiền đấu giá:</strong>{" "}
                  {formatCurrency(entry.bidAmount)}
                </p>
                <p>
                  <strong>Thời gian đấu giá:</strong>{" "}
                  {formatDateTime(entry.bidTime)}
                </p>
                <p>
                  <strong>Thời gian bắt đầu:</strong>{" "}
                  {formatDateTime(entry.auctionSession.startTime)}
                </p>
                <p>
                  <strong>Thời gian kết thúc:</strong>{" "}
                  {formatDateTime(entry.auctionSession.endTime)}
                </p>
                <p>
                  <strong>Phí đặt cọc:</strong>{" "}
                  {formatCurrency(entry.auctionSession.depositFee)}
                </p>
                <p>
                  <strong>Bước giá:</strong>{" "}
                  {formatCurrency(entry.auctionSession.bidStep)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;