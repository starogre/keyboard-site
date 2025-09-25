import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

function slugify(input) {
  return (input || "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const rawPages = [
  {
    id: "about",
    label: "About",
    tagline: "Meet the person behind the pixels.",
    sections: [
      {
        id: "snapshot",
        title: "Snapshot",
        body: [
          "I'm a front-end engineer who loves pairing deliberate design with reliable code.",
          "I focus on crafting inclusive interfaces, optimizing performance, and keeping teams in sync."
        ]
      },
      {
        id: "approach",
        title: "How I Work",
        body: [
          "My process starts with understanding the real user problem, validating assumptions, and prototyping early.",
          "I have a bias toward automation, prefer small pull requests, and document decisions to keep momentum high."
        ]
      },
      {
        id: "now",
        title: "Currently Exploring",
        body: [
          "Building design systems with stronger accessibility guarantees and experimenting with runtime type-safety in React apps."
        ]
      }
    ]
  },
  {
    id: "projects",
    label: "Projects",
    tagline: "A quick tour of things I've shipped recently.",
    sections: [
      {
        id: "featured",
        title: "Featured",
        body: [
          "Highlights of the work that pushed my craft forward the most."
        ],
        items: [
          {
            title: "Pulse",
            description: "Realtime dashboards that ingested telemetry from 50k+ devices with snappy interactions and graceful fallbacks.",
            link: "https://github.com/yourusername/pulse",
            media: [
              {
                id: "pulse-overview",
                type: "image",
                label: "Dashboard Overview",
                description: "Placeholder screenshot that shows the core KPIs and alerting states."
              },
              {
                id: "pulse-streams",
                type: "video",
                label: "Realtime Streams",
                description: "Looping demo clip placeholder for the live device stream view."
              },
              {
                id: "pulse-architecture",
                type: "diagram",
                label: "Architecture",
                description: "System architecture notes and data flow diagram placeholder."
              }
            ]
          },
          {
            title: "Atlas UI",
            description: "A component library built with accessibility-first primitives and exhaustive visual regression coverage.",
            link: "https://github.com/yourusername/atlas-ui",
            media: [
              {
                id: "atlas-foundations",
                type: "image",
                label: "Design Foundations",
                description: "Palette, typography, and spacing scales represented via placeholder panels."
              },
              {
                id: "atlas-components",
                type: "image",
                label: "Component Gallery",
                description: "Grid of common UI components with states and density modes."
              },
              {
                id: "atlas-testing",
                type: "article",
                label: "Testing Workflow",
                description: "Outline of visual regression and interaction testing strategy."
              }
            ]
          }
        ]
      },
      {
        id: "oss",
        title: "Open Source",
        body: [
          "Contributions that keep me invested in the community and new tooling."
        ],
        items: [
          {
            title: "Tailwind Plugins",
            description: "Published utilities for fluid typography scales and logical property shorthands.",
            media: [
              {
                id: "tailwind-fluid",
                type: "code",
                label: "Fluid Typography",
                description: "Snippet placeholder showing responsive clamp() utilities."
              },
              {
                id: "tailwind-logical",
                type: "code",
                label: "Logical Properties",
                description: "Example usage of margin-inline and padding-block helpers."
              },
              {
                id: "tailwind-docs",
                type: "article",
                label: "Documentation Site",
                description: "Mini doc site layout placeholder with usage examples."
              }
            ]
          },
          {
            title: "Testing Recipes",
            description: "Curated examples showing how to blend Vitest, React Testing Library, and Playwright for resilient coverage.",
            media: [
              {
                id: "testing-vitest",
                type: "code",
                label: "Vitest Suites",
                description: "Placeholder snippet outlining unit test patterns."
              },
              {
                id: "testing-playwright",
                type: "video",
                label: "Playwright Run",
                description: "Placeholder timeline of an end-to-end test run."
              },
              {
                id: "testing-reports",
                type: "image",
                label: "Coverage Dashboard",
                description: "Mocked dashboard for coverage deltas after each pipeline run."
              }
            ]
          }
        ]
      },
      {
        id: "experiments",
        title: "In Progress",
        body: [
          "Smaller prototypes that test new frameworks, animation systems, or data sources."
        ],
        items: [
          {
            title: "Tracksmith",
            description: "A personal trainer for focus blocks that blends browser APIs and haptic feedback.",
            media: [
              {
                id: "tracksmith-schedule",
                type: "image",
                label: "Session Planner",
                description: "Placeholder calendar view showing focus and rest intervals."
              },
              {
                id: "tracksmith-loop",
                type: "video",
                label: "Focus Loop",
                description: "Animated prototype placeholder for the countdown and nudge cycle."
              },
              {
                id: "tracksmith-retro",
                type: "article",
                label: "Retrospective",
                description: "Notes on what experiments worked and what needs iteration."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "experience",
    label: "Experience",
    tagline: "Where I've learned, led, and shipped.",
    sections: [
      {
        id: "current-role",
        title: "Current Role",
        body: [
          "Senior Front-end Engineer at Brightlayer, guiding a pod focused on design systems and developer tooling.",
          "Shipped a unified component library adopted across five product lines in under six months."
        ]
      },
      {
        id: "past-roles",
        title: "Past Highlights",
        body: [
          "Scaled an analytics suite for a healthcare platform, cutting load times by 42% while reducing bundle size by 35%.",
          "Led the front-end rewrite for an ed-tech marketplace, bringing lighthouse accessibility scores from 68 to 96."
        ]
      },
      {
        id: "skills",
        title: "Toolbox",
        body: [
          "Daily drivers include TypeScript, React, Vite, Tailwind CSS, Node.js, and testing stacks like Vitest, Playwright, and Cypress.",
          "Comfortable pairing with designers, writing docs for distribution, and advocating pragmatic standards."
        ]
      }
    ]
  },
  {
    id: "contact",
    label: "Contact",
    tagline: "Ways to connect and collaborate.",
    sections: [
      {
        id: "collaboration",
        title: "Collaboration",
        body: [
          "Open to product teams that value thoughtful UX, clean architecture, and tight feedback loops.",
          "Happy to chat about contract engagements, speaking opportunities, or mentoring partnerships."
        ]
      },
      {
        id: "process",
        title: "Working Style",
        body: [
          "I prefer async-first communication, crisp agendas, and documenting decisions so context never gets lost.",
          "Expect frequent demos, transparent metrics, and a focus on shipping learning loops instead of big-bang releases."
        ]
      },
      {
        id: "next-steps",
        title: "Next Steps",
        body: [
          "Drop a note at you@example.com with the problem you're solving, timelines, and the stack in play.",
          "You can also follow along on GitHub for fresh experiments and project updates."
        ]
      }
    ]
  }
];

const pages = rawPages.map((page) => ({
  ...page,
  sections: page.sections.map((section) => ({
    ...section,
    items: section.items
      ? section.items.map((item) => ({
          ...item,
          slug: item.slug ?? slugify(item.title)
        }))
      : undefined
  }))
}));

const defaultPageId = pages[0].id;
const defaultSectionId = pages[0].sections[0]?.id ?? null;

function sectionDomId(pageId, sectionId) {
  return `${pageId}-${sectionId}`;
}

function itemDomId(pageId, sectionId, itemIndex) {
  return `${pageId}-${sectionId}-item-${itemIndex}`;
}

function detailSectionDomId(projectSlug, mediaId) {
  return `project-${projectSlug}-${mediaId}`;
}

function Keycap({ children }) {
  return (
    <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded border border-gray-300 bg-white px-1 text-[11px] font-semibold leading-none text-gray-700 shadow-sm">
      {children}
    </span>
  );
}

function ensureMedia(item, fallbackSlug) {
  const baseSlug = fallbackSlug ?? slugify(item?.title ?? "project");
  const source = Array.isArray(item?.media) && item.media.length > 0 ? item.media : [
    {
      type: "image",
      label: "Project Overview",
      description: "Placeholder section summarising the project at a glance."
    },
    {
      type: "article",
      label: "Implementation Notes",
      description: "High-level notes, metrics, and next steps for the work."
    },
    {
      type: "video",
      label: "Demo Walkthrough",
      description: "Imaginary walkthrough clip demonstrating the core interaction."
    }
  ];

  return source.map((entry, index) => {
    const label = entry.label ?? `Section ${index + 1}`;
    return {
      ...entry,
      label,
      type: entry.type ?? "note",
      description: entry.description ?? "Placeholder details for this section.",
      id: entry.id ?? `${baseSlug}-${slugify(label)}-${index}`
    };
  });
}

function buildHash(pageId, sectionId, projectSlug) {
  const params = new URLSearchParams();
  params.set("page", pageId);
  if (sectionId) {
    params.set("section", sectionId);
  }
  if (projectSlug) {
    params.set("project", projectSlug);
  }
  const value = params.toString();
  return value ? `#${value}` : "";
}

function parseHash(hash) {
  const trimmed = (hash || "").replace(/^#/, "");
  const params = new URLSearchParams(trimmed);
  return {
    pageId: params.get("page") || defaultPageId,
    sectionId: params.get("section") || defaultSectionId,
    projectSlug: params.get("project") || null
  };
}

function App() {
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [isExploringItems, setIsExploringItems] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [mobileHeadingHeight, setMobileHeadingHeight] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [projectDetail, setProjectDetail] = useState(null);
  const [activeContentIndex, setActiveContentIndex] = useState(0);
  const [projectActionMessage, setProjectActionMessage] = useState("");

  const mobileHeadingRef = useRef(null);
  const detailHeaderRef = useRef(null);
  const detailScrollRef = useRef(null);
  const syncingRef = useRef(false);

  const activePage = useMemo(() => pages[activePageIndex], [activePageIndex]);
  const activeSection = useMemo(
    () => activePage.sections[activeSectionIndex],
    [activePage, activeSectionIndex]
  );

  useEffect(() => {
    const applyRoute = () => {
    const { pageId, sectionId, projectSlug } = parseHash(window.location.hash);
    const pageIndex = Math.max(
      0,
      pages.findIndex((page) => page.id === pageId)
    );
    const page = pages[pageIndex];
    const sectionIndex = Math.max(
      0,
      page.sections.findIndex((section) => section.id === sectionId)
    );
    const section = page.sections[sectionIndex];

    syncingRef.current = true;
    setActivePageIndex(pageIndex);
    setActiveSectionIndex(sectionIndex);

    if (projectSlug && section?.items) {
      const itemIndex = section.items.findIndex((item) => item.slug === projectSlug);
      if (itemIndex >= 0) {
        const item = section.items[itemIndex];
        const media = ensureMedia(item, item.slug);
        setActiveItemIndex(itemIndex);
        setIsExploringItems(true);
        setProjectDetail({
          pageIndex,
          sectionIndex,
          itemIndex,
          slug: item.slug,
          item,
          media
        });
        setActiveContentIndex(0);
        setProjectActionMessage("");
      } else {
        setActiveItemIndex(0);
        setIsExploringItems(false);
        setProjectDetail(null);
      }
    } else {
      setActiveItemIndex(0);
      setIsExploringItems(false);
      setProjectDetail(null);
      setProjectActionMessage("");
    }

    window.setTimeout(() => {
      syncingRef.current = false;
    }, 0);
  };

    applyRoute();
    window.addEventListener("hashchange", applyRoute);
    return () => window.removeEventListener("hashchange", applyRoute);
  }, []);

  useEffect(() => {
    if (syncingRef.current) {
      return;
    }
    setActiveSectionIndex(0);
    setActiveItemIndex(0);
    setIsExploringItems(false);
  }, [activePageIndex]);

  useEffect(() => {
    if (syncingRef.current) {
      return;
    }
    setActiveItemIndex(0);
    setIsExploringItems(false);
  }, [activeSectionIndex]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const resolveHeaderHeight = () => {
      const headerElement = document.querySelector("[data-site-header]");
      setHeaderHeight(
        headerElement ? headerElement.getBoundingClientRect().height : 0
      );
    };

    resolveHeaderHeight();

    window.addEventListener("resize", resolveHeaderHeight);
    return () => window.removeEventListener("resize", resolveHeaderHeight);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const updateScreenSize = () => setIsLargeScreen(mediaQuery.matches);

    updateScreenSize();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateScreenSize);
      return () => mediaQuery.removeEventListener("change", updateScreenSize);
    }

    mediaQuery.addListener(updateScreenSize);
    return () => mediaQuery.removeListener(updateScreenSize);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || isLargeScreen) {
      setMobileHeadingHeight(0);
      return;
    }

    const updateHeadingHeight = () => {
      if (mobileHeadingRef.current) {
        setMobileHeadingHeight(
          mobileHeadingRef.current.getBoundingClientRect().height
        );
      }
    };

    updateHeadingHeight();

    window.addEventListener("resize", updateHeadingHeight);
    return () => window.removeEventListener("resize", updateHeadingHeight);
  }, [isLargeScreen, activePageIndex]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const original = document.body.style.overflow;
    if (projectDetail) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = original;
    }

    return () => {
      document.body.style.overflow = original;
    };
  }, [projectDetail]);

  useEffect(() => {
    if (!projectActionMessage) {
      return;
    }

    const timer = window.setTimeout(() => {
      setProjectActionMessage("");
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [projectActionMessage]);

  useEffect(() => {
    if (typeof window === "undefined" || projectDetail) {
      return;
    }

    const page = pages[activePageIndex];
    const section = page.sections[activeSectionIndex];
    if (!section) {
      return;
    }

    const sectionElement = document.getElementById(
      sectionDomId(page.id, section.id)
    );

    const hasItems = Array.isArray(section.items) && section.items.length > 0;
    const boundedItemIndex = hasItems
      ? Math.min(activeItemIndex, section.items.length - 1)
      : 0;
    const itemElement =
      isExploringItems && hasItems
        ? document.getElementById(
            itemDomId(page.id, section.id, boundedItemIndex)
          )
        : null;

    if (!sectionElement && !itemElement) {
      return;
    }

    const baseGap = isLargeScreen ? 24 : mobileHeadingHeight + 16;
    const itemGap = isLargeScreen ? 16 : mobileHeadingHeight + 12;

    if (!isExploringItems || !itemElement) {
      const offset = headerHeight + baseGap;
      const y = (sectionElement?.getBoundingClientRect().top || 0) + window.scrollY - offset;

      window.scrollTo({
        top: Math.max(0, y),
        behavior: "smooth"
      });
      return;
    }

    const rect = itemElement.getBoundingClientRect();
    const elementTop = window.scrollY + rect.top;
    const elementBottom = elementTop + rect.height;

    const safeTop = window.scrollY + headerHeight + itemGap;
    const safeBottom = window.scrollY + window.innerHeight - itemGap;

    if (elementTop < safeTop) {
      const target = elementTop - (headerHeight + itemGap);
      window.scrollTo({
        top: Math.max(0, target),
        behavior: "smooth"
      });
      return;
    }

    if (elementBottom > safeBottom) {
      const target = elementBottom - window.innerHeight + itemGap;
      window.scrollTo({
        top: Math.max(0, target),
        behavior: "smooth"
      });
    }
  }, [
    activePageIndex,
    activeSectionIndex,
    activeItemIndex,
    headerHeight,
    mobileHeadingHeight,
    isLargeScreen,
    isExploringItems,
    projectDetail
  ]);

  useEffect(() => {
    if (projectDetail) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [projectDetail]);

  useEffect(() => {
    if (!projectDetail) {
      setActiveContentIndex(0);
      setProjectActionMessage("");
      return;
    }

    const bounded = Math.max(
      0,
      Math.min(activeContentIndex, (projectDetail.media?.length || 1) - 1)
    );
    if (bounded !== activeContentIndex) {
      setActiveContentIndex(bounded);
    }
  }, [projectDetail, activeContentIndex]);

  useEffect(() => {
    if (!projectDetail || !projectDetail.media?.length) {
      return;
    }

    const container = detailScrollRef.current;
    if (!container) {
      return;
    }

    const media = projectDetail.media;
    const bounded = Math.max(
      0,
      Math.min(activeContentIndex, media.length - 1)
    );
    const sectionId = detailSectionDomId(
      projectDetail.slug,
      media[bounded].id
    );
    const element = document.getElementById(sectionId);
    if (!element) {
      return;
    }

    const header = detailHeaderRef.current;
    const headerOffset = (header?.getBoundingClientRect().height || 0) + 32;
    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    const elementTop = elementRect.top - containerRect.top + container.scrollTop;

    const target = Math.max(0, elementTop - headerOffset);
    container.scrollTo({ top: target, behavior: "smooth" });
  }, [projectDetail, activeContentIndex]);

  const updateHash = useCallback(() => {
    if (syncingRef.current) {
      return;
    }

    const page = pages[activePageIndex];
    const section = page.sections[activeSectionIndex];
    const projectSlug = projectDetail?.slug || null;
    const hash = buildHash(page.id, section?.id, projectSlug);

    if (window.location.hash !== hash) {
      syncingRef.current = true;
      window.history.replaceState(null, "", hash || "#");
      window.setTimeout(() => {
        syncingRef.current = false;
      }, 0);
    }
  }, [activePageIndex, activeSectionIndex, projectDetail]);

  useEffect(() => {
    updateHash();
  }, [updateHash]);

  const closeProjectDetail = useCallback(() => {
    if (!projectDetail) {
      return;
    }

    setProjectDetail(null);
    setProjectActionMessage("");
    setActiveContentIndex(0);
    setIsExploringItems(false);
  }, [projectDetail]);

  const openProjectDetail = useCallback(
    (pageIndex, sectionIndex, itemIndex) => {
      const page = pages[pageIndex];
      const section = page.sections[sectionIndex];
      const item = section?.items?.[itemIndex];
      if (!item) {
        return;
      }

      const media = ensureMedia(item, item.slug);
      if (activePageIndex !== pageIndex) {
        setActivePageIndex(pageIndex);
      }
      setActiveSectionIndex(sectionIndex);
      setActiveItemIndex(itemIndex);
      setIsExploringItems(true);
      setProjectDetail({
        pageIndex,
        sectionIndex,
        itemIndex,
        slug: item.slug,
        item,
        media
      });
      setActiveContentIndex(0);
      setProjectActionMessage("");
    },
    [activePageIndex]
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      if (!["w", "a", "s", "d", "e", "q"].includes(key)) {
        return;
      }

      const target = event.target;
      if (target instanceof HTMLElement) {
        const tag = target.tagName.toLowerCase();
        if (["input", "textarea", "select"].includes(tag) || target.isContentEditable) {
          return;
        }
      }

      event.preventDefault();

      if (projectDetail) {
        const media = projectDetail.media;

        if (key === "q") {
          closeProjectDetail();
          return;
        }

        if (key === "w") {
          setActiveContentIndex((prev) => Math.max(0, prev - 1));
          return;
        }

        if (key === "s") {
          setActiveContentIndex((prev) => {
            const maxIndex = media.length - 1;
            return Math.min(maxIndex, prev + 1);
          });
          return;
        }

        if (key === "e") {
          const current = media[Math.min(activeContentIndex, media.length - 1)];
          if (current) {
            setProjectActionMessage(`Opening “${current.label}” placeholder…`);
          }
        }

        return;
      }

      if (key === "q") {
        if (isExploringItems) {
          setIsExploringItems(false);
          return;
        }
        setActivePageIndex((prev) => Math.max(0, prev - 1));
        return;
      }

      const hasItems = Array.isArray(activeSection.items) && activeSection.items.length > 0;

      if (key === "e") {
        if (isExploringItems) {
          if (hasItems) {
            const itemIndex = Math.min(activeItemIndex, activeSection.items.length - 1);
            openProjectDetail(activePageIndex, activeSectionIndex, itemIndex);
          }
          return;
        }

        if (hasItems) {
          setIsExploringItems(true);
          setActiveItemIndex((prev) => Math.min(prev, activeSection.items.length - 1));
        }
        return;
      }

      if (key === "a") {
        setActivePageIndex((prev) => Math.max(0, prev - 1));
        return;
      }

      if (key === "d") {
        setActivePageIndex((prev) => Math.min(pages.length - 1, prev + 1));
        return;
      }

      if (key === "w") {
        if (isExploringItems && hasItems) {
          setActiveItemIndex((prev) => Math.max(0, prev - 1));
          return;
        }
        setActiveSectionIndex((prev) => Math.max(0, prev - 1));
        return;
      }

      if (key === "s") {
        if (isExploringItems && hasItems) {
          setActiveItemIndex((prev) => {
            const maxIndex = activeSection.items.length - 1;
            return Math.min(maxIndex, prev + 1);
          });
          return;
        }
        setActiveSectionIndex((prev) => {
          const maxIndex = activePage.sections.length - 1;
          return Math.min(maxIndex, prev + 1);
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    activePage,
    activeSection,
    activeItemIndex,
    isExploringItems,
    activePageIndex,
    activeSectionIndex,
    projectDetail,
    activeContentIndex,
    openProjectDetail,
    closeProjectDetail
  ]);

  const detailMedia = projectDetail?.media ?? [];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header data-site-header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="text-lg font-semibold tracking-tight text-black">Your Name</div>
          <nav className="hidden gap-4 text-sm font-medium sm:flex">
            {pages.map((page, index) => {
              const isActive = index === activePageIndex;
              return (
                <button
                  key={page.id}
                  type="button"
                  onClick={() => setActivePageIndex(index)}
                  className={`rounded-md px-2 py-1 transition-colors ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:text-black"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {page.label}
                </button>
              );
            })}
          </nav>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-3 overflow-x-auto border-t border-gray-200 px-4 py-3 text-sm font-medium text-gray-600 sm:hidden">
          {pages.map((page, index) => {
            const isActive = index === activePageIndex;
            return (
              <button
                key={page.id}
                type="button"
                onClick={() => setActivePageIndex(index)}
                className={`whitespace-nowrap rounded-md border px-3 py-1 transition-colors ${
                  isActive
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-transparent hover:border-gray-300 hover:text-black"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {page.label}
              </button>
            );
          })}
        </nav>
      </header>

      <div
        ref={mobileHeadingRef}
        className="lg:hidden sticky z-30 border-b border-gray-200 bg-white/95 backdrop-blur"
        style={{ top: headerHeight || 0 }}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 sm:px-6">
          <h1 className="text-2xl font-semibold text-black">{activePage.label}</h1>
          <p className="text-base text-gray-600">{activePage.tagline}</p>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-12 sm:px-6 lg:flex-row lg:space-x-12">
        <aside className="order-1 mb-10 hidden text-sm lg:sticky lg:top-28 lg:block lg:h-min lg:w-64">
          <nav className="space-y-3 border-l border-gray-200 pl-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              {activePage.label}
            </div>
            <p className="mt-1 text-xs leading-relaxed text-gray-500">{activePage.tagline}</p>
            {activePage.sections.map((section, index) => {
              const isActive = index === activeSectionIndex;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => {
                    setActiveSectionIndex(index);
                    setIsExploringItems(false);
                  }}
                  className={`block w-full rounded-md px-3 py-2 text-left transition-colors ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-black"
                  }`}
                  aria-current={isActive ? "location" : undefined}
                >
                  {section.title}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="order-2 flex-1">
          <nav className="mb-8 mt-6 flex gap-2 overflow-x-auto text-sm font-medium text-gray-600 lg:hidden">
            {activePage.sections.map((section, index) => {
              const isActive = index === activeSectionIndex;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => {
                    setActiveSectionIndex(index);
                    setIsExploringItems(false);
                  }}
                  className={`whitespace-nowrap rounded-full border px-3 py-1 transition-colors ${
                    isActive
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-200 hover:border-gray-400 hover:text-black"
                  }`}
                  aria-current={isActive ? "location" : undefined}
                >
                  {section.title}
                </button>
              );
            })}
          </nav>

          <div className="space-y-24">
            {activePage.sections.map((section, index) => {
              const isActive = index === activeSectionIndex;
              const hasItems = Array.isArray(section.items) && section.items.length > 0;

              return (
                <section
                  key={section.id}
                  id={sectionDomId(activePage.id, section.id)}
                  className={`scroll-mt-28 rounded-2xl border p-6 transition-colors ${
                    isActive ? "border-gray-900" : "border-gray-200"
                  }`}
                >
                  <div className="relative space-y-4">
                    <h2 className="text-2xl font-semibold text-black sm:text-3xl">
                      {section.title}
                    </h2>
                    {section.body.map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex} className="text-base text-gray-600 sm:text-lg">
                        {paragraph}
                      </p>
                    ))}
                    {hasItems ? (
                      <ul className="space-y-3">
                        {section.items.map((item, itemIndex) => {
                          const itemIsActive =
                            isActive && isExploringItems && activeItemIndex === itemIndex;
                          return (
                            <li
                              key={item.slug}
                              id={itemDomId(activePage.id, section.id, itemIndex)}
                              className={`rounded-xl border transition-colors ${
                                itemIsActive
                                  ? "border-gray-900 bg-white shadow-sm"
                                  : "border-gray-200 bg-gray-50"
                              }`}
                            >
                              <button
                                type="button"
                                onClick={() => openProjectDetail(activePageIndex, index, itemIndex)}
                                className="group flex w-full flex-col gap-2 rounded-xl px-4 py-4 text-left sm:flex-row sm:items-start sm:justify-between"
                              >
                                <div>
                                  <div className="font-medium text-black">{item.title}</div>
                                  <p className="text-sm text-gray-600">{item.description}</p>
                                </div>
                                {itemIsActive ? (
                                  <span className="flex items-center gap-2 text-xs font-medium text-gray-700 transition-colors">
                                    <Keycap>E</Keycap>
                                    <span>open</span>
                                    <span aria-hidden className="inline-block h-px w-4 bg-gray-300" />
                                    <Keycap>Q</Keycap>
                                    <span>back</span>
                                  </span>
                                ) : null}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                    {isActive && hasItems && !isExploringItems ? (
                      <div className="absolute right-0 top-0 flex -translate-y-1/2 items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-500 shadow-sm">
                        <Keycap>E</Keycap>
                        <span>browse projects</span>
                      </div>
                    ) : null}
                  </div>
                </section>
              );
            })}
          </div>
        </main>
      </div>

      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</span>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="mailto:you@example.com"
              className="font-medium text-gray-700 transition-colors hover:text-black"
            >
              you@example.com
            </a>
            <a
              href="https://github.com/yourusername"
              className="font-medium text-gray-700 transition-colors hover:text-black"
            >
              github.com/yourusername
            </a>
          </div>
        </div>
      </footer>

      {projectDetail ? (
        <div ref={detailScrollRef} className="fixed inset-0 z-50 overflow-y-auto bg-white">
          <div ref={detailHeaderRef} className="border-b border-gray-200 bg-white/95 backdrop-blur">
            <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-2">
                  <Keycap>Q</Keycap>
                  <span>back</span>
                </span>
                <span className="flex items-center gap-2">
                  <Keycap>W</Keycap>
                  <Keycap>S</Keycap>
                  <span>navigate</span>
                </span>
                <span className="flex items-center gap-2">
                  <Keycap>E</Keycap>
                  <span>select</span>
                </span>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-3">
                  <h2 className="text-3xl font-semibold text-gray-900">
                    {projectDetail.item.title}
                  </h2>
                  <p className="max-w-3xl text-sm text-gray-600">
                    {projectDetail.item.description}
                  </p>
                </div>
                {projectDetail.item.link ? (
                  <a
                    href={projectDetail.item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-gray-900 px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-900 hover:text-white"
                  >
                    Visit repo
                  </a>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl flex-col gap-10 px-4 py-10 sm:px-6 lg:flex-row lg:px-8">
            <aside className="order-2 hidden w-64 shrink-0 lg:order-1 lg:block">
              <div className="sticky top-28 space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {projectDetail.item.title}
                </div>
                <nav className="space-y-1">
                  {detailMedia.map((media, index) => {
                    const isActive = index === activeContentIndex;
                    return (
                      <button
                        key={media.id}
                        type="button"
                        onClick={() => {
                          setActiveContentIndex(index);
                          setProjectActionMessage("");
                        }}
                        className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                          isActive
                            ? "bg-gray-900 text-white"
                            : "text-gray-600 hover:bg-gray-100 hover:text-black"
                        }`}
                        aria-current={isActive ? "location" : undefined}
                      >
                        {media.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            <main className="order-1 flex-1 space-y-16 lg:order-2">
              <nav className="flex gap-2 overflow-x-auto text-xs font-medium text-gray-600 lg:hidden">
                {detailMedia.map((media, index) => {
                  const isActive = index === activeContentIndex;
                  return (
                    <button
                      key={media.id}
                      type="button"
                      onClick={() => {
                        setActiveContentIndex(index);
                        setProjectActionMessage("");
                      }}
                      className={`whitespace-nowrap rounded-full border px-3 py-1 transition-colors ${
                        isActive
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-200 hover:border-gray-400 hover:text-black"
                      }`}
                      aria-current={isActive ? "location" : undefined}
                    >
                      {media.label}
                    </button>
                  );
                })}
              </nav>

              {detailMedia.map((media, index) => {
                const isActive = index === activeContentIndex;
                return (
                  <section
                    key={media.id}
                    id={detailSectionDomId(projectDetail.slug, media.id)}
                    className={`scroll-mt-32 rounded-2xl border p-6 transition-colors ${
                      isActive ? "border-gray-900" : "border-gray-200"
                    }`}
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {media.label}
                          </h3>
                          <p className="mt-1 text-sm text-gray-600">{media.description}</p>
                        </div>
                        <span className="rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-gray-600">
                          {media.type}
                        </span>
                      </div>
                      <div className="flex min-h-[180px] items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50">
                        <div className="text-xs font-medium uppercase tracking-wide text-gray-500">
                          Placeholder {media.type}
                        </div>
                      </div>
                      {isActive ? (
                        <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                          <Keycap>E</Keycap>
                          <span>open content</span>
                        </div>
                      ) : null}
                    </div>
                  </section>
                );
              })}
            </main>
          </div>

          {projectActionMessage ? (
            <div className="pointer-events-none fixed bottom-8 right-8 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-600 shadow-md">
              <span>{projectActionMessage}</span>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default App;
