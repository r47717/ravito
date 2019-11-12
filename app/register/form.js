import React, {useState} from 'react';
import {render} from 'react-dom';

function RegisterForm({csrf}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    
    return (
        <div className="row">
            <div className="col-4 offset-4">
                <div className="card mt-5">
                    <div className="card-header">Регистрация</div>
                    <div className="card-body">
                        <form action="/register" method="post">
                            <input type="hidden" value={csrf} name="_csrf"/>
                            <input type="text" name="name" value={name} placeholder="Name"
                                   onChange={(e) => setName(e.target.value)} className="form-control mb-2"/>
                            <input type="text" name="email" value={email} placeholder="Email"
                                   onChange={(e) => setEmail(e.target.value)} className="form-control mb-2"/>
                            <input type="text" name="password" value={password} placeholder="Password"
                                   onChange={(e) => setPassword(e.target.value)} className="form-control mb-2"/>
                            <input type="text" name="password-confirm" value={passwordConfirm}
                                   placeholder="Confirm Password"
                                   onChange={(e) => setPasswordConfirm(e.target.value)} className="form-control mb-4"/>
                            <input type="submit" name="submit" value="Отправить" className="btn btn-success"/>
                        </form>
                        <div className="mt-5 d-flex justify-content-between">
                            <div><a href="/login">Логин</a></div>
                            <div><a href="/">Перейти на сайт</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function renderForm(registerFormElem, csrf) {
    render(<RegisterForm csrf={csrf}/>, registerFormElem);
}

