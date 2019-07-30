import { TestScheduler } from "rxjs/testing";
import {
  search,
  setStatus,
  fetchFullfield,
  fetchFailed
} from "../../actions/beersActions";
import { initialState } from "../../reducers/configReducer";
import { of } from "rxjs";
import { searchBeersEpic } from "../fetchBeers";

it("produces the right actions", () => {
  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

  testScheduler.run(({ hot, cold, expectObservable }) => {
    const action$ = hot("a", {
      a: search("ship")
    });
    const state$ = of({
      config: initialState
    });

    const dependencies = {
      getJSON: url => {
        return cold("-#", null, {
          response: {
            message: "oops!"
          }
        });
      }
    };

    const output$ = searchBeersEpic(action$, state$, dependencies);
    expectObservable(output$).toBe("500ms ab", {
      a: setStatus("pending"),
      b: fetchFailed("oops!")
    });
  });
});
