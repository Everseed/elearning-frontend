"use client";

import { store } from "@ng-youth/global-store";
import { UIProvider } from "@ng-youth/ui";
import { Provider } from "react-redux";
import { I18nProvider } from "../i18n";
import { NavigationEvents } from "./navigation-events";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <I18nProvider>
        <UIProvider>
          <NavigationEvents />
          <div className="h-full">{children}</div>
        </UIProvider>
      </I18nProvider>
    </Provider>
  );
}

export default Providers;
