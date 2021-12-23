import * as React from "react";
import { Edit, SimpleForm, EditProps, TextInput } from "react-admin";

export const ListEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="Njnjjncdjd" source="njnjjncdjd" />
      </SimpleForm>
    </Edit>
  );
};
