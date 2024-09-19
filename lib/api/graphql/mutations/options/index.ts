export const createOptions = `mutation CreateOptions($optionInput:CreateOptionInput){
    createOptions(optionInput:$optionInput){
      _id
      options{
        _id
        title
        description
        price
      }
    }
  }`;

export const deleteOption = `
        mutation DeleteOption($id:String!,$restaurant:String!){
          deleteOption(id:$id,restaurant:$restaurant){
            _id
            options{
              _id
              title
              description
              price
            }
          }
        }`;
export const editOption = `mutation editOption($optionInput:editOptionInput){
    editOption(optionInput:$optionInput){
            _id
            options{
              _id
              title
              description
              price
            }
          }
        }`;
