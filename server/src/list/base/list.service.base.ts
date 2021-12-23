import { PrismaService } from "nestjs-prisma";
import { Prisma, List, Bla } from "@prisma/client";

export class ListServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.ListFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ListFindManyArgs>
  ): Promise<number> {
    return this.prisma.list.count(args);
  }

  async findMany<T extends Prisma.ListFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ListFindManyArgs>
  ): Promise<List[]> {
    return this.prisma.list.findMany(args);
  }
  async findOne<T extends Prisma.ListFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.ListFindUniqueArgs>
  ): Promise<List | null> {
    return this.prisma.list.findUnique(args);
  }
  async create<T extends Prisma.ListCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ListCreateArgs>
  ): Promise<List> {
    return this.prisma.list.create<T>(args);
  }
  async update<T extends Prisma.ListUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ListUpdateArgs>
  ): Promise<List> {
    return this.prisma.list.update<T>(args);
  }
  async delete<T extends Prisma.ListDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.ListDeleteArgs>
  ): Promise<List> {
    return this.prisma.list.delete(args);
  }

  async findBlas(
    parentId: string,
    args: Prisma.BlaFindManyArgs
  ): Promise<Bla[]> {
    return this.prisma.list
      .findUnique({
        where: { id: parentId },
      })
      .blas(args);
  }
}
