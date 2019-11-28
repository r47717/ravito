import React, {useState} from 'react';
import {render} from 'react-dom';

function NewPostForm({csrf, categories}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [contacts, setContacts] = useState("");
    const [category, setCategory] = useState("");
    const [submitDisabled, setSubmitDisabled] = useState(true);

    function onTitleChange(e) {
        const { target: {value} } = e;
        setTitle(value);
        setSubmitDisabled(value.trim() ? false : true);
    }

    return (
        <div className="row" style={{marginTop: "50px"}}>
            <div className="col-6 offset-3">
                <div className="card mt-5">
                    <div className="card-header">Новое объявление</div>
                    <div className="card-body">
                        <form action="/posts" method="post" encType="multipart/form-data">
                            <input type="hidden" value={csrf} name="_csrf" />
                            <select name="category" className="form-control mb-4">
                                <option value="none" defaultValue={true}>Без категории</option>)
                                {Object.keys(categories).map(cat => <option value={cat} key={cat}>{categories[cat]}</option>)}
                            </select>
                            <input type="text" name="title" value={title} placeholder="Заголовок"
                                   onChange={onTitleChange} className="form-control mb-2"/>
                            <textarea type="text" name="description" value={description} placeholder="Описание"
                                   onChange={(e) => setDescription(e.target.value)} className="form-control mb-2"/>
                            <textarea type="text" name="contacts" value={contacts} placeholder="Контакты"
                                   onChange={(e) => setContacts(e.target.value)} className="form-control mb-2"/>
                            <div className="mb-2 mt-4 files-upload-container">
                                <div className="row">
                                    <div className="col-6">
                                        <input type="file" name="file1" className="form-control mb-2"/>
                                        <input type="file" name="file2" className="form-control mb-2"/>
                                        <input type="file" name="file3" className="form-control mb-2"/>
                                    </div>
                                    <div className="col-6">
                                        <input type="file" name="file4" className="form-control mb-2"/>
                                        <input type="file" name="file5" className="form-control mb-2"/>
                                        <input type="file" name="file6" className="form-control mb-2"/>
                                    </div>
                                </div>
                            </div>
                            <input type="submit" name="submit" value="Опубликовать" className="btn btn-success mt-2" disabled={submitDisabled}/>
                        </form>
                    </div>
                </div>
            </div>
            {/* language=CSS */}
            <style jsx>{`
                input[type=file] {
                    border: none;
                }
                .files-upload-container {
                    padding: 20px;
                    border: 1px solid #ced4da;
                    border-radius: .25rem;
                }
`           }</style>
        </div>
    )
}

export function renderForm(newPostFormElem, csrf, categories) {
    render(<NewPostForm csrf={csrf} categories={categories}/>, newPostFormElem);
}

