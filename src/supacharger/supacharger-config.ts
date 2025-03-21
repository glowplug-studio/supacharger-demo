// Define an array of allowed paths that do not require a session
export const noSessionUserAllowedPaths = [
    '/account/login',
    '/account/create',
    '/account/login-magic',
    // API
    '/api/webhooks',
    // Marketing
    '/pricing',
    '/about',
    // Directory and Profiles
    '/user/:username',
    // Root - remove if all routes are protected.
    '/',

    // Add any other paths you want to allow
];

// Define paths that should redirect logged-in users
export const sessionUserDisallowedPaths = [
    '/account/login',
    '/account/create', 
    '/account/login-magic',
];

// Define where non authenticated users are redirected to to authenticated
export const unauthedRedirectDestinaton = '/account/login';

// Define where authenticated users are redirected to when hitting a unauthed user only page.
export const authedRedirectDestinaton = '/';