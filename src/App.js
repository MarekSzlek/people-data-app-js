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

import LocaleContext from "./LocaleContext";
import MainPage from "./pages/mainPage";
import ViewsPage from "./pages/viewsPage";
import NotFoundPage from "./pages/NotFoundPage";

const { Header } = Layout;

function App() {
  const [locale, setLocale] = useState("pl");
  i18n.on("languageChanged", (lng) => setLocale(i18n.language));

  function changeLocale(l) {
    if (locale !== l) {
      i18n.changeLanguage(l);
      setLocale(l);
    }
  }
  const { t } = useTranslation();

  const navigate = useNavigate();

  return (
    <Provider store={store}>
      <ConfigProvider locale={locale}>
        <LocaleContext.Provider value={{ locale, setLocale }}>
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
