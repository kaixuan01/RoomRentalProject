import myURLRoutes from '../Common/RoutePath';
import { Routes, Route } from 'react-router-dom';

export function MyPageContainer(){
    return <div className="main-content">
    <Routes>
        {myURLRoutes.map((route, index) => (
            route.subRoutes && route.subRoutes.length > 0 ? (
                route.subRoutes.map((subRoute, subIndex) => (
                    <Route
                        key={`${index}-${subIndex}`}
                        path={`${route.path}${subRoute.path}`}
                        element={subRoute.component}
                    />
                ))
            ) : (
                <Route
                    key={index}
                    path={route.path}
                    element={route.component}
                />
            )
        ))}
    </Routes>
</div>
}