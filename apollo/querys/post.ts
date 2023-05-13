import { gql } from "@apollo/client";

const MedicinePostMutation = gql`
  mutation MedicinePost($data: JSON) {
    medicinePost(data: $data) {
      error
    }
  }
`;

export { MedicinePostMutation };
