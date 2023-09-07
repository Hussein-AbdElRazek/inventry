import React, { useEffect, useState } from 'react'
import LimitedProductsUi from './LimitedProductsUi'
import useHttp from '../../hooks/use-http';

const LimitedProducts = () =>
{
    const {
        isLoading: isLoadingGetLimitedProducts,
        sendRequest: getLimitedProducts
    } = useHttp();

    // i use indexing of pages from zero to handle pagination with data grid
    // and i use in api currentPage + 1 because index from 1
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalNumberOfItems, setTotalNumberOfItems] = useState(0);

    const [limitedProducts, setLimitedProducts] = useState([]);

    //get all product from data base
    useEffect(() =>
    {
        const getResponse = ({ message, data, numOfPages, totalNumOfItems, numOfItems }) =>
        {
            if (message === "success")
            {
                data = data.map((product) => ({ ...product, id: product._id, _id: undefined, __v: undefined, }))
                setLimitedProducts(data)

                if (numOfPages !== totalPages) setTotalPages(numOfPages)
                if (totalNumOfItems !== totalNumberOfItems) setTotalNumberOfItems(totalNumOfItems)
                if (pageSize !== numOfItems) setPageSize(numOfItems)
            }
        };
        if (currentPage < totalPages)
        {
            getLimitedProducts(
                {
                    url: `getLimitedItems?page=${currentPage + 1}&limit=10`,
                    method: "GET",
                },
                getResponse
            );
        }
    }, [currentPage])

    return (
        <LimitedProductsUi
            limitedProducts={limitedProducts}
            isLoadingGetLimitedProducts={isLoadingGetLimitedProducts}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            totalNumberOfItems={totalNumberOfItems}

        />
    )
}

export default LimitedProducts