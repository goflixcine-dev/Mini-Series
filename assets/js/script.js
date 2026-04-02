(function () {
  const config = window.LANDING_CONFIG || {};

  const read = (key, fallback = "") => {
    const value = config[key];
    return value === undefined || value === null || value === "" ? fallback : value;
  };

  const brandName = read("brandName", "Shortflix");

  document.querySelectorAll("[data-config-text]").forEach((el) => {
    const key = el.getAttribute("data-config-text");
    const value = read(key, el.textContent || "");
    el.textContent = value;
  });

  document.querySelectorAll("[data-config-src]").forEach((el) => {
    const key = el.getAttribute("data-config-src");
    const value = read(key);
    if (!value) return;

    if (el.tagName === "IMG") {
      el.setAttribute("src", value);
      el.setAttribute("alt", brandName);
      return;
    }

    el.setAttribute("src", value);
  });

  const videoUrl = read("videoUrl");
  const videoPoster = read("videoPoster");
  const isDirectVideo = /\.(mp4|webm|ogg)(\?|#|$)/i.test(videoUrl);

  if (isDirectVideo) {
    const videoWrap = document.querySelector(".video-wrap");
    if (videoWrap) {
      const videoEl = document.createElement("video");
      videoEl.className = "video";
      videoEl.controls = true;
      videoEl.preload = "metadata";
      videoEl.playsInline = true;
      videoEl.autoplay = true;
      videoEl.muted = true;
      videoEl.loop = true;

      if (videoPoster) {
        videoEl.poster = videoPoster;
      }

      const source = document.createElement("source");
      source.src = videoUrl;

      if (/\.webm(\?|#|$)/i.test(videoUrl)) {
        source.type = "video/webm";
      } else if (/\.ogg(\?|#|$)/i.test(videoUrl)) {
        source.type = "video/ogg";
      } else {
        source.type = "video/mp4";
      }

      videoEl.appendChild(source);
      videoEl.append("Seu navegador nao suporta video HTML5.");
      videoWrap.innerHTML = "";
      videoWrap.appendChild(videoEl);
    }
  }

  const links = config.links || {};
  document.querySelectorAll("[data-config-link]").forEach((el) => {
    const key = el.getAttribute("data-config-link");
    const href = links[key] || "#";
    const safeHref = href.includes("SEU-LINK") ? "#" : href;
    el.setAttribute("href", safeHref);

    if (safeHref.startsWith("http")) {
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    }
  });

  const topTrack = document.getElementById("gallery-track-top");
  const bottomTrack = document.getElementById("gallery-track-bottom");
  const gallery = Array.isArray(config.galleryImages) ? config.galleryImages : [];

  if ((topTrack || bottomTrack) && gallery.length > 0) {
    const splitIndex = Math.ceil(gallery.length / 2);
    const topList = gallery.slice(0, splitIndex);
    const bottomList = gallery.slice(splitIndex);
    const safeBottomList = bottomList.length > 0 ? bottomList : topList;

    const renderImages = (list) =>
      list
        .map(
          (src) =>
            `<img src="${src}" alt="Poster de dorama" loading="lazy" decoding="async">`
        )
        .join("");

    if (topTrack) {
      const topHTML = renderImages(topList);
      topTrack.innerHTML = topHTML + topHTML;
    }

    if (bottomTrack) {
      const bottomHTML = renderImages(safeBottomList);
      bottomTrack.innerHTML = bottomHTML + bottomHTML;
    }
  } else {
    if (topTrack) topTrack.remove();
    if (bottomTrack) bottomTrack.remove();
  }

  const progressLine = document.getElementById("scroll-progress");
  const updateScrollProgress = () => {
    if (!progressLine) return;

    const scrollTop = window.scrollY || window.pageYOffset;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
    progressLine.style.width = `${Math.min(100, Math.max(0, ratio))}%`;
  };
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  updateScrollProgress();

  const cursorGlow = document.getElementById("cursor-glow");
  const canUseHover = window.matchMedia("(pointer:fine)").matches;
  if (cursorGlow && canUseHover) {
    window.addEventListener("mousemove", (event) => {
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
      cursorGlow.style.opacity = "1";
    });

    window.addEventListener("mouseout", () => {
      cursorGlow.style.opacity = "0";
    });
  }

  if (canUseHover) {
    const tiltTargets = document.querySelectorAll(
      ".feature-card, .audience-card, .plan-card, .faq-list details"
    );

    tiltTargets.forEach((card) => {
      card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        const rotateY = (x - 0.5) * 7;
        const rotateX = (0.5 - y) * 6;
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach((el, index) => {
    el.style.transitionDelay = `${Math.min(index * 0.06, 0.36)}s`;
    observer.observe(el);
  });

  const year = document.getElementById("current-year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();

