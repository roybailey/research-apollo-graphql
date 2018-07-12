const { mergeTypes, mergeResolvers } = require('merge-graphql-schemas');

import { typeDefs as dinnerTypes, resolvers as dinnerResolvers } from "./dinner";
import { typeDefs as auditTypes, resolvers as auditResolvers } from "./audit/audit.schema";
import { typeDefs as todoTypes, resolvers as todoResolvers } from "./todo/todo.schema";
import { typeDefs as userTypes, resolvers as userResolvers } from "./user/user.schema";

const typesArray = [dinnerTypes, todoTypes, auditTypes, userTypes];
const resolversArray = [dinnerResolvers, todoResolvers, auditResolvers, userResolvers];

export const resolvers = mergeResolvers(resolversArray);
export const typeDefs = mergeTypes(typesArray);

console.log(JSON.stringify(typeDefs))
