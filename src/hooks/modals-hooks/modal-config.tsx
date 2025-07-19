import { Box, Button, Center, CloseIcon, Group, MantineTheme, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { JSX } from "react";

export type ConfirmModalDataType = {
    title?: string,
    content: string | JSX.Element | Array<JSX.Element>,
    onConfirm: () => void,
    onCancel?: () => void,
    onClose?: () => void,
    confirmText?: string,
    cancelText?: string,
    withCancel?: boolean,
    confirmColor?: string
}

const MODAL_CONFIG: any = (theme: MantineTheme, payload: ConfirmModalDataType) => {

    return {
        title:
            <Center>
                <Text ta={"center"} size="lg">
                    {payload.title}
                </Text>
            </Center>
        ,
        children: (
            <Center>
                <Box w={"80%"}>
                    {typeof payload.content == "string" ? <Text size="sm" c="dimmed" style={{
                        fontWeight: "300"
                    }} ta={"center"}>
                        {payload.content}
                    </Text> : payload.content}
                    <Group align="center" justify="center" w={"100%"} wrap="nowrap" gap={10}>
                        <Button
                            fullWidth
                            color={payload?.confirmColor}
                            onClick={() => {
                                modals.closeAll();
                                payload.onConfirm()
                            }}
                            mt="md">
                            {payload.confirmText || "Valider"}
                        </Button>
                        {payload.withCancel &&
                            <Button
                                fullWidth
                                onClick={() => {
                                    modals.closeAll();
                                    payload?.onCancel?.()
                                }}
                                mt="md">
                                {payload.cancelText || "Annuler"}
                            </Button>}
                    </Group>
                </Box>
            </Center>
        ),
        padding: "24",
        styles: {

            title: {
                fontSize: 24,
                width: "100%"
            },
            header: {
                margin: 0,
                background: theme.colors.mainContentColor[9]
            },
            body: {
                background: theme.colors.mainContentColor[9]

            },
            close: {
                color: "darkGray",
                borderWidth: 0,
            }
        },
        centered: true,
        radius: 6,
        size: 456,
        overlayProps: {
            blur: 3
        },
        closeButtonProps: {
            size: 24,
            icon: <CloseIcon size={"18"} stroke={'15'} />
        },
    }

}
export default MODAL_CONFIG;