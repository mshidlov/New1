import { PrismaService } from "nestjs-prisma";
import { Prisma, Bla, List } from "@prisma/client";

export class BlaServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.BlaFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.BlaFindManyArgs>
  ): Promise<number> {
    return this.prisma.bla.count(args);
  }

  async findMany<T extends Prisma.BlaFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.BlaFindManyArgs>
  ): Promise<Bla[]> {
    return this.prisma.bla.findMany(args);
  }
  async findOne<T extends Prisma.BlaFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.BlaFindUniqueArgs>
  ): Promise<Bla | null> {
    return this.prisma.bla.findUnique(args);
  }
  async create<T extends Prisma.BlaCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.BlaCreateArgs>
  ): Promise<Bla> {
    return this.prisma.bla.create<T>(args);
  }
  async update<T extends Prisma.BlaUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.BlaUpdateArgs>
  ): Promise<Bla> {
    return this.prisma.bla.update<T>(args);
  }
  async delete<T extends Prisma.BlaDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.BlaDeleteArgs>
  ): Promise<Bla> {
    return this.prisma.bla.delete(args);
  }

  async getList(parentId: string): Promise<List | null> {
    return this.prisma.bla
      .findUnique({
        where: { id: parentId },
      })
      .list();
  }
}
