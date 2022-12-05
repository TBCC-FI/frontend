import React, { useCallback, useState, useMemo } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {formatAmount, formatAmountThousands} from 'views/Swap/utils/formatInfoNumbers'
import { PoolData } from 'state/info/types'
import { CurrencyLogo } from 'components/Logo'
import { useTranslation } from 'contexts/Localization'
import { fromUnixTime } from 'date-fns'
import { Area, AreaChart } from 'recharts'
import { Text, Flex, Box, Skeleton, useMatchBreakpoints } from '../../../../uikit'
import { ClickableColumnHeader, TableWrapper } from './shared'
import { usePoolChartData, useTokenData } from '../../../../state/info/hooks'

/**
 *  Columns on different layouts
 *  5 = | # | Pool | TVL | Volume 24H | Volume 7D |
 *  4 = | # | Pool |     | Volume 24H | Volume 7D |
 *  3 = | # | Pool |     | Volume 24H |           |
 *  2 = |   | Pool |     | Volume 24H |           |
 */
const ResponsiveHeaderGrid = styled.div<{activeTab?: number}>`
  background-color: #F0F0FE;
  height: 65px;
  display: grid;
  grid-gap: 1em;
  align-items: center;
  grid-template-columns: 1.5fr 1fr 0.6fr 1fr 1.8fr;
  padding: 20px;
  @media screen and (max-width: 900px) {
    grid-template-columns: 1.5fr repeat(3, 1fr);
    & :nth-child(5) {
      display: none;
    }
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: 1.5fr repeat(1, 1fr);

    & :nth-child(5),
    & :nth-child(6),
    & :nth-child(7) {
      display: none;
    }
  }
  @media screen and (max-width: 480px) {
    grid-template-columns: 1.5fr repeat(2, auto);
    padding: 8px 0;
    > *:nth-child(3) {
      color: ${({activeTab}) => activeTab === 1 ? '#525263' : ''};
    }
    > *:nth-child(4) {
      color: ${({activeTab}) => activeTab === 2 ? '#525263' : ''};
    }
    > *:nth-child(2) {
      display: none;
    }
  }
`
const ResponsiveGrid = styled.div<{activeTab?: number}>`
  display: grid;
  grid-gap: 1em;
  align-items: center;
  grid-template-columns: 1.5fr 1fr 0.6fr 1fr 1.8fr;

  padding: 20px;
  @media screen and (max-width: 900px) {
    grid-template-columns: 1.5fr repeat(3, 1fr);
    & :nth-child(5) {
      display: none;
    }
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: 1.5fr repeat(1, 1fr);
    & :nth-child(5),
    & :nth-child(6),
    & :nth-child(7) {
      display: none;
    }
  }
  @media screen and (max-width: 480px) {
    grid-template-columns: 1.5fr repeat(2, auto);
    padding: 18px;
    > *:nth-child(2) {
      display: none;
    }
    > *:nth-child(3) {
      display: ${({activeTab}) => activeTab === 1 ? '' : 'none'};
    }
    > *:nth-child(4) {
      display: ${({activeTab}) => activeTab === 2 ? '' : 'none'};
    }
  }
`

const LinkWrapper = styled(Link)`
  text-decoration: none;
  background: #FFFFFF;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.02);
  border-radius: 12px;

  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

const SORT_FIELD = {
  volumeUSD: 'volumeUSD',
  liquidityUSD: 'liquidityUSD',
  volumeUSDWeek: 'volumeUSDWeek',
  lpFees24h: 'lpFees24h',
  lpApr7d: 'lpApr7d',
  token1Price: 'token1Price'
}

const LoadingRow: React.FC = () => (
  <ResponsiveGrid>
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
  </ResponsiveGrid>
)

const TableLoader: React.FC = () => (
  <>
    <LoadingRow />
    <LoadingRow />
    <LoadingRow />
  </>
)

const DataRow = ({ poolData, currentCurrency, index, priceUSDTBCC, activeTab }: { poolData: PoolData; currentCurrency: string; index: number, priceUSDTBCC: number, activeTab?: number }) => {
  const { isMobile } = useMatchBreakpoints()
  const chartData = usePoolChartData(poolData.address)
  const currencyTBCC: any = useTokenData(currentCurrency)

  const poolCurrency:any = {
    currency: poolData?.token0?.address === currencyTBCC?.address ? poolData.token1 : poolData.token0,
    price: poolData?.token0?.address === currencyTBCC?.address ? poolData.token0Price : poolData.token1Price,
  };

  poolCurrency.currencyAddress = useTokenData(poolCurrency.currency.address)

  const formattedVolumeData = useMemo(() => {
    if (chartData) {
      return chartData.map((day) => {
        return {
          time: fromUnixTime(day.date),
          value: day.volumeUSD,
        }
      })
    }
    return []
  }, [chartData])



  return (
    <LinkWrapper key={index} to={`/pools/${poolData.address}`}>
      <ResponsiveGrid activeTab={activeTab}>
        <Flex alignItems="center">
          <CurrencyLogo currency={poolCurrency.currencyAddress} size="32px" />
          {isMobile
            ? <Flex flexDirection='column'>
              <Text ml="6px" mb='5px' fontSize={isMobile ? '16px' : '18px'} color="#505050" fontWeight="500" lineHeight="20px" >
                {poolCurrency.currencyAddress?.symbol}
              </Text>
              <Text fontSize="15px" color="#8A8A8A" fontWeight="normal" lineHeight="16px" ml="6px">
                {poolCurrency.currencyAddress?.name}
              </Text>
              </Flex>
            : <>
              <Text ml="6px" fontSize={isMobile ? '16px' : '18px'} color="#505050" fontWeight="500" lineHeight="20px" >
                {poolCurrency.currencyAddress?.symbol}
              </Text>
              <Text fontSize="15px" color="#8A8A8A" fontWeight="normal" lineHeight="16px" ml="6px">
                {poolCurrency.currencyAddress?.name}
              </Text>
            </>
          }

        </Flex>
        <Flex alignItems="center">
          {/* <CurrencyLogo currency={currencyTBCC} size="20px"/> */}
          <Text fontSize="15px" color="#505050" fontWeight="normal" lineHeight="16px">{formatAmountThousands(poolCurrency.price)}</Text>
          <Text ml="6px" fontSize="15px" color="#505050" fontWeight="normal" lineHeight="16px">
            {currencyTBCC?.symbol}
          </Text>
        </Flex>
        <Text mr="8px" fontSize="15px" color="#4E89E3" fontWeight="normal" lineHeight="16px">{formatAmount(poolData.lpApr7d)}%</Text>
        <Flex alignItems="center">
          {/* <CurrencyLogo currency={currencyTBCC} size="20px"/> */}
          <Flex p="4px" justifyContent="flex-end"minWidth="80px">
            <Text fontSize="15px" color='#525263' fontWeight="normal" lineHeight="16px">{poolData.volumeUSD ? formatAmount(poolData.volumeUSD * priceUSDTBCC) : '—'}</Text>
          </Flex>
          <Text ml="6px" fontSize="15px" color="#505050" fontWeight="normal" lineHeight="16px">
            {currencyTBCC?.symbol}
          </Text>
        </Flex>
        <Flex alignItems="center">
          <AreaChart
            data={formattedVolumeData}
            width={102}
            height={32}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <Area dataKey="value" type="monotone" stroke='#4E89E3' fill="url(#gradient)" strokeWidth={1.5} />
          </AreaChart>
          <Flex mr="16px" />
          {/* <CurrencyLogo currency={currencyTBCC} size="20px"/> */}
          <Text fontSize="15px" color="#505050" fontWeight="normal" lineHeight="16px">{formatAmount(poolData.volumeUSDWeek * priceUSDTBCC)}</Text>
          <Text ml="6px" fontSize="15px" color="#505050" fontWeight="normal" lineHeight="16px">
            {currencyTBCC?.symbol}
          </Text>
        </Flex>
      </ResponsiveGrid>
    </LinkWrapper>
  )
}

interface PoolTableProps {
  poolDatas: PoolData[]
  loading?: boolean // If true shows indication that SOME pools are loading, but the ones already fetched will be shown
  currentCurrency: string
}

const PoolTable: React.FC<PoolTableProps> = ({ poolDatas, loading, currentCurrency }) => {
  // for sorting
  const [sortField, setSortField] = useState(SORT_FIELD.token1Price)
  const [sortDirection, setSortDirection] = useState<boolean>(true)
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const [activeTab, setActiveTab] = useState(1)

  const sortedPools = useMemo(() => {
    return poolDatas
      ? poolDatas
        .sort((a, b) => {
          if (a && b) {
            return a[sortField as keyof PoolData] > b[sortField as keyof PoolData]
              ? (sortDirection ? -1 : 1) * 1
              : (sortDirection ? -1 : 1) * -1
          }
          return -1
        })
      : []
  }, [poolDatas, sortDirection, sortField])

  const handleSort = useCallback(
    (newField: string) => {
      setSortField(newField)
      setSortDirection(sortField !== newField ? true : !sortDirection)
    },
    [sortDirection, sortField],
  )

  const arrow = useCallback(
    (field: string) => {
      const directionArrow = !sortDirection ? '↑' : '↓'
      return sortField === field ? directionArrow : ''
    },
    [sortDirection, sortField],
  )

  let priceUSDTBCC = 0

  sortedPools.forEach((poolData) => {
    if (poolData && (poolData.token0.address === '0xe9e7cea3dedca5984780bafc599bd69add087d56' || poolData.token1.address === '0xe9e7cea3dedca5984780bafc599bd69add087d56')) {
      priceUSDTBCC = poolData.token0.address === '0xe9e7cea3dedca5984780bafc599bd69add087d56' ? poolData.token1Price : poolData.token0Price
    }
  })

  return (
    <TableWrapper>
      <ResponsiveHeaderGrid style={{ paddingBottom: isMobile? '8px' : "12px", position: isMobile ? 'sticky' : 'static', top: isMobile ? '0' : ''}} activeTab={activeTab}>
        <Text color="rgba(82, 82, 99, 0.6)" fontSize="16px" lineHeight="16px" fontWeight="normal">
          {t('#Name')}
        </Text>
        <ClickableColumnHeader
          color="rgba(82, 82, 99, 0.6)"
          fontSize="15px"
          lineHeight="16px"
          fontWeight="normal"
          onClick={() => handleSort(SORT_FIELD.token1Price)}
        >
          {t('Price')} {arrow(SORT_FIELD.token1Price)}
        </ClickableColumnHeader>
        <ClickableColumnHeader
          color="rgba(82, 82, 99, 0.6)"
          fontSize="15px"
          lineHeight="16px"
          fontWeight="normal"
          onClick={isMobile ? () => setActiveTab(1) : () => handleSort(SORT_FIELD.lpApr7d)}
        >
          {t('Reward APR%')} {arrow(SORT_FIELD.lpApr7d)}
        </ClickableColumnHeader>
        <ClickableColumnHeader
          color="rgba(82, 82, 99, 0.6)"
          fontSize="15px"
          lineHeight="16px"
          fontWeight="normal"
          onClick={ isMobile ?( () => setActiveTab(2) ): ( () => handleSort(SORT_FIELD.volumeUSD) )}
        >
          {t('Volume 24H')} {arrow(SORT_FIELD.volumeUSD)}
        </ClickableColumnHeader>
        <ClickableColumnHeader
          color="rgba(82, 82, 99, 0.6)"
          fontSize="15px"
          lineHeight="16px"
          fontWeight="normal"
          onClick={() => handleSort(SORT_FIELD.volumeUSDWeek)}
        >
          {t('Volume 7D')} {arrow(SORT_FIELD.volumeUSDWeek)}
        </ClickableColumnHeader>
      </ResponsiveHeaderGrid>
      {sortedPools.length > 0 ? (
        <>
          {sortedPools.map((poolData, i) => {
            if (poolData) {
              return (
                <React.Fragment key={poolData.address}>
                  <DataRow index={i} poolData={poolData} priceUSDTBCC={priceUSDTBCC} activeTab={activeTab} currentCurrency={currentCurrency}/>
                </React.Fragment>
              )
            }
            return null
          })}
          {loading && <LoadingRow />}
        </>
      ) : (
        <>
          <TableLoader />
          {/* spacer */}
          <Box />
        </>
      )}
    </TableWrapper>
  )
}

export default PoolTable
