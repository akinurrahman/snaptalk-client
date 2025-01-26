export const protectedRoutes = ["/dashboard"];
export const authenticationRoutes = ["/login", "/signup"];

export const defaultProtectedRoute = "/dashboard";
export const defaultAuthenticationPath = "/login";

// Function to generate matcher array
export const generateMatchers = () => {
  return protectedRoutes.map((route) => `${route}/:path*`);
};
