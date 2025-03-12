import { Route, Routes } from "react-router-dom";
import ClientLayout from "./layouts/client/ClientLayout";
import { ClientRoute } from "./routes/ClientRoute";
import AuthLayout from "./layouts/AuthLayout";
import { AuthRoute } from "./routes/AuthRoute";
import AdminLayout from "./layouts/admin/AdminLayout";
import { AdminRoute } from "./routes/AdminRoute";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        {AuthRoute.map((route, index) => {
          return (
            <Route key={index} path={route.path} element={<route.element />} />
          );
        })}
      </Route>
      <Route path="" element={<ClientLayout />}>
        {ClientRoute.map((route, index) => {
          return (
            <Route key={index} path={route.path} element={<route.element />} />
          );
        })}
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        {AdminRoute.map((route, index) => {
          return (
            <Route key={index} path={route.path} element={<route.element />} />
          );
        })}
      </Route>
    </Routes>
  );
}

export default App;
