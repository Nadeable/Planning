import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Route, r as useDesk } from "./router-DRDdpARV.mjs";
import { C as wordCount, S as taskKey, _ as priceMust, a as STAGES, b as stageById, c as findings, d as liveKills, f as liveLines, g as planStarted, h as paceNote, i as REMINDERS, l as lengthVerdict, m as optionLabel, n as MARKET_LINE, o as cn, p as marketableItems, r as PHASES, s as filled, t as LIST_COPY, u as linesOf, v as reminderFor, x as stageFill, y as shipCap } from "./cn-D7EyhrPo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/p._id-DLANfkGl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function missing(value, label) {
	return filled(value) ? value.trim() : `${label} — not written yet.`;
}
function briefBlocks(project) {
	const answers = project.answers;
	const band = optionLabel(project.medium, "sizeBand", answers.sizeBand) || "No band chosen";
	const hours = optionLabel(project.medium, "weeklyHours", answers.weeklyHours) || "No hours chosen";
	const pace = paceNote(project);
	const length = lengthVerdict(project);
	const cap = shipCap(project);
	const ship = liveLines(project.ship);
	const dream = liveLines(project.dream);
	const kills = liveKills(project.kills);
	const blocks = [];
	if (project.medium === "game") blocks.push({
		heading: "Pitch",
		paragraphs: [
			missing(answers.pitch, "Pitch"),
			filled(answers.eightWords) ? `Hook: ${answers.eightWords.trim()}` : "Hook — not written yet.",
			filled(answers.fantasy) ? `Fantasy: ${answers.fantasy.trim()}` : "Fantasy — not written yet."
		]
	});
	else blocks.push({
		heading: "Premise",
		paragraphs: [
			missing(answers.premise, "Premise"),
			filled(answers.logline) ? `Jacket: ${answers.logline.trim()}` : "Jacket line — not written yet.",
			filled(answers.want) ? `Want: ${answers.want.trim()}` : "Want — not written yet.",
			filled(answers.need) ? `Need: ${answers.need.trim()}` : "Need — not written yet."
		]
	});
	blocks.push({
		heading: "Refused",
		paragraphs: [missing(answers.notThis, "What this isn't")]
	});
	blocks.push({
		heading: "Size",
		paragraphs: [
			`${band}. ${hours}.`,
			filled(answers.horizon) ? answers.horizon.trim() : "No dates yet.",
			filled(answers.honestWhy) ? answers.honestWhy.trim() : "",
			pace?.text ?? "",
			length?.text ?? "",
			cap !== null ? `Ship list cap for this band: ${cap}.` : ""
		].filter(Boolean)
	});
	blocks.push({
		heading: project.medium === "game" ? "In the build" : "In this book",
		items: ship.length ? ship.map((line) => ({ title: line.text })) : [{ title: "Nothing is on the ship list yet." }]
	});
	blocks.push({
		heading: "Parked",
		items: dream.length ? dream.map((line) => ({ title: line.text })) : [{ title: "Nothing is parked. That is suspicious." }]
	});
	blocks.push({
		heading: "Cuts",
		items: kills.length ? kills.map((kill) => ({
			title: kill.what,
			detail: kill.why
		})) : [{ title: "No cuts yet." }]
	});
	if (project.medium === "game") {
		blocks.push({
			heading: "Spine",
			paragraphs: [
				filled(answers.verb) ? `Verb: ${answers.verb.trim()}` : "Verb — not written yet.",
				missing(answers.loopLayers, "Loop"),
				missing(answers.slice, "Slice"),
				filled(answers.pillars) ? `Pillars:\n${answers.pillars.trim()}` : "Pillars — not written yet."
			]
		});
		blocks.push({
			heading: "Market",
			paragraphs: [
				MARKET_LINE.game,
				missing(answers.audience, "Audience"),
				optionLabel("game", "price", answers.price) ? `Price: ${optionLabel("game", "price", answers.price)}.` : "Price — not chosen.",
				filled(answers.platform) ? answers.platform.trim() : "",
				missing(answers.refundTest, "After two hours"),
				missing(answers.storeProof, "Store proof")
			].filter(Boolean)
		});
	} else {
		blocks.push({
			heading: "Spine",
			paragraphs: [
				missing(answers.ending, "Ending"),
				missing(answers.beats, "Beats"),
				filled(answers.pov) ? `Point of view: ${answers.pov.trim()}` : "",
				filled(answers.about) ? answers.about.trim() : ""
			].filter(Boolean)
		});
		blocks.push({
			heading: "Market",
			paragraphs: [
				MARKET_LINE.book,
				optionLabel("book", "shelf", answers.shelf) ? `Shelf: ${optionLabel("book", "shelf", answers.shelf)}.` : "Shelf — not chosen.",
				optionLabel("book", "path", answers.path) ? `Path: ${optionLabel("book", "path", answers.path)}.` : "Path — not chosen.",
				missing(answers.audience, "Reader"),
				missing(answers.package, "Package")
			].filter(Boolean)
		});
	}
	const issues = findings(project);
	blocks.push({
		heading: "Still in the way",
		items: issues.length ? issues.map((issue) => ({
			title: issue.title,
			detail: issue.detail
		})) : [{ title: "Nothing is blocking the plan. The work is still ahead of you." }]
	});
	blocks.push({
		heading: "Roadmap",
		items: PHASES[project.medium].flatMap((phase) => phase.tasks.map((task) => ({ title: `${project.tasks[taskKey(phase.id, task.id)] ? "[x]" : "[ ]"} ${phase.name}: ${task.label}` })))
	});
	return blocks;
}
function briefPlain(project) {
	const lines = [
		project.title,
		project.medium === "game" ? "Game" : "Book",
		"",
		MARKET_LINE[project.medium],
		""
	];
	for (const block of briefBlocks(project)) {
		lines.push(block.heading.toUpperCase());
		for (const paragraph of block.paragraphs ?? []) lines.push(paragraph, "");
		for (const item of block.items ?? []) lines.push(item.detail ? `- ${item.title} — ${item.detail}` : `- ${item.title}`);
		lines.push("");
	}
	return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}
function Roadmap({ project }) {
	const toggleTask = useDesk((state) => state.toggleTask);
	const setPhaseNote = useDesk((state) => state.setPhaseNote);
	const phases = PHASES[project.medium];
	const edge = phases.find((phase) => phase.tasks.some((task) => !project.tasks[taskKey(phase.id, task.id)]));
	const blocked = findings(project).some((finding) => finding.level === "block" && finding.stage === "scale");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [blocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "border border-wax bg-wax-soft px-4 py-3 text-sm text-ink",
		children: "This roadmap is fiction until the scale gate is honest. Hours, a finishable band, and a ship list that fits come first."
	}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: cn(blocked && "mt-2"),
		children: phases.map((phase, index) => {
			const here = edge?.id === phase.id;
			const done = phase.tasks.filter((task) => project.tasks[taskKey(phase.id, task.id)]).length;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "border-t border-line py-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-baseline justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-display text-2xl text-balance",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mr-2 text-muted tabular-nums",
								children: index + 1
							}), phase.name]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: cn("text-xs font-semibold tracking-widest", here ? "text-wax-deep" : "text-muted"),
							children: here ? "YOU ARE HERE" : `${done}/${phase.tasks.length}`
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-pretty text-muted",
						children: phase.intent
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 border border-ink bg-card px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold tracking-widest text-muted",
							children: "EXIT"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-pretty",
							children: phase.exit
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4",
						children: phase.tasks.map((task) => {
							const key = taskKey(phase.id, task.id);
							const checked = Boolean(project.tasks[key]);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex min-h-11 items-start gap-3 py-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									className: "mt-1 size-5 shrink-0 accent-ink",
									checked,
									onChange: () => toggleTask(project.id, key)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("pt-0.5", checked && "text-muted"),
									children: task.label
								})]
							}) }, key);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-4 block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted",
							children: "Note for this phase"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: project.phaseNotes[phase.id] ?? "",
							onChange: (event) => setPhaseNote(project.id, phase.id, event.target.value),
							rows: 2,
							placeholder: "What did this phase decide? Optional.",
							className: "mt-2 w-full resize-y rounded-md border border-line bg-card px-3 py-2.5 text-base text-ink placeholder:text-muted"
						})]
					})
				]
			}, phase.id);
		})
	})] });
}
function BriefView({ project }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [failed, setFailed] = (0, import_react.useState)(false);
	const blocks = briefBlocks(project).filter((block) => block.heading !== "Roadmap");
	const band = optionLabel(project.medium, "sizeBand", project.answers.sizeBand) || "No band";
	const hours = optionLabel(project.medium, "weeklyHours", project.answers.weeklyHours) || "No hours";
	async function copy() {
		try {
			await navigator.clipboard.writeText(briefPlain(project));
			setFailed(false);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 2e3);
		} catch {
			setFailed(true);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-2xl px-4 py-6 sm:py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "no-print flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => void copy(),
					className: "min-h-11 rounded-md bg-ink px-4 text-sm font-medium text-paper",
					children: copied ? "Copied" : "Copy brief"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => window.print(),
					className: "min-h-11 rounded-md border border-ink px-4 text-sm font-medium",
					children: "Print"
				})]
			}),
			failed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				readOnly: true,
				value: briefPlain(project),
				className: "no-print mt-3 h-40 w-full border border-line bg-card p-3 text-sm",
				"aria-label": "Brief text"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mt-6 border-b border-ink pb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold tracking-widest text-wax-deep",
						children: "PRODUCTION BRIEF"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl text-balance sm:text-5xl",
						children: project.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-muted",
						children: [
							project.medium === "game" ? "Game" : "Book",
							" · ",
							band,
							" · ",
							hours
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 font-display text-xl italic text-balance",
						children: MARKET_LINE[project.medium]
					})
				]
			}),
			blocks.map((block) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "border-b border-line py-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xs font-semibold tracking-widest text-muted",
						children: block.heading.toUpperCase()
					}),
					block.paragraphs?.map((paragraph) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 whitespace-pre-wrap text-pretty",
						children: paragraph
					}, paragraph)),
					block.items ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2",
						children: block.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "text-pretty",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.title }), item.detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [" — ", item.detail]
							}) : null]
						}, `${item.title}-${item.detail ?? ""}`))
					}) : null
				]
			}, block.heading)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "py-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs font-semibold tracking-widest text-muted",
					children: "ROADMAP"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Roadmap, { project })
				})]
			})
		]
	});
}
function ScopeDialog({ project, open, onClose }) {
	const addLine = useDesk((state) => state.addLine);
	const addKill = useDesk((state) => state.addKill);
	const whatRef = (0, import_react.useRef)(null);
	const [what, setWhat] = (0, import_react.useState)("");
	const [serves, setServes] = (0, import_react.useState)("");
	const [why, setWhy] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const onCloseRef = (0, import_react.useRef)(onClose);
	onCloseRef.current = onClose;
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setWhat("");
		setServes("");
		setWhy("");
		setError("");
		const frame = window.requestAnimationFrame(() => whatRef.current?.focus());
		const previous = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const onKey = (event) => {
			if (event.key === "Escape") onCloseRef.current();
		};
		window.addEventListener("keydown", onKey);
		return () => {
			window.cancelAnimationFrame(frame);
			document.body.style.overflow = previous;
			window.removeEventListener("keydown", onKey);
		};
	}, [open]);
	if (!open) return null;
	const cap = shipCap(project);
	const count = liveLines(project.ship).length;
	const over = cap !== null && count >= cap;
	const noun = project.medium === "game" ? "a pillar" : "the protagonist's want";
	function park() {
		if (!what.trim()) {
			setError("Name the thing first.");
			return;
		}
		addLine(project.id, "dream", what.trim());
		onClose();
	}
	function cut() {
		if (!what.trim() || !why.trim()) {
			setError("A cut needs the thing and the reason. Otherwise it comes back.");
			return;
		}
		addKill(project.id, what.trim(), why.trim());
		onClose();
	}
	function ship() {
		if (!what.trim()) {
			setError("Name the thing first.");
			return;
		}
		if (!serves.trim()) {
			setError(`Say which ${noun} it serves. If you can't, park it.`);
			return;
		}
		addLine(project.id, "ship", `${what.trim()} — serves ${serves.trim()}`);
		onClose();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "no-print fixed inset-0 z-30 flex items-end justify-center bg-ink/50 sm:items-center sm:p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "Close scope check",
			className: "absolute inset-0",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "scope-title",
			className: "relative max-h-[92vh] w-full max-w-lg overflow-y-auto border border-ink bg-paper p-5 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-widest text-wax-deep",
					children: "SCOPE CHECK"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "scope-title",
					className: "mt-2 font-display text-3xl text-balance",
					children: "Before it enters the plan"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-pretty text-muted",
					children: [
						"Name it. Then decide if it is the ",
						project.medium === "game" ? "game" : "book",
						" you are actually making. Most things are not."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-5 block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: "What do you want to add?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: whatRef,
						value: what,
						onChange: (event) => setWhat(event.target.value),
						className: "mt-2 min-h-11 w-full rounded-md border border-line bg-card px-3 text-base"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-4 block",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: "What does it serve?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-1 block text-sm text-muted",
							children: [project.medium === "game" ? "A pillar, or the verb." : "The protagonist's want, or the ending.", " If this stays blank, it does not ship."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: serves,
							onChange: (event) => setServes(event.target.value),
							className: "mt-2 min-h-11 w-full rounded-md border border-line bg-card px-3 text-base"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-4 block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: "If you cut it, why is the plan better?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: why,
						onChange: (event) => setWhy(event.target.value),
						className: "mt-2 min-h-11 w-full rounded-md border border-line bg-card px-3 text-base"
					})]
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-wax-deep",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-col gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: park,
							className: "min-h-11 rounded-md bg-ink px-4 font-medium text-paper",
							children: "Park it on the dream list"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: cut,
							className: "min-h-11 rounded-md border border-ink px-4 font-medium",
							children: "Cut it"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: ship,
							className: "min-h-11 rounded-md border border-wax px-4 font-medium text-wax-deep",
							children: over ? "Ship it anyway — this flags the plan" : "Put it on the ship list"
						})
					]
				})
			]
		})]
	});
}
function ScopeMeter({ project, compact = false }) {
	const cap = shipCap(project);
	const count = liveLines(project.ship).length;
	const parked = liveLines(project.dream).length;
	const over = cap !== null && count > cap;
	const width = cap ? Math.min(100, Math.round(count / cap * 100)) : 0;
	if (compact) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("tabular-nums", over && "font-semibold text-wax-deep"),
		children: [
			"Ship ",
			count,
			cap !== null ? `/${cap}` : "",
			parked ? ` · ${parked} parked` : ""
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-baseline justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: LIST_COPY[project.medium].ship
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("text-sm tabular-nums", over ? "font-semibold text-wax-deep" : "text-muted"),
				children: cap === null ? count : `${count} / ${cap}`
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 h-1.5 overflow-hidden rounded-full bg-paper-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("h-full", over ? "bg-wax" : "bg-ink"),
				style: { width: `${cap === null ? 0 : width}%` }
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-pretty text-muted",
			children: cap === null ? "Pick a finishable band and this list gets a limit." : over ? "Over the band. Park or cut before you call this a plan." : `${parked} parked on the dream list, where they cannot quietly become tasks.`
		})
	] });
}
function ScopeLists({ project }) {
	const addLine = useDesk((state) => state.addLine);
	const updateLine = useDesk((state) => state.updateLine);
	const removeLine = useDesk((state) => state.removeLine);
	const moveLine = useDesk((state) => state.moveLine);
	const addKill = useDesk((state) => state.addKill);
	const updateKill = useDesk((state) => state.updateKill);
	const removeKill = useDesk((state) => state.removeKill);
	const copy = LIST_COPY[project.medium];
	const cap = shipCap(project);
	const count = liveLines(project.ship).length;
	const over = cap !== null && count >= cap;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 border-t border-line pt-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListEditor, {
				title: copy.ship,
				help: copy.shipHelp,
				warn: over ? "You are at the cap. Add only if you park something else." : void 0,
				items: project.ship,
				actionLabel: "Park",
				onAdd: (text) => addLine(project.id, "ship", text),
				onChange: (lineId, text) => updateLine(project.id, "ship", lineId, text),
				onRemove: (lineId) => removeLine(project.id, "ship", lineId),
				onMove: (lineId) => moveLine(project.id, "ship", lineId)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListEditor, {
				title: copy.dream,
				help: copy.dreamHelp,
				items: project.dream,
				actionLabel: "Promote",
				quiet: true,
				onAdd: (text) => addLine(project.id, "dream", text),
				onChange: (lineId, text) => updateLine(project.id, "dream", lineId, text),
				onRemove: (lineId) => removeLine(project.id, "dream", lineId),
				onMove: (lineId) => moveLine(project.id, "dream", lineId)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KillEditor, {
				items: project.kills,
				onAdd: (what, why) => addKill(project.id, what, why),
				onChange: (killId, patch) => updateKill(project.id, killId, patch),
				onRemove: (killId) => removeKill(project.id, killId)
			})
		]
	});
}
function ListEditor({ title, help, warn, items, actionLabel, quiet, onAdd, onChange, onRemove, onMove }) {
	const [text, setText] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn(quiet && "bg-paper-2 px-4 py-4"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-2xl",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-pretty text-muted",
				children: help
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-3",
				children: items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "border-b border-line pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-3 w-6 shrink-0 text-sm tabular-nums text-muted",
							children: index + 1
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: item.text,
							onChange: (event) => onChange(item.id, event.target.value),
							"aria-label": `${title} item ${index + 1}`,
							className: "min-h-11 min-w-0 w-full rounded-md border border-line bg-card px-3 text-base text-ink"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex gap-2 pl-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => onMove(item.id),
							className: "min-h-11 rounded-md border border-line px-3 text-sm hover:border-ink",
							children: actionLabel
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => onRemove(item.id),
							"aria-label": `Remove ${item.text || "item"}`,
							className: "min-h-11 rounded-md px-3 text-sm text-muted hover:text-ink",
							children: "Remove"
						})]
					})]
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-3 flex flex-col gap-2 sm:flex-row",
				onSubmit: (event) => {
					event.preventDefault();
					const next = text.trim();
					if (!next) return;
					onAdd(next);
					setText("");
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: text,
					onChange: (event) => setText(event.target.value),
					placeholder: "Add one concrete thing",
					"aria-label": `Add to ${title}`,
					className: "min-h-11 w-full rounded-md border border-line bg-card px-3 text-base placeholder:text-muted"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "min-h-11 shrink-0 rounded-md bg-ink px-4 text-base font-medium text-paper",
					children: "Add"
				})]
			}),
			warn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-wax-deep",
				children: warn
			}) : null
		]
	});
}
function KillEditor({ items, onAdd, onChange, onRemove }) {
	const [what, setWhat] = (0, import_react.useState)("");
	const [why, setWhy] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-display text-2xl",
			children: "Cuts"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-pretty text-muted",
			children: "A cut without a reason comes back. Write why the plan is better without it."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 space-y-3",
			children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "border border-line bg-card p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold tracking-widest text-wax-deep",
							children: "CUT"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => onRemove(item.id),
							className: "min-h-11 text-sm text-muted hover:text-ink",
							children: "Remove"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: item.what,
						onChange: (event) => onChange(item.id, { what: event.target.value }),
						"aria-label": "What was cut",
						className: "mt-1 w-full bg-transparent text-base font-medium text-ink"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: item.why,
						onChange: (event) => onChange(item.id, { why: event.target.value }),
						"aria-label": "Why it was cut",
						className: "mt-1 w-full bg-transparent text-sm text-muted"
					})
				]
			}, item.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-3 space-y-2",
			onSubmit: (event) => {
				event.preventDefault();
				if (!what.trim() || !why.trim()) return;
				onAdd(what.trim(), why.trim());
				setWhat("");
				setWhy("");
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: what,
					onChange: (event) => setWhat(event.target.value),
					placeholder: "What are you refusing?",
					"aria-label": "Cut",
					className: "min-h-11 w-full rounded-md border border-line bg-card px-3 text-base placeholder:text-muted"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: why,
					onChange: (event) => setWhy(event.target.value),
					placeholder: "Why is the plan better without it?",
					"aria-label": "Reason for the cut",
					className: "min-h-11 w-full rounded-md border border-line bg-card px-3 text-base placeholder:text-muted"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "min-h-11 rounded-md border border-ink px-4 text-base font-medium",
					children: "Record the cut"
				})
			]
		})
	] });
}
function DeskView({ projectId }) {
	const project = useDesk((state) => state.projects.find((item) => item.id === projectId));
	const setTitle = useDesk((state) => state.setTitle);
	const setStage = useDesk((state) => state.setStage);
	const setAnswer = useDesk((state) => state.setAnswer);
	const duplicate = useDesk((state) => state.duplicate);
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("desk");
	const [gapsOpen, setGapsOpen] = (0, import_react.useState)(false);
	const [scopeOpen, setScopeOpen] = (0, import_react.useState)(false);
	if (!project) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-xl px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl text-balance",
				children: "This idea isn't on this device."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-pretty text-muted",
				children: "Plans stay in the browser where you wrote them."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-6 inline-flex min-h-11 items-center font-medium",
				children: "Back to the desk"
			})
		]
	});
	const stage = stageById(project.medium, project.stage || "spark");
	const issues = findings(project);
	const blocks = issues.filter((issue) => issue.level === "block");
	const warns = issues.filter((issue) => issue.level === "warn");
	const started = planStarted(project);
	const reminder = reminderFor(project.medium, stage.id);
	const band = optionLabel(project.medium, "sizeBand", project.answers.sizeBand);
	const hours = optionLabel(project.medium, "weeklyHours", project.answers.weeklyHours);
	function openStage(id) {
		setStage(project.id, id);
		setMode("desk");
		setGapsOpen(false);
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		window.scrollTo({
			top: 0,
			behavior: reduce ? "auto" : "smooth"
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen border-t-4 border-ink pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "no-print border-b border-line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "min-h-11 inline-flex items-center text-sm font-medium",
							children: "All ideas"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-semibold tracking-widest text-wax-deep",
							children: project.medium === "game" ? "GAME" : "BOOK"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									const id = duplicate(project.id);
									if (id) navigate({
										to: "/p/$id",
										params: { id }
									});
								},
								className: "min-h-11 px-3 text-sm text-muted hover:text-ink",
								children: "Make a copy"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex rounded-md border border-line",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-pressed": mode === "desk",
									onClick: () => setMode("desk"),
									className: cn("min-h-11 px-3 text-sm", mode === "desk" ? "bg-ink text-paper" : "text-ink"),
									children: "Desk"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-pressed": mode === "brief",
									onClick: () => setMode("brief"),
									className: cn("min-h-11 px-3 text-sm", mode === "brief" ? "bg-ink text-paper" : "text-ink"),
									children: "Brief"
								})]
							})]
						})
					]
				})
			}),
			mode === "brief" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BriefView, { project }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "no-print border-b border-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: band || "No band yet" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: hours || "No hours yet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScopeMeter, {
							project,
							compact: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setGapsOpen((open) => !open),
							className: cn("min-h-11 font-medium", blocks.length ? "text-wax-deep" : "text-ink"),
							"aria-expanded": gapsOpen,
							children: !started ? "Checks wait for an idea" : blocks.length ? `${blocks.length} blocking${warns.length ? ` · ${warns.length} to watch` : ""}` : warns.length ? `${warns.length} to watch` : "Plan is honest"
						})
					]
				}), gapsOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-6xl px-4 pb-4",
					children: !started ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-pretty text-muted",
						children: "Write the spark first. The gate starts once there is an idea to discipline."
					}) : issues.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-pretty",
						children: "Nothing is blocking the plan. That is not the same as finished — it means the work ahead is the roadmap, not another expansion."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "max-h-80 space-y-2 overflow-y-auto",
						children: issues.map((issue) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => openStage(issue.stage),
							className: "w-full rounded-md border border-line bg-card px-3 py-3 text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("text-xs font-semibold tracking-widest", issue.level === "block" ? "text-wax-deep" : "text-muted"),
									children: issue.level === "block" ? "BLOCK" : "WATCH"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block font-medium",
									children: issue.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-sm text-pretty text-muted",
									children: issue.detail
								})
							]
						}) }, issue.id))
					})
				}) : null]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl gap-8 px-4 py-6 lg:grid-cols-[13rem_minmax(0,1fr)_17rem] lg:py-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "no-print min-w-0 lg:sticky lg:top-4 lg:self-start",
						"aria-label": "Stages",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex min-w-0 gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible",
							children: STAGES[project.medium].map((item) => {
								const fill = stageFill(project, item.id);
								const active = item.id === stage.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									"aria-current": active ? "step" : void 0,
									onClick: () => openStage(item.id),
									className: cn("flex min-h-11 shrink-0 items-center gap-2 rounded-md px-3 text-left text-sm lg:w-full", active ? "bg-ink text-paper" : "hover:bg-paper-2"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("size-1.5 shrink-0 rounded-full", fill === "ready" && (active ? "bg-paper" : "bg-ink"), fill === "partial" && "bg-wax", (fill === "empty" || fill === "neutral") && (active ? "bg-line" : "bg-line")),
											"aria-hidden": true
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "tabular-nums opacity-70",
											children: item.numeral
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })
									]
								}, item.id);
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold tracking-widest text-muted",
									children: "WORKING TITLE"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: project.title,
									onChange: (event) => setTitle(project.id, event.target.value),
									"aria-label": "Working title",
									className: "mt-1 w-full border-0 bg-transparent px-0 font-display text-3xl leading-tight text-ink sm:text-4xl"
								})]
							}),
							project.example ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 border border-line bg-paper-2 px-4 py-3 text-sm text-pretty",
								children: "Worked example. Edit it to see the gate move, or make a copy and replace the sentences with yours."
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-6 text-xs font-semibold tracking-widest text-wax-deep",
								children: [
									stage.numeral,
									" — ",
									stage.label.toUpperCase()
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-2 font-display text-3xl text-balance",
								children: stage.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-xl text-pretty text-muted",
								children: stage.guide
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
								className: "mt-5 border-l-2 border-wax bg-wax-soft px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold tracking-widest text-wax-deep",
									children: "RULE"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-pretty",
									children: stage.rule
								})]
							}),
							stage.id === "market" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 font-display text-xl italic text-balance",
								children: MARKET_LINE[project.medium]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 space-y-8",
								children: stage.fields.filter((field) => !field.show || field.show(project.answers)).map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldBlock, {
									project,
									fieldId: field.id,
									label: field.label,
									help: field.help,
									placeholder: field.placeholder,
									kind: field.kind,
									options: field.options,
									value: project.answers[field.id] ?? "",
									onChange: (value) => setAnswer(project.id, field.id, value)
								}, field.id))
							}),
							stage.id === "scale" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScopeLists, { project })
							}) : null,
							stage.id === "market" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketList, { project }) : null,
							stage.id === "roadmap" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Roadmap, { project })
							}) : null,
							stage.id === "reminders" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								className: "mt-8",
								children: REMINDERS[project.medium].map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "border-t border-line py-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs tabular-nums text-muted",
											children: String(index + 1).padStart(2, "0")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "mt-1 font-display text-xl",
											children: item.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 max-w-xl text-pretty text-muted",
											children: item.body
										})
									]
								}, item.id))
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "no-print min-w-0 space-y-4 lg:sticky lg:top-4 lg:self-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border border-line bg-card p-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScopeMeter, { project })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-l-2 border-ink px-4 py-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold tracking-widest text-muted",
									children: "REMEMBER"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 font-display text-lg text-balance",
									children: reminder.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-pretty text-muted",
									children: reminder.body
								}),
								stage.id !== "reminders" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => openStage("reminders"),
									className: "mt-3 min-h-11 text-sm font-medium text-wax-deep",
									children: "All reminders"
								}) : null
							]
						})]
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "no-print fixed inset-x-0 bottom-0 z-20 border-t border-line bg-paper",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "hidden text-sm text-muted sm:block",
						children: "Adding a feature, a country, a system?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setScopeOpen(true),
						className: "min-h-11 rounded-md bg-wax-deep px-4 font-semibold text-wax-ink sm:ml-auto",
						children: "Before you add scope"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScopeDialog, {
				project,
				open: scopeOpen,
				onClose: () => setScopeOpen(false)
			})
		]
	});
}
function FieldBlock({ project, fieldId, label, help, placeholder, kind, options, value, onChange }) {
	const inputId = `${project.id}-${fieldId}`;
	const pace = fieldId === "sizeBand" ? paceNote(project) : null;
	const length = fieldId === "wordTarget" ? lengthVerdict(project) : null;
	const must = fieldId === "price" ? priceMust(value) : "";
	const pillarCount = fieldId === "pillars" ? linesOf(value).length : 0;
	const hookWords = fieldId === "eightWords" ? wordCount(value) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		kind === "choice" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				id: `${inputId}-label`,
				className: "font-medium",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				id: `${inputId}-help`,
				className: "mt-1 text-sm text-pretty text-muted",
				children: help
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "radiogroup",
				"aria-labelledby": `${inputId}-label`,
				className: cn("mt-3 grid gap-2", fieldId === "emotion" && "sm:grid-cols-2"),
				children: options?.map((option) => {
					const selected = value === option.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						role: "radio",
						"aria-checked": selected,
						onClick: () => onChange(option.id),
						className: cn("min-h-11 rounded-md border px-3 py-3 text-left", selected ? "border-ink bg-ink text-paper" : "border-line bg-card hover:border-ink"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-medium",
							children: option.label
						}), option.detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("mt-1 block text-sm text-pretty", selected ? "text-wax-ink" : "text-muted"),
							children: option.detail
						}) : null]
					}, option.id);
				})
			})
		] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			htmlFor: inputId,
			className: "block",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 block text-sm text-pretty text-muted",
					children: help
				}),
				kind === "long" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					id: inputId,
					value,
					placeholder,
					onChange: (event) => onChange(event.target.value),
					rows: 5,
					className: "mt-3 w-full resize-y rounded-md border border-line bg-card px-3 py-3 text-base text-ink placeholder:text-muted"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: inputId,
					value,
					placeholder,
					inputMode: fieldId === "wordTarget" ? "numeric" : void 0,
					onChange: (event) => onChange(event.target.value),
					className: "mt-3 min-h-11 w-full rounded-md border border-line bg-card px-3 text-base text-ink placeholder:text-muted"
				})
			]
		}),
		fieldId === "eightWords" && hookWords > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: cn("mt-2 text-sm tabular-nums", hookWords > 8 ? "text-wax-deep" : "text-muted"),
			children: [hookWords, " / 8 words"]
		}) : null,
		fieldId === "pillars" && pillarCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: cn("mt-2 text-sm", pillarCount === 3 ? "text-muted" : "text-wax-deep"),
			children: [
				pillarCount,
				" / 3 pillars",
				pillarCount > 3 ? ". They stop cutting features above three." : ""
			]
		}) : null,
		pace ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: cn("mt-3 text-sm text-pretty", pace.problem ? "text-wax-deep" : "text-muted"),
			children: pace.text
		}) : null,
		length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: cn("mt-2 text-sm text-pretty", length.level === "ok" ? "text-muted" : "text-wax-deep"),
			children: length.text
		}) : null,
		must ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 text-sm text-pretty text-ink",
			children: ["You owe: ", must]
		}) : null
	] });
}
function MarketList({ project }) {
	const items = marketableItems(project);
	const ready = items.filter((item) => item.ok).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-10 border-t border-line pt-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: "Sellable when"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-pretty text-muted",
				children: [
					ready,
					" of ",
					items.length,
					". This is the end result, not a vibe. Unchecked lines are still scope or still missing."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex min-h-11 items-start gap-3 border-t border-line py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("mt-1 size-2.5 shrink-0 rounded-full", item.ok ? "bg-ink" : "bg-wax"),
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn(item.ok ? "text-ink" : "text-muted"),
						children: item.label
					})]
				}, item.id))
			})
		]
	});
}
function ProjectPage() {
	const { id } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskView, { projectId: id });
}
//#endregion
export { ProjectPage as component };
