import { createQR, encodeURL, EncodeURLComponents } from "@solana/pay";
import { Keypair } from "@solana/web3.js";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef } from "react";
import BackLink from "../../components/BackLink";
import PageHeading from "../../components/PageHeading";
import { shopAddress, usdcToken } from "../../lib/addresses";
import calculatePrice from "../../lib/calculatePrice";

export default function Checkout() {
  const router = useRouter()

  // ref to a div where we'll show the QR code
  const qrRef = useRef<HTMLDivElement>(null)

  const amount = useMemo(() => calculatePrice(router.query), [router.query])

  // Unique address that we can listen for payments to
  const reference = useMemo(() => Keypair.generate().publicKey, [])

  // Solana Pay transfer params
  const urlParams: EncodeURLComponents = {
    recipient: shopAddress,
    splToken: usdcToken,
    amount,
    reference,
    label: "biscuits Inc",
    message: "Thanks for your order! 🍪",
  }

  // Encode the params into the format shown
  const url = encodeURL(urlParams)
  console.log({ url })

  // Show the QR code
  useEffect(() => {
    const qr = createQR(url, 512, 'transparent')
    if (qrRef.current && amount.isGreaterThan(0)) {
      qrRef.current.innerHTML = ''
      qr.append(qrRef.current)
    }
  })

  return (
    <div className="flex flex-col gap-8 items-center">
      <BackLink href='/shop'>Cancel</BackLink>

      <PageHeading>So you have to pay {amount.toString()} biscuit Tokens! 🍪🍪 </PageHeading>

      {/* div added to display the QR code */}
      <div ref={qrRef} />
    </div>
  )
}