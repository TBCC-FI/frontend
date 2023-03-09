import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { PATHS } from 'config/paths'
import { useTranslation } from 'contexts/Localization'
import { Flex, IconButton, useMatchBreakpoints, NewRefreshIcon } from '../../../uikit'
import GlobalSettings from '../../../components/Menu/GlobalSettings'

interface Props {
  isActiveTab?: string
}

const CurrencyInputContainer = styled(Flex)<{isMobile?: boolean}>`
  align-items: center;
  padding: ${({isMobile}) => isMobile ? '24px 13px 13px 14px' : '37px 40px 14px 41px'};
  width: 100%;
`
const NavTabsContainer = styled(Flex)`
  display: flex;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
`
const NavTabsItem = styled(Flex)<{isactive?: string}>`
  align-items: center;
  justify-content: center;
  padding: 15px 20px;
  border-radius: 6px;
  color: ${({isactive}) => isactive === 'true' ? '#FFF' : 'rgba(255, 255, 255, 0.45)'};
  background: ${({isactive}) => isactive === 'true' ? 'linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%)' : 'transparent'};
`

const CurrencyInputHeader: React.FC<Props> = ({ isActiveTab }) => {
  const { isMobile } = useMatchBreakpoints()
  const { t } = useTranslation()

  return (
    <CurrencyInputContainer isMobile={isMobile}>
      <Flex width="100%" alignItems="center" justifyContent="space-between">
        <NavTabsContainer>
          <NavTabsItem as={Link} to={PATHS.SWAP} isactive={`${isActiveTab === 'Swap'}`}>
            {t('Swap')}
          </NavTabsItem>
          <NavTabsItem as={Link} to={PATHS.LIQUIDITY} isactive={`${isActiveTab === 'Liquidity'}`}>
            {t('Liquidity')}
          </NavTabsItem>
        </NavTabsContainer>
        <Flex>
          <IconButton variant="light" scale="sm" mr="18px">
            <NewRefreshIcon/>
          </IconButton>
          {
            (isActiveTab === 'Swap') ? (
              <GlobalSettings color="#CDEDFF" mr="4px" />
            ) : null
          }
        </Flex>
      </Flex>
    </CurrencyInputContainer>
  )
}

export default CurrencyInputHeader
