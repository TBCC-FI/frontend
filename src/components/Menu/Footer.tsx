import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Text, Flex, useMatchBreakpoints, Link } from '../../uikit'
import SocialLinks from "../../uikit/components/Footer/Components/SocialLinks";
import {getBscScanLink} from "../../utils";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";

const Wrapper = styled.div<{ isMobile: boolean, backgroundColor?: string }>`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  padding-top: 16px;
  padding-right: 0;
  margin-top: ${({ isMobile }) => (isMobile ? 'auto' : '100px')};
  background-color: ${({ backgroundColor }) => (backgroundColor || 'none')};
  padding-bottom: 40px;
`

const Footer: React.FC<{ backgroundColor?: string }> = ({ backgroundColor }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const { chainId } = useActiveWeb3React()

  return (
    <Wrapper isMobile={isMobile} backgroundColor={backgroundColor}>
      <Flex alignItems="center" justifyContent="center" mb="20px">
        <SocialLinks />
      </Flex>
      <Flex flexDirection={['column', 'column', 'row']} alignItems="center" justifyContent="center" mb="20px">
        <Text color="#8A8A8A" fontSize="14px" lineHeight="16px">
          {t('All rights reserved © 2022 B8DEX')}
        </Text>
      </Flex>
      <Flex flexDirection={['column', 'column', 'row']} alignItems="center" justifyContent="center">
        <Link external href={getBscScanLink('0x4dcCa80514c13dAcBd4A00c4E8dB891592a89306', null, chainId)}>
          <Text color="#8A8A8A" fontSize="14px" lineHeight="16px">
            {t('Token address')}: 0x4dcCa80514c13dAcBd4A00c4E8dB891592a89306
          </Text>
        </Link>
      </Flex>
    </Wrapper>
  )
}

export default Footer
