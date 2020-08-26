import React from 'react'
import '../css/trading-list.css';
const CopyToClipboard = require('react-copy-to-clipboard')
/*
  TODO:
   - Fix CopyToClip dependency
   - Add copied notification
   - Add download functionality
*/


interface TradingListProps {
  tradingPairsList: string;
}

function TradingList(props: TradingListProps) {
  // const [copySuccess, setCopySuccess] = useState(false)

  return (
    <div className={`textarea-container ${props.tradingPairsList.length ? 'fade-in' : 'fade-out'}`}>
      {props.tradingPairsList.length &&
        <div className="textarea-wrap">
          <div>
            {document.queryCommandSupported('copy') &&
              <CopyToClipboard text={props.tradingPairsList}
              // onCopy={() => { setCopySuccess(true) }}
              >
                <button>Copy</button>
              </CopyToClipboard>
            }
            {/* <button>Download</button> */}
          </div>
          <textarea
            value={props.tradingPairsList}
            onChange={evt => null}
          />
        </div>
      }
    </div>
  )
}

export default TradingList;
