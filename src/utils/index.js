import { CONTACT_EMAIL } from "@/constants";

/**
 * Handle card mouse hover light gradient glow effect by setting CSS variables.
 * @param {MouseEvent} e - React mouse event.
 * @param {string|null} color - Optional brand color to set for --accent-soft.
 */
export const handleCardMouseMove = (e, color = null) => {
  const card = e.currentTarget;
  if (!card) return;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  card.style.setProperty("--mouse-x", `${x}px`);
  card.style.setProperty("--mouse-y", `${y}px`);
  if (color) {
    card.style.setProperty("--accent-soft", color);
  }
};

/**
 * Construct Gmail web compose URL.
 * @param {object} params
 * @param {string} params.subject
 * @param {string} params.body
 * @returns {string}
 */
export const getGmailComposeLink = ({ subject = "", body = "" } = {}) => {
  const composeParams = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: CONTACT_EMAIL,
  });

  const subjectSuffix = " [Coming From Portfolio]";
  const su = subject ? `${subject}${subjectSuffix}` : subjectSuffix;
  composeParams.set("su", su);

  if (body) {
    composeParams.set("body", body);
  }

  return `https://mail.google.com/mail/?${composeParams.toString()}`;
};

const BLOCKED_IFRAME_HOSTS = new Set(["npmjs.com", "www.npmjs.com"]);

/**
 * Verify whether URL can be rendered in an external iframe.
 * @param {string} url
 * @returns {boolean}
 */
export function canUseExternalIframe(url) {
  if (!url) {
    return false;
  }

  try {
    const parsedUrl = new URL(url);
    const isHttp = parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";

    if (!isHttp) {
      return false;
    }

    return !BLOCKED_IFRAME_HOSTS.has(parsedUrl.hostname);
  } catch {
    return false;
  }
}

/**
 * Generate preview HTML for project modal.
 * @param {object} project
 * @param {string} theme
 * @returns {string} HTML content
 */
export function getProjectPreviewDoc(project, theme) {
  const imageSrc =
    typeof project.image === "string" ? project.image : project.image?.src || "";
  const isMinimal = theme === "minimal";
  const isDark = theme === "dark";
  const palette = isMinimal
    ? {
        text: "#101010",
        muted: "#444444",
        accent: "#111111",
        chip: "#222222",
        border: "rgba(16,16,16,0.26)",
        surface: "#ffffff",
        buttonText: "#f7f7f7",
        buttonGradient: "linear-gradient(120deg,#0f0f0f,#2b2b2b 50%,#565656)",
        bg: "radial-gradient(circle at top left, rgba(0,0,0,0.06), transparent 28%),radial-gradient(circle at bottom right, rgba(0,0,0,0.07), transparent 32%),linear-gradient(160deg,#f0f0f0 0%,#fafafa 100%)",
      }
    : isDark
      ? {
          text: "#e0e0e0",
          muted: "#b0b8c6",
          accent: "#7dd3fc",
          chip: "#c8d0de",
          border: "rgba(224,224,224,0.18)",
          surface: "#242424",
          buttonText: "#062133",
          buttonGradient: "linear-gradient(120deg,#1f7ea4,#2d9ccc 50%,#38bdf8)",
          bg: "radial-gradient(circle at top left, rgba(56,189,248,0.2), transparent 28%),radial-gradient(circle at bottom right, rgba(14,165,233,0.16), transparent 32%),linear-gradient(160deg,#121212 0%,#1e1e1e 100%)",
        }
      : {
          text: "#1f2937",
          muted: "#4b5563",
          accent: "#0284c7",
          chip: "#374151",
          border: "rgba(31,41,55,0.14)",
          surface: "#ffffff",
          buttonText: "#f8fbff",
          buttonGradient: "linear-gradient(120deg,#0284c7,#0ea5e9 52%,#38bdf8)",
          bg: "radial-gradient(circle at top left, rgba(56,189,248,0.2), transparent 28%),radial-gradient(circle at bottom right, rgba(2,132,199,0.16), transparent 32%),linear-gradient(160deg,#f8f9fa 0%,#ffffff 100%)",
        };

  const techBadges = project.tech
    .map(
      (item) =>
        `<span style="display:inline-flex;border:1px solid ${palette.border};border-radius:999px;padding:8px 12px;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:${palette.chip};">${item}</span>`,
    )
    .join("");
  const liveLink = project.link.liveLink
    ? `<a href="${project.link.liveLink}" target="_blank" rel="noreferrer" style="display:inline-flex;align-items:center;justify-content:center;padding:14px 18px;border-radius:999px;background:${palette.buttonGradient};color:${palette.buttonText};text-decoration:none;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;font-size:12px;">Open Live</a>`
    : "";
  const gitHubLink = project.link.gitHub
    ? `<a href="${project.link.gitHub}" target="_blank" rel="noreferrer" style="display:inline-flex;align-items:center;justify-content:center;padding:14px 18px;border-radius:999px;border:1px solid ${palette.border};color:${palette.text};text-decoration:none;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;font-size:12px;">Open GitHub</a>`
    : "";

  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${project.title} Preview</title>
        <style>
          :root {
            color-scheme: light;
          }

          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            font-family: Segoe UI, sans-serif;
            background: ${palette.bg};
            color: ${palette.text};
            min-height: 100vh;
            ${isMinimal ? "filter:grayscale(100%);" : ""}
          }

          main {
            display: grid;
            grid-template-columns: 1.1fr 0.9fr;
            gap: 32px;
            align-items: center;
            min-height: 100vh;
            padding: 32px;
          }

          .preview-card {
            position: relative;
            min-height: 340px;
            border-radius: 28px;
            overflow: hidden;
            border: 1px solid ${palette.border};
            background: ${palette.surface};
            box-shadow: 0 18px 40px rgba(0, 0, 0, 0.28);
          }

          .preview-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }

          h1 {
            margin: 0 0 16px;
            font-size: 32px;
            font-weight: 700;
            letter-spacing: -0.02em;
          }

          p {
            margin: 0 0 24px;
            font-size: 15px;
            line-height: 1.75;
            opacity: 0.8;
          }

          h2 {
            margin: 0 0 12px;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            opacity: 0.65;
          }

          .badges {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 32px;
          }

          .button-group {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
          }

          .button-group a {
            text-decoration: none;
          }

          @media (max-width: 900px) {
            main {
              grid-template-columns: 1fr;
              padding: 24px;
              gap: 24px;
            }

            h1 {
              font-size: 28px;
            }

            p {
              font-size: 14px;
            }

            h2 {
              font-size: 12px;
            }
          }

          @media (max-width: 640px) {
            main {
              padding: 18px;
              gap: 18px;
            }

            .preview-card {
              min-height: 260px;
              border-radius: 22px;
            }

            h1 {
              font-size: 24px;
            }

            p {
              font-size: 13px;
              margin-bottom: 20px;
            }

            .badges {
              gap: 6px;
              margin-bottom: 24px;
            }

            .button-group {
              flex-direction: column;
              align-items: stretch;
            }

            .button-group a {
              width: 100%;
            }
          }
        </style>
      </head>
      <body>
        <main>
          <section class="preview-card">
            <img src="${imageSrc}" alt="${project.title}" />
          </section>
          <section>
            ${project.company ? `<span style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;opacity:0.6;display:block;margin-bottom:8px;">${project.company}</span>` : ""}
            <h1>${project.title}</h1>
            <p>${project.description}</p>
            <h2>Tech Stack</h2>
            <div class="badges">${techBadges}</div>
            <div class="button-group">
              ${liveLink}
              ${gitHubLink}
            </div>
          </section>
        </main>
      </body>
    </html>
  `;
}
