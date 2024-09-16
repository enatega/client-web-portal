export const getTipping = `query Tips{
    tips {
      _id
      tipVariations
      enabled
    }
  }`;

export const createTipping = `mutation CreateTipping($tippingInput:TippingInput!){
        createTipping(tippingInput:$tippingInput){
          _id
          tipVariations
          enabled
        }
      }`;

export const editTipping = `mutation editTipping($tippingInput:TippingInput!){
  editTipping(tippingInput:$tippingInput){
            _id
            tipVariations
            enabled
              }
            }`;
