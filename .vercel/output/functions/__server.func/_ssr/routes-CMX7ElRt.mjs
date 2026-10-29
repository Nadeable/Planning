import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useDesk } from "./router-DRDdpARV.mjs";
import { c as findings, g as planStarted, m as optionLabel, o as cn, s as filled } from "./cn-D7EyhrPo.mjs";
import { t as formatDistanceToNowStrict } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CMX7ElRt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STEPS = [
	{
		n: "01",
		title: "Capture",
		body: "One sentence before lore, systems, or a map. If it cannot be small on the page, it will not survive production."
	},
	{
		n: "02",
		title: "Scale gate",
		body: "Park the dream. Pick a size your real weekly hours can finish. The dream is not a schedule."
	},
	{
		n: "03",
		title: "Market test",
		body: "Write what done and sellable looks like: price or word count, an ending, and the artifact a stranger meets first."
	},
	{
		n: "04",
		title: "Roadmap",
		body: "Phases that end when something is true — a fun greybox, a spoiled ending, a cold player — not when you feel ready."
	}
];
function Shelf() {
	const projects = useDesk((state) => state.projects);
	const create = useDesk((state) => state.create);
	const navigate = useNavigate();
	const yours = projects.filter((project) => !project.example);
	const examples = projects.filter((project) => project.example);
	function start(medium) {
		const id = create(medium);
		navigate({
			to: "/p/$id",
			params: { id }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen border-t-4 border-ink",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl px-4 py-8 sm:py-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "size-3.5 bg-wax",
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold tracking-widest",
						children: "SCOPEWRIGHT"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-8 max-w-xl font-display text-4xl text-balance sm:text-5xl",
					children: "Finish the version someone can buy."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-xl text-lg text-pretty text-muted",
					children: "Ideas arrive already too big. This desk is the interruption for games and books: park the dream, lock a size, and write a road that actually ends."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid gap-3 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => start("game"),
						className: "rounded-lg border border-line bg-card p-5 text-left transition-colors duration-200 hover:border-ink",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold tracking-widest text-wax-deep",
								children: "GAME"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-display text-2xl",
								children: "Start a game"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-pretty text-muted",
								children: "Verb, pillars, price, and one slice — before the open world gets a calendar."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => start("book"),
						className: "rounded-lg border border-ink bg-ink p-5 text-left text-paper transition-colors duration-200 hover:bg-wax",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold tracking-widest text-wax-ink",
								children: "BOOK"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-display text-2xl",
								children: "Start a book"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-pretty text-wax-ink",
								children: "Premise, ending, word count, and a shelf — before the saga gets a bible."
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "How a plan gets honest"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-4 grid gap-4 sm:grid-cols-2",
						children: STEPS.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "border-t border-line pt-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold tracking-widest text-muted",
									children: step.n
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-medium",
									children: step.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-pretty text-muted",
									children: step.body
								})
							]
						}, step.n))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-12 grid gap-8 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "A marketable game"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3 space-y-2 text-sm text-pretty text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "A verb a trailer can show in five seconds." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "One loop that is fun without the story." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "A length that matches the price, including a two-hour refund window." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "An ending, or a deliberate stop." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Capsule, trailer, and first minute that agree." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "A kill list. The dream is not the product." })
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "A marketable book"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3 space-y-2 text-sm text-pretty text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "A premise a stranger can repeat." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "A want, a need that costs it, and an ending that pays both." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "A word count inside the shelf's band." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Comps from books people finish now, not only the classics." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "A path: query packet, or cover, edit, and blurb." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Book one still ends, even if the world could continue." })
						]
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-14",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "On your desk"
					}), yours.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-xl text-pretty text-muted",
						children: "Nothing of yours yet. Read a worked plan below, then start smaller than the idea wants. The desk will argue if you overfill it."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 grid gap-3",
						children: yours.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectRow, { project }, project.id))
					})]
				}),
				examples.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl",
							children: "Study a worked plan"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-xl text-sm text-pretty text-muted",
							children: "Both of these started as something much larger. The brief is what's left after the cuts."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 grid gap-3",
							children: examples.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectRow, { project }, project.id))
						})
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-14 text-sm text-muted",
					children: "Saved in this browser only. Clearing site data clears the desk."
				})
			]
		})
	});
}
function ProjectRow({ project }) {
	const remove = useDesk((state) => state.remove);
	const duplicate = useDesk((state) => state.duplicate);
	const navigate = useNavigate();
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	const pitch = project.medium === "game" ? project.answers.pitch : project.answers.premise || project.answers.image;
	const band = optionLabel(project.medium, "sizeBand", project.answers.sizeBand);
	const blocks = (planStarted(project) ? findings(project) : []).filter((issue) => issue.level === "block").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex min-w-0 items-stretch border border-line bg-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/p/$id",
			params: { id: project.id },
			className: "min-w-0 flex-1 p-4 no-underline",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs font-semibold tracking-widest text-wax-deep",
					children: [project.example ? "EXAMPLE · " : "", project.medium === "game" ? "GAME" : "BOOK"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 break-words font-display text-2xl text-balance",
					children: project.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 line-clamp-2 text-sm text-pretty text-muted",
					children: filled(pitch) ? pitch : "No sentence yet."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-xs text-muted",
					children: [
						band || "No band",
						" · ",
						blocks > 0 ? `${blocks} blocking · ` : planStarted(project) ? "Plan honest · " : "",
						"edited ",
						formatDistanceToNowStrict(project.updatedAt, { addSuffix: true })
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex shrink-0 flex-col justify-center gap-1 border-l border-line px-2",
			children: [project.example ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "min-h-11 px-3 text-sm hover:text-wax-deep",
				onClick: () => {
					const id = duplicate(project.id);
					if (id) navigate({
						to: "/p/$id",
						params: { id }
					});
				},
				children: "Copy"
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: cn("min-h-11 px-3 text-sm", confirm ? "text-wax-deep" : "text-muted hover:text-ink"),
				onClick: () => {
					if (!confirm) {
						setConfirm(true);
						return;
					}
					remove(project.id);
				},
				children: confirm ? "Confirm" : "Delete"
			})]
		})]
	});
}
var SplitComponent = Shelf;
//#endregion
export { SplitComponent as component };
