import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { StringFilter } from "../../util/StringFilter";
import { Type } from "class-transformer";
import { IsOptional, ValidateNested } from "class-validator";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { ListWhereUniqueInput } from "../../list/base/ListWhereUniqueInput";
@InputType()
class BlaWhereInput {
  @ApiProperty({
    required: false,
    type: StringFilter,
  })
  @Type(() => StringFilter)
  @IsOptional()
  @Field(() => StringFilter, {
    nullable: true,
  })
  id?: StringFilter;

  @ApiProperty({
    required: false,
    type: StringNullableFilter,
  })
  @Type(() => StringNullableFilter)
  @IsOptional()
  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  jbjkbkj?: StringNullableFilter;

  @ApiProperty({
    required: false,
    type: () => ListWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ListWhereUniqueInput)
  @IsOptional()
  @Field(() => ListWhereUniqueInput, {
    nullable: true,
  })
  list?: ListWhereUniqueInput;
}
export { BlaWhereInput };
