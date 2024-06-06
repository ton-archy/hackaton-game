import {lazy, useMemo, Suspense, useEffect} from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {States} from "./States";
import {LoadingScreen} from "../components/LoadingScreen/LoadingScreen";
import {ErrorScreen} from "../components/ErrorScreen/ErrorScreen";
import {getTelegramApi} from "../api/telegram";
import {useLogger} from "../components/Logger/useLogger";

const HEADER_COLOR = "#000F2A";

const MainMenuState = lazy(() => import("./MainMenuState"));
const GameState = lazy(() => import("./GameState"));

const statesList = {
  [States.MainMenu]: <MainMenuState />,
  [States.Game]: <GameState />,
}

export const StateMachine = () => {
  const {
    showConsole,
  } = useLogger();

  // Set-up Telegram mini app view
  useEffect(() => {
    getTelegramApi().ready();
    getTelegramApi().setHeaderColor(HEADER_COLOR);
    getTelegramApi().expand();
    getTelegramApi().SettingsButton.show();
  }, [])

  // Set-up Telegram mini app subscriptions
  useEffect(() => {
    getTelegramApi().SettingsButton.onClick(showConsole);
    return () => {
      getTelegramApi().SettingsButton.offClick(showConsole);
    }
  }, [showConsole])

  const router = useMemo(() => {
    const routes = Object.keys(statesList).map(key => ({
      path: key,
      element: <Suspense fallback={<LoadingScreen />}>
        {statesList[key]}
      </Suspense>,
      errorElement: <ErrorScreen />,
    }));
    return createBrowserRouter(routes);
  }, []);

  return  <RouterProvider router={router} />
}
