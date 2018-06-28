const dinnerOptions = ['🍕', '🌭', '🍔', '🥗', '🍣'];

export const typeDefs = `
  type Query {
    whatsForDinner: String!
  }
`;

export const resolvers = {
  Query: {
    whatsForDinner: () => {
      const idx = Math.floor(Math.random() * dinnerOptions.length);
      const foodChoice = dinnerOptions[idx];
      return `Tonight we eat ${foodChoice}`;
    }
  }
}
