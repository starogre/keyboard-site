import React, { useEffect, useMemo, useRef, useState } from "react";

const pages = [
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
            link: "https://github.com/yourusername/pulse"
          },
          {
            title: "Atlas UI",
            description: "A component library built with accessibility-first primitives and exhaustive visual regression coverage.",
            link: "https://github.com/yourusername/atlas-ui"
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
            description: "Published utilities for fluid typography scales and logical property shorthands."
          },
          {
            title: "Testing Recipes",
            description: "Curated examples showing how to blend Vitest, React Testing Library, and Playwright for resilient coverage."
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
            description: "A personal trainer for focus blocks that blends browser APIs and haptic feedback."
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

function sectionDomId(pageId, sectionId) {
  return `${pageId}-${sectionId}`;
}

function App() {
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [mobileHeadingHeight, setMobileHeadingHeight] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const mobileHeadingRef = useRef(null);

  const activePage = useMemo(() => pages[activePageIndex], [activePageIndex]);

  useEffect(() => {
    setActiveSectionIndex(0);
  }, [activePageIndex]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      if (!["w", "a", "s", "d"].includes(key)) {
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

      if (key === "a") {
        setActivePageIndex((prev) => Math.max(0, prev - 1));
        return;
      }

      if (key === "d") {
        setActivePageIndex((prev) => Math.min(pages.length - 1, prev + 1));
        return;
      }

      if (key === "w") {
        setActiveSectionIndex((prev) => Math.max(0, prev - 1));
        return;
      }

      if (key === "s") {
        setActiveSectionIndex((prev) => {
          const maxIndex = activePage.sections.length - 1;
          return Math.min(maxIndex, prev + 1);
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePage]);

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
    if (typeof window === "undefined") {
      return;
    }

    const page = pages[activePageIndex];
    const section = page.sections[activeSectionIndex];
    if (!section) {
      return;
    }

    const element = document.getElementById(sectionDomId(page.id, section.id));
    if (!element) {
      return;
    }

    const gap = isLargeScreen ? 24 : mobileHeadingHeight + 16;
    const offset = headerHeight + gap;
    const y = element.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: Math.max(0, y),
      behavior: "smooth"
    });
  }, [
    activePageIndex,
    activeSectionIndex,
    headerHeight,
    mobileHeadingHeight,
    isLargeScreen
  ]);

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
                  onClick={() => setActiveSectionIndex(index)}
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
                  onClick={() => setActiveSectionIndex(index)}
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
              const domId = sectionDomId(activePage.id, section.id);
              return (
                <section
                  key={section.id}
                  id={domId}
                  className={`scroll-mt-28 rounded-2xl border p-6 transition-colors ${
                    isActive ? "border-gray-900" : "border-gray-200"
                  }`}
                >
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-black sm:text-3xl">
                      {section.title}
                    </h2>
                    {section.body.map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex} className="text-base text-gray-600 sm:text-lg">
                        {paragraph}
                      </p>
                    ))}
                    {section.items ? (
                      <ul className="space-y-3">
                        {section.items.map((item) => (
                          <li
                            key={item.title}
                            className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                          >
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                              <div>
                                <div className="font-medium text-black">{item.title}</div>
                                <p className="text-sm text-gray-600">{item.description}</p>
                              </div>
                              {item.link ? (
                                <a
                                  href={item.link}
                                  className="text-sm font-medium text-gray-700 transition-colors hover:text-black"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  View
                                </a>
                              ) : null}
                            </div>
                          </li>
                        ))}
                      </ul>
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
    </div>
  );
}

export default App;
