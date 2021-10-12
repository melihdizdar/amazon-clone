import React, {useState} from 'react'

export default function SearchBox(props) {
    const [name, setName] = useState(''); //53.Create Search Box and Search Screen
    const submitHandler = (e) => { //53.Create Search Box and Search Screen
        e.preventDefault(); //53.Create Search Box and Search Screen
        props.history.push(`/search/name/${name}`); //53.Create Search Box and Search Screen
    }
    return (
        <form className="search" onSubmit={submitHandler}>
            <div className="row">
                <input type="text" name="q" id="q" onChange={(e) => setName(e.target.value)}></input>
                <button className="primary" type="submit">
                    <i className="fa fa-search"></i>
                </button>
            </div>
        </form>
    )
}
