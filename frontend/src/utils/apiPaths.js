export const BASEURL = "http://localhost:7000"

export const API_PATHS = {
    SONG_API: {
        ADD_SONG: '/api/song/add',
        GET_ALL_SONG: '/api/song/',
        UPLOAD_VIDEO: "/api/song/upload-video",
        LIKE_SONG: (songId) => `/api/song/like/${songId}`,
        GET_SINGLE_SONG: (songId) => `/api/song/${songId}`,
        DELETE_SONG: (songId) => `/api/song/${songId}`,
        UPDATE_SONG: (songId) => `/api/song/${songId}`
    },
    PRODUCT_API: {
        ADD_PRODUCT: '/api/product/add',
        GET_ALL_PRODUCT: '/api/product/',
        UPLOAD_IMAGE: "/api/product/upload-image",
        GET_SINGLE_PRODUCT: (productId) => `/api/product/${productId}`,
        DELETE_PRODUCT: (productId) => `/api/product/${productId}`,
        UPDATE_PRODUCT: (productId) => `/api/product/${productId}`
    },
    AUTH: {
        CREATE_USER: "/api/users/new",
        LOGIN_USER: "/api/users/login",
        DELETE_USER: "api/users/remove",
        GET_USER_INFO: "/api/users/getuser"
    }
}