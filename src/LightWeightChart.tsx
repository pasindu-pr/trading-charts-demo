import { createChart, ColorType } from "lightweight-charts";
import { useEffect, useRef } from "react";

import "./App.css";

function LightWeightChart() {
  const data = [
    { open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 },
    { open: 9.55, high: 10.3, low: 9.42, close: 9.94, time: 1642514276 },
    { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 },
    { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 },
    { open: 9.51, high: 10.46, low: 9.1, close: 10.17, time: 1642773476 },
    { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 },
    { open: 10.47, high: 11.39, low: 10.4, close: 10.81, time: 1642946276 },
    { open: 10.81, high: 11.6, low: 10.3, close: 10.75, time: 1643032676 },
    { open: 10.75, high: 11.6, low: 10.49, close: 10.93, time: 1643119076 },
    { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 },
  ];
  const colors = {
    backgroundColor: "white",
    lineColor: "#2962FF",
    textColor: "white",
    areaTopColor: "#2962FF",
    areaBottomColor: "rgba(41, 98, 255, 0.28)",
  };

  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current!.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "#222" },
        textColor: colors.textColor,
      },

      grid: {
        vertLines: { color: "#444" },
        horzLines: { color: "#444" },
      },

      width: chartContainerRef.current.clientWidth,
      height: 300,
    });

    chart.timeScale().fitContent();

    chart.timeScale().applyOptions({
      borderColor: "#71649C",
    });

    const newSeries = chart.addCandlestickSeries({
      upColor: colors.lineColor,
      downColor: colors.areaTopColor,
      wickUpColor: colors.areaBottomColor,
    });

    newSeries.setData(data as any);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [
    data,
    colors.backgroundColor,
    colors.lineColor,
    colors.textColor,
    colors.areaTopColor,
    colors.areaBottomColor,
  ]);

  return (
    <>
      <div
        style={{
          width: "50%",
        }}
      >
        <div ref={chartContainerRef} />
      </div>
    </>
  );
}

export default LightWeightChart;
