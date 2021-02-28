function Pages(props) {
    const getPages = (props) => {
        const pages = []
        for (let i = 1; i <= props.data; i++) {
            const item = <option key={i} value={i}>{i}</option>
            pages.push(item)
        }
        return pages
    }
    return getPages(props)
}

export default Pages