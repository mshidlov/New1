import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  TextInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { ListTitle } from "../list/ListTitle";

export const BlaEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="Jbjkbkj" source="jbjkbkj" />
        <ReferenceInput source="list.id" reference="List" label="List">
          <SelectInput optionText={ListTitle} />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
};
