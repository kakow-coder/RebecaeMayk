import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("gifts router", () => {
  it("should get all gift selections", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.gifts.getSelections();

    expect(Array.isArray(result)).toBe(true);
  });

  it("should save a gift selection", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.gifts.saveSelection({
      giftId: "test-gift-1",
      giftName: "Test Gift",
      selectedBy: "Test User",
    });

    expect(result).toBeDefined();
    expect(result?.giftId).toBe("test-gift-1");
    expect(result?.selectedBy).toBe("Test User");
  });

  it("should remove a gift selection", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // First save a gift
    await caller.gifts.saveSelection({
      giftId: "test-gift-remove",
      giftName: "Gift to Remove",
      selectedBy: "Test User",
    });

    // Then remove it
    const result = await caller.gifts.removeSelection({
      giftId: "test-gift-remove",
    });

    expect(result).toBe(true);
  });
});
