const ForgetPasswordRender = ({ minutes, seconds }) => {
    return (
        <span>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
    );
};

export default ForgetPasswordRender;