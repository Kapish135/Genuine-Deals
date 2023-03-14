// import React from "react";
// import { Route } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// const protectedRoute = ({ element: Component, ...rest }) => {
//   const { user, loading, isAuthenticated } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   return (
//     <>
//       {!loading && (
//         <Route
//           {...rest}
//           render={(props) => {
//             if (!isAuthenticated) {
//               return navigate("/login");
//             }
//             return <Component {...props} />;
//           }}
//         />
//       )}
//     </>
//   );
// };

// export default protectedRoute;
