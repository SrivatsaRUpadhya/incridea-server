import { builder } from "../../builder";
import checkIfPublicityMember from "../../publicityMembers/checkIfPublicityMember";

builder.queryField("getCards",(t) => 
    t.prismaField({
        type: ["Card"],
        errors:{
            types:[Error]
        },
        resolve: async (query, root, args, ctx, info) => {
            const user = await ctx.user;
            if(!user)
                throw new Error("Not authenticated");
            if(!checkIfPublicityMember(user.id))
                throw new Error("Not authorized");
            return ctx.prisma.card.findMany({})
        }
    })
)