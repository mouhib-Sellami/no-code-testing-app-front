//TO DO

import DataTableConfig from "@/config/DataTableConfig";
import { dispatch } from "@/redux/store";
import { paginationRequestParams } from "@/types/requests/PaginationRequestParams";
import { AsyncThunk } from "@reduxjs/toolkit";
import React from "react";


const usePagination = (cb: AsyncThunk<any, paginationRequestParams, any>) => {
    const [page, setPage] = React.useState(1);
    const [query, setQuery] = React.useState("");

    const pagination = React.useMemo(() => {
        return {
            p: page,
            page_size: DataTableConfig.MAX_PAGE_SIZE,
            search: query
        }
    }, [])

    const onPageChange = React.useCallback((p: number) => {
        setPage(p);
    }, [])

    const onSearch = React.useCallback((q: string) => {
        setPage(1);
        setQuery(q);
    }, [])

    const fetchData = React.useCallback(async () => {
        await dispatch(cb({
            p: page,
            page_size: DataTableConfig.MAX_PAGE_SIZE,
            search: query
        }))
    }, [page, query])

    React.useEffect(() => {
        fetchData()
    }, [page, query])

    const reset = React.useCallback(() => {
        setPage(0)
        setQuery("")
    }, [])

    return {
        pagination,
        page,
        query,
        onPageChange,
        onSearch,
        fetchData,
        reset
    }
}

export default usePagination;