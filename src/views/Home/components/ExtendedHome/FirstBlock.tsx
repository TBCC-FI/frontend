import React, { useEffect, useState } from "react"
import styled from 'styled-components'
import { useTranslation } from "contexts/Localization"
import BigNumber from "bignumber.js";
import { Text, Flex, Box, useMatchBreakpoints } from '../../../../uikit'
import { StyledBtn, TransparentBtn, Container, SubContainer } from "../../style"
import StatisticBox from "../StatisticBox"
import { fetchAnalyticsData } from "../../../../state/info/queries/helpers";
import fetchTokenInfo from "../../../../state/info/queries/tokens/tokenInfo";

export const Title = styled(Text) <{ isMobile?: boolean }>`
	font-weight: 600;
	font-size: ${({ isMobile }) => isMobile ? '28px' : '42px'};
	line-height: ${({ isMobile }) => isMobile ? '36px' : '48px'};
	color: #FFF;
`
export const SubTitle = styled(Text) <{ isMobile?: boolean }>`
	font-weight: 400;
	font-size: ${({ isMobile }) => isMobile ? '16px' : '18px'};
	line-height: ${({ isMobile }) => isMobile ? '24px' : '26px'};
	color: rgba(255, 255, 255, 0.6);
`
export const MainText = styled(Text)`
	font-weight: 600;
	font-size: 42px;
	color: #FFF;
`
export const SecondaryText = styled(Text) <{ isMobile?: boolean }>`
	font-weight: 400;
	font-size: ${({ isMobile }) => isMobile ? '14px' : '16px'};
	color: rgba(255, 255, 255, 0.6);
`

interface AnalyticsData {
	volume?: number
}

interface TokenInfo {
	totalSupply?: number
}

const FirstBlock = () => {

	const { t } = useTranslation()
	const { isMobile, isTablet } = useMatchBreakpoints()
	const isSmall = isMobile || isTablet
	const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
	const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null)

	useEffect(() => {
		const getAnalytics = async () => {
			const { data } = await fetchAnalyticsData()
			const newData = {
				volume: data?.["8487"]?.quote?.USD?.volume_30d || 0,
			};
			setAnalytics(newData)
		}
		if (!analytics) {
			getAnalytics()
		}
	}, [analytics])

	useEffect(() => {
		const getTokenInfo = async () => {
			const { data } = await fetchTokenInfo('0xf29480344d8e21efeab7fde39f8d8299056a7fea')
			const totalSupply: number = data?.token?.totalSupply ? new BigNumber(data?.token?.totalSupply).dividedBy(1000000000000000000).toNumber() : 0
			const newData = {
				totalSupply,
			};

			setTokenInfo(newData)
		}
		if (!tokenInfo) {
			getTokenInfo()
		}
	}, [tokenInfo])

	return (
		<Container isMobile={isSmall}>
			<SubContainer isMobile={isSmall}>
				<Flex flexDirection='column' width={!isSmall ? '500px' : 'auto'} mr={!isSmall && '100px'}>
					<Title mb={isSmall ? '15px' : '23px'} isMobile={isSmall}>
						{t('Best decentralized exchange experience')}
					</Title>
					<SubTitle mb={isSmall ? '35px' : '56px'} isMobile={isSmall}>
						{t('Explore trading, GameFi, and TBCC in the TBCC FINANCE ecosystem.')}
					</SubTitle>
					<Flex>
						<Box width='180px' mr='20px'>
							<StyledBtn>
								{t('View Roadmap')}
							</StyledBtn>
						</Box>
						<Box width={isSmall ? '120px' : 'auto'}>
							<TransparentBtn>
								{t('API docs')}
							</TransparentBtn>
						</Box>
					</Flex>
				</Flex>
				<Box width={isSmall ? '100%' : '380px'}  mb={isSmall && '30px'} mr={!isSmall && '30px'}>
					<StatisticBox volume={analytics?.volume || 0} traders="227k" locked={1000000000 - (tokenInfo?.totalSupply || 0)} />
				</Box>
			</SubContainer>
		</Container>
	)
}

export default FirstBlock
