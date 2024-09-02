/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const all_uploaders = /* GraphQL */ `
  query All_uploaders {
    all_uploaders {
      id
      name
      surname
      email
      fileName
    }
  }
`;
export const get_uploader = /* GraphQL */ `
  query Get_uploader($fileName: String!) {
    get_uploader(fileName: $fileName) {
      id
      name
      surname
      email
      fileName
    }
  }
`;