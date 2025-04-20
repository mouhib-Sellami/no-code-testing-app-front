import React from "react";

const useFormDataFormatter = () => {

    const jsonToFormData = React.useCallback((data, prefix = '', formData = new FormData()) => {
        for (let key in data) {
            const newKey = prefix ? `${prefix}.${key}` : key;
            if (data[key] instanceof Object) {
                jsonToFormData(data[key], `${newKey}`, formData)
            } else {
                formData.append(`${newKey}`, data[key])
            }
        }
        return formData;
    }, [])

    return {
        jsonToFormData
    }
}

export default useFormDataFormatter;