import { createListenerMiddleware } from "@reduxjs/toolkit";
import { authApi } from "../services/AuthService";

export const authMiddleware = createListenerMiddleware();

authMiddleware.startListening({
    matcher: authApi.endpoints.login.matchFulfilled,
    effect: async (action, listenerApi) => {
        listenerApi.cancelActiveListeners();

        if (action.payload.authToken) {
            localStorage.setItem("authToken", action.payload.authToken);
            localStorage.setItem("user", JSON.stringify(action.payload));
        }
    }
})
