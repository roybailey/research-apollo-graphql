const { mergeTypes, mergeResolvers } = require('merge-graphql-schemas');

import { typeDefs as dinnerTypes, resolvers as dinnerResolvers } from "./dinner";
import { typeDefs as todoTypes, resolvers as todoResolvers } from "./todo/todo.schema";
import { typeDefs as auditTypes, resolvers as auditResolvers } from "./audit/audit.schema";

const typesArray = [dinnerTypes, todoTypes, auditTypes];
const resolversArray = [dinnerResolvers, todoResolvers, auditResolvers];

export const resolvers = mergeResolvers(resolversArray);
export const typeDefs = mergeTypes(typesArray);
