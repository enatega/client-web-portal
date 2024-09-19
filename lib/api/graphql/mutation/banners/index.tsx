export const createBanner = `mutation CreateBanner($bannerInput:BannerInput!){
  createBanner(bannerInput:$bannerInput){
    _id
    title
    description
    action
    file
    screen
    parameters
  }
}`;

export const editBanner = `mutation editBanner($bannerInput:BannerInput!){
  editBanner(bannerInput:$bannerInput){
    _id
    title
    description
    action
    file
    screen
    parameters
  }
}`;

export const deleteBanner = `mutation DeleteBanner($id:String!){
  deleteBanner(id:$id)
}`;
