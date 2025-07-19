import { PropsWithChildren } from "react";

export interface AppChartCardProps extends PropsWithChildren {
    title: string | JSX.Element,
    subTitle?: string,
    withBorder?: boolean,
    withoutPadding?: boolean,
    contentHeader?: JSX.Element,
    isLoading?: boolean,
}
