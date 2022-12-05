import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Button, Text, Flex, Box, useMatchBreakpoints, ArrowDownIcon, useModal } from '../../uikit'
import { Currency, Pair } from '../../sdk'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'
import { CurrencyLogo, DoubleCurrencyLogo } from '../Logo'

import { RowBetween } from '../Layout/Row'
import { Input as NumericalInput } from './NumericalInput'

const CurrencySelectButton = styled(Button).attrs({ variant: 'text', scale: 'sm' })<{ isMobile?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2px;
  border-radius: 0;
  background: transparent;
  margin-right: 12px;
  height: 56px;
  width: ${({ isMobile }) => (isMobile ? '220px' : '189px')};
  border-right: 1px solid rgba(255, 255, 255, 0.09);
`

const InputPanel = styled.div<{isMobile?: boolean}>`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: none;
  border-radius: 12px;
  padding: ${({isMobile}) => isMobile ? '7px 15px 10px 15px' : '13px 24px 15px 12px'} ;
  border: 1px solid rgba(255, 255, 255, 0.09);
`
const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onMax?: () => void
  label?: string
  onCurrencySelect: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  id: string
  showCommonBases?: boolean
}
export default function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  label,
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  pair = null, // used for double token logo
  id,
  showCommonBases
}: CurrencyInputPanelProps) {
  const { account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={onCurrencySelect}
      selectedCurrency={currency}
      showCommonBases={showCommonBases}
    />,
  )
  return (
    <Box>
      <Flex mb="11px" alignItems="center" justifyContent="flex-end">

        {account && (
          <Text
            onClick={onMax}
            color="#FFFFFF"
            fontSize="14px"
            lineHeight="16px"
            style={{ display: 'inline', cursor: 'pointer' }}
          >
            {!hideBalance && !!currency
              ? t('Balance: %balance%', { balance: selectedCurrencyBalance?.toSignificant(6) ?? t('Loading') })
              : ' -'}
          </Text>
        )}
      </Flex>
      <InputPanel id={id} isMobile={isMobile}>
        <Container>
          <CurrencySelectButton selected={!!currency} onClick={() => onPresentCurrencyModal()} isMobile={isMobile}>
            {label && (
              <Text color="rgba(255, 255, 255, 0.45)" fontSize="13px" lineHeight="16px" fontWeight="400">
                {label}
              </Text>
            )}
            <Flex
              alignItems="center"
              justifyContent="space-between"
              background="transparent"
              width="100%"
              height="100%"
              padding="4px 15px 9px 0px"
            >
              {pair ? (
                <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={16} margin />
              ) : currency ? (
                <CurrencyLogo currency={currency} size="24px" style={{ marginRight: '8px' }} />
              ) : null}
              {pair ? (
                <Text id="pair" color="#FFF" fontSize="20px" bold>
                  {pair?.token0.symbol}:{pair?.token1.symbol}
                </Text>
              ) : (
                <Text id="pair" color="#FFF" fontSize="20px" bold>
                  {(currency && currency.symbol && currency.symbol.length > 20
                    ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                        currency.symbol.length - 5,
                        currency.symbol.length,
                      )}`
                    : currency?.symbol) || t('Select a currency')}
                </Text>
              )}
              {!disableCurrencySelect && <ArrowDownIcon />}
            </Flex>
          </CurrencySelectButton>
          <RowBetween>
            <NumericalInput
              className="token-amount-input"
              style={{ height: '100%', color: '#FFF' }}
              value={value}
              onUserInput={(val) => {
                onUserInput(val)
              }}
              align='right'
            />
          </RowBetween>
        </Container>

        {/* <InputRow selected={disableCurrencySelect}> */}
        {/*  {account && currency && showMaxButton && label !== 'To' && ( */}
        {/*    <Button onClick={onMax} scale="xs" variant="secondary"> */}
        {/*      MAX */}
        {/*    </Button> */}
        {/*  )} */}
        {/* </InputRow> */}
      </InputPanel>
    </Box>
  )
}
