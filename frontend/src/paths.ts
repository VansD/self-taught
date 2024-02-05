export const Pages = {
    root: "/",
    error: "/error",
    errorRole: "/error?type=role",
    login: "/login",
    register: "/register",
    profile: "/profile",

}

export const Admin = {
    root: '/',
    dashboard: '/admin/dashboard',
    users: '/admin/users',
    editUser: (id: number) => `/admin/users/${id}`
}

export const Teacher = {
    dashboard: '/teacher/dashboard',
    tasks: '/teacher/tasks',
    addTask: '/teacher/task/create',
    editTask: (id: number) => `/teacher/tasks/${id}`
}

export const Student = {
    dashboard: '/student/dashboard'
}