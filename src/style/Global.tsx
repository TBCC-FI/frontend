import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { TBCCFinanceTheme } from '../uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends TBCCFinanceTheme { }
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Rubik', sans-serif;
  }
  body {
    background-color: #E5E5E5;

    ::-webkit-scrollbar {
      display: none;
    }

    img {
      height: auto;
      max-width: 100%;
    }
  }
  
  .nftHeaderSlider {
    color: red;
    & .swiper-pagination {
      &-bullet {
        width: 100px;
        height: 2px;
        background: #fff;
        opacity: 0.6;
        border-radius: 0;

        &-active {
          opacity: 1;
        }
      }
    }
    
    &.-mobile {
      
    }
  }

  .nftTopSlider {
    & .swiper-pagination {
      &-bullet {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: #D6DBEF;

        &-active {
          width: 8px;
          height: 8px;
          background-color: #989EB9;
        }
      }
    }
  }

  .advantagesMobileSlider {
    width: 100%;
    height: 320px;

    & .swiper-pagination {
      &-bullet {
        width: 6px;
        height: 6px;
        background: #fff;
        opacity: 0.6;
        border-radius: 50%;

        &-active {
          opacity: 1;
        }
      }
    }
}
`

export default GlobalStyle
