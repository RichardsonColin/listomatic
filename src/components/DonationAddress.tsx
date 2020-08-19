import React, { useState } from 'react'
import '../css/donation-address.css';
const CopyToClipboard = require('react-copy-to-clipboard')

// TODO: Complete copy functionality

interface DonationAddressProps {
  id: number;
  name: string
  address: string;
}

function DonationAddress(props: DonationAddressProps) {
  const [copySuccess, setCopySuccess] = useState(false)

  const handleCopy = (evt: any) => {
    setTimeout(() => {
      setCopySuccess(false)
    }, 75);
  }

  return (
    <div className="donation-address">
      <div>
        <p>
          <strong>{props.name}: </strong>
          <span className={`donation-address ${copySuccess ? 'highlight' : ''}`}>{props.address}</span>
        </p>
        {document.queryCommandSupported('copy') &&
          <CopyToClipboard text={props.address}
            onCopy={() => { setCopySuccess(true) }}
          >
            <button className="alt-2-btn" onClick={(evt) => { handleCopy(evt) }}>Copy</button>
          </CopyToClipboard>
        }
      </div>
    </div>
  )
}

export default DonationAddress;
