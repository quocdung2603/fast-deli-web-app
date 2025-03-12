import { HomeOutlined } from "@ant-design/icons";
import IMG_CAROUSEL_1 from "../../../assets/img/carousel-1.jpg";
import IMG_CAROUSEL_2 from "../../../assets/img/carousel-2.jpg";

interface PageBannerProps {
  title: string;
  breadcrumbs: { name: string; path?: string }[];
}

const Banner = ({ title, breadcrumbs }: PageBannerProps) => {
  return (
    <div
      className="relative w-full h-64 flex items-center"
      style={{
        backgroundImage: `url(
        ${Math.random() % 2 === 0 ? IMG_CAROUSEL_1 : IMG_CAROUSEL_2}
        )`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay làm tối ảnh */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative text-white mx-auto max-w-6xl w-full">
        <h1 className="text-6xl font-bold">{title}</h1>
        <nav className="mt-2 flex items-center text-sm">
          <HomeOutlined className="mr-1 text-2xl" />
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="ml-1">
              {crumb.path ? (
                <a href={crumb.path} className="hover:underline">
                  {crumb.name}
                </a>
              ) : (
                <span className="text-gray-300 text-2xl">{crumb.name}</span>
              )}
              {index < breadcrumbs.length - 1 && (
                <span className="mx-1">/</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Banner;
