import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, _ as createFileRoute, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, v as createRootRoute, x as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DRDdpARV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var DAY = 864e5;
var now = 1762e9;
function gameTasks() {
	return Object.fromEntries([
		"lock:sentence",
		"lock:band",
		"lock:pillars",
		"lock:park",
		"lock:cuts",
		"verb:greybox",
		"verb:ten"
	].map((key) => [key, true]));
}
function bookTasks() {
	return Object.fromEntries([
		"lock:premise",
		"lock:end",
		"lock:size",
		"lock:alone",
		"lock:comps",
		"spine:beats"
	].map((key) => [key, true]));
}
function exampleProjects() {
	return [{
		id: "example-ash-courier",
		medium: "game",
		title: "Ash Courier",
		createdAt: now - 40 * DAY,
		updatedAt: now - 2 * DAY,
		example: true,
		stage: "scale",
		answers: {
			pitch: "A night courier threads a city that exists only between eleven and dawn, choosing routes while the streets try to forget them.",
			image: "A bicycle under one working streetlamp. The next block is a different year, and the parcel is getting lighter.",
			itch: "I wanted the route itself to be the story. The games I love turn the journey into a menu between the real systems.",
			fantasy: "Be a small, competent worker in a place that keeps rewriting the job.",
			emotion: "defiance",
			eightWords: "Deliver the dawn before the city forgets you",
			notThis: "Not an open-world RPG. Not a faction simulator. Not a crafting game. Not multiplayer. Not a forty-hour campaign.",
			comps: "Night in the Woods — the town as a character — refuse the hanging-out structure.\nDeath Stranding — the route as drama — refuse the scale and the gear encyclopedia.\nUnpacking — intimate labor as story — refuse pure quiet; this one has pursuit.",
			weeklyHours: "h10",
			sizeBand: "solo",
			horizon: "Vertical slice in 12 weeks. Release candidate in 9 months.",
			honestWhy: "I have evenings and no one else. The five-district version is a second game. This one has to prove I can ship a finished thing.",
			pillars: "The route is the puzzle\nThe city is unstable, not huge\nYou are a worker, not a chosen one",
			verb: "Read the street, pick a turn, time the delivery, escape when the block starts to forget you.",
			session: "Three stops, one street that was not there yesterday, and a dawn you barely make.",
			failure: "Miss the dawn and the district forgets the delivery. You keep what you learned about the route.",
			tone: "The quiet labor of Unpacking. The civic melancholy of Night in the Woods.",
			loopLayers: "Moment: choose a street and commit.\nMinute: complete or lose a delivery.\nSession: change the district and reach dawn.\nReturn: tomorrow's streets are not these streets.",
			slice: "One district, three deliveries, finished bike and lamplight, one collapse, a dawn ending. No other regions exist in this build.",
			onboarding: "They are already on the bike. The first delivery is the tutorial. The street tells them when they are late. No menu essay.",
			audience: "Players who finish small narrative indies and atmospheric stealth, and who will pay for a short game if the trailer is unmistakable.",
			price: "indie",
			platform: "Steam, with an itch demo of the slice.",
			refundTest: "At twelve dollars the district is still changing and the third delivery has not opened. A two-hour player has not seen the dawn ending.",
			storeProof: "Capsule: bike, one lamp, a street that ends in fog. The trailer opens on a turn that saves the parcel. The first minute is the first delivery.",
			whyCompsSold: "They were legible in one image and they finished. None of them asked for five systems before the fantasy arrived."
		},
		ship: [
			{
				id: "s1",
				text: "A bicycle with weight, not a skate"
			},
			{
				id: "s2",
				text: "One hand-authored district that changes overnight"
			},
			{
				id: "s3",
				text: "Three delivery types: fragile, timed, forbidden"
			},
			{
				id: "s4",
				text: "One pursuer, and no combat"
			},
			{
				id: "s5",
				text: "Radio story, not dialogue trees"
			},
			{
				id: "s6",
				text: "A dawn ending"
			}
		],
		dream: [
			{
				id: "d1",
				text: "Five districts and a city map"
			},
			{
				id: "d2",
				text: "Faction reputation"
			},
			{
				id: "d3",
				text: "Crafted bike parts"
			},
			{
				id: "d4",
				text: "Co-op courier"
			},
			{
				id: "d5",
				text: "A forty-hour branching campaign"
			},
			{
				id: "d6",
				text: "An apartment to decorate"
			}
		],
		kills: [
			{
				id: "k1",
				what: "Crafting",
				why: "It never changes the route decision, which is the whole game."
			},
			{
				id: "k2",
				what: "Multiplayer",
				why: "It doubles production and is not the fantasy of a lone shift."
			},
			{
				id: "k3",
				what: "Dialogue trees",
				why: "The story is the route and the radio. Choices belong to the street."
			},
			{
				id: "k4",
				what: "A combat system",
				why: "You escape. Fighting is a different game wearing this coat."
			},
			{
				id: "k5",
				what: "A procedural city",
				why: "Hand-built instability is the point. Random streets would only be big."
			}
		],
		tasks: gameTasks(),
		phaseNotes: { lock: "Locked the solo band after I tried to sneak co-op back onto the ship list. It stayed parked." }
	}, {
		id: "example-second-mouth",
		medium: "book",
		title: "The Second Mouth",
		createdAt: now - 20 * DAY,
		updatedAt: 17619136e5,
		example: true,
		stage: "spine",
		answers: {
			image: "A house grows a mouth in the cellar wall. It will only tell the truth about the family if the archivist lets it edit her.",
			itch: "Gothic houses that are actually about appetite and records, at a length I can finish, with one narrator.",
			aftertaste: "The relief and grief of choosing a smaller, truer story than the one you were hired to keep.",
			premise: "When the house grows a second mouth, archivist Inez must feed it the family papers or lose the only record of who she is — but the mouth is rewriting her as she feeds it.",
			want: "Preserve a true record of her family.",
			need: "Stop defining herself as the family's archivist.",
			logline: "Inez is the last person who knows which papers are true. The house will keep her that way only if she lets it edit her.",
			notThis: "Not a trilogy. Not six points of view. Not a constructed language. Not a romance subplot.",
			comps: "Mexican Gothic — the house as appetite — refuse the larger cast and the expedition.\nOur Wives Under the Sea — intimacy and dread — refuse a second timeline.\nWhat Feasts at Night — the novella as the whole product — refuse the cozy tone.",
			weeklyHours: "h10",
			sizeBand: "novella",
			wordTarget: "32000",
			seriesStance: "standalone",
			horizon: "Ugly full draft in 16 weeks. A version someone else can read in 9 months.",
			honestWhy: "I have never finished a book. A novella is the largest thing I can hold through a revision without inventing a second plot to avoid the ending.",
			about: "Keeping the record can be how you refuse to have a life.",
			pov: "First person, past tense, one narrator. No exceptions in this draft.",
			protagonist: "Inez can date a paper by touch. She has not introduced herself without the family name in years. She is already sorting the cellar when the mouth speaks.",
			opposition: "The mouth wants a cleaner story than the one that happened. Her brother wants the papers burned so the family can finally be ordinary.",
			tone: "The domestic dread of Our Wives Under the Sea. The house-logic of Mexican Gothic, without the expedition.",
			ending: "She burns the last true page to starve the mouth, and writes a new first line that is only hers. The house stays. The record does not. She loses the want and pays the need.",
			beats: "1. She finds the mouth while filing her mother's letters.\n2. Feeding it restores a page she had forgotten, and she wants more.\n3. Her brother arrives to burn the archive and offers her a life with no name to keep.\n4. She hides the truest papers and feeds the mouth lies.\n5. The lies start appearing in her own memory.\n6. She tries to stop, and the house withholds the one fact she cannot live without.\n7. She chooses a final feeding that will either save the record or save her.\n8. She burns the last true page. The mouth goes quiet. She writes a sentence that was never in the archive.",
			subplots: "The brother — he offers the ordinary life she needs, and the destruction of the want.\nThe house rules — every feeding makes the want easier and the self thinner.",
			openingJob: "By the end of the first chapter the mouth has eaten one true page and she has chosen to bring it another.",
			chapterJob: "Change what she is willing to feed it, or change what she can still remember.",
			shelf: "horror",
			audience: "Readers who finish slim gothic and literary horror and want dread with a complete ending, not a doorway into book two.",
			path: "self",
			package: "Developmental edit, line edit, proof. A cover that signals a gothic novella, not an epic. A blurb of the problem. Categories and keywords. A sample that reaches the second feeding.",
			hookTest: "She has fed the mouth once, watched a memory change, and decided to go back downstairs. The want is already in danger before the brother arrives."
		},
		ship: [
			{
				id: "s1",
				text: "Inez and the mouth"
			},
			{
				id: "s2",
				text: "The brother, who wants the record destroyed"
			},
			{
				id: "s3",
				text: "The house's rules, learned only by feeding"
			}
		],
		dream: [
			{
				id: "d1",
				text: "A city-wide archive conspiracy"
			},
			{
				id: "d2",
				text: "A second house on another coast"
			},
			{
				id: "d3",
				text: "Six points of view across centuries"
			},
			{
				id: "d4",
				text: "A constructed family language, with a glossary"
			},
			{
				id: "d5",
				text: "Books two through seven"
			}
		],
		kills: [
			{
				id: "k1",
				what: "A glossary of the old language",
				why: "If it needs a glossary, it is not this novella."
			},
			{
				id: "k2",
				what: "Flashback chapters",
				why: "The past arrives as paper she feeds, not as scenes we leave the house to live in."
			},
			{
				id: "k3",
				what: "A romance",
				why: "It would soften the ending and steal pages from the mouth."
			},
			{
				id: "k4",
				what: "The brother as a second POV",
				why: "He works as pressure she cannot fully see. His chapters would explain him too soon."
			}
		],
		tasks: bookTasks(),
		phaseNotes: { lock: "The cosmology is on the dream list. I am not allowed to open it during the draft." }
	}];
}
function uid() {
	return crypto.randomUUID();
}
function normalize(project) {
	return {
		...project,
		stage: project.stage || "spark",
		answers: project.answers ?? {},
		ship: project.ship ?? [],
		dream: project.dream ?? [],
		kills: project.kills ?? [],
		tasks: project.tasks ?? {},
		phaseNotes: project.phaseNotes ?? {}
	};
}
function mapProject(projects, id, fn) {
	return projects.map((project) => project.id === id ? {
		...fn(project),
		updatedAt: Date.now()
	} : project);
}
var useDesk = create()(persist((set, get) => ({
	seeded: false,
	projects: [],
	afterLoad: () => {
		set((state) => {
			const projects = state.projects.map(normalize);
			if (state.seeded) return { projects };
			return {
				seeded: true,
				projects: [...exampleProjects(), ...projects]
			};
		});
	},
	create: (medium) => {
		const id = uid();
		const now = Date.now();
		const project = {
			id,
			medium,
			title: medium === "game" ? "Untitled game" : "Untitled book",
			createdAt: now,
			updatedAt: now,
			stage: "spark",
			answers: {},
			ship: [],
			dream: [],
			kills: [],
			tasks: {},
			phaseNotes: {}
		};
		set((state) => ({ projects: [project, ...state.projects] }));
		return id;
	},
	duplicate: (id) => {
		const source = get().projects.find((project) => project.id === id);
		if (!source) return null;
		const copy = structuredClone(source);
		const now = Date.now();
		copy.id = uid();
		copy.example = false;
		copy.title = `Copy of ${source.title}`;
		copy.createdAt = now;
		copy.updatedAt = now;
		set((state) => ({ projects: [copy, ...state.projects] }));
		return copy.id;
	},
	remove: (id) => set((state) => ({ projects: state.projects.filter((project) => project.id !== id) })),
	setTitle: (id, title) => set((state) => ({ projects: mapProject(state.projects, id, (project) => ({
		...project,
		title
	})) })),
	setStage: (id, stage) => set((state) => ({ projects: mapProject(state.projects, id, (project) => ({
		...project,
		stage
	})) })),
	setAnswer: (id, key, value) => set((state) => ({ projects: mapProject(state.projects, id, (project) => ({
		...project,
		answers: {
			...project.answers,
			[key]: value
		}
	})) })),
	addLine: (id, key, text) => {
		const line = {
			id: uid(),
			text
		};
		set((state) => ({ projects: mapProject(state.projects, id, (project) => ({
			...project,
			[key]: [...project[key], line]
		})) }));
	},
	updateLine: (id, key, lineId, text) => set((state) => ({ projects: mapProject(state.projects, id, (project) => ({
		...project,
		[key]: project[key].map((line) => line.id === lineId ? {
			...line,
			text
		} : line)
	})) })),
	removeLine: (id, key, lineId) => set((state) => ({ projects: mapProject(state.projects, id, (project) => ({
		...project,
		[key]: project[key].filter((line) => line.id !== lineId)
	})) })),
	moveLine: (id, from, lineId) => set((state) => ({ projects: mapProject(state.projects, id, (project) => {
		const line = project[from].find((item) => item.id === lineId);
		if (!line) return project;
		const to = from === "ship" ? "dream" : "ship";
		return {
			...project,
			[from]: project[from].filter((item) => item.id !== lineId),
			[to]: [...project[to], line]
		};
	}) })),
	addKill: (id, what, why) => {
		const kill = {
			id: uid(),
			what,
			why
		};
		set((state) => ({ projects: mapProject(state.projects, id, (project) => ({
			...project,
			kills: [...project.kills, kill]
		})) }));
	},
	updateKill: (id, killId, patch) => set((state) => ({ projects: mapProject(state.projects, id, (project) => ({
		...project,
		kills: project.kills.map((kill) => kill.id === killId ? {
			...kill,
			...patch
		} : kill)
	})) })),
	removeKill: (id, killId) => set((state) => ({ projects: mapProject(state.projects, id, (project) => ({
		...project,
		kills: project.kills.filter((kill) => kill.id !== killId)
	})) })),
	toggleTask: (id, key) => set((state) => ({ projects: mapProject(state.projects, id, (project) => ({
		...project,
		tasks: {
			...project.tasks,
			[key]: !project.tasks[key]
		}
	})) })),
	setPhaseNote: (id, phaseId, note) => set((state) => ({ projects: mapProject(state.projects, id, (project) => ({
		...project,
		phaseNotes: {
			...project.phaseNotes,
			[phaseId]: note
		}
	})) }))
}), {
	name: "scopewright.v1",
	skipHydration: true
}));
function useDeskReady() {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let live = true;
		(async () => {
			await useDesk.persist.rehydrate();
			useDesk.getState().afterLoad();
			if (live) setReady(true);
		})();
		return () => {
			live = false;
		};
	}, []);
	return ready;
}
var styles_default = "/assets/styles-Bwm9hAcE.css";
var APP_NAME = "Scopewright";
var Route$2 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "A production desk that turns game and book ideas into scoped, marketable plans."
			},
			{
				name: "theme-color",
				content: "#f3eee6"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: RootComponent
});
function RootComponent() {
	const ready = useDeskReady();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-screen border-t-4 border-ink bg-paper px-4 py-16 text-ink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-widest",
					children: "SCOPEWRIGHT"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-display text-4xl",
					children: "Opening the desk."
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$1 = () => import("./routes-CMX7ElRt.mjs");
var Route$1 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./p._id-DLANfkGl.mjs");
var Route = createFileRoute("/p/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$1.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$2
	}),
	PIdRoute: Route.update({
		id: "/p/$id",
		path: "/p/$id",
		getParentRoute: () => Route$2
	})
};
var routeTree = Route$2._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { Route as n, useDesk as r, router_exports as t };
