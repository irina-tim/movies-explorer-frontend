import './RoundCheckbox.css';
import { useState } from 'react';

function RoundCheckbox() {
    const [checked, setChecked] = useState(true);
    return (
        <label className="round-checkbox">
            <input
                className="round-checkbox__default-checkbox"
                type="checkbox"
                checked={ checked }
                onChange={ () => setChecked(!checked) }
            ></input>
            <div className="round-checkbox__custom-checkbox"></div>
        </label>
    );
  }

export default RoundCheckbox;
