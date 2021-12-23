import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, ValidateNested } from "class-validator";
import { ListWhereUniqueInput } from "../../list/base/ListWhereUniqueInput";
import { Type } from "class-transformer";
@InputType()
class BlaCreateInput {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  jbjkbkj?: string | null;

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
  list?: ListWhereUniqueInput | null;
}
export { BlaCreateInput };
