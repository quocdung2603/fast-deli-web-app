import OrderTrackingInput from "../../client/components/OrderTrackingInput";
import { BellOutlined } from "@ant-design/icons";

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
          className="w-8 h-8 bg-red-600"
        ></button>
        <OrderTrackingInput />
      </div>
      <div className="flex flex-row items-center ml-auto">
        <div>
          <BellOutlined className="text-black text-lg" />
        </div>
        <div>
          <></>
        </div>
        <div>
          <></>
        </div>
        <div className="ml-3 flex-shrink-0">
          {/* <ControllerForm></ControllerForm> */}
        </div>
      </div>
    </div>
  );
};

export default navBarAdmin;
