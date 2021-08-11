import ReactJson from 'react-json-view'

const stylesJson = {
  collapseStringsAfterLength: 50,
  displayDataTypes: false,
  displayObjectSize: false,
  enableClipboard: false,
  iconStyle: `triangle`,
  quotesOnKeys: false,
  style: {
    fontSize: 12,
    lineHeight: 1
  }
}

const ListView = props => {
  return <ReactJson {...stylesJson} src={props.report} />
}

export default ListView
