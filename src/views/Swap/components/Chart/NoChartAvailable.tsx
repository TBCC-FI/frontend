import { Flex, Text } from '../../../../uikit'
import { useTranslation } from 'contexts/Localization'
import React from 'react'
import { StyledPriceChart } from './styles'

interface NoChartAvailableProps {
  token0Address: string
  token1Address: string
  pairAddress: string
  isMobile: boolean
}

const NoChartAvailable: React.FC<NoChartAvailableProps> = ({ token0Address, token1Address, pairAddress, isMobile }) => {
  const { t } = useTranslation()
  return (
    <StyledPriceChart p="24px" isMobile={isMobile}>
      <Flex justifyContent="center" alignItems="center" height="100%" flexDirection="column">
        <Text mb={['8px', '8px', '0px']}>{t('Failed to load price chart for this pair')}</Text>
        <Text textAlign={isMobile ? 'center' : 'left'} mb={['8px', '8px', '0px']} color="textSubtle" small>
          Token0: {token0Address ?? 'null'}
        </Text>
        <Text textAlign={isMobile ? 'center' : 'left'} mb={['8px', '8px', '0px']} color="textSubtle" small>
          Token1: {token1Address ?? 'null'}
        </Text>
        <Text textAlign={isMobile ? 'center' : 'left'} mb={['8px', '8px', '0px']} color="textSubtle" small>
          Pair: {pairAddress ?? 'null'}
        </Text>
      </Flex>
    </StyledPriceChart>
  )
}

export default NoChartAvailable
