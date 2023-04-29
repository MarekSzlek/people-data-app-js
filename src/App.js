import "./index.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Layout } from "antd";
import { Routes, Route } from "react-router-dom";
import i18n from "./i18n";
import { useTranslation } from "react-i18next";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "./store";
import plPL from "antd/locale/pl_PL";
import enUS from "antd/locale/en_US";
import dayjs from "dayjs";
import "dayjs/locale/pl";
import "dayjs/locale/en";

import LocaleContext from "./LocaleContext";
import MainPage from "./pages/mainPage";
import ViewsPage from "./pages/viewsPage";
import NotFoundPage from "./pages/NotFoundPage";

const { Header } = Layout;

dayjs.locale("pl");

function App() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [currentLocale, setCurrentLocale] = useState("pl");
  i18n.on("languageChanged", (lng) => setCurrentLocale(i18n.language));

  function changeLocale(l) {
    if (currentLocale !== l) {
      i18n.changeLanguage(l);
      setCurrentLocale(l);
    }
  }

  const getDatePickerLocale = (lng) => {
    switch (lng) {
      case "en":
        return enUS;
      case "pl":
        return plPL;
      default:
        return enUS;
    }
  };

  return (
    <Provider store={store}>
      <ConfigProvider locale={getDatePickerLocale(currentLocale)}>
        <LocaleContext.Provider value={{ currentLocale, setCurrentLocale }}>
          <div>
            <Header>
              <Menu
                theme="dark"
                mode="horizontal"
                items={[
                  {
                    key: "main",
                    onClick: () => navigate("main"),
                    label: t("menu.main"),
                  },
                  {
                    key: "views",
                    onClick: () => navigate("views"),
                    label: t("menu.views"),
                  },
                  {
                    label: t("Language"),
                    key: "submenu",
                    style: { marginLeft: "auto" },
                    children: [
                      {
                        key: "en",
                        label: t("English"),
                        onClick: () => changeLocale("en"),
                      },
                      {
                        key: "pl",
                        label: t("Polish"),
                        onClick: () => changeLocale("pl"),
                      },
                    ],
                  },
                ]}
              ></Menu>
            </Header>
            <div>
              <Routes>
                <Route path="/main" element={<MainPage />} />
                <Route path="/views" element={<ViewsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
          </div>
        </LocaleContext.Provider>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
