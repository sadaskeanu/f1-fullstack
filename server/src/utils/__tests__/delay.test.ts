import { delay } from "../delay";

describe("delay", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("resolves after the given time", async () => {
    const callback = jest.fn();

    const promise = delay(1000).then(callback);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    await promise;

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
