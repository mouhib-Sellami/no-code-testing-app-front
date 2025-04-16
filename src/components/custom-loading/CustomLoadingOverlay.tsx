import { Box, LoadingOverlay } from "@mantine/core";
// import LoadingIcon from "./LoadingIcon";

const CustomLoadingOverlay: React.FC = ({ }) => {
    return (
        <LoadingOverlay
            visible
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
            // loaderProps={{
            //     children: <Box h={200} w={200}><LoadingIcon /></Box>
            // }}
        />
    )
}

export default CustomLoadingOverlay;