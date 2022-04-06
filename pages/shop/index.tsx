import Products from '../../components/Products'
import SiteHeading from '../../components/SiteHeading'

export default function ShopPage() {
  return (
    <div className="flex flex-col gap-8 max-w-4xl items-stretch m-auto pt-24">
      <SiteHeading>biscuits Inc</SiteHeading>
      <p>
          <h4>
              <a 
      href='https://spl-token-faucet.com/https://spl-token-faucet.com/?token-name=biscuit' 
      target='_blank'>
          Click here to get yourself some biscuit tokens
                </a>
            </h4>
          </p>
      <Products submitTarget='/shop/checkout' enabled={true} />    </div>
  )
}