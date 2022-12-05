import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { fromUnixTime } from 'date-fns'
import { useTranslation } from 'contexts/Localization'
import LineChart from 'views/Analytics/components/InfoCharts/LineChart'
import PoolTable from 'views/Analytics/components/InfoTables/PoolsTable'
import { formatAmount } from 'views/Analytics/utils/formatInfoNumbers'
import BarChart from 'views/Analytics/components/InfoCharts/BarChart'
import {
  usePoolDatas, usePoolsForToken,
  useTokenChartData, useTokenData, useTokenTransactions,
} from 'state/info/hooks'
import TransactionTable from 'views/Analytics/components/InfoTables/TransactionsTable'
import InfoNav from "../components/InfoNav";
import { Flex, Box, Text, Heading, Card, Skeleton, Grid, useMatchBreakpoints } from '../../../uikit'
import tokens from "../../../config/constants/tokens";
import {formatNumber} from "../../../utils/formatBalance";

export const ChartCardsContainer = styled(Flex)`
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  padding: 0;
  gap: 1em;

  & > * {
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  } ;
`

const AnalyticsPage = styled.div`
  min-height: calc(100vh - 64px);
  background: #F0F3FE;
  padding-top: 10px;`

const PageContainer = styled.div<{isMobile?: boolean}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1400px;
  margin: ${({isMobile}) => isMobile ? '0 auto' : '20px auto'};
  padding: ${({isMobile}) => isMobile ? '20px 23px' : '0'};
  padding-bottom:  ${({isMobile}) => isMobile ? '0' : '40px '};`

const ResponsiveGrid = styled(Grid)<{isMobile?: boolean}>`
  grid-template-columns:${({isMobile}) => isMobile ? 'repeat(2, auto)' : ' repeat(4, auto)'};
  grid-template-rows: ${({isMobile}) => isMobile ? 'repeat(2, 1fr)' : '1fr'};
  grid-row-gap: ${({isMobile}) => isMobile ? '17px' : ''};
  width: ${({isMobile}) => isMobile ? '100%' : '50%'};
  margin-top: ${({isMobile}) => isMobile ? '30px' : '0'};
  justify-content: space-between;
`

const StyledHeading = styled(Heading)<{isMobile?: boolean}>`
  display: flex;
  flex-direction: ${({isMobile}) => isMobile ? ' column' : 'row'};
  align-items: ${({isMobile}) => isMobile ? 'flex-start' : 'center'};
  justify-content: space-between;`

const HeadingInfo = styled.div<{isMobile?: boolean}>`
  font-size: ${({isMobile}) => isMobile ? '16px' : '18px'};
  font-weight: 400;
  color: rgba(82, 82, 99, 0.6);`

const HeadingInfoValue = styled(HeadingInfo)`
  display: inline-block;
  color: #525263;
  padding-left: 0;
`

const Overview: React.FC = () => {
  const {
    t,
    currentLanguage: { locale },
  } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const [liquidityHover, setLiquidityHover] = useState<number | undefined>()
  const [liquidityDateHover, setLiquidityDateHover] = useState<string | undefined>()
  const [volumeHover, setVolumeHover] = useState<number | undefined>()
  const [volumeDateHover, setVolumeDateHover] = useState<string | undefined>()
  const [activeTab, setActiveTab] = useState(0)
  const b8dAddr = tokens.b8d.address.toLowerCase()
  const tokenData = useTokenData(b8dAddr)
  const tokenTransactions = useTokenTransactions(b8dAddr)
  const tokenPools = usePoolsForToken(b8dAddr)
  const tokenChartData = useTokenChartData(b8dAddr)

  const currentDate = new Date().toLocaleString(locale, { month: 'short', year: 'numeric', day: 'numeric' })

  // Getting latest liquidity and volumeUSD to display on top of chart when not hovered
  const formattedLiquidityData = useMemo(() => {
    if (tokenChartData) {
      return tokenChartData.map((day) => {
        return {
          time: fromUnixTime(day.date),
          value: day.liquidityUSD,
        }
      })
    }
    return []
  }, [tokenChartData])

  const getLatestLiquiditValueDisplay = () => {
    let valueToDisplay = null
    if (liquidityHover) {
      valueToDisplay = formatAmount(liquidityHover)
    } else if (formattedLiquidityData.length > 0) {
      valueToDisplay = formatAmount(formattedLiquidityData[formattedLiquidityData.length - 1]?.value)
    }

    return valueToDisplay ? (
      <Text bold fontSize="32px" color='#4E89E3'>
        ${valueToDisplay}
      </Text>
    ) : (
      <Skeleton width="128px" height="36px" />
    )
  }

  const formattedVolumeData = useMemo(() => {
    if (tokenChartData) {
      return tokenChartData.map((day) => {
        return {
          time: fromUnixTime(day.date),
          value: day.volumeUSD,
        }
      })
    }
    return []
  }, [tokenChartData])

  const getLatestVolumeValueDisplay = () => {
    let valueToDisplay = null
    if (volumeHover) {
      valueToDisplay = formatAmount(volumeHover)
    } else if (formattedVolumeData.length > 0) {
      valueToDisplay = formatAmount(formattedVolumeData[formattedVolumeData.length - 1]?.value)
    }

    return valueToDisplay ? (
      <Text bold fontSize="32px" color='#4E89E3'>
        ${valueToDisplay}
      </Text>
    ) : (
      <Skeleton width="128px" height="36px" />
    )
  }

  const poolDatas = usePoolDatas(tokenPools ?? [])

  const somePoolsAreLoading = useMemo(() => {
    return Object.values(poolDatas).some((pool) => !pool)
  }, [poolDatas])

  return (
    <AnalyticsPage>
      <InfoNav activeIndex={activeTab} setActiveIndex={(index) => setActiveTab(index)}/>
      <PageContainer isMobile={isMobile}>
        {activeTab === 0
          ? <>
            <StyledHeading fontSize='28px' mb="16px" id="info-overview-title" isMobile={isMobile}>
              {t('B8DEX Info & Analytics')}
              <ResponsiveGrid isMobile={isMobile}>
                <HeadingInfo isMobile={isMobile} style={{gridColumn: '1', gridRow: '1'}}>
                  {t('B8T Price: ')}
                  <HeadingInfoValue isMobile={isMobile}>
                    {`$${formatAmount(tokenData?.priceUSD || 0, { notation: 'standard' })}`}
                  </HeadingInfoValue>
                </HeadingInfo>
                <HeadingInfo isMobile={isMobile} style={{gridColumn: isMobile ? '1' : '2', gridRow: isMobile ? '2' : '1'}}>
                  {t('Transcations: ')}
                  <HeadingInfoValue isMobile={isMobile}>
                    {formatNumber(tokenData?.txTotalCount || 0, 0, 0)}
                  </HeadingInfoValue>
                </HeadingInfo>
                <HeadingInfo isMobile={isMobile} style={{gridColumn: isMobile ? '2' : '3', gridRow: '1'}}>
                  {t('Pairs: ')}
                  <HeadingInfoValue isMobile={isMobile}>
                    {formatNumber(tokenPools?.length || 0, 0, 0)}
                  </HeadingInfoValue>
                </HeadingInfo>
                {/* <HeadingInfo isMobile={isMobile} style={{gridColumn: isMobile ? '2' : '4', gridRow: isMobile ? '2' : '1'}}> */}
                {/*  {t('Fees: ')} */}
                {/*  <HeadingInfoValue isMobile={isMobile}> */}
                {/*    {t(' $12 873.32')} */}
                {/*  </HeadingInfoValue> */}
                {/* </HeadingInfo> */}
              </ResponsiveGrid>
            </StyledHeading>
            <ChartCardsContainer mt={isMobile ? '12px' : '18px'} mb={isMobile ? '40px' : '60px'}>
              <Card background='#FFFFFF'>
                <Box p={isMobile ? '21px 5px 0 21px' : '16px 16px 24px'}>
                  <Text bold color="rgba(82, 82, 99, 0.6)">
                    {t('Liquidity')}
                  </Text>
                  {getLatestLiquiditValueDisplay()}
                  <Text color="rgba(82, 82, 99, 0.6)">{liquidityDateHover ?? currentDate}</Text>
                  <Box height={isMobile ? '200px' : '250px'}>
                    <LineChart
                      data={formattedLiquidityData}
                      setHoverValue={setLiquidityHover}
                      setHoverDate={setLiquidityDateHover}
                    />
                  </Box>
                </Box>
              </Card>
              <Card background='#FFFFFF'>
                <Box p={isMobile ? '21px 5px 0 21px' : '16px 16px 24px'}>
                  <Text bold color="rgba(82, 82, 99, 0.6)">
                    {t('Volume')}
                  </Text>
                  {getLatestVolumeValueDisplay()}
                  <Text color="rgba(82, 82, 99, 0.6)">{volumeDateHover ?? currentDate}</Text>
                  <Box height={isMobile ? '200px' : '250px'}>
                    <BarChart data={formattedVolumeData} setHoverValue={setVolumeHover} setHoverDate={setVolumeDateHover} />
                  </Box>
                </Box>
              </Card>
            </ChartCardsContainer>
            </>
          : null}

        {/* <Heading scale="lg" mt="40px" mb="16px"> */}
        {/*  {t('Top Tokens')} */}
        {/* </Heading> */}
        {/* <TokenTable tokenDatas={formattedTokens} /> */}
        {activeTab === 0 || activeTab === 1
          ? <>
            <Heading fontSize='28px' mb={isMobile ? '0' : '20px'}>
              {t('Pools')}
            </Heading>
            <PoolTable poolDatas={poolDatas} loading={somePoolsAreLoading} currentCurrency={b8dAddr}/>
          </>
          : null}
        {activeTab === 0 || activeTab === 2
          ? <>
            <Heading fontSize='28px' mb={isMobile ? '9px' : '16px'}>
              {t('Transactions')}
            </Heading>
            <TransactionTable transactions={tokenTransactions} />
          </>
          : null}

      </PageContainer>
    </AnalyticsPage>
  )
}

export default Overview
