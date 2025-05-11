import { ModalProps } from "@mantine/core";
import { PropsWithChildren } from "react";


export interface AppModalProps {
    visible: boolean,
    onSubmit: () => void,
    onCancel: () => void,
    isLoading?: boolean,
    permission?: string
}

export interface BaseAppModalProps extends AppModalProps, PropsWithChildren {
    submitText?: string,
    cancelText?: string,
    title: string,
    submitText: ReactNode;
    withCancelButton?: boolean,
    submitColor?: string,
    size?: string | number;
    fullScreen?: boolean,
    SubmitButtonLoading?: boolean,
    height?: string | number
}
