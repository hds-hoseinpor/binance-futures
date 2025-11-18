<template>
  <div class="w-full max-w-full overflow-y-hidden">
    <div class="mb-1 h-full rounded-lg bg-[#181A20] p-4 lg:h-[440px]">
      <div class="mb-4 flex items-center gap-2">
        <button class="rounded bg-[#1f2329] px-3 py-1.5 text-12 text-gray-300">
          Cross
        </button>
        <button class="rounded bg-[#1f2329] px-3 py-1.5 text-12 text-gray-300">
          20x
        </button>
        <button class="rounded bg-[#1f2329] px-3 py-1.5 text-12 text-gray-300">
          S
        </button>
        <button class="ml-auto text-18 text-gray-400">⋯</button>
      </div>

      <div class="mb-3 flex items-center border-b border-[#1f2329]">
        <button
          class="mr-4 px-2 pb-2 text-13"
          :class="
            activeTab === 'Limit'
              ? 'border-b-2 border-[#f0b90b] text-white'
              : 'text-gray-400'
          "
          @click="activeTab = 'Limit'"
        >
          Limit
        </button>

        <button
          class="mr-4 px-2 pb-2 text-13"
          :class="
            activeTab === 'Market'
              ? 'border-b-2 border-[#f0b90b] text-white'
              : 'text-gray-400'
          "
          @click="activeTab = 'Market'"
        >
          Market
        </button>

        <button
          class="px-2 pb-2 text-13"
          :class="
            activeTab === 'Stop'
              ? 'border-b-2 border-[#f0b90b] text-white'
              : 'text-gray-400'
          "
          @click="activeTab = 'Stop'"
        >
          Stop Limit
        </button>
      </div>

      <div class="mb-3 flex items-center justify-between">
        <span class="text-12 text-gray-400"
          >Avbl – <span class="text-white">USDT</span></span
        >
        <button class="text-12 text-gray-400">⟳</button>
      </div>

      <div class="mb-3">
        <label class="mb-1 block text-12 text-gray-400">Price</label>

        <div class="flex items-center gap-2">
          <input
            type="number"
            class="flex-1 rounded border border-[#2b3139] bg-[#181a20] px-3 py-2.5 text-sm text-white"
            :disabled="activeTab === 'Market'"
            placeholder="0.00"
          />
        </div>
      </div>

      <div class="mb-3">
        <label class="mb-1 block text-12 text-gray-400">Size</label>

        <div class="flex items-center gap-2">
          <input
            type="number"
            class="flex-1 rounded border border-[#2b3139] bg-[#181a20] px-3 py-2.5 text-sm text-white"
            placeholder="0.00"
          />
        </div>
      </div>

      <div class="relative mb-5 mt-3 flex items-center justify-between">
        <div class="absolute left-0 h-[2px] w-full bg-[#2b3139]"></div>
        <div class="relative flex w-full justify-between">
          <div class="h-3 w-3 rounded-full bg-[#2b3139]"></div>
          <div class="h-3 w-3 rounded-full bg-[#2b3139]"></div>
          <div class="h-3 w-3 rounded-full bg-[#2b3139]"></div>
          <div class="h-3 w-3 rounded-full bg-[#2b3139]"></div>
        </div>
      </div>

      <button
        class="mb-3 w-full rounded-lg bg-[#f0b90b] py-2 font-semibold text-black"
      >
        Register Now
      </button>
      <button class="w-full rounded-lg bg-[#2b3139] py-2 text-gray-300">
        Log In
      </button>
    </div>
    <div class="rounded-lg bg-[#181A20] p-4">
      <div class="mb-3 border-b-[1px] border-[#333B47]">
        <div class="mb-2 text-14 font-medium text-white">Account</div>
      </div>

      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-xs text-gray-400">Margin Ratio</span>
          <div class="flex items-center gap-2"></div>
        </div>

        <div class="flex justify-between">
          <span class="text-xs text-gray-400">Maintenance Margin</span>
          <span class="text-xs text-white">0.0009 USDT</span>
        </div>

        <div class="flex justify-between">
          <span class="text-xs text-gray-400">Margin Balance</span>
          <span class="text-xs text-white">0.0009 USDT</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // Local state
  const selectedOrderType = ref("Futures");
  const activeTab = ref("Limit");

  const orderForm = ref({
    price: "",
    amount: "",
    leverage: 1,
    marginType: "isolated",
    type: "LIMIT",
  });

  watch(selectedOrderType, (newType) => {
    orderForm.value.type = newType === "Spot" ? "MARKET" : "LIMIT";
  });
</script>
