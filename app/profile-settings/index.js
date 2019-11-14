const React = require('react');
const {useState, useMemo} = require('react');
const { html } = require('htm/react');

function ProfileSettings() {
    const [value, setValue] = useState('');
    const doubledValue = useMemo(() => `Текущее значение: '${value}'`, [value]);
    
    function onChangeValue(e) {
        setValue(e.target.value);
        console.log(e);
    }
    
    return html`
        <div className="row mt-5">
            <div className="col-4 offset-4">
                <div className="card">
                    <div className="card-header">Настройки профиля</div>
                    <div className="card-body">
                        <input type="text" name="setting" value=${value} onChange=${onChangeValue} placeholder="Какая-то настройка" className="form-control" />
                    </div>
                    <div>${doubledValue}</div>
                </div>
            </div>
        </div>
    `
}

module.exports = html`<${ProfileSettings} />`;

