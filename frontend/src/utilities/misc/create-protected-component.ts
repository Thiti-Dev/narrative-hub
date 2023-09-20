import React from "react";
import ProtectedRoute from "../../components/guards/protected-route";

export function createProtectedComponent(component:React.JSX.Element){
    return React.createElement(ProtectedRoute,{children:component})
}