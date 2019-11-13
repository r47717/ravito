import React, {useState} from 'react';
import {render} from 'react-dom';

function LoginForm({csrf}) {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    
    return (
        <div className="row">
            <div className="col-4 offset-4">
                <div className="card mt-5">
                    <div className="card-header">Логин</div>
                    <div className="card-body">
                        <form action="/login" method="post">
                            <input type="hidden" value={csrf} name="_csrf" />
                            <input type="text" name="username" value={username} placeholder="Email"
                                   onChange={(e) => setUserName(e.target.value)} className="form-control mb-2"/>
                            <input type="password" name="password" value={password} placeholder="Password"
                                   onChange={(e) => setPassword(e.target.value)} className="form-control mb-4"/>
                            <input type="submit" name="submit" value="Отправить" className="btn btn-success"/>
                        </form>
                        <div className="mt-5 d-flex justify-content-between">
                            <div><a href="/register">Регистрация</a></div>
                            <div><a href="/">Перейти на сайт</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function renderForm(loginFormElem, csrf) {
    render(<LoginForm csrf={csrf}/>, loginFormElem);
}

