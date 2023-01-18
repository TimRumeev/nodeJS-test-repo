import { App } from "../src/app";
import { boot } from "../src/main";
import request from "supertest";

let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe("Products e2e", () => {
	it("Create - error", async () => {
		const res = await request(application.app)
			.post("products/create")
			.send({ name: "a", amount: 1 });
		expect(res.status).toBe(403);
	});
	it("Read - success", async () => {
		const login = await request(application.app)
			.post("/products/read")
			.send({ email: "a@aa.ru", password: "VanyaPassword" });
		const res = await request(application.app)
			.get("/products/read")
			.set("Authorization", `Bearer ${login.body.jwt}`)
			.send({ name: "a" });
		expect(res.body).not.toBeUndefined();
	});
	it("Read - error", async () => {
		const login = await request(application.app)
			.post("/products/read")
			.send({ email: "a@aa.ru", password: "VanyaPassword" });
		const res = await request(application.app)
			.get("/products/read")
			.set("Authorization", `Bearer ${login.body.jwt}`)
			.send({ name: "a1" });
		expect(res.statusCode).toBe(404);
	});
	it("Update - success", async () => {
		const login = await request(application.app)
			.post("/products/update")
			.send({ email: "a@aa.ru", password: "VanyaPassword" });
		const res = await request(application.app)
			.get("/products/update")
			.set("Authorization", `Bearer ${login.body.jwt}`)
			.send({ id: 1, name: "a", amount: 1 });
		expect(res.body).not.toBeUndefined();
	});
	it("Update - error", async () => {
		const login = await request(application.app)
			.post("/products/update")
			.send({ email: "a@aa.ru", password: "VanyaPassword" });
		const res = await request(application.app)
			.get("/products/update")
			.set("Authorization", `Bearer ${login.body.jwt}`)
			.send({ id: 2, name: "a", amount: 1 });
		expect(res.statusCode).toBe(422);
	});
	it("Delete - success", async () => {
		const login = await request(application.app)
			.post("/products/delete")
			.send({ email: "a@a.ru", password: "VanyaPassword" });
		const res = await request(application.app)
			.get("/products/delete")
			.set("Authorization", `Bearer ${login.body.jwt}`)
			.send({ id: 1 });
		expect(res.body).not.toBeUndefined();
	});
	it("Delete - error", async () => {
		const login = await request(application.app)
			.post("/products/delete")
			.send({ email: "a@aa.ru", password: "VanyaPassword" });
		const res = await request(application.app)
			.get("/products/delete")
			.set("Authorization", `Bearer ${login.body.jwt}`)
			.send({ id: 2 });
		expect(res.statusCode).toBe(422);
	});
});
