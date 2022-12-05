import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Text }from '../uikit'

const Container = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
  position: relative;
  top: 0;
  background: #EB2323;
`

const Attention = () => {

  const { t } = useTranslation()

  return (
    <Container>
      <Text fontSize='14px' fontWeight='400' color='#FFF'>
        {t('Attention this version is for developers! Do not use for exchange! For the preservation of coins the project is not responsible!')}
      </Text>
    </Container>
  )
}

export default Attention