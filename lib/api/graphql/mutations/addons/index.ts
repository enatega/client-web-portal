export const createAddons = `mutation CreateAddons($addonInput:AddonInput){
    createAddons(addonInput:$addonInput){
        _id
        addons{
          _id
          options
          title
          description
          quantityMinimum
          quantityMaximum
        }
        
      }
  }`;
export const editAddon = `mutation editAddon($addonInput:editAddonInput){
    editAddon(addonInput:$addonInput){
        _id
        addons{
          _id
          options
          title
          description
          quantityMinimum
          quantityMaximum
        }
    }
  }`;

export const deleteAddon = `
        mutation DeleteAddon($id:String!,$restaurant:String!){
          deleteAddon(id:$id,restaurant:$restaurant){
            _id
            addons{
              _id
              options
              title
              description
              quantityMinimum
              quantityMaximum
            }
          }
        }`;
