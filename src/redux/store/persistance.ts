import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import notificationReducer from "@/redux/slices/notificationSlice/notificationSlice";
import sessionReducer from "@/redux/slices/sessionSlice/sessionSlice";
import appConfigReducer from "@/redux/slices/appConfigSlice";
import TenantReducer from "@/redux/slices/TenantSlice/TenantSlice";
import permissionReducer from "@/redux/slices/authSlices/permissionSlice";
import authReducer from "@/redux/slices/authSlices/authSlice";

const encrypts = encryptTransform({
    secretKey: import.meta.env.VITE_REDUX_SECURE_STORAGE_HASH_KEY,
    onError: function (error) {
        console.error(error);
    },
})

const basePersistenceConfig = {
    keyPrefix: 'redux-',
    storage: storage,
    transforms: [encrypts]
}

const userPersistConfig = {
    key: 'user',
    storage: storage,
    keyPrefix: 'redux-',
    whitelist: ['isAuthenticated', 'user', 'permissions', 'role', 'organization'],
};


const appConfigPersistenceConfig = {
    ...basePersistenceConfig,
    key: 'app-root',
    whitelist: ['schemaMode'],
}

const rootPersistConfig = {
    ...basePersistenceConfig,
    key: 'root',
    whitelist: [],
};

const notificationPersistConfig = {
    ...basePersistenceConfig,
    key: 'notification',
    whitelist: [],
};

const sessionPersistConfig = {
    ...basePersistenceConfig,
    key: 'session',
    whitelist: ['isAlive'],
};

const TenantPersistConfig = {
    ...basePersistenceConfig,
    key: 'tenant',
    whitelist: ['tenant','is_valid'],
};

const PermissionsPersistConfig = {
    key: 'permissions',
    storage: storage,
    keyPrefix: 'redux-',
    whitelist: ['permissions'],
};


const rootReducer = combineReducers({
    appConfigs: persistReducer(appConfigPersistenceConfig, appConfigReducer),
    auth: persistReducer(userPersistConfig, authReducer),
    notification: persistReducer(notificationPersistConfig, notificationReducer),
    session: persistReducer(sessionPersistConfig, sessionReducer),
    tenant: persistReducer(TenantPersistConfig, TenantReducer),
    permissions: persistReducer(PermissionsPersistConfig, permissionReducer),

})

export { rootPersistConfig, rootReducer };
export type RootReducer = ReturnType<typeof rootReducer>;
