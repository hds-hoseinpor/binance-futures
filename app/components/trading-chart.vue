<template>
  <div class="card w-full max-w-full overflow-x-hidden">
    <div class="mb-2 flex items-center border-b border-gray-700">
      <tabs v-model="activeTab" :tabs="TABS" />
    </div>
    <div
      class="mb-2 flex flex-col items-start justify-between space-y-2 border-b border-gray-700 pb-2 sm:mb-4 sm:flex-row sm:items-center sm:space-y-0"
    >
      <div
        class="flex flex-col items-start space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0"
      >
        <p
          class="rounded text-11 font-medium text-gray-500 transition-all duration-200 sm:text-13"
        >
          Time
        </p>
        <div class="flex flex-wrap gap-1 sm:gap-2">
          <button
            v-for="timeframe in TIME_FRAMES"
            :key="timeframe"
            class="rounded text-11 font-medium transition-all duration-200 sm:text-13"
            :class="
              interval === timeframe
                ? 'text-white'
                : 'text-gray-500 hover:text-gray-400'
            "
            @click="changeInterval(timeframe)"
          >
            {{ timeframe }}
          </button>
        </div>
      </div>

      <div class="flex-1" />

      <div class="flex gap-1 sm:gap-2">
        <button
          class="rounded text-11 font-medium text-white transition-all duration-200 sm:text-12"
        >
          Candles
        </button>
        <button
          class="ml-1 rounded text-11 font-medium text-gray-500 transition-all duration-200 sm:text-12"
        >
          Depth
        </button>
        <button
          class="ml-1 rounded text-11 font-medium text-gray-500 transition-all duration-200 sm:text-12"
        >
          Indicators
        </button>
      </div>
    </div>

    <!-- Chart Area -->
    <div class="relative min-h-80 rounded-lg">
      <!-- Loading State -->
      <div
        v-if="loadingKline && !volumes.length"
        class="absolute inset-0 flex items-center justify-center"
      >
        <div class="text-center">
          <div class="loading-spinner mx-auto mb-2"></div>
          <p class="text-gray-400">Loading chart data...</p>
        </div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="absolute inset-0 flex items-center justify-center"
      >
        <div class="text-center">
          <div class="mb-2 text-red-400">Error loading chart data</div>
          <div class="mb-4 text-13 text-gray-400">{{ error }}</div>
          <button @click="refreshData" class="btn-outline text-13">
            Retry
          </button>
        </div>
      </div>

      <!-- Chart Placeholder -->
      <div v-else class="flex items-center justify-center">
        <div class="w-full text-center">
          <div ref="chartContainerMain" class="w-full" />
          <div ref="chartContainerVolume" class="w-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from "vue";
  import { createChart } from "lightweight-charts";
  import { useKline } from "~/composables/models/kline";
  import { mainConfig, volumeConfig } from "~/constants/chart";
  import { colors } from "~/constants/colors";

  const SCROLL_THRESHOLD = 10;
  const TIME_FRAMES = ["1m", "5m", "15m", "1h", "4h", "1d", "1w"];

  const TABS = [
    {
      title: "Chart",
      value: "Chart",
    },
    {
      title: "Info",
      value: "Info",
    },
    {
      title: "Trading Data",
      value: "Trading",
    },
  ];

  const props = defineProps({
    symbol: {
      type: String,
      required: true,
    },
  });

  const interval = ref("1d");
  const activeTab = ref(TABS[0].value);

  const chartContainerMain = ref(null);
  const chartContainerVolume = ref(null);

  const latestCandle = ref({});

  let chartMain, candleSeries, ma7Series, ma25Series, ma99Series;
  let chartVolume, volumeSeries, volMA7Series, volMA14Series;

  const {
    candles,
    volumes,
    earliestLoadedTime,
    loadInitial,
    loadMoreHistory,
    loadingKline,
    subscribeKline,
  } = useKline();

  const binanceSocket = inject("binanceSocket", {});

  const handleResize = () => {
    if (chartMain && chartContainerMain.value)
      chartMain.applyOptions({
        width: chartContainerMain.value.clientWidth,
        height: chartContainerMain.value.clientHeight,
      });

    if (chartVolume && chartContainerVolume.value)
      chartVolume.applyOptions({
        width: chartContainerVolume.value.clientWidth,
        height: chartContainerVolume.value.clientHeight,
      });
  };

  function setupCharts() {
    const inheritConfig = {
      lineWidth: 1,
      priceLineVisible: false,
    };

    chartMain = createChart(chartContainerMain.value, mainConfig);

    candleSeries = chartMain.addCandlestickSeries({
      upColor: colors["binance-green"],
      downColor: colors["binance-red"],
      priceLineVisible: false,
    });
    ma7Series = chartMain.addLineSeries({
      ...inheritConfig,
      color: colors["binance-yellow"],
    });
    ma25Series = chartMain.addLineSeries({
      ...inheritConfig,
      color: colors["binance-pink"],
    });
    ma99Series = chartMain.addLineSeries({
      ...inheritConfig,
      color: colors["binance-purple"],
    });

    chartVolume = createChart(chartContainerVolume.value, volumeConfig);

    volumeSeries = chartVolume.addHistogramSeries({
      ...inheritConfig,
    });
    volMA7Series = chartVolume.addLineSeries({
      ...inheritConfig,
      color: colors.cyan,
    });
    volMA14Series = chartVolume.addLineSeries({
      ...inheritConfig,
      color: colors["dark-red"],
    });
  }

  function setChartData() {
    candleSeries.setData(candles.value);
    volumeSeries.setData(volumes.value);

    ma7Series.setData(calculateMovingAverage(candles.value, 7));
    ma25Series.setData(calculateMovingAverage(candles.value, 25));
    ma99Series.setData(calculateMovingAverage(candles.value, 99));

    volMA7Series.setData(calculateMovingAverage(volumes.value, 7, "value"));
    volMA14Series.setData(calculateMovingAverage(volumes.value, 14, "value"));
  }

  async function scrollHandler(range) {
    if (!range) return;

    chartMain.timeScale().setVisibleRange(range);
    chartVolume.timeScale().setVisibleRange(range);

    if (range.from <= candles.value[SCROLL_THRESHOLD].time) {
      await loadMoreHistory(interval.value);
      setChartData();
    }
  }

  function enableInfiniteScroll() {
    chartMain.timeScale().subscribeVisibleTimeRangeChange(scrollHandler);
    chartVolume.timeScale().subscribeVisibleTimeRangeChange(scrollHandler);
  }

  function changeInterval(newInt) {
    interval.value = newInt.toLowerCase();

    if (binanceSocket.disconnect) binanceSocket.disconnect();

    if (chartMain) {
      chartMain.remove();
      chartMain = null;
    }
    if (chartVolume) {
      chartVolume.remove();
      chartVolume = null;
    }

    candles.value = [];
    volumes.value = [];
    earliestLoadedTime.value = null;

    init();
  }
  function enableLabelUpdates() {
    chartMain.subscribeCrosshairMove((param) => {
      if (!param?.seriesData) return;
      const c = param.seriesData.get(candleSeries);
      if (!c) return;

      const v = volumes.value.find((volume) => volume.time == c.time) || {};

      latestCandle.value = { ...c, ...v };
    });

    chartVolume.subscribeCrosshairMove((param) => {
      if (!param?.seriesData) return;
      const v = param.seriesData.get(volumeSeries);
      if (!v) return;

      const c = candles.value.find((candle) => candle.time == v.time) || {};

      latestCandle.value = { ...c, ...v };
    });
  }

  async function init() {
    await loadInitial(interval.value);
    setupCharts();
    setChartData();

    latestCandle.value = { ...candles.value.at(-1), ...volumes.value.at(-1) };

    enableInfiniteScroll();
    enableLabelUpdates();
    subscribeKline(props.symbol, interval.value, (c, v) => {
      candleSeries.update(c);

      ma7Series.update(calculateMovingAverage(candles.value, 7).slice(-1)[0]);
      ma25Series.update(calculateMovingAverage(candles.value, 25).slice(-1)[0]);
      ma99Series.update(calculateMovingAverage(candles.value, 99).slice(-1)[0]);

      // TODO: find the proper parameter here
      // volumeSeries.update(v);

      // volMA7Series.update(
      //   calculateMovingAverage(volumes.value, 7, "value").slice(-1)[0],
      // );
      // volMA14Series.update(
      //   calculateMovingAverage(volumes.value, 14, "value").slice(-1)[0],
      // );
    });

    window.addEventListener("resize", handleResize);
  }

  onMounted(() => init());

  onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize);
  });
</script>
