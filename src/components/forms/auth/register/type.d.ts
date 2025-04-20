export interface RegisterFormsProps<T> {
    onSubmit: (data: T) => void,
    data: T | null,
    onPrev?: (data?: T) => void,
    isLoading?: boolean
}
