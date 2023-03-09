import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import useRefresh from 'hooks/useRefresh'
import { State } from '../types'
import {
  fetchNFTTDA
} from '.'

export const useGetNFTTDAData = () => {
  return useSelector((state: State) => state.nft.nftTDAData)
}

export const useFetchNFT = () => {
  const { fastRefresh } = useRefresh()
  const dispatch = useAppDispatch()

  useEffect(() => {
      dispatch(fetchNFTTDA())
  }, [dispatch, fastRefresh])
}

export const useNFT = () => {
  const nftTDAData = useGetNFTTDAData()

  return {
    nftTDAData,
  }
}
