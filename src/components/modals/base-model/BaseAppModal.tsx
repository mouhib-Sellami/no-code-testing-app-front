import { Box, Button, CloseIcon, Group, Modal, Title, useMantineTheme } from "@mantine/core";
import { BaseAppModalProps } from "./types";
import CustomLoadingOverlay from "@/components/custom-loading/CustomLoadingOverlay";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import PermissionGuardAlert from "@/guards/PermissionGuardAlert";

const BaseAppModal: React.FC<BaseAppModalProps> = ({ onCancel, onSubmit, title, visible, children, submitText, cancelText, isLoading, withCancelButton, submitColor, size = "md", permission = "PUBLIC" }) => {
    const { colors } = useMantineTheme();
    return (
        <Modal
            onClose={onCancel}
            opened={visible}
            centered
            size={size}
            padding={24}
            overlayProps={{
                blur: 3
            }}
            styles={{
                header: {
                    paddingBottom: 0,
                    background: colors.mainContentColor[9]
                },
                content: {
                    position: "relative"
                },
                title: {
                    fontSize: 20,
                    width: "100%",

                },
                close: {
                    color: "darkGray",
                    borderWidth: 0,
                },
                body: {
                    background: colors.mainContentColor[9],
                    padding: 0
                }
            }}

            transitionProps={{ transition: 'fade', duration: 200 }}
            title={<Title order={4} ta={"center"} w={"100%"}>{title}</Title>}
            autoFocus={false}
            closeButtonProps={{
                size: 24,
                icon: <CloseIcon size={"18"} stroke={'15'} focusable={false} />
            }}
        >
            {isLoading && <CustomLoadingOverlay />}
            <PermissionGuardAlert permission={permission}>
                <Box p={0} py={24} bg={"transparent"} w={"100%"}>
                    {children}
                </Box>
                <Group align="center" justify="center" w={"100%"} wrap="nowrap" gap={10} px={"md"}>
                    <PrimaryButton
                        fullWidth
                        color={submitColor || "primary.9"}
                        onClick={onSubmit}
                    >{submitText || "Confirm"}</PrimaryButton>
                    {withCancelButton &&
                        <Button
                            onClick={onCancel}
                        >{cancelText || "Cancel"}</Button>
                    }
                </Group>
            </PermissionGuardAlert>
        </Modal >
    )
}

export default BaseAppModal;