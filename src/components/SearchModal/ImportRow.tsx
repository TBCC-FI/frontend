import React, { CSSProperties } from 'react'
import { AutoRow, RowFixed } from 'components/Layout/Row'
import { AutoColumn } from 'components/Layout/Column'
import CurrencyLogo from 'components/Logo/CurrencyLogo'
import { ListLogo } from 'components/Logo'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCombinedInactiveList } from 'state/lists/hooks'
import styled from 'styled-components'
import { useIsUserAddedToken, useIsTokenActive } from 'hooks/Tokens'
import { useTranslation } from 'contexts/Localization'
import { Token } from '../../sdk'
import { Button, Text, CheckmarkCircleIcon } from '../../uikit'

const TokenSection = styled.div<{ dim?: boolean }>`
  height: 56px;
  display: grid;
  grid-template-columns: auto minmax(auto, 1fr) auto;
  grid-gap: 16px;
  align-items: center;

  opacity: ${({ dim }) => (dim ? '0.4' : '1')};
`

const CheckIcon = styled(CheckmarkCircleIcon)`
  height: 16px;
  width: 16px;
  margin-right: 6px;
  stroke: ${({ theme }) => theme.colors.success};
`

const StyledImportBtn = styled(Button)`
  background: linear-gradient(77.9deg,#DB00FF -3.83%,#2C5EE0 110.36%);
  border-radius: 4px;
  padding: 12px 20px;
  color: #ffffff;
  font-weight: 500;
  font-size: 15px;
  line-height: 16px;
  height: 40px;
`

export default function ImportRow({
  token,
  style,
  dim,
  showImportView,
  setImportToken,
}: {
  token: Token
  style?: CSSProperties
  dim?: boolean
  showImportView: () => void
  setImportToken: (token: Token) => void
}) {
  // globals
  const { chainId } = useActiveWeb3React()

  const { t } = useTranslation()

  // check if token comes from list
  const inactiveTokenList = useCombinedInactiveList()
  const list = chainId && inactiveTokenList?.[chainId]?.[token.address]?.list

  // check if already active on list or local storage tokens
  const isAdded = useIsUserAddedToken(token)
  const isActive = useIsTokenActive(token)

  return (
    <TokenSection style={style}>
      <CurrencyLogo currency={token} size="24px" style={{ opacity: dim ? '0.6' : '1' }} />
      <AutoColumn gap="4px" style={{ opacity: dim ? '0.6' : '1' }}>
        <AutoRow>
          <Text fontSize='14px' fontWeight='600' color='#505050'>{token.name}</Text>
          <Text ml="8px" fontSize='14px' fontWeight='600' color='#505050'>({token.symbol})</Text>
        </AutoRow>
        {list && list.logoURI && (
          <RowFixed>
            <Text small mr="4px" color="textSubtle">
              {t('via')} {list.name}
            </Text>
            <ListLogo logoURI={list.logoURI} size="12px" />
          </RowFixed>
        )}
      </AutoColumn>
      {!isActive && !isAdded ? (
        <StyledImportBtn
          width="fit-content"
          onClick={() => {
            if (setImportToken) {
              setImportToken(token)
            }
            showImportView()
          }}
        >
          {t('Import')}
        </StyledImportBtn>
      ) : (
        <RowFixed style={{ minWidth: 'fit-content' }}>
          <CheckIcon />
          <Text color="success">Active</Text>
        </RowFixed>
      )}
    </TokenSection>
  )
}
