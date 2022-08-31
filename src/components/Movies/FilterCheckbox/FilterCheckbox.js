import './FilterCheckbox.css'
import { useState } from 'react'

function FilterCheckbox({ onClick, checked }) {
  // const [checked, setChecked] = useState(false)
  return (
    <label className="switch">
      <input
        className="switch__default-checkbox"
        type="checkbox"
        checked={checked}
        onChange={() => onClick(!checked)}
        // onClick={() => onClick(!checked)}
      ></input>
      <span className="switch__custom-slider"></span>
    </label>
  )
}

export default FilterCheckbox
