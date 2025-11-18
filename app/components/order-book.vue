<template>
  <div class="card h-full w-full">
    <!-- Header -->
    <div
      class="mb-3 flex items-center justify-between border-b-[1px] border-[#333B47]"
    >
      <h3 class="mb-2 text-[14px] font-semibold text-white">Order Book</h3>
      <icon name="mdi:dots-horizontal" class="h-4 w-4 text-gray-500" />
    </div>

    <!-- Loading -->
    <div v-if="loadingOrder" class="flex h-40 items-center justify-center">
      <div class="text-center">
        <div class="loading-spinner mx-auto mb-2"></div>
        <p class="text-13 text-gray-400">Loading order book...</p>
      </div>
    </div>

    <!-- Content -->
    <div v-else class="flex select-none flex-col">
      <div class="flex justify-between px-1 py-1 text-[11px] text-gray-400">
        <span>Price (USDT)</span>
        <span>Size (BTC)</span>
        <span>Sum (BTC)</span>
      </div>
      <div class="space-y-0.6">
        <div
          v-for="(order, index) in order.sellOrders"
          :key="`sell-${index}`"
          class="relative flex cursor-pointer items-center justify-between overflow-hidden rounded px-1 py-0.5 text-[11px] transition-all hover:bg-gray-700/40"
          :style="{
            background: `linear-gradient(to right, rgba(239, 68, 68, 0.15) ${order.percentage}%, transparent ${order.percentage}%)`,
          }"
        >
          <span class="text-red-400">{{ formatPrice(order.price) }}</span>
          <span class="text-gray-300">{{ formatAmount(order.amount) }}</span>
          <span class="text-gray-400">{{ formatPrice(order.total) }}</span>
        </div>
      </div>

      <!-- Current Price -->
      <div class="mb-1 mt-1 flex items-center justify-between px-2 py-2">
        <span class="text-[20px] font-bold" :class="priceChangeClass">
          ${{ formatPrice(currentPrice) }}
        </span>
        <span class="text-[13px] font-semibold" :class="priceChangeClass">
          {{ getPriceChangeSign(priceChangePercent) }}
          {{ formatPercent(priceChangePercent) }}
        </span>
      </div>

      <!-- Buy Orders (Green) -->
      <div class="space-y-0.5">
        <div
          v-for="(order, index) in order.buyOrders"
          :key="`buy-${index}`"
          class="relative flex cursor-pointer items-center justify-between overflow-hidden rounded px-1 py-0.5 text-[11px] transition-all hover:bg-gray-700/40"
          :style="{
            background: `linear-gradient(to right, rgba(34, 197, 94, 0.15) ${order.percentage}%, transparent ${order.percentage}%)`,
          }"
        >
          <span class="text-green-400">{{ formatPrice(order.price) }}</span>
          <span class="text-gray-300">{{ formatAmount(order.amount) }}</span>
          <span class="text-gray-400">{{ formatPrice(order.total) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useOrder } from "~/composables/models/order";
  import { useTicker } from "~/composables/models/ticker";

  const props = defineProps({
    symbol: { type: String, default: "BTCUSDT" },
  });

  const { order, loadingOrder, getOrders, subscribeOrders } = useOrder();

  const {
    currentPrice,
    priceChangePercent,
    priceChangeClass,
    getTypeTicker,
    subscribeTicker,
  } = useTicker();

  onMounted(async () => {
    await getOrders(props.symbol);
    getTypeTicker(props.symbol);
    subscribeOrders(props.symbol);
    subscribeTicker(props.symbol);
  });
</script>
