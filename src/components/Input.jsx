const Input = (props) => {
    const handlerChange = (e) => {
        e.preventDefault()
        props.setFilter(e.target.value);
    }
    return <input type="text" placeholder="Entrez plus de 3 lettres" onChange={(e) => { handlerChange(e) }} />
}

export default Input;