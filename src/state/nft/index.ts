/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  NFTState,
  NFTTDAResponse,
  NFTTDAGraphEntity
} from 'state/types'
import getNFTTDAData from './getNFTTDAData'

const initialState: NFTState = {
  nftTDAData: {
    totalTokens: '0',
    totalSupply: '0',
    busdPrice: '0'
  }
}

export const fetchNFTTDA = createAsyncThunk<NFTTDAGraphEntity>(
  'nft/fetchNFTTDA',
  async () => {
    const nftTDAInfo = await getNFTTDAData()
    return nftTDAInfo
  },
)

export const NFTSlice = createSlice({
  name: 'NFT',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNFTTDA.fulfilled, (state, action: PayloadAction<NFTTDAResponse>) => {
      state.nftTDAData = { ...state.nftTDAData, ...action.payload }
    })
  },
})

export default NFTSlice.reducer
