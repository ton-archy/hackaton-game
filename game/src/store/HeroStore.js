import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools, persist } from 'zustand/middleware';

export const useHeroStore = create(
  immer(
    devtools((set) => ({
        hero: {
          resources: {
            army: 0,
            mysteryCurrency: 0,
            provision: 0,
            tools: 0
          }
        },
        lastChange: null
      }),
        {
          name: "heroStorage"
        }
      )
  )
);

export const updateHero = (hero) => useHeroStore.setState((state) => {
  state.hero = hero;
  return state;
});

export const updateResources = (resChange) => useHeroStore.setState((state) => {
  const res = state.hero.resources;
  state.hero.resources = {
    army: res.army + resChange.army,
    provision: res.provision + resChange.provision,
    tools: res.tools + resChange.tools,
    mysteryCurrency: res.mysteryCurrency + resChange.mysteryCurrency,
  }
  state.lastChange = resChange;
  return state;
});

export const getHero = (state) => state.hero;
export const getLastChange = (state) => state.lastChange;
export const getResources = (state) => state.hero.resources;
