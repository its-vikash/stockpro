import React, { useEffect, useRef } from 'react';

const CandleStickChart = ({ data }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance;

    const loadChart = async () => {
      try {
        // Handle both default + named exports
        const lib = await import('lightweight-charts');
        const createChart = lib.createChart || lib.default.createChart;

        if (!createChart) {
          throw new Error('createChart not found in lightweight-charts import');
        }

        if (chartContainerRef.current) {
          chartInstance = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 300,
            layout: {
              backgroundColor: '#ffffff',
              textColor: '#333',
            },
            grid: {
              vertLines: { color: 'rgba(197, 203, 206, 0.3)' },
              horzLines: { color: 'rgba(197, 203, 206, 0.3)' },
            },
            timeScale: {
              timeVisible: true,
              secondsVisible: false,
            },
          });

          chartRef.current = chartInstance;

          const candleSeries = chartInstance.addCandlestickSeries({
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
          });

          candleSeries.setData(data);
        }
      } catch (err) {
        console.error('Failed to initialize chart:', err);
      }
    };

    loadChart();

    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [data]);

  return <div ref={chartContainerRef} style={{ width: '100%', height: '100%' }} />;
};

export default CandleStickChart;
