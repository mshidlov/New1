import { BlaWhereInput } from "./BlaWhereInput";
import { BlaOrderByInput } from "./BlaOrderByInput";

export type BlaFindManyArgs = {
  where?: BlaWhereInput;
  orderBy?: BlaOrderByInput;
  skip?: number;
  take?: number;
};
