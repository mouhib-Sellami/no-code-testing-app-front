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

    return {
        getSlug,
        getSlugWithSeparator,
        createAcronym
    }
}

export default useAppHooks;