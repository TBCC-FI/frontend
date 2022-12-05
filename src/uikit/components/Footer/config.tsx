import { Language } from '../LangSelector/types'
import { FooterLinkType } from './types'

export const footerAboutUsLinks: FooterLinkType[] = [
  {
    label: 'Announcement',
    href: '#',
  },
  {
    label: 'Blog',
    href: '#',
  },
  {
    label: 'TBCC Token',
    href: '#',
  },
  {
    label: 'Team',
    href: '#',
  },
]
export const footerSupportLinks: FooterLinkType[] = [
  {
    label: 'Fees',
    href: '#',
  },
  {
    label: 'Trading Rules',
    href: '#',
  },
  {
    label: 'FAQ',
    href: '#',
  },
  {
    label: 'Submit a Ticket',
    href: '#',
  },
  {
    label: 'Affiliate Program',
    href: '#',
  }
]

export const socials: FooterLinkType[] = [
  {
    label: 'Telegram EN channel',
    href: 'https://t.me/tbccglobal',
  },
  {
    label: 'Telegram EN chat',
    href: 'https://t.me/tbcc_exchange_eng',
  },
  {
    label: 'Telegram CH channel',
    href: 'https://t.me/tbcc_ex_chat',
  },
  {
    label: 'Telegram CH chat',
    href: 'https://t.me/tbcc_ex_news',
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/TBCC_ex',
  }
]

export const langs: Language[] = [...Array(20)].map((_, i) => ({
  code: `en${i}`,
  language: `English${i}`,
  locale: `Locale${i}`,
}))
