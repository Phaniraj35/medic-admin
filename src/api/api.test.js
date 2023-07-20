import { rest } from "msw";
import { setupServer } from "msw/node"
import { describe, test } from "vitest";
import * as api from './index'

const handlers = [
    rest.post("http://localhost:3000/medicines", (req, res, ctx) => {
        return res(ctx.status(201), ctx.json({}))
    }),

    rest.put("http://localhost:3000/medicines/1", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({}))
    }),

    rest.delete("http://localhost:3000/medicines/1", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({}))
    }),

    rest.get("http://localhost:3000/medicines", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({}))
    })    
]

const server = setupServer(...handlers);


describe('Api tests', () => {
    beforeAll(() => server.listen())

    afterEach(() => server.resetHandlers())

    afterAll(() => server.close());

    test('postDrug calls the correct api', async () => {
        const response = await api.postDrugs({})
        expect(response.status).toBe(201)
    })

    test('putDrug calls the correct api', async () => {
        const response = await api.putDrug(1, {})
        expect(response.status).toBe(200)
    })

    test('deleteDrug calls the correct api', async () => {
        const response = await api.deleteDrug(1, {})
        expect(response.status).toBe(200)
    })

    test('fetchDrugs calls the correct api', async () => {
        const response = await api.fetchDrugs()
        expect(response.status).toBe(200)
    })
})