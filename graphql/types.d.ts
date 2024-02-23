import { GraphQLResolveInfo } from "graphql";

type GqlContext = {};

/**
 * The context object that is passed to all resolvers.
 */
export type QueryResolver<Args = any, RT = any> = (
  parent: any,
  args: Args,
  context: GqlContext,
  info: GraphQLResolveInfo
) => RT | Promise<RT>;

// {
//   country: String
//   cities: [String]
// }

type IRGetCountriesAndCitiesResponse = {
  country: string;
  cities: string[];
  iso2: string;
  iso3: string;
};

type IRGetCountriesAndCities = QueryResolver<
  { limit: number; page: number; country: string },
  IRGetCountriesAndCitiesResponse[]
>;
