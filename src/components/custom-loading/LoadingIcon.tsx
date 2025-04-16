import { DotLottieReact } from "@lottiefiles/dotlottie-react"


const LoadingIcon: React.FC = () => {
    return (
        <DotLottieReact
            src="https://lottie.host/6c77cc3e-bfbc-4c49-abf3-e1f4cd1ecf09/4np1whAaMD.lottie"
            loop
            autoplay
            backgroundColor="transparent"
            renderConfig={{
                autoResize: true
            }}
            layout={{
                align: [0.5, 0.5],
                fit: "cover"
            }}
        />
    )
}
export default LoadingIcon;