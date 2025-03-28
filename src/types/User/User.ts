type User = {
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;

  // Thông tin đăng nhập
  password: string; // Nên mã hóa trước khi lưu

  // Thông tin bổ sung
  dateOfBirth: Date;
  address: string;
  gender: boolean;
  nationality: string;

  // Lịch sử và trạng thái tài khoản
  accountStatus: string; // Active, Inactive, Suspended, etc.
  createdAt: Date;
  updatedAt: Date;

  role: string;
};

export { type User };

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserLoginResponse {
  code: number;
  message: string;
  data: any;
}

export interface UserInfoResponse {
  code: number;
  message: string;
  data: User;
}
