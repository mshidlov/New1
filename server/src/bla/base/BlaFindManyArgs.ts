import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { BlaWhereInput } from "./BlaWhereInput";
import { Type } from "class-transformer";
import { BlaOrderByInput } from "./BlaOrderByInput";

@ArgsType()
class BlaFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => BlaWhereInput,
  })
  @Field(() => BlaWhereInput, { nullable: true })
  @Type(() => BlaWhereInput)
  where?: BlaWhereInput;

  @ApiProperty({
    required: false,
    type: BlaOrderByInput,
  })
  @Field(() => BlaOrderByInput, { nullable: true })
  @Type(() => BlaOrderByInput)
  orderBy?: BlaOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { BlaFindManyArgs };
