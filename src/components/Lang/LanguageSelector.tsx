// components/LanguageSelector.tsx
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value as 'en' | 'vi';
    i18n.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang); // lưu thủ công (phòng trường hợp tùy biến thêm)
  };

  return (
    <select
      value={i18n.language}
      onChange={handleChange}
      className="border px-2 py-1 rounded text-black"
    >
      <option value="vi">🇻🇳 Tiếng Việt</option>
      <option value="en">🇺🇸 English</option>
    </select>
  );
};

export default LanguageSelector;
