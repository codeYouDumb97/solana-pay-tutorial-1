import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Products from '../components/Products'
import CouponBook from '../components/CouponBook'
import SiteHeading from '../components/SiteHeading'

export default function HomePage() {
  // We get the public key of the connected wallet, if there is one
  const { publicKey } = useWallet()
  console.log("Connected to: ", publicKey?.toString());

  return (
    <div className="flex flex-col gap-8 max-w-4xl items-stretch m-auto pt-24">
      <SiteHeading>biscuits Inc</SiteHeading>
      <p><h4><a href='https://spl-token-faucet.com/https://spl-token-faucet.com/?token-name=UDSC-DEV' target='_blank'>Click here to get yourself some USDC tokens</a></h4></p>

      {/* We add the Solana wallet connect button */}
      <div className="basis-1/4">
        <WalletMultiButton className='!bg-gray-900 hover:scale-105' />
      </div>

      {/* We display the coupon book if there's a connected wallet */}
      {publicKey && <CouponBook />}


      {/* We disable checking out without a connected wallet */}
      <Products submitTarget='/checkout' enabled={publicKey !== null} />
    </div>
  )
}