<template>
  <div class="card h-full w-full lg:max-h-[270px]">
    <div
      class="mb-3 flex items-center justify-between border-b border-gray-700"
    >
      <div class="flex items-center">
        <button
          class="px-4 py-2 text-14"
          :class="
            activeTab === 'trades'
              ? 'border-yellow border-b-2 text-white'
              : 'text-gray-400'
          "
          @click="activeTab = 'trades'"
        >
          Trades
        </button>

        <button
          class="px-4 py-2 text-14"
          :class="
            activeTab === 'movers'
              ? 'border-yellow border-b-2 text-white'
              : 'text-gray-400'
          "
          @click="activeTab = 'movers'"
        >
          Top Movers
        </button>
      </div>
      <icon name="mdi:open-in-new" class="h-4 w-4 text-gray-500" />
      <icon name="mdi:dots-horizontal" class="h-4 w-4 text-gray-500" />
    </div>

    <div v-if="activeTab === 'trades' || 'movers'">
      <div
        v-if="loadingTrade"
        class="flex h-full min-h-64 items-center justify-center"
      >
        <div class="text-center">
          <div class="loading-spinner mx-auto mb-2"></div>
          <p class="text-gray-400">Loading trades...</p>
        </div>
      </div>

      <div v-else class="flex flex-col">
        <div class="flex justify-between px-1 py-1 text-[11px] text-gray-400">
          <span>Price (USDT)</span>
          <span>Size (BTC)</span>
          <span>Time</span>
        </div>

        <div class="max-h-[210px] overflow-y-auto lg:max-h-[152px]">
          <div class="mt-2">
            <div
              v-for="(trade, index) in trades"
              :key="trade.id || index"
              class="grid cursor-pointer grid-cols-3 gap-4 rounded py-0.5 text-13 transition-all hover:bg-gray-700/50"
            >
              <div
                :class="trade.isBuyerMaker ? 'text-red-400' : 'text-green-400'"
              >
                ${{ formatPrice(+trade.price) }}
              </div>

              <div class="text-gray-300">
                {{ formatAmount(+trade.qty) }}
              </div>

              <div class="text-gray-400">
                {{ formatTime(trade.time) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div v-if="activeTab === 'movers'">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-14 font-semibold text-white">Top Movers</h3>
      </div>

      <div class="space-y-2 max-h-[300px] overflow-y-auto">
        <div
          v-for="(item, i) in topMovers"
          :key="i"
          class="flex justify-between px-3 py-2 bg-gray-800/40 rounded text-13 hover:bg-gray-700/40 transition"
        >
          <span class="text-gray-300">{{ item.symbol }}</span>
          <span :class="item.change > 0 ? 'text-green-400' : 'text-red-400'">
            {{ item.change }}%
          </span>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
  import { useTrades } from "~/composables/models/trade";

  const props = defineProps({
    symbol: { type: String, default: "BTCUSDT" },
  });

  const activeTab = ref("trades");

  const { trades, loadingTrade, getTrades, subscribeTrades } = useTrades();

  onMounted(async () => {
    await getTrades(props.symbol);
    subscribeTrades(props.symbol);
  });
</script>
