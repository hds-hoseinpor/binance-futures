<template>
  <aside
    class="fixed lg:relative w-64 bg-[#181A20] border-r border-gray-700 h-full overflow-y-auto z-50 lg:z-auto"
  >
    <div class="p-4">
      <div class="space-y-1">
        <div
          v-for="menuItem in navigationMenu"
          :key="menuItem.label"
          class="relative"
        >
          <button
            @click="toggleSubmenu(menuItem.label)"
            class="w-full flex items-center justify-between p-3 text-13 text-white hover:bg-gray-700 rounded transition-colors"
          >
            <span>{{ menuItem.label }}</span>
            <Icon
              v-if="hasSubmenu(menuItem)"
              :name="
                expandedMenus.includes(menuItem.label)
                  ? 'mdi:chevron-up'
                  : 'mdi:chevron-down'
              "
              class="w-4 h-4"
            />
          </button>

          <div
            v-if="
              hasSubmenu(menuItem) && expandedMenus.includes(menuItem.label)
            "
            class="mt-1 space-y-1"
          >
            <a
              v-for="subItem in menuItem.submenu"
              :key="subItem.label"
              :href="subItem.href || '#'"
              class="block px-6 py-2 text-12 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
            >
              {{ subItem.label }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
const navigationMenu = [
  {
    label: "Futures",
    href: "/futures",
    submenu: [
      { label: "USDⓈ-M Futures", href: "/futures/usd-m" },
      { label: "COIN-M Futures", href: "/futures/coin-m" },
      { label: "Futures Trading", href: "/futures/trading" },
      { label: "Futures Testnet", href: "/futures/testnet" },
    ],
  },
  {
    label: "Options",
    href: "/options",
    submenu: [
      { label: "Options Trading", href: "/options/trading" },
      { label: "Options Strategy", href: "/options/strategy" },
      { label: "Options Calculator", href: "/options/calculator" },
    ],
  },
  {
    label: "Trading Bots",
    href: "/trading-bots",
    submenu: [
      { label: "Grid Trading", href: "/trading-bots/grid" },
      { label: "DCA Bot", href: "/trading-bots/dca" },
      { label: "Futures Grid", href: "/trading-bots/futures-grid" },
      { label: "Rebalancing Bot", href: "/trading-bots/rebalancing" },
      { label: "Smart Portfolio", href: "/trading-bots/smart-portfolio" },
    ],
  },
  {
    label: "Copy Trading",
    href: "/copy-trading",
    submenu: [
      { label: "Top Traders", href: "/copy-trading/top-traders" },
      { label: "My Copy Trading", href: "/copy-trading/my-copy" },
      { label: "Copy Trading Leaderboard", href: "/copy-trading/leaderboard" },
    ],
  },
  {
    label: "Smart Money",
    href: "/smart-money",
    submenu: [
      { label: "Smart Money Dashboard", href: "/smart-money/dashboard" },
      { label: "Whale Alerts", href: "/smart-money/whale-alerts" },
      { label: "Market Insights", href: "/smart-money/insights" },
    ],
  },
  {
    label: "Campaigns",
    href: "/campaigns",
    submenu: [
      { label: "Active Campaigns", href: "/campaigns/active" },
      { label: "Rewards Center", href: "/campaigns/rewards" },
      { label: "Referral Program", href: "/campaigns/referral" },
    ],
  },
  {
    label: "Data",
    href: "/data",
    submenu: [
      { label: "Market Data", href: "/data/market" },
      { label: "Trading Data", href: "/data/trading" },
      { label: "Analytics", href: "/data/analytics" },
      { label: "API Documentation", href: "/data/api" },
    ],
  },
  {
    label: "More",
    href: "#",
    submenu: [
      { label: "Learn & Earn", href: "/more/learn-earn" },
      { label: "Binance Academy", href: "/more/academy" },
      { label: "Support Center", href: "/more/support" },
      { label: "API Documentation", href: "/more/api" },
      { label: "Download App", href: "/more/download" },
    ],
  },
];

const expandedMenus = ref([]);

const hasSubmenu = (menuItem) => {
  return menuItem.submenu && menuItem.submenu.length > 0;
};

const toggleSubmenu = (label) => {
  const index = expandedMenus.value.indexOf(label);
  if (index > -1) {
    expandedMenus.value.splice(index, 1);
  } else {
    expandedMenus.value.push(label);
  }
};
</script>
