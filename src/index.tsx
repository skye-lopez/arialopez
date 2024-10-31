import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import '@fontsource/pacifico';
import '@fontsource/krona-one';
import GlobalStyle from './styles/global';
import "bootstrap-icons/font/bootstrap-icons.css"

import Landing from "./pages/landing";
import Articles from './pages/articles';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />,
    },
    {
        path: "/articles",
        element: <Articles />,
    }
])
root.render(
    <React.StrictMode>
        <GlobalStyle />
        <RouterProvider router={router} />
    </React.StrictMode>
);
