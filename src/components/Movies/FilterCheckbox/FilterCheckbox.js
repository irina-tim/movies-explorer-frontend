import './FilterCheckbox.css'

function FilterCheckbox({ onClick, checked }) {
  return (
    <label className="switch">
      <input
        className="switch__default-checkbox"
        type="checkbox"
        checked={checked}
        onChange={() => onClick(!checked)}
      ></input>
      <span className="switch__custom-slider"></span>
    </label>
  )
}

export default FilterCheckbox
