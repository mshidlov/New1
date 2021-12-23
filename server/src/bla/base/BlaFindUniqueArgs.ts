import { ArgsType, Field } from "@nestjs/graphql";
import { BlaWhereUniqueInput } from "./BlaWhereUniqueInput";

@ArgsType()
class BlaFindUniqueArgs {
  @Field(() => BlaWhereUniqueInput, { nullable: false })
  where!: BlaWhereUniqueInput;
}

export { BlaFindUniqueArgs };
