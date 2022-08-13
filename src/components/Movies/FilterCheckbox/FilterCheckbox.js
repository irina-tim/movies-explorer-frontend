import './FilterCheckbox.css';
import { useState } from 'react';

function FilterCheckbox() {
    const [checked, setChecked] = useState(true);
    return (          
        <label className="switch">
            <input
                className="switch__default-checkbox"
                type="checkbox"
                checked={ checked }
                onChange={ () => setChecked(!checked) }
            ></input>
            <span className="switch__custom-slider"></span>
        </label>
    );
  }

export default FilterCheckbox;