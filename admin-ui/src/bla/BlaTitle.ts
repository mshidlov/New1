import { Bla as TBla } from "../api/bla/Bla";

export const BLA_TITLE_FIELD = "jbjkbkj";

export const BlaTitle = (record: TBla): string => {
  return record.jbjkbkj || record.id;
};
