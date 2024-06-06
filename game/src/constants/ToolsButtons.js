import heroesIcon from "../images/heroes_icon.svg";
import heroesLockIcon from "../images/heroes_lock_icon.svg";
import storeIcon from "../images/store_icon.svg";
import storeLockIcon from "../images/store_lock_icon.svg";
import vassalsIcon from "../images/vassals_icon.svg";
import vassalsLockIcon from "../images/vassals_lock_icon.svg";
import settingsIcon from "../images/settings_icon.svg";
import settingsLockIcon from "../images/settings_lock_icon.svg";

export const ToolsButtonsTypes = {
  Heroes: "heroes",
  Store: "store",
  Vassals: "vassals",
  Settings: "settings"
}

export const toolsButtons = [
  {
    id: ToolsButtonsTypes.Heroes,
    label: "Герои",
    icon: heroesIcon,
    lockIcon: heroesLockIcon,
    locked: true
  },
  {
    id: ToolsButtonsTypes.Store,
    label: "Магазин",
    icon: storeIcon,
    lockIcon: storeLockIcon,
    locked: true
  },
  {
    id: ToolsButtonsTypes.Vassals,
    label: "Вассалы",
    icon: vassalsIcon,
    lockIcon: vassalsLockIcon,
    locked: true
  },
  {
    id: ToolsButtonsTypes.Settings,
    label: "Настройки",
    icon: settingsIcon,
    lockIcon: settingsLockIcon,
    locked: true
  },
]
