import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/AuthService";
import adminReducer from './reducers/admin/AdminSlice';
import teacherReducer from './reducers/teacher/TeacherSlice';
import studentReducer from './reducers/student/StudentSlice';
import authReducer from './reducers/auth/AuthSlice';
import { adminApi } from "../services/AdminService";
import { teacherApi } from "../services/TeacherService";
import { studentApi } from "../services/StudentService";
import { authMiddleware } from "../middleware/auth";

const rootReducer = combineReducers({
    auth: authReducer,
    adminReducer,
    teacherReducer,
    studentReducer,
    [authApi.reducerPath]: authApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [teacherApi.reducerPath]: teacherApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
})

export const setupStore = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .prepend(authMiddleware.middleware)
            .concat(authApi.middleware)
            .concat(adminApi.middleware)
            .concat(teacherApi.middleware)
            .concat(studentApi.middleware)
})


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore.getState>
export type AppDispatch = typeof setupStore.dispatch

// export type RootState = ReturnType<typeof rootReducer>
// export type AppStore = ReturnType<typeof setupStore>
//export type AppDispatch = AppStore['dispatch']
