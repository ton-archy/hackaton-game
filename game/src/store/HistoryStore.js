import create from 'zustand';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const routeMiddleware = (config) => (set, get, api) => {
  return {
    ...config,
    updateRoute: (route) => {
      set({ route });
      history.push(route);
    },
  };
};

const useStore = create(routeMiddleware((set) => ({
  location: history.location
})));

history.listen((location) => {
  useStore.getState().updateRoute(location.pathname);
});

export { useStore, history };
