import OrderTrackingInput from "../../client/components/OrderTrackingInput";
import { BellOutlined } from "@ant-design/icons";
import { FaBars } from "react-icons/fa";
import LanguageSelector from "../../../components/Lang/LanguageSelector";

interface CollapseProps {
  collapse: boolean;
  setCollapse: (value: boolean) => void;
}

const navBarAdmin: React.FC<CollapseProps> = ({ collapse, setCollapse }) => {
  return (
    <div className="flex flex-row w-full bg-white shadow-lg items-center p-2">
      <div className="flex flex-row items-center justify-start space-x-3">
        <button
          onClick={() => {
            setCollapse(!collapse);
          }}
        >
          <FaBars className="w-8 h-8 text-black" />
        </button>
        <OrderTrackingInput />
      </div>
      <div className="flex flex-row items-center ml-auto space-x-5">
        <div>
          <LanguageSelector />
        </div>
        <div>
          <BellOutlined className="text-black text-lg" />
        </div>
      </div>
    </div>
  );
};

export default navBarAdmin;
