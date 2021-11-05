import React, { useEffect, useState } from 'react'
import axios from 'axios';

function useBookSearch(pageNumber) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false);
    const [products, setProducts] = useState([])
    const [hasMore, setHasMore] = useState(false)

    // useEffect(() => {
    //     setProducts([])
    // }, [query])

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        axios({
            method: 'GET',
            url: 'http://localhost:4001/api/products/all',
            params: { page: pageNumber },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(ress => {

            setProducts(prevProducts => {
                return [...new Set([...prevProducts, ...ress.data])]
            })
            setHasMore(ress.data.length > 0)
            setLoading(false)
            console.log(ress.data);
        }).catch(err => {
            if (axios.isCancel(err)) return
            setError(true)
        })
        return () => cancel()
    }, [pageNumber])

    return { loading, error, products, hasMore }
}

export default useBookSearch