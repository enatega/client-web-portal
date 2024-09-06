export const ROUTES = {
  dashboard: {
    route: '/dashboard',
    children: [
      {
        route: '/configuraton',
      },
      {
        route: '/coupons',
      },
      {
        route: '/cuisines',
      },
      {
        route: '/banners',
      },
      {
        route: '/tipping',
      },
      {
        route: '/commission-rate',
      },
      {
        route: '/withdraw-request',
      },
      {
        route: '/notifications',
      },
    ],
  },
  general: '/general',
  management: '/management',
};
