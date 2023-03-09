import { request, gql } from 'graphql-request'
import { GRAPH_API_NFTTFA } from 'config/constants/endpoints'
import { NFTTDAGraphEntity } from 'state/types'
import addresses from "../../config/constants/contracts";
import {getAddress} from "../../utils/addressHelpers";

export const getGraphNFTTDA = async (
  id = getAddress(addresses.nftTDA),
): Promise<NFTTDAGraphEntity> => {
  try {
    const response = await request(
      GRAPH_API_NFTTFA,
      gql`
        query getNFTTDA($id: Bytes!) {
          contract(id: $id) {
            totalSupply
            totalTokens
            busdPrice
          }
        }
      `,
      { id },
    )
    return response.contract
  } catch (error) {
    console.error(error)
    return {
      totalSupply: '0',
      totalTokens: '0',
      busdPrice: '0',
    }
  }
}

const getNFTTDAData = async (): Promise<NFTTDAGraphEntity> => {
  const graphResponse = await getGraphNFTTDA()
  return graphResponse
}

export default getNFTTDAData
