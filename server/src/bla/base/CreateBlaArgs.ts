import { ArgsType, Field } from "@nestjs/graphql";
import { BlaCreateInput } from "./BlaCreateInput";

@ArgsType()
class CreateBlaArgs {
  @Field(() => BlaCreateInput, { nullable: false })
  data!: BlaCreateInput;
}

export { CreateBlaArgs };
