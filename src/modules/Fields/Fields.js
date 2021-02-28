function Fields(props) {
    const getFields = (props) => {
        const pages = []
        props.data.forEach((elem) => {
            const item = <option key={elem} value={elem}>{elem}</option>
            pages.push(item)
        })
        return pages
    }
    return getFields(props)
}

export default Fields