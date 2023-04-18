import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { Role } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const boardRouter = createTRPCRouter({
  createBoard:protectedProcedure.input(z.object({name:z.string()}))
  .mutation(async ({input,ctx})=>{
    const board = await prisma.board.create({
      data:{
        name:input.name,
        boardAccess:{
          
          create:{
            role:Role.Owner,
            userId:ctx.session.user.id
          }
        }
      }
    })

    return board;
  }),
  getBoard:protectedProcedure.input(z.object({id:z.string()}))
  .query(async({input,ctx})=>{
    const board = await prisma.board.findUnique({where:{
      id:input.id
    },include:{
     boardAccess:true 
    }})

    if(!board?.boardAccess.some((val)=>{
      return val.userId === ctx.session.user.id
    })){
      throw new TRPCError({code:"UNAUTHORIZED",message:"You do not have permission to view this board."})
    }
    return board;
  }),
  getAccessibleBoards:protectedProcedure
  .query(async({ctx})=>{
    const boards = await prisma.board.findMany({
      where:{
        boardAccess:{
          some:{
            userId:ctx.session.user.id
          }
        }
      }
    })
    return boards;
  })
});
