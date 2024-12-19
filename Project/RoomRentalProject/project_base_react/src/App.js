import './CSS/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MySidebar from './Control/MySidebar';
import MyTopBar from './Control/MyTopBar';
import Login from './View/Account/Login';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initData } from './Redux/actions';
import myURLRoutes from './Common/RoutePath';
import AnonymousRoutePath from './Common/AnonymousRoutePath'; // Import Anonymous Routes

function AuthenticatedLayout({ children }) {
  const [toggled, setToggled] = useState(false);
  return (
    <>
      <div className="d-flex">
        <div className="my-sidebar">
          <MySidebar toggled={toggled}/>
        </div>
        <div className='main-page-container'>
        <MyTopBar toggled={toggled} setToggled={setToggled}/>
        <div className="my-page-container">
          {children}
        </div>
        </div>
      </div>
    </>
  );
}

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLogin');
    dispatch(initData('isLogin', storedLoginStatus || 'NotLogin'));
    setLoading(false);
  }, [dispatch]);

  const isLogin = useSelector((state) => state.isLogin);

  useEffect(() => {
    if (isLogin) {
      localStorage.setItem('isLogin', isLogin);
    }
  }, [isLogin]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className='app-container'>
      <Router>
        <Routes>
          {isLogin === 'Login' ? (
            <>
              {/* Authenticated Routes with Sidebar and TopBar */}
              <Route path="/*" element={
                <AuthenticatedLayout>
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
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </AuthenticatedLayout>
              } />
               {AnonymousRoutePath.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={route.component}
                />
              ))}
            </>
          ) : (
            <>
              {AnonymousRoutePath.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={route.component}
                />
              ))}
              {/* Default to Login */}
              <Route path="*" element={<Login/>} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
