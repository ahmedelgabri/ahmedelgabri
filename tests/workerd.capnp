using Workerd = import "/workerd/workerd.capnp";

const cardTests :Workerd.Config = (
	services = [(
		name = "card",
		worker = (
			modules = [
				(name = "worker", esModule = embed "./workerd_fixture.js"),
				(name = "card", esModule = embed "../npm/dist/mod.js"),
				(name = "contract", esModule = embed "./contract.js"),
				(name = "card.color.txt", text = embed "./fixtures/card.color.txt"),
				(name = "card.plain.txt", text = embed "./fixtures/card.plain.txt"),
			],
			compatibilityDate = "2026-08-16",
		),
	)],
);
