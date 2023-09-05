import React, { useEffect, useState } from 'react'

import ProductsUi from './ProductsUi'
import useHttp from '../../hooks/use-http';
import { mergeToUniqueArray } from '../../helpers/mergeToUniqueArray';

const Products = () =>
{
    const {
        isLoading: isLoadingGetAllProducts,
        sendRequest: getAllProducts
    } = useHttp();
    const [pagesSize, setPagesSize] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);
    useEffect(() =>
    {
        const getResponse = ({ message, data, numOfPages }) =>
        {
            if (message === "success")
            {
                data = data.map((product) => ({ ...product, id: product._id }))
                setProducts((prev) => mergeToUniqueArray( data, prev))
                if (numOfPages !== pagesSize) setPagesSize(numOfPages)
            }
        };
        if (currentPage <= pagesSize)
        {
            getAllProducts(
                {
                    url: `getAllProducts?page=${currentPage}&limit=10`,
                    method: "GET",
                },
                getResponse
            );
        }
    }, [currentPage])
    return (
        <ProductsUi products={products} />
    )
}

export default Products