import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { DeleteListArgs } from "./DeleteListArgs";
import { ListFindManyArgs } from "./ListFindManyArgs";
import { ListFindUniqueArgs } from "./ListFindUniqueArgs";
import { List } from "./List";
import { BlaFindManyArgs } from "../../bla/base/BlaFindManyArgs";
import { Bla } from "../../bla/base/Bla";
import { ListService } from "../list.service";

@graphql.Resolver(() => List)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class ListResolverBase {
  constructor(
    protected readonly service: ListService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "List",
    action: "read",
    possession: "any",
  })
  async _listsMeta(
    @graphql.Args() args: ListFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [List])
  @nestAccessControl.UseRoles({
    resource: "List",
    action: "read",
    possession: "any",
  })
  async lists(
    @graphql.Args() args: ListFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<List[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "List",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => List, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "List",
    action: "read",
    possession: "own",
  })
  async list(
    @graphql.Args() args: ListFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<List | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "List",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => List)
  @nestAccessControl.UseRoles({
    resource: "List",
    action: "delete",
    possession: "any",
  })
  async deleteList(@graphql.Args() args: DeleteListArgs): Promise<List | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => [Bla])
  @nestAccessControl.UseRoles({
    resource: "List",
    action: "read",
    possession: "any",
  })
  async blas(
    @graphql.Parent() parent: List,
    @graphql.Args() args: BlaFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Bla[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Bla",
    });
    const results = await this.service.findBlas(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }
}
