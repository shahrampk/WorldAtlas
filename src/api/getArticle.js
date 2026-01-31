import axios from "axios";

/**
 * Configure Axios instance for Wikipedia API.
 * Uses the PHP API endpoint and sets common parameters.
 */
const articlesApi = axios.create({
  baseURL: "https://en.wikipedia.org/w/api.php",
  params: {
    format: "json",
    origin: "*", // Required for CORS when calling Wikipedia from a browser
  },
});

/**
 * Fetch a list of sections (headings) available for a Wikipedia article.
 * @param {string} title - The Wikipedia page title.
 * @returns {Promise<Array>} List of section objects containing metadata.
 */
export const getArticleSections = async (title) => {
  try {
    const response = await articlesApi.get("", {
      params: {
        action: "parse",
        page: title,
        prop: "sections",
      },
    });
    return response.data?.parse?.sections || [];
  } catch (error) {
    console.error(`Error fetching sections for ${title}:`, error);
    return [];
  }
};

/**
 * Fetch the HTML content for a specific section of a Wikipedia article.
 * @param {string} title - The Wikipedia page title.
 * @param {number|string} sectionId - The numerical index of the section.
 * @returns {Promise<string>} The raw HTML content of the section.
 */
export const getSectionContent = async (title, sectionId) => {
  try {
    const response = await articlesApi.get("", {
      params: {
        action: "parse",
        page: title,
        prop: "text",
        section: sectionId,
      },
    });
    return response.data?.parse?.text?.["*"] || "";
  } catch (error) {
    console.error(`Error fetching section ${sectionId} for ${title}:`, error);
    return "";
  }
};

/**
 * Fetch complete article details including the full HTML and section list.
 * Useful for building a structural overview of the page.
 * @param {string} title - The Wikipedia page title.
 */
export const getArticleDetails = async (title) => {
  try {
    const response = await articlesApi.get("", {
      params: {
        action: "parse",
        page: title,
        prop: "text|sections",
        redirects: 1, // Follow Wikipedia redirects (e.g., USA -> United States)
      },
    });
    return response.data?.parse || null;
  } catch (error) {
    console.error(`Error fetching article details for ${title}:`, error);
    return null;
  }
};

/**
 * Fetch a text-only summary (the lead paragraph) of a Wikipedia article.
 * Optimized for displaying intros in a CLEAN, plain-text format.
 * @param {string} title - The Wikipedia page title.
 */
export const getArticleSummary = async (title) => {
  try {
    const response = await articlesApi.get("", {
      params: {
        action: "query",
        prop: "extracts",
        titles: title,
        exintro: 1, // Lead section only
        explaintext: 1, // Plain text output (no HTML)
        redirects: 1,
      },
    });
    const pages = response.data?.query?.pages;
    if (!pages) return "";
    const pageId = Object.keys(pages)[0];
    return pages[pageId]?.extract || "";
  } catch (error) {
    console.error(`Error fetching summary for ${title}:`, error);
    return "";
  }
};

/**
 * Clean Wikipedia HTML content for better UI presentation.
 * This function strips out links, technical markers, and styling that breaks design patterns.
 * @param {string} html - Raw HTML from Wikipedia.
 * @param {number} limitParagraphs - Max number of paragraphs to retain (0 for all).
 */
export const cleanWikiHtml = (html, limitParagraphs = 3) => {
  if (!html) return "";

  let cleaned = html
    // Step 1: Remove all <a> tags but keep their inner text (prevent link-out leakage)
    .replace(/<a\b[^>]*>(.*?)<\/a>/gi, "$1")
    // Step 2: Remove reference tags [1], [2], etc.
    .replace(/<sup\b[^>]*>.*?<\/sup>/gi, "")
    // Step 3: Remove Wikipedia technical containers and reference lists
    .replace(/<div class="reflist">.*?<\/div>/gi, "")
    .replace(/<ol class="references">.*?<\/ol>/gi, "")
    // Step 4: Remove edit sections [edit]
    .replace(/<span class="mw-editsection">.*?<\/span>/gi, "")
    // Step 5: Remove Wikipedia warning tables/boxes and hatnotes
    .replace(/<table class="ambox">.*?<\/table>/gi, "")
    .replace(/<div class="hatnote">.*?<\/div>/gi, "")
    // Step 6: Remove technical description spans and error messages
    .replace(/<div class="shortdescription">.*?<\/div>/gi, "")
    .replace(/<span class="scribunto-error">.*?<\/span>/gi, "")
    .replace(/Cite error:.*?(\.)/gi, "")
    // Step 7: Clear style attributes to prevent broken layouts
    .replace(/ style=".*?"/gi, "")
    // Step 8: Remove reference fragments and back-references
    .replace(/<li\b[^>]*>\^.*?<\/li>/gi, "")
    .replace(/\^ /g, "");

  // Optional: Trim output to a specific number of paragraphs for summary views
  if (limitParagraphs > 0) {
    const paragraphs = cleaned.match(/<p>.*?<\/p>/gi) || [];
    if (paragraphs.length > limitParagraphs) {
      cleaned = paragraphs.slice(0, limitParagraphs).join("");
    }
  }

  return cleaned.trim();
};
