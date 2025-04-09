const formatDateTime = (dateTime: string, formatType: number): string => {
  const date = new Date(dateTime);
  switch (formatType) {
    case 1: // Lấy giờ, phút
      return date.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      });
    case 2: // Lấy ngày, tháng, năm
      return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    case 3: // Lấy đầy đủ ngày tháng năm, giờ phút giây
      return date.toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    default:
      throw new Error("Format type không hợp lệ. Chỉ chấp nhận 1, 2 hoặc 3.");
  }
};

export default formatDateTime;
