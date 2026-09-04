(() => {
  const data = window.SITE_DATA;
  if (!data) return;

  const $ = (selector, root = document) => root.querySelector(selector);
  const el = (tag, className) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    return node;
  };
  const setText = (selector, value) => {
    const node = $(selector);
    if (node) node.textContent = value ?? "";
  };
  const appendLines = (node, lines) => {
    node.replaceChildren();
    (lines || []).forEach((line, i) => {
      if (i) node.appendChild(document.createElement("br"));
      node.appendChild(document.createTextNode(line));
    });
  };

  // SEO
  document.title = data.seo?.title || document.title;
  const metaDescription = $('meta[name="description"]');
  if (metaDescription && data.seo?.description) metaDescription.content = data.seo.description;

  // Brand
  setText("#brand-main", data.brand?.main);
  setText("#brand-sub", data.brand?.sub);
  const brandLogo = $("#brand-logo");
  if (brandLogo) {
    brandLogo.src = data.brand?.logo || "";
    brandLogo.alt = data.brand?.main ? `${data.brand.main} ロゴ` : "会社ロゴ";
    brandLogo.hidden = !data.brand?.logo;
  }
  const brand = $(".brand");
  if (brand && data.brand?.ariaLabel) brand.setAttribute("aria-label", data.brand.ariaLabel);

  // Hero
  const heroImage = $("#hero-image");
  if (heroImage) {
    heroImage.src = data.hero?.image || "";
    heroImage.alt = data.hero?.imageAlt || "";
  }
  setText("#hero-eyebrow", data.hero?.eyebrow);
  appendLines($("#hero-title"), data.hero?.titleLines);

  // Mission
  setText("#mission-eyebrow", data.mission?.eyebrow);
  appendLines($("#mission-title"), data.mission?.titleLines);
  const problemList = $("#problem-list");
  if (problemList) {
    problemList.replaceChildren();
    const problems = data.mission?.problems || [];
    problemList.hidden = problems.length === 0;
    problems.forEach((item) => {
      const article = el("article", "problem-card");
      const number = el("span");
      number.textContent = item.number || "";
      const p = el("p");
      appendLines(p, item.lines);
      article.append(number, p);
      problemList.appendChild(article);
    });
  }
  appendLines($("#mission-lead"), data.mission?.leadLines);


  // News
  setText("#news-eyebrow", data.news?.eyebrow);
  setText("#news-title", data.news?.title);
  const newsList = $("#news-list");
  if (newsList) {
    newsList.replaceChildren();
    (data.news?.items || []).forEach((item) => {
      const article = el("article", "news-item");
      const date = el("time", "news-date");
      date.textContent = item.date || "";
      const body = el("div", "news-body");
      const h3 = el("h3"); h3.textContent = item.title || "";
      const p = el("p"); p.textContent = item.text || "";
      body.append(h3, p);
      if (item.href) {
        const link = el("a", "news-link");
        link.href = item.href;
        link.textContent = item.linkLabel || "詳しくはこちら";
        body.appendChild(link);
      }
      article.append(date, body);
      newsList.appendChild(article);
    });
  }

  // Strengths
  setText("#strength-eyebrow", data.strengths?.eyebrow);
  setText("#strength-title", data.strengths?.title);
  const strengthGrid = $("#strength-grid");
  if (strengthGrid) {
    strengthGrid.replaceChildren();
    (data.strengths?.items || []).forEach((item) => {
      const article = el("article");
      const b = el("b"); b.textContent = item.number || "";
      const h3 = el("h3"); h3.textContent = item.title || "";
      const p = el("p"); p.textContent = item.text || "";
      article.append(b, h3, p);
      strengthGrid.appendChild(article);
    });
  }

  // Services
  setText("#service-eyebrow", data.services?.eyebrow);
  setText("#service-title", data.services?.title);
  const serviceGrid = $("#service-grid");
  if (serviceGrid) {
    serviceGrid.replaceChildren();
    (data.services?.items || []).forEach((item) => {
      const article = el("article");
      if (item.image) {
        const img = el("img", "service-photo");
        img.src = item.image;
        img.alt = item.imageAlt || item.title || "施工写真";
        article.appendChild(img);
      }
      const body = el("div", "service-body");
      const h3 = el("h3"); h3.textContent = item.title || "";
      const p = el("p"); p.textContent = item.text || "";
      body.append(h3, p);
      article.appendChild(body);
      serviceGrid.appendChild(article);
    });
  }

  // Company
  setText("#company-eyebrow", data.company?.eyebrow);
  setText("#company-title", data.company?.title);
  const companyRows = $("#company-rows");
  if (companyRows) {
    companyRows.replaceChildren();
    (data.company?.rows || []).forEach(([label, value]) => {
      const wrap = el("div");
      const dt = el("dt"); dt.textContent = label || "";
      const dd = el("dd"); dd.textContent = value || "";
      wrap.append(dt, dd);
      companyRows.appendChild(wrap);
    });
  }
  setText("#company-note", data.company?.note);

  // Contact + quick links
  setText("#contact-eyebrow", data.contact?.eyebrow);
  setText("#contact-title", data.contact?.title);
  setText("#contact-text", data.contact?.text);
  setText("#phone-label", data.contact?.phoneDisplay || "電話する");

  document.querySelectorAll("[data-phone-link]").forEach((a) => {
    a.href = `tel:${data.contact?.phoneLink || ""}`;
  });
  document.querySelectorAll("[data-mail-link]").forEach((a) => {
    a.href = `mailto:${data.contact?.email || ""}`;
  });
  document.querySelectorAll("[data-map-link]").forEach((a) => {
    a.href = data.contact?.mapUrl || "#";
  });

  setText("#footer-copyright", data.footer?.copyright);

  // Drawer menu
  const btn = $(".menu-btn");
  const drawer = $(".drawer");
  const scrim = $(".scrim");
  function setMenu(open) {
    if (!btn || !drawer || !scrim) return;
    btn.setAttribute("aria-expanded", String(open));
    drawer.classList.toggle("open", open);
    drawer.setAttribute("aria-hidden", String(!open));
    scrim.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }
  btn?.addEventListener("click", () => setMenu(btn.getAttribute("aria-expanded") !== "true"));
  scrim?.addEventListener("click", () => setMenu(false));
  drawer?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
})();
