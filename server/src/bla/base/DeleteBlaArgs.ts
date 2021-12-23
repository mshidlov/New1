import { ArgsType, Field } from "@nestjs/graphql";
import { BlaWhereUniqueInput } from "./BlaWhereUniqueInput";

@ArgsType()
class DeleteBlaArgs {
  @Field(() => BlaWhereUniqueInput, { nullable: false })
  where!: BlaWhereUniqueInput;
}

export { DeleteBlaArgs };
