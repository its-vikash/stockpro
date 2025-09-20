import React, { useEffect, useRef, useState } from 'react';

const CandleStickChart = ({ data }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let chartInstance;

    const loadChart = async () => {
      try {
        if (!chartContainerRef.current) return;
        if (chartRef.current) {
          chartRef.current.remove();
          chartRef.current = null;
          seriesRef.current = null;
        }
        const { createChart } = await import('lightweight-charts');

        chartInstance = createChart(chartContainerRef.current, {
          width: chartContainerRef.current.clientWidth,
          height: 300,
          layout: {
            backgroundColor: '#ffffff',
            textColor: '#333',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          },
          grid: {
            vertLines: {
              color: 'rgba(197, 203, 206, 0.3)',
              visible: false,
            },
            horzLines: {
              color: 'rgba(197, 203, 206, 0.3)',
            },
          },
          timeScale: {
            timeVisible: true,
            secondsVisible: false,
            barSpacing: 12, // Increase spacing between candles
            minBarSpacing: 8, // Minimum spacing
            borderColor: 'rgba(197, 203, 206, 0.3)',
          },
          rightPriceScale: {
            borderColor: 'rgba(197, 203, 206, 0.3)',
            scaleMargins: {
              top: 0.1,
              bottom: 0.1,
            },
          },
          crosshair: {
            mode: 1, // Show crosshair as a vertical line
          },
          // Remove watermark
          watermark: {
            visible: false,
          },
        });

        chartRef.current = chartInstance;

        // Import and add candlestick series
        const { CandlestickSeries } = await import('lightweight-charts');
        const candleSeries = chartInstance.addSeries(CandlestickSeries, {
          upColor: '#26a69a',
          downColor: '#ef5350',
          borderUpColor: '#26a69a',
          borderDownColor: '#ef5350',
          wickUpColor: '#26a69a',
          wickDownColor: '#ef5350',
          priceLineVisible: false,
        });

        seriesRef.current = candleSeries;

        // Format data for the chart
        const formattedData = data.map(item => ({
          time: item.time,
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
        }));

        candleSeries.setData(formattedData);
        
        // Fit content to view and scroll to the end
        chartInstance.timeScale().fitContent();
        
        // Apply additional styling to hide any remaining watermark
        setTimeout(() => {
          const watermarks = chartContainerRef.current.querySelectorAll('[data-watermark]');
          watermarks.forEach(wm => wm.style.display = 'none');
        }, 100);
        
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to initialize chart:', err);
        setIsLoading(false);
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
        seriesRef.current = null;
      }
    };
  }, [data]);

  // Update data without recreating the chart
  useEffect(() => {
    if (seriesRef.current && data) {
      const formattedData = data.map(item => ({
        time: item.time,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
      }));
      
      seriesRef.current.setData(formattedData);
      
      if (chartRef.current) {
        chartRef.current.timeScale().fitContent();
      }
    }
  }, [data]);

  return (
    <div className="relative">
      {isLoading && <div className="text-center py-4">Loading chart...</div>}
      <div ref={chartContainerRef} style={{ width: '100%', height: '300px' }} />
    </div>
  );
};

export default CandleStickChart;