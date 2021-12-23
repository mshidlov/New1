import { ArgsType, Field } from "@nestjs/graphql";
import { BlaWhereUniqueInput } from "./BlaWhereUniqueInput";
import { BlaUpdateInput } from "./BlaUpdateInput";

@ArgsType()
class UpdateBlaArgs {
  @Field(() => BlaWhereUniqueInput, { nullable: false })
  where!: BlaWhereUniqueInput;
  @Field(() => BlaUpdateInput, { nullable: false })
  data!: BlaUpdateInput;
}

export { UpdateBlaArgs };
