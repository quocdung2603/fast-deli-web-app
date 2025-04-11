import {
  FacebookOutlined,
  XOutlined,
  InstagramOutlined,
  ForwardOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import IMG_TM1 from "../../../../assets/img/team-1.jpg";
import IMG_TM2 from "../../../../assets/img/team-2.jpg";
import IMG_TM3 from "../../../../assets/img/team-3.jpg";
import IMG_TM4 from "../../../../assets/img/team-4.jpg";

interface TeamMember {
  name: string;
  designation: string;
  image: string;
  social: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
}

const OurTeam = () => {
  const { t } = useTranslation();

  const teamMembers: TeamMember[] = [
    {
      name: t("Client.teamMembers.0.name"),
      designation: t("Client.teamMembers.0.designation"),
      image: IMG_TM1,
      social: { facebook: "#", twitter: "#", instagram: "#" },
    },
    {
      name: t("Client.teamMembers.1.name"),
      designation: t("Client.teamMembers.1.designation"),
      image: IMG_TM2,
      social: { facebook: "#", twitter: "#", instagram: "#" },
    },
    {
      name: t("Client.teamMembers.2.name"),
      designation: t("Client.teamMembers.2.designation"),
      image: IMG_TM3,
      social: { facebook: "#", twitter: "#", instagram: "#" },
    },
    {
      name: t("Client.teamMembers.3.name"),
      designation: t("Client.teamMembers.3.designation"),
      image: IMG_TM4,
      social: { facebook: "#", twitter: "#", instagram: "#" },
    },
  ];

  return (
    <div className="text-center py-10 px-5 bg-white">
      <p className="text-blue-500 font-semibold uppercase">
        {t("Client.ourTeamHeading")}
      </p>
      <h2 className="text-3xl font-bold mb-6">
        {t("Client.ourTeamSubheading")}
      </h2>
      <div className="flex flex-col md:flex-row justify-center items-center max-w-7xl mx-auto gap-10">
        {teamMembers.map((member, index) => (
          <TeamCard key={index} member={member} />
        ))}
      </div>
    </div>
  );
};

const TeamCard = ({ member }: { member: TeamMember }) => {
  return (
    <div className="group bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl text-center">
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-60 object-cover rounded mx-auto"
      />
      <div className="p-4">
        <h3 className="font-bold">{member.name}</h3>
        <p className="text-gray-500 text-sm">{member.designation}</p>
      </div>
      <div className="bg-red-500 text-white flex justify-center items-center gap-4 py-3">
        <div className="group-hover:hidden">
          <ForwardOutlined className="text-white text-lg" />
        </div>
        <div className="hidden group-hover:flex gap-4">
          <a
            href={member.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookOutlined className="hover:text-gray-300 transition" />
          </a>
          <a
            href={member.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            <XOutlined className="hover:text-gray-300 transition" />
          </a>
          <a
            href={member.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramOutlined className="hover:text-gray-300 transition" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
