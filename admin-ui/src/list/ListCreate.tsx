import * as React from "react";
import { Create, SimpleForm, CreateProps, TextInput } from "react-admin";

export const ListCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="Njnjjncdjd" source="njnjjncdjd" />
      </SimpleForm>
    </Create>
  );
};
