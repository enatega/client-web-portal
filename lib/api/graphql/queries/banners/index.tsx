export const getBanners = `query Banners{
    banners {
      _id
      title
      description
      action
      screen
      file
      parameters
    }
  }`;

export const getBannerActions = `query BannerActions{
    bannerActions
  }`;
