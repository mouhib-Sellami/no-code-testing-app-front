function path(root: string, sublink: string) {
    return `${root}${sublink}`;
}

const ROOTS_AUTH = '';
const ROOTS_APP = '';

export const PATH_AUTH = {
    landing: path(ROOTS_AUTH, '/'),
    login: path(ROOTS_AUTH, '/login'),
    register: path(ROOTS_AUTH, '/register'),
    forgetPassword: path(ROOTS_AUTH, '/forget-password'),
    resetPassword: path(ROOTS_AUTH, '/reset/password/:token'),
}

export const PATH_APP = {
    root: ROOTS_APP,
    general: {
        dashboard: {
            home: path(ROOTS_APP, '/dashboard'),
            users: path(ROOTS_APP, '/members'),
            projects: path(ROOTS_APP, '/projects'),
            organization: path(ROOTS_APP, '/organization'),
            roles: path(ROOTS_APP, '/privilege'),
            builder: path(ROOTS_APP, '/builder'),
            runnerAgent: path(ROOTS_APP, '/runner-agent'),
            projectLogs: path(ROOTS_APP, '/project-pipeline/:id'),
        },
        notFound: path(ROOTS_APP, '/404')
    }
};
