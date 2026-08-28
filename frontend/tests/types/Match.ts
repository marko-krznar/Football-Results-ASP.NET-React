import type { useGetSeasonsQuery } from "../../src/redux/api/seasonsApi";
import type { useGetTeamsQuery } from "../../src/redux/api/teamsApi";
import type { useGetTeamMembersQuery } from "../../src/redux/api/teamMembersApi";
import type { useAddMatchWithDetailsMutation } from "../../src/redux/api/matchesApi";

// Full return type of each hook, derived directly from the implementation.
// Test mocks usually only set `data`/`isLoading`, so assignment uses
// `as unknown as ...` (see usage examples in the tests) — this is
// intentional, since filling in every RTK Query field (refetch, isFetching,
// ...) wouldn't add anything to the test, and this type still catches
// mistakes in the shape of the data.
export type UseGetSeasonsQueryMockResult = ReturnType<typeof useGetSeasonsQuery>;
export type UseGetTeamsQueryMockResult = ReturnType<typeof useGetTeamsQuery>;
export type UseGetTeamMembersQueryMockResult = ReturnType<typeof useGetTeamMembersQuery>;

// Mutation hook returns tuple [trigger, mutationState].
export type UseAddMatchWithDetailsMutationMockResult = ReturnType<typeof useAddMatchWithDetailsMutation>;
export type AddMatchWithDetailsTrigger = UseAddMatchWithDetailsMutationMockResult[0];
export type AddMatchWithDetailsTriggerResult = ReturnType<AddMatchWithDetailsTrigger>;
