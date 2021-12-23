import * as React from "react";
import { Edit, SimpleForm, EditProps, TextInput } from "react-admin";

export const BlaEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="Jbjkbkj" source="jbjkbkj" />
      </SimpleForm>
    </Edit>
  );
};
