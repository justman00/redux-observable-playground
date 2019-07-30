import { ofType } from "redux-observable";
import { concat, of, fromEvent, race, merge, forkJoin } from "rxjs";
import {
  map,
  switchMap,
  debounceTime,
  filter,
  catchError,
  delay,
  mapTo,
  withLatestFrom,
  pluck
} from "rxjs/operators";
import {
  FETCH_DATA,
  setStatus,
  fetchFullfield,
  SEARCH,
  fetchFailed,
  CANCEL,
  reset,
  RANDOM
} from "../actions/beersActions";

const search = (apiBase, perPage, term) =>
  `${apiBase}?beer_name=${encodeURIComponent(term)}&per_page=${perPage}`;
const random = apiBase => `${apiBase}/random`;

export function searchBeersEpic(action$, state$, { getJSON, document }) {
  return action$.pipe(
    ofType(RANDOM),
    debounceTime(500),
    // filter(({ payload }) => payload.trim() !== ""),
    withLatestFrom(state$.pipe(pluck("config"))),
    switchMap(([{ payload }, config]) => {
      const blocker$ = merge(
        action$.pipe(ofType(CANCEL)),
        fromEvent(document, "keyup").pipe(
          filter(evt => evt.key === "Escape" || evt.key === "Esc")
        )
      ).pipe(mapTo(reset()));

      const requests = [...Array(config.perPage)].map(() => {
        return getJSON(random(config.apiBase)).pipe(pluck(0));
      });

      const ajax$ = forkJoin(requests).pipe(
        map(resp => fetchFullfield(resp)),
        catchError(err => {
          return of(fetchFailed(err.response.message));
        })
      );

      return concat(of(setStatus("pending")), race(ajax$, blocker$));
    })
  );
}
