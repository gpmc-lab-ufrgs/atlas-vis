import {formatHour} from '~/utils';
import {IGetMe} from './types/IGetMe';

function getMeAdapter(response: IGetMe['graphQLResponse']): IGetMe['response'] {
  const users = response.userQuery.edges
    .map(edge => edge.node)
    .map(user => ({
      ...user,
      profile: {
        ...user.profile,
        handicap: !!user?.profile?.handicap
          ? Number(user?.profile?.handicap).toFixed(1)
          : user?.profile?.handicap,
      },
      gamesAttending: user.gamesAttending.map(gamesAttendig => ({
        ...gamesAttendig,
        game_time: gamesAttendig?.game_time
          ? formatHour(gamesAttendig?.game_time)
          : '',
      })),
      gamesCreated: user.gamesCreated.map(gamesCreated => ({
        ...gamesCreated,
        game_time: gamesCreated?.game_time
          ? formatHour(gamesCreated?.game_time)
          : '',
      })),
      gamesPlayed: user.gamesPlayed.map(gamesPlayed => ({
        ...gamesPlayed,
        game_time: gamesPlayed?.game_time
          ? formatHour(gamesPlayed?.game_time)
          : '',
      })),
    }));
  const transformedResponse = {
    me: users[0],
  };

  return transformedResponse;
}

export const authAdapters = {getMeAdapter};
