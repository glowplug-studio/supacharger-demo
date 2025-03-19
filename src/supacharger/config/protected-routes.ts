// Define an array of allowed paths that do not require a session
export const noSessionUserAllowedPaths = [
    '/signin',
    '/signup',
    '/api/webhooks',
    '/pricing',
    '/about',
    '/signin-magic',
    '/',
    '/user/:username',
    // Add any other paths you want to allow
];

// Define paths that should redirect logged-in users
export const sessionUserDisallowedPaths = [
    '/signin',
    '/signin-magic', 
    '/signup',
];

// Define where non authenticated users are redirected to to authenticated
export const unauthedRedirectDestinaton = '/signin';

// Define where authenticated users are redirected to when hitting a unauthed user only page.
export const authedRedirectDestinaton = '/';