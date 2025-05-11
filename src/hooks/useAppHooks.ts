import React from "react";
import slugify from "react-slugify";

const useAppHooks = () => {

    const getSlug = React.useCallback((value: string) => {
        return slugify(value, {
            delimiter: ''
        }).replaceAll('-', '')
    }, [])

    const getSlugWithSeparator = React.useCallback((value: string) => {
        return slugify(value, {
            delimiter: ''
        })
    }, [])

    const createAcronym = React.useCallback((value: string) => {
        if (!value || typeof value !== 'string') return '';
        if (value
            .split(/\s+/).length == 1) return value
        return value
            .split(/\s+/)
            .map(word => word.charAt(0).toUpperCase())
            .join('');
    }, [])

    const formateDate = React.useCallback((value: string) => {
        const date = new Date(value);

        const formattedDate = date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        });
        return formattedDate;
    }, [])

    return {
        getSlug,
        getSlugWithSeparator,
        createAcronym,
        formateDate
    }
}

export default useAppHooks;