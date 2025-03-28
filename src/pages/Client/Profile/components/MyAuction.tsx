import { useState } from "react";

const MyAuction = () => {
  const [filterAuction, setFilterAuction] = useState<string>("Tất cả");

  // Dữ liệu giả lập
  const mockAuctions = [
    {
      id: 1,
      name: "Sản phẩm 1",
      status: "Đang diễn ra",
    },
    {
      id: 2,
      name: "Sản phẩm 2",
      status: "Đã kết thúc",
    },
    {
      id: 3,
      name: "Sản phẩm 3",
      status: "Chưa bắt đầu",
    },
  ];

  // Hàm lọc theo trạng thái
  const filterAuctions = (status: string) => {
    setFilterAuction(status);
  };

  return (
    <>
      <div className="w-full bg-black rounded-t-md px-6 pt-4 pb-3">
        <p className="text-white text-xl font-semibold">Đấu giá của tôi</p>
      </div>
      <div className="w-full p-6">
        <div className="w-full mb-4">
          <div className="flex gap-4">
            {["Tất cả", "Đang diễn ra", "Đã kết thúc"].map((status) => (
              <button
                key={status}
                className={`border-small rounded px-4 py-1 font-medium  ${
                  filterAuction === status && "bg-red text-white"
                }`}
                onClick={() => filterAuctions(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
        <div>
          {mockAuctions
            .filter(
              (item) =>
                filterAuction === "Tất cả" || item.status === filterAuction
            )
            .map((product) => (
              // <ShowProduct key={product.id} auction={product} />
              <div>hello</div>
            ))}
        </div>
      </div>
    </>
  );
};

export default MyAuction;
