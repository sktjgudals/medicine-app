import { gql } from "@apollo/client";

const MedicinePostMutation = gql`
  mutation MedicinePost($data: JSON) {
    medicinePost(data: $data) {
      error
    }
  }
`;

const PostDataSend = gql`
  mutation postDataCreate($data: JSON) {
    postDataCreate(data: $data) {
      post {
        id
        title
        number
        views
        createdAt
        user {
          id
          name
          nickname
        }
      }
    }
  }
`;

export { MedicinePostMutation, PostDataSend };
