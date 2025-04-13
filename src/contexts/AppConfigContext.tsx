import useAppConfigs from "@/hooks/useAppConfigs";
import { setColorSchemaConfig } from "@/redux/slices/appConfigSlice";
import { dispatch } from "@/redux/store";
import { MantineColorScheme, useMantineColorScheme } from "@mantine/core";
import React, { PropsWithChildren } from "react";

type AppConfigContextProps = {
    colorScheme: MantineColorScheme,
    changeColorMode: (value: MantineColorScheme) => void | null
    ToggleColorMode: () => void | null
}

const AppConfigContext = React.createContext<Partial<AppConfigContextProps>>({
    colorScheme: "dark",
    changeColorMode: (_: MantineColorScheme) => null,
    ToggleColorMode: () => null

})

const AppConfigProvider = (props: PropsWithChildren) => {
    const { setColorScheme, colorScheme } = useMantineColorScheme();
    const { schemaMode } = useAppConfigs();

    React.useEffect(() => {
        setColorScheme(schemaMode)
    }, [schemaMode])

    const changeColorMode = React.useCallback((value: MantineColorScheme) => {
        dispatch(setColorSchemaConfig(value))
    }, [])

    const ToggleColorMode = React.useCallback(() => {
        dispatch(setColorSchemaConfig(schemaMode == "dark" ? "light" : "dark"))
    }, [schemaMode])

    return (
        <AppConfigContext.Provider value={{ colorScheme, changeColorMode, ToggleColorMode }}>
            {props.children}
        </AppConfigContext.Provider>
    )
};
const AppConfigConsumer = AppConfigContext.Consumer
export { AppConfigContext, AppConfigProvider, AppConfigConsumer };