import { useMantineTheme } from "@mantine/core";
import { modals } from "@mantine/modals";
import React from "react";
import MODAL_CONFIG, { ConfirmModalDataType } from "./modal-config";

const useConfirmModal = () => {
    const theme = useMantineTheme();
    const openConfirmModal = React.useCallback((payload: ConfirmModalDataType) => {
        if (!payload.title) {
            throw Error('Title is missing from openUseConfirmModal\'s payload')
        }
        return modals.open({
            ...MODAL_CONFIG(theme, { ...payload, confirmColor: theme.colors.green[9] }),
        });
    }, [])

    const openDeleteModal = React.useCallback((payload: ConfirmModalDataType) => {
        if (!payload.title) {
            throw Error('Title is missing from openUseConfirmModal\'s payload')
        }
        return modals.open({
            ...MODAL_CONFIG(theme, { ...payload, confirmColor: theme.colors.red[9] }),
        });
    }, [])

    return {
        openConfirmModal,
        openDeleteModal
    }
}

export default useConfirmModal;