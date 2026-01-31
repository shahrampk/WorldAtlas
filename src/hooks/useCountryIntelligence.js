import { useState, useEffect } from "react";
import { getCountries } from "../api/api";
import {
  getArticleDetails,
  getArticleSummary,
  getSectionContent,
} from "../api/getArticle";

/**
 * Helper to find a specific country in the full list using various identifiers.
 */
const findCountryData = (countries, mapIdentifier) => {
  if (!mapIdentifier || countries.length === 0) return null;

  const name = (
    mapIdentifier.name?.common ||
    mapIdentifier.name ||
    ""
  ).toLowerCase();
  const nameLong = (mapIdentifier.name_long || "").toLowerCase();
  const iso = (
    mapIdentifier.iso_a3 ||
    mapIdentifier.adm0_a3 ||
    mapIdentifier.sov_a3 ||
    ""
  ).toUpperCase();

  return countries.find(
    (c) =>
      c.cca3 === iso ||
      c.name.common.toLowerCase() === name ||
      c.name.official.toLowerCase() === name ||
      c.name.common.toLowerCase() === nameLong ||
      c.name.official.toLowerCase() === nameLong,
  );
};

/**
 * Custom hook to manage the state and logic for the Countries page.
 */
export const useCountryIntelligence = (detailsRef) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [wikiData, setWikiData] = useState({ intro: "", content: null });
  const [loading, setLoading] = useState(false);
  const [loadingWiki, setLoadingWiki] = useState(false);

  // Load master list once
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const data = await getCountries();
        setCountries(data);
      } catch (error) {
        console.error("Failed to load countries:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const handleCountrySelect = async (country) => {
    // Lookup full data if needed
    const fullCountry = !country.flags
      ? findCountryData(countries, country)
      : country;

    if (!fullCountry) {
      console.warn("Country identification failed:", country);
      return;
    }

    setSelectedCountry(fullCountry);
    setLoadingWiki(true);
    setWikiData({ intro: "", content: null });

    // Scroll to details
    if (detailsRef?.current) {
      setTimeout(() => {
        detailsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }

    try {
      const countryName = fullCountry.name.common;
      const [summary, details] = await Promise.all([
        getArticleSummary(countryName),
        getArticleDetails(countryName),
      ]);

      const parsedSections = {};
      if (details?.sections) {
        const sectionsOfInterest = [
          "Geography",
          "Economy",
          "Demographics",
          "Culture",
          "History",
        ];

        const sectionPromises = sectionsOfInterest.map(async (key) => {
          const section = details.sections.find((s) =>
            s.line.toLowerCase().includes(key.toLowerCase()),
          );
          if (section) {
            const html = await getSectionContent(countryName, section.index);
            return { key, html };
          }
          return null;
        });

        const results = await Promise.all(sectionPromises);
        results.forEach((res) => {
          if (res) parsedSections[res.key] = res.html;
        });
      }

      setWikiData({
        intro: summary,
        content: parsedSections,
      });
    } catch (error) {
      console.error("Wiki data enrichment failed:", error);
    } finally {
      setLoadingWiki(false);
    }
  };

  return {
    countries,
    selectedCountry,
    wikiData,
    loading,
    loadingWiki,
    handleCountrySelect,
  };
};
