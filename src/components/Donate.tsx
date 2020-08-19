import React, { useState, useEffect } from 'react'
import DonationAddress from './DonationAddress'
import '../css/donate.css';

const ADDRESSES = [
  { id: 1, name: 'BTC', address: '1P2jyC5MvnsWZvidRmp7oQXAiCpsox9iVf' },
  { id: 2, name: 'LTC', address: 'LQwW9UVgLxv9iV5qewKp9yiDgFqtwuY5jy' },
  { id: 3, name: 'ETH', address: '0xaef3256056aab079f06e424b3ac2608b0184f120' }
]

interface DonationAddressUI {
  id: number;
  name: string;
  address: string;
}

function Donate() {
  const [donationAddresses, setDonationAddresses] = useState<DonationAddressUI[]>([])
  const [displayDonations, setDisplayDonations] = useState(false)
  const [delayShown, setDelayShown] = useState(false)

  const getDonationAddresses = () => {
    setDonationAddresses(ADDRESSES)
  }

  const handleDisplayDonations = () => {
    setDisplayDonations(!displayDonations)
    setTimeout(() => {
      setDelayShown(!displayDonations)
    }, 250);
  }

  useEffect(() => {
    getDonationAddresses()
  }, [])

  return (
    <div>
      <button
        className="donate-btn main-btn"
        onClick={() => { handleDisplayDonations() }}
      >{displayDonations ? 'Nah, nm' : 'Donate'}</button>
      <section className={`donate-container ${displayDonations ? 'slideUp' : 'slideDown'} ${delayShown ? '' : 'hide'}`}>
        <div className="content-center">
          <p>
            <span className="html-ent" role="img" aria-label="coffee">&#x2615;</span><span>and</span><span className="html-ent" role="img" aria-label="beer">&#x1f37a;</span><span>fund.</span>
          </p>
          <div className="wallet-sources">
            {donationAddresses.length > 0 &&
              donationAddresses.map((address: DonationAddressUI) => (
                <DonationAddress key={address.id} {...address} />
              ))
            }
          </div>
        </div>
      </section>
    </div>
  )
}

export default Donate;
