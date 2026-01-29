import axios from "axios";

const articlesApi = axios.create({
  baseURL: "https://en.wikipedia.org/w/api.php",
});

// 1. Sirf Headings mangwane ke liye
export const getArticleSections = async (title) => {
  const response = await articlesApi.get("", {
    params: {
      action: "parse",
      page: title,
      prop: "sections",
      format: "json",
      origin: "*",
    },
  });
  return response.data.parse.sections;
};

// 2. Kisi khas section ka HTML mangwane ke liye
export const getSectionContent = async (title, sectionId) => {
  const response = await articlesApi.get("", {
    params: {
      action: "parse",
      page: title,
      prop: "text",
      section: sectionId, // Sirf wahi hissa ayega
      format: "json",
      origin: "*",
      disableeditsection: true,
    },
  });
  return response.data.parse.text["*"];
};

// 3. Poora article fetch karke specific data nikalne ke liye
export const getArticleDetails = async (title) => {
  try {
    const response = await articlesApi.get("", {
      params: {
        action: "parse",
        page: title,
        prop: "text|sections", // Text aur sections dono chahiye
        format: "json",
        origin: "*",
        redirects: 1, // Redirects ko follow karein (e.g. "USA" -> "United States")
      },
    });
    return response.data.parse;
  } catch (error) {
    console.error(`Error fetching article details for ${title}:`, error);
    return null;
  }
};

// 4. Intro/Summary lene ke liye (Extract API use karke clean text milta hai)
export const getArticleSummary = async (title) => {
  try {
    const response = await articlesApi.get("", {
      params: {
        action: "query",
        format: "json",
        prop: "extracts",
        titles: title,
        exintro: 1, // Sirf intro chahiye
        explaintext: 1, // Plain text chahiye (HTML nahi)
        origin: "*",
        redirects: 1,
      },
    });
    const pages = response.data.query.pages;
    const pageId = Object.keys(pages)[0];
    return pages[pageId].extract;
  } catch (error) {
    console.error("Error fetching summary:", error);
    return "";
  }
};

// 5. HTML cleaning utility to remove links and unwanted styles
export const cleanWikiHtml = (html, limitParagraphs = 3) => {
  if (!html) return "";

  // Remove all <a> tags (links) but keep their content
  let cleaned = html.replace(/<a\b[^>]*>(.*?)<\/a>/gi, "$1");

  // Remove references [1], [2], etc.
  cleaned = cleaned.replace(/<sup\b[^>]*>.*?<\/sup>/gi, "");

  // Remove style attributes
  cleaned = cleaned.replace(/ style=".*?"/gi, "");

  // Remove edit sections
  cleaned = cleaned.replace(/<span class="mw-editsection">.*?<\/span>/gi, "");

  // Remove "Cite error" messages and technical clutter
  cleaned = cleaned.replace(/<span class="scribunto-error">.*?<\/span>/gi, "");
  cleaned = cleaned.replace(/Cite error:.*?(\.)/gi, "");

  // Remove reference lists and back-reference symbols (^)
  // Often these appear in <li> or <p> tags
  cleaned = cleaned.replace(/<li\b[^>]*>\^.*?<\/li>/gi, "");
  cleaned = cleaned.replace(/\^ /g, "");

  // Split into paragraphs and limit them if requested
  if (limitParagraphs > 0) {
    const paragraphs = cleaned.match(/<p>.*?<\/p>/gi) || [];
    if (paragraphs.length > limitParagraphs) {
      cleaned = paragraphs.slice(0, limitParagraphs).join("");
    }
  }

  return cleaned;
};
