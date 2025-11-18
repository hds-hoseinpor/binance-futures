<template>
  <div class="flex-shrink-0">
    <header class="bg-[#181A20] px-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4 lg:space-x-6">
          <NuxtLink
            href="/"
            class="text-white transition-opacity hover:opacity-80"
          >
            <Icon name="mdi:home" class="h-5 w-5" />
          </NuxtLink>

          <NuxtLink
            to="/futures/home"
            class="flex items-center space-x-2 transition-opacity hover:opacity-80"
          >
            <div class="flex h-[64px] w-[88px] items-center justify-center">
              <img
                src="/img/logo.png"
                alt="Binance Futures"
                class="object-cover"
              />
            </div>
          </NuxtLink>

          <nav class="hidden items-center space-x-4 lg:flex xl:space-x-6">
            <div
              v-for="menuItem in navigationMenu"
              :key="menuItem.label"
              class="group relative"
            >
              <NuxtLink
                :to="menuItem.to || '#'"
                class="text-13 flex items-center space-x-1 whitespace-nowrap text-white transition-colors hover:text-gray-300"
              >
                <span>{{ menuItem.label }}</span>
                <Icon
                  v-if="hasSubmenu(menuItem)"
                  name="mdi:chevron-down"
                  class="h-4 w-4"
                />
              </NuxtLink>

              <div
                v-if="hasSubmenu(menuItem)"
                class="pointer-events-auto invisible absolute left-1/2 top-full z-50 mt-2 w-64 -translate-x-1/2 rounded-b-lg bg-[#202630] opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:opacity-100"
              >
                <div class="py-3">
                  <NuxtLink
                    v-for="subItem in menuItem.submenu"
                    :key="subItem.label"
                    :to="subItem.href || '#'"
                    class="text-13 block px-4 py-2 text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
                  >
                    {{ subItem.label }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div class="flex items-center space-x-2 lg:space-x-3">
          <button
            class="p-2 text-gray-300 transition-colors hover:text-white lg:hidden"
            @click="toggleMobileSidebar"
          >
            <Icon name="mdi:menu" class="h-5 w-5" />
          </button>

          <div class="hidden items-center space-x-3 lg:flex">
            <button
              class="text-13 h-[32px] w-[58px] rounded bg-gray-700 font-medium text-white transition-colors hover:bg-gray-600"
            >
              Log In
            </button>

            <button
              class="bg-binance-yellow text-13 h-[32px] w-[69px] rounded font-medium text-black transition-opacity hover:opacity-90"
            >
              Sign Up
            </button>

            <button
              class="p-2 text-gray-300 transition-colors hover:text-white"
            >
              <Icon name="mdi:web" class="h-5 w-5" />
            </button>

            <button
              class="p-2 text-gray-300 transition-colors hover:text-white"
            >
              <Icon name="mdi:help-circle-outline" class="h-5 w-5" />
            </button>

            <button
              class="p-2 text-gray-300 transition-colors hover:text-white"
            >
              <Icon name="mdi:hexagon-outline" class="h-5 w-5" />
            </button>

            <button
              class="p-2 text-gray-300 transition-colors hover:text-white"
            >
              <Icon name="mdi:weather-night" class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
  const toggleMobileSidebar = inject("toggleMobileSidebar");

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
        {
          label: "Copy Trading Leaderboard",
          href: "/copy-trading/leaderboard",
        },
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

  const hasSubmenu = (menuItem) => {
    return menuItem.submenu && menuItem.submenu.length > 0;
  };
</script>
