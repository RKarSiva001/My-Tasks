// Write your code here
import './index.css'

const TabItem = props => {
  const {tabDetails, setActiveId, isActive} = props
  const {optionId, displayText} = tabDetails

  const onClickTab = () => {
    setActiveId(optionId)
  }

  const tabBtnClassName = isActive ? 'tab-button active' : 'tab-button'

  return (
    <li className="tab-item">
      <button type="button" onClick={onClickTab} className={tabBtnClassName}>
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
