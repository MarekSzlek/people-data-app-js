import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="centered-msg">
      <h1>{t("404.header")}</h1>
      <Link to="/main">{t("404.link")}</Link>
    </div>
  );
}

export default NotFoundPage;
