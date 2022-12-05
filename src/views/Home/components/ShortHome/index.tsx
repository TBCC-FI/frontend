import React from "react"
import styled from 'styled-components'
import { useTranslation } from "contexts/Localization"
import { useScrollTo } from 'react-use-window-scroll';
import { Flex, Text, Box, Image, useMatchBreakpoints } from '../../../../uikit'
import { StyledBtn, Container, SubContainer } from '../../style'

const TextContainer = styled(Flex) <{ isMobile?: boolean }>`
	flex-direction: column;
	max-width: 500px;
	align-items: ${({ isMobile }) => isMobile ? 'center' : 'flex-start'};
`
const Title = styled(Text) <{ isMobile?: boolean }>`
	font-weight: 600;
	font-size: ${({ isMobile }) => isMobile ? '32px' : '56px'};
	line-height: ${({ isMobile }) => isMobile ? '42px' : '72px'};
	color: #FFF;
	text-align: ${({ isMobile }) => isMobile ? 'center' : 'left'};
`
const SubTitle = styled(Text) <{ isMobile?: boolean }>`
	font-weight: 400;
	font-size: ${({ isMobile }) => isMobile ? '16px' : '18px'};
	line-height: ${({ isMobile }) => isMobile ? '24px' : '26px'};
	color: rgba(255, 255, 255, 0.6);
	text-align: ${({ isMobile }) => isMobile ? 'center' : 'left'};
`

const ShortHome = ({ setExtended }) => {

	const { t } = useTranslation()
	const { isMobile, isTablet } = useMatchBreakpoints()
	const isSmall = isMobile || isTablet
	const scrollTo = useScrollTo()

	const extension = () => {
		setExtended(true)
		scrollTo({ top: 700, left: 0, behavior: 'smooth' })
	}

	return (
		<Container isMobile={isSmall} style={{height: isSmall ? '' : '100vh'}}>
			<SubContainer isMobile={isSmall}>
				<TextContainer isMobile={isSmall}>
					<Title mb='20px' isMobile={isSmall}>
						{t('Trade, farm, swap on DEX universe')}
					</Title>
					<SubTitle isMobile={isSmall}>
						{t('Enjoy the highest farming/trading rewards from unlimited referral levels!')}
					</SubTitle>
					<Box width='180px' mt='36px'>
						<StyledBtn
							onClick={extension}>
							{t('Discover More')}
						</StyledBtn>
					</Box>
					{isSmall && <Box height={80} />}
				</TextContainer>
				<Flex mt={isSmall && '70px'} justifyContent='center'>
					<Image
						src="images/HomePage/homepage-mainpic.png"
						width={isSmall ? '90%' : '600px'}
						height='auto'
						style={{ maxWidth: '600px' }} />
				</Flex>
			</SubContainer>
		</Container>
	)
}

export default ShortHome
