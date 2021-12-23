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
import { CreateBlaArgs } from "./CreateBlaArgs";
import { UpdateBlaArgs } from "./UpdateBlaArgs";
import { DeleteBlaArgs } from "./DeleteBlaArgs";
import { BlaFindManyArgs } from "./BlaFindManyArgs";
import { BlaFindUniqueArgs } from "./BlaFindUniqueArgs";
import { Bla } from "./Bla";
import { BlaService } from "../bla.service";

@graphql.Resolver(() => Bla)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class BlaResolverBase {
  constructor(
    protected readonly service: BlaService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Bla",
    action: "read",
    possession: "any",
  })
  async _blasMeta(
    @graphql.Args() args: BlaFindManyArgs
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

  @graphql.Query(() => [Bla])
  @nestAccessControl.UseRoles({
    resource: "Bla",
    action: "read",
    possession: "any",
  })
  async blas(
    @graphql.Args() args: BlaFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Bla[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Bla",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Bla, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Bla",
    action: "read",
    possession: "own",
  })
  async bla(
    @graphql.Args() args: BlaFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Bla | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Bla",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Bla)
  @nestAccessControl.UseRoles({
    resource: "Bla",
    action: "create",
    possession: "any",
  })
  async createBla(
    @graphql.Args() args: CreateBlaArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Bla> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Bla",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Bla"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Bla)
  @nestAccessControl.UseRoles({
    resource: "Bla",
    action: "update",
    possession: "any",
  })
  async updateBla(
    @graphql.Args() args: UpdateBlaArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Bla | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Bla",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Bla"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Bla)
  @nestAccessControl.UseRoles({
    resource: "Bla",
    action: "delete",
    possession: "any",
  })
  async deleteBla(@graphql.Args() args: DeleteBlaArgs): Promise<Bla | null> {
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
}
