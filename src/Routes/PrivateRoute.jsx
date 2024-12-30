import React from 'react';
import Cookies from 'js-cookie';
import { Navigate, useLocation, useParams } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const token = Cookies.get('whats_app_token'); // Assuming this is your authentication token
  const location = useLocation();
  const { id } = useParams();
console.log(token,"TOKEN")
// const basketId=Cookies.get('basketId')
  // Extract the `id` from the URL if it exists
  const currentPath = location.pathname;
  const basketId = currentPath.split('/')[1]; // Assuming the `id` is the second part of the URL like `/123`

  // If token is not present, redirect to the login page and store the basketId
  if (!token&&token!==undefined) {
    return <Navigate to={`/${id}`} state={{ from: location }} replace />;
  }

  // If token exists, render the protected content
  return children;
}
