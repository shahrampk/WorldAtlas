import React from "react";
import { Link } from "react-router";
import { AboutHero } from "../components/UI/AboutPageUI/aboutPageUI";

const ContentBlock = ({ title, children }) => (
  <div className="mb-16 md:mb-24 last:mb-0">
    <h2
      className={`text-xl md:text-3xl 3xl:text-4xl font-bold mb-8 flex items-center gap-4 text-bright-snow-100`}
    >
      {title}
    </h2>
    <div className="text-bright-snow-200 3xl:text-lg leading-relaxed tracking-wide space-y-6">
      {children}
    </div>
  </div>
);

const Highlight = ({ children, to }) =>
  to ? (
    <Link
      to={to}
      className="text-azure-blue-400 font-semibold hover:text-azure-blue-300 transition-colors"
    >
      {children}
    </Link>
  ) : (
    <span className="text-azure-blue-400 font-semibold">{children}</span>
  );

const ExternalLink = ({ children, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-azure-blue-500 font-medium hover:text-azure-blue-400 transition-colors italic border-b border-azure-blue-500/20"
  >
    {children}
  </a>
);

function About() {
  return (
    <div>
      <AboutHero />

      <div className="max-w-5xl 3xl:max-w-350 mx-auto px-6 pt-20">
        <ContentBlock title="How WorldAtlas Is Structured">
          <p>
            WorldAtlas is divided into carefully planned pages, each serving a
            specific purpose while staying interconnected. This structure
            ensures users can explore topics deeply without losing context.
          </p>
        </ContentBlock>

        <ContentBlock title="Home: The Gateway to Global Knowledge">
          <p>
            The <Highlight to="/">Home page</Highlight> acts as the entry point
            to WorldAtlas. It introduces users to the platform and explains how
            information is organized and accessed across the website.
          </p>
          <p>
            Visitors can quickly understand what WorldAtlas offers, explore
            interesting facts about the world, and engage with thought-provoking
            questions related to world history. These elements spark curiosity
            and encourage users to begin their journey deeper into continents,
            countries, and global records.
          </p>
        </ContentBlock>

        <ContentBlock title="About: The Vision Behind WorldAtlas">
          <p>
            The <Highlight to="/about">About page</Highlight> explains the
            purpose and philosophy of WorldAtlas.
          </p>
          <p>
            Built around the mission
            <Highlight>“Mapping Knowledge for the Curious Mind,”</Highlight>
            this page outlines the platform’s three core pillars:
          </p>
          <ul className="list-inside list-disc pl-4">
            <li>Continents</li>
            <li>Countries</li>
            <li>World Facts</li>
          </ul>
          <p>
            It highlights the values of clarity, structure, and curation that
            guide every piece of content. Clear navigation links help users
            access all major sections with ease.
          </p>
        </ContentBlock>

        <ContentBlock title="Continents: Viewing the World at a Global Scale">
          <p>
            The <Highlight to="/continent">Continents page</Highlight> offers a
            macroscopic view of Earth, helping users understand the planet’s
            major landmasses and their origins.
          </p>
          <p>
            An interactive map allows users to visually select continents,
            making exploration intuitive. The page begins with an introduction
            explaining what a continent is and how today’s continents emerged
            from the ancient supercontinent <Highlight>Pangaea</Highlight>.
          </p>
          <p>
            Users can compare continents through statistical rankings based on
            area, population, and density. Each continent has a detailed section
            that includes:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>An overview</li>
            <li>Geographic extremes such as highest and lowest points</li>
            <li>Major rivers</li>
            <li>Dominant climates or biomes</li>
          </ul>
          <p>
            Links to all constituent countries allow seamless navigation between
            global and regional views. Fun facts add an engaging layer of
            discovery, making learning both informative and enjoyable.
          </p>
        </ContentBlock>

        <ContentBlock title="Countries: Understanding Nations in Detail">
          <p>
            The <Highlight to="/country">Countries page</Highlight> brings
            global knowledge to a human scale by focusing on individual nations.
          </p>
          <p>
            Each country profile begins with national identity information such
            as:
          </p>
          <ul className="flex flex-col gap-2 list-decimal list-inside pl-4">
            <li>Flag</li>
            <li>Coat of arms</li>
            <li>Official name</li>
            <li>Motto</li>
          </ul>
          <p>
            Quick facts include capital city, population, land area, currency,
            languages, and time zones. Geographic and environmental details
            cover maps, regional placement, climate, terrain, and neighboring
            countries.
          </p>
          <p>
            Beyond geography, WorldAtlas explores governance, economic
            structure, and society. Information on government type, GDP, and
            major industries helps users understand how nations function.
            Cultural highlights, landmarks, and fun facts give each country its
            unique personality.
          </p>
          <p>
            Each profile is interconnected with its continent and relevant world
            facts for deeper learning.
          </p>
        </ContentBlock>

        <ContentBlock title="World Facts: Discovering Global Records and Extremes">
          <p>
            For users fascinated by records and remarkable phenomena, the
            <Highlight to="/worldfacts"> World Facts page</Highlight> compiles
            extraordinary global information in one place.
          </p>
          <p>This section includes:</p>
          <ul className="flex flex-col gap-2 list-decimal list-inside pl-4">
            <li>
              Global superlatives such as the largest and smallest countries
            </li>
            <li>Highest mountains and deepest oceans</li>
            <li>Population rankings, languages, and religions</li>
            <li>Deserts, climate extremes, and natural wonders</li>
          </ul>
          <p>
            WorldAtlas also showcases man-made marvels, including modern wonders
            and record-breaking buildings. Global trends such as population
            growth and internet usage provide insight into how the world is
            evolving.
          </p>
          <p>
            Each fact connects back to related countries and continents,
            reinforcing contextual learning.
          </p>
        </ContentBlock>

        <ContentBlock title="How Everything Connects">
          <p>WorldAtlas is designed as an interconnected learning system:</p>
          <ul className="list-disc list-inside space-y-3 pl-4 ">
            <li>
              The <Highlight to="/">Home page</Highlight> introduces and guides
              exploration
            </li>
            <li>
              <Highlight to="/continent">Continents</Highlight> and
              <Highlight to="/country"> Countries</Highlight> are linked for
              contextual understanding
            </li>
            <li>
              <Highlight to="/worldfacts">World Facts</Highlight> support and
              enrich geographic learning
            </li>
            <li>
              The <Highlight to="/about">About page</Highlight> explains purpose
              and structure
            </li>
          </ul>
          <p>
            This thoughtful flow ensures users never feel lost while exploring
            complex global information.
          </p>
        </ContentBlock>

        <section className="py-10 border-t border-carbon-black-800 text-center">
          <h2 className="text-3xl md:text-5xl 3xl:text-7xl font-bold tracking-tight mb-5 text-bright-snow-100 leading-tight">
            Begin Your Journey with <Highlight>WorldAtlas</Highlight>
          </h2>
          <p className="text-bright-snow-300 2xl:text-lg max-w-3xl mx-auto mb-12">
            WorldAtlas is more than a geography website it’s a platform built
            for discovery. By organizing global knowledge into clear, connected
            sections, it empowers users to explore the world with confidence and
            curiosity.
          </p>
          <div className="flex flex-col items-center gap-6">
            <p className="text-bright-snow-200 font-semibold text-xl md:text-2xl">
              Explore continents. Understand countries. Discover world facts.
            </p>
            <p className="text-bright-snow-100 text-2xl md:text-3xl font-bold flex items-center gap-3">
              Welcome to <Highlight>WorldAtlas</Highlight>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
