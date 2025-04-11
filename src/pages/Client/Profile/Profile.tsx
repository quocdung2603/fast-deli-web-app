import { useState, ReactNode } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// component
import PersonalInformation from "./components/PersonalInformation";
import MyOrder from "./components/MyOrder";
import History from "./components/History";
import Notifications from "./components/Notifications";

interface selectPresonalProps {
  parameter: string;
  name: string;
  tab: ReactNode;
}

const PersonalPage = () => {
  const { t } = useTranslation();

  const [select, setSelect] = useState<selectPresonalProps>({
    parameter: "#thong-tin-ca-nhan",
    name: t("Client.PersonalPage.tabs.personalInfo"),
    tab: <PersonalInformation />,
  });

  const [selectPreson] = useState<selectPresonalProps[]>([
    {
      parameter: "#thong-tin-ca-nhan",
      name: t("Client.PersonalPage.tabs.personalInfo"),
      tab: <PersonalInformation />,
    },
    {
      parameter: "#thong-bao",
      name: t("Client.PersonalPage.tabs.notifications"),
      tab: <Notifications />,
    },
    {
      parameter: "#lich-su",
      name: t("Client.PersonalPage.tabs.history"),
      tab: <History />,
    },
    {
      parameter: "#sanphamcuatoi",
      name: t("Client.PersonalPage.tabs.myOrders"),
      tab: <MyOrder />,
    },
  ]);

  return (
    <div className="py-10 bg-white flex flex-col items-center max-w-7xl mx-auto">
      <div className="flex flex-col jutify-center items-center">
        <h1 className="text-xl font-semibold mb-4">
          {t("Client.PersonalPage.title")}
        </h1>
      </div>
      <div className="w-full flex flex-row space-x-5">
        <div className="flex flex-col w-1/4">
          {selectPreson.map((item, index) => (
            <div
              key={index}
              className={`${
                item.parameter === select.parameter
                  ? "bg-red-500 text-white"
                  : ""
              } hover:bg-red-300 hover:text-white px-6 py-3 text-sm rounded shadow-md cursor-pointer transitionHight`}
              onClick={() => setSelect(item)}
            >
              <Link to={item.parameter}>
                <p>{item.name}</p>
              </Link>
            </div>
          ))}
        </div>
        <div className="w-3/4 rounded-md shadow-custom box-border">
          {select.tab}
        </div>
      </div>
    </div>
  );
};

export default PersonalPage;
