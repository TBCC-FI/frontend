import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { useMatchBreakpoints } from 'uikit/hooks'
import { Flex } from '../Box'
import {
  FooterContainer,
  FooterSectionsTitle,
  FooterColumn,
  StyledLink,
  CustomContainer
} from './styles'
import { TbccTextIcon } from '../Svg'
import { footerAboutUsLinks, footerSupportLinks, socials } from './config'
import { Text } from '../Text'
import MobileFooter from './MobileFooter'

const Footer = () => {

  const { t } = useTranslation()
  const { isMobile, isTablet } = useMatchBreakpoints()
	const isSmall = isMobile || isTablet

  return (
    <>
      {isSmall
        ? <MobileFooter />
        : 
        <CustomContainer>
        <FooterContainer>
          <FooterColumn>
            <Flex flexDirection='column'>
              <TbccTextIcon mb='10px' />
              <Text fontWeight='400' fontSize='14px' color='rgba(255, 255, 255, 0.3)'>
                {t('© 2022 TBCC Labs')}
              </Text>
            </Flex>
          </FooterColumn>
          <FooterColumn>
            <FooterSectionsTitle>
              {t('About Us')}
            </FooterSectionsTitle>
            {footerAboutUsLinks.map((link) => {
              return (
                <StyledLink href={link.href} key={link.label}>
                  {t(link.label)}
                </StyledLink>
              )
            })}
          </FooterColumn>
          <FooterColumn>
            <FooterSectionsTitle>
              {t('Support')}
            </FooterSectionsTitle>
            {footerSupportLinks.map((link) => {
              return (
                <StyledLink href={link.href} key={link.label}>
                  {t(link.label)}
                </StyledLink>
              )
            })}
          </FooterColumn>
          <FooterColumn>
            <FooterSectionsTitle>
              {t('Community')}
            </FooterSectionsTitle>
            {socials.map((link) => {
              return (
                <StyledLink href={link.href} key={link.label}>
                  {t(link.label)}
                </StyledLink>
              )
            })}
          </FooterColumn>
        </FooterContainer>
        </CustomContainer>
      }
    </>
  )
}

export default Footer
