import ReactDOM from "react-dom/client";
import App from "./LightWeightChart.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TradingViewWidget from "./TradingViewWidget.tsx";
import DemoChartHighcharts from "./Highcharts.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TradingViewWidget />,
  },
  {
    path: "/highcharts",
    element: <DemoChartHighcharts />,
  },
  {
    path: "/lightweight",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
