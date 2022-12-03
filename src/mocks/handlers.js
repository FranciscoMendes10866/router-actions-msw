import { rest } from "msw";

const fakeDB = [];

export const handlers = [
  rest.get("/mocked-api/post", (req, res, ctx) => {
    return res(ctx.json(fakeDB));
  }),
  rest.post("/mocked-api/post", async (req, res, ctx) => {
    const body = await req.json();
    fakeDB.push(body);
    return res(ctx.json(body));
  }),
];
