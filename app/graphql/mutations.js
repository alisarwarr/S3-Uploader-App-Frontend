/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const create_uploader = /* GraphQL */ `
  mutation Create_uploader(
    $name: String!
    $surname: String!
    $email: String!
    $fileName: String!
  ) {
    create_uploader(
      name: $name
      surname: $surname
      email: $email
      fileName: $fileName
    ) {
      id
      name
      surname
      email
      fileName
    }
  }
`;