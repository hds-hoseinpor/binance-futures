<template>
  <div class="flex min-h-[300px] w-full flex-col rounded-lg bg-[#181A20] p-4">
    <div
      class="mb-4 flex items-center gap-6 overflow-x-auto border-b border-[#2b3139] pb-3"
    >
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="activeTab = tab.name"
        class="relative whitespace-nowrap pb-3 text-sm font-medium transition-colors"
        :class="[
          activeTab === tab.name
            ? 'text-binance-yellow'
            : 'text-gray-500 hover:text-gray-300',
        ]"
      >
        {{ tab.label }}
        <span
          v-if="tab.count !== undefined"
          class="ml-1 text-xs"
          :class="
            activeTab === tab.name ? 'text-binance-yellow' : 'text-gray-500'
          "
        >
          ({{ tab.count }})
        </span>

        <div
          v-if="activeTab === tab.name"
          class="absolute bottom-0 left-0 right-0 h-0.5 bg-binance-yellow"
        />
      </button>
    </div>

    <div class="flex flex-1 items-center justify-center">
      <div v-if="!isLoggedIn" class="text-center">
        <p class="text-sm text-gray-400">
          <span class="text-white">Log In</span>
          <span class="text-gray-500"> or </span>
          <span class="cursor-pointer text-binance-yellow hover:underline"
            >Register Now</span
          >
          <span class="text-gray-400"> to trade</span>
        </p>
      </div>

      <div v-else class="w-full">
        <p class="text-center text-sm text-gray-600">
          {{ activeTab }} content will appear here
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";

  const isLoggedIn = ref(false);

  const tabs = ref([
    { name: "Positions", label: "Positions", count: 0 },
    { name: "OpenOrders", label: "Open Orders", count: 0 },
    { name: "OrderHistory", label: "Order History" },
    { name: "TradeHistory", label: "Trade History" },
    { name: "TransactionHistory", label: "Transaction History" },
    { name: "PositionHistory", label: "Position History" },
    { name: "Bots", label: "Bots" },
    { name: "Assets", label: "Assets" },
  ]);

  const activeTab = ref("Positions");
</script>
