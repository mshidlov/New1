import { List as TList } from "../api/list/List";

export const LIST_TITLE_FIELD = "id";

export const ListTitle = (record: TList): string => {
  return record.id || record.id;
};
