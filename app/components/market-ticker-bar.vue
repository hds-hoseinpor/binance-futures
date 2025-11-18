<template>
  <div>
    <div class="mb-1 hidden flex-col rounded-lg bg-[#181A20] md:flex">
      <div class="flex min-w-max items-center gap-8 px-4 py-2">
        <div
          v-for="item in topTickers"
          :key="item.symbol"
          class="flex items-center gap-3"
        >
          <span class="text-12 font-medium text-gray-400">{{
            item.symbol
          }}</span>
          <span class="text-sm font-semibold text-white">{{ item.price }}</span>
          <span
            :class="item.change >= 0 ? 'text-green-500' : 'text-red-500'"
            class="text-12 font-medium"
          >
            {{ item.change >= 0 ? "+" : "" }}{{ item.change }}%
          </span>
        </div>
      </div>
    </div>
    <div
      class="mb-1 flex w-full flex-col overflow-hidden rounded-lg bg-[#181A20] px-3 py-2 md:flex-row"
    >
      <div class="flex items-center gap-2">
        <button
          class="flex items-center justify-center rounded-[6px] border border-gray-700 !p-[2px] text-yellow-500 transition hover:text-yellow-400"
        >
          <Icon name="mdi:star" class="h-4 w-4 p-0" />
        </button>

        <div class="flex items-center gap-2">
          <div class="flex h-6 w-6 items-center justify-center rounded-full">
            <img src="/img/B.png" alt="Binance Futures" class="object-cover" />
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xl text-white">BTCUSDT</span>
              <span class="text-xs text-gray-500">Perp</span>
            </div>
          </div>
        </div>

        <div class="ml-4">
          <div class="text-20 text-white">{{ formatPrice(currentPrice) }}</div>
          <div
            class="min-w-max text-12"
            :class="getPriceChangeClass(priceChangePercent)"
          >
            {{ ticker.priceChange }} - {{ priceChangePercent }}%
          </div>
        </div>
      </div>
      <div class="flex max-w-[450px] items-center gap-6 pb-1 text-12 xl:gap-8">
        <div
          ref="statsRef"
          class="flex max-w-[450px] items-center justify-center gap-8 whitespace-nowrap px-4 py-1 lg:justify-start"
        >
          <div class="flex items-center gap-8">
            <div>
              <div class="text-11 text-gray-500">24h Low</div>
              <div class="font-medium text-white">
                {{ formatPrice(ticker.low) }}
              </div>
            </div>
            <div>
              <div class="text-11 text-gray-500">24h Volume(BTC)</div>
              <div class="font-medium text-white">{{
                formatPrice(ticker.volume)
              }}</div>
            </div>
            <div>
              <div class="text-11 text-gray-500">24h Volume(USDT)</div>
              <div class="font-medium text-white">{{
                formatPrice(ticker.quoteVolume)
              }}</div>
            </div>
            <div>
              <div class="text-11 text-gray-500">Open Interest(BTC)</div>
              <div class="font-medium text-white">{{
                formatPrice(ticker.open)
              }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { useTicker } from "~/composables/models/ticker";

  const props = defineProps({
    symbol: {
      type: String,
      required: true,
    },
  });
  const topTickers = [
    { symbol: "BTCUSDT", price: "91,447.5", change: -3.53 },
    { symbol: "ETHUSDT", price: "3,129.8", change: -3.69 },
    { symbol: "BNBUSDT", price: "692.4", change: 0.84 },
  ];

  const statsRef = ref(null);

  const {
    currentPrice,
    priceChangePercent,
    ticker,
    getTypeTicker,
    subscribeTicker,
  } = useTicker();

  onMounted(async () => {
    await getTypeTicker(props.symbol);
    subscribeTicker(props.symbol);
  });
</script>

<style scoped></style>
