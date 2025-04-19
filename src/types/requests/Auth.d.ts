interface UserAuth {
    username: string;
    password: string;
}

interface resetPasswordRequest {
    token: string,
    password: string,
    confirm_password: string
}