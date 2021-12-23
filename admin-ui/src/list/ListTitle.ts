import { List as TList } from "../api/list/List";

export const LIST_TITLE_FIELD = "njnjjncdjd";

export const ListTitle = (record: TList): string => {
  return record.njnjjncdjd || record.id;
};
