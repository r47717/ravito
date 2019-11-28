import React, {useState} from 'react';
import {render} from 'react-dom';

function LoginForm({csrf}) {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    
    return (
        <div className="row">
            <div className="col-lg-4 offset-lg-4 col-sm-6 offset-sm-3 col-xs-10 offset-xs-1">
                <div className="card mt-5">
                    <div className="card-header login-header">Логин</div>
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
            {/* language=CSS */}
            <style jsx>{`
                .login-header {
                    color: blue;
                }
            `}</style>
        </div>
    )
}

export function renderForm(loginFormElem, csrf) {
    render(<LoginForm csrf={csrf}/>, loginFormElem);
}

