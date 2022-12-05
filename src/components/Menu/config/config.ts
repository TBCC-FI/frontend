import { ContextApi } from 'contexts/Localization/types'
import { MenuItemsType } from '../../../uikit'
import { PATHS } from '../../../config/paths'

export type ConfigMenuItemsType = MenuItemsType & { hideSubNav?: boolean }

const config: (t: ContextApi['t']) => ConfigMenuItemsType[] = (t) => [
  {
    label: t('Home'),
    href: PATHS.HOME,
    icon: 'Home',
    items: [],
  },
  {
    label: t('Mint'),
    href: PATHS.MINT,
    icon: 'Dashboard',
    items: [],
  },
  {
    label: t('Swap'),
    href: PATHS.SWAP,
    icon: 'Swap',
    items: [],
  },
  {
    label: t('Liquidity'),
    href: PATHS.LIQUIDITY,
    icon: 'Liquidity',
    items: []
  }
]

export default config

export const titles: (t: ContextApi['t'], account?: string) => ConfigMenuItemsType[] = (t) => [
  {
    label: t('Exchange'),
    href: PATHS.SWAP,
  },
  {
    label: t('Your Liquidity'),
    href: PATHS.LIQUIDITY,
  },
  {
    label: t('Adding liquidity'),
    href: PATHS.ADD_LIQUIDITY,
  },
  {
    label: t('Add Liquidity'),
    href: PATHS.ADDA_LIQUIDITY,
  },
  {
    label: t('Add Liquidity'),
    href: PATHS.ADDAB_LIQUIDITY,
  }
]
