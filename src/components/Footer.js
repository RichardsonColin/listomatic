import React, { useEffect, useState } from 'react'
import '../css/footer.css';

function Footer() {
  return (
    <footer className="app-footer">
      <div className="content-center">
        <p>
          <span role="img" aria-label="coffee">&#x2615;</span> and <span role="img" aria-label="beer">&#x1f37a;</span> fund.
        </p>
        <div id="wallet-sources">
          <div>
            <p><strong>BTC</strong>: asd87f6786asd8f76as87d6f876asdf</p> <button className="alt-btn">Copy</button>
          </div>
          <div>
            <p><strong>ETH</strong>: asd87f6786asd8f76as87d6f876asdf</p> <button className="alt-btn">Copy</button>
          </div>
          <div>
            <p><strong>LTC</strong>: asd87f6786asd8f76as87d6f876asdf</p> <button className="alt-btn">Copy</button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
