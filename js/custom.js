// Liner carousel Start -----------------------------------------

$(document).ready(function () {
  var owl = $(".liner-carousel").owlCarousel({
    loop: true,
    autoplay: true,
    slideTransition: "linear",
    autoplaySpeed: 6000,
    smartSpeed: 6000,
    autoWidth: true,
    margin: 60,
    autoplayHoverPause: false,
    // items: 4,
    dots: false,
    // responsive: {
    //   0: {
    //     items: 1,
    //   },
    //   768: {
    //     items: 2,
    //   },
    //   1024: {
    //     items: 4,
    //   },
    // },
  });
});

// Testimonial carousel Start -----------------------------------------
$(document).ready(function () {
  var owl = $(".testimonial-carousel").owlCarousel({
    loop: true,
    margin: 0,
    nav: false,
    dots: false,
    autoplay: false,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    smartSpeed: 800,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      1024: {
        items: 3,
      },
    },
  });

  $("#prevBtn").click(function () {
    owl.trigger("prev.owl.carousel");
  });

  $("#nextBtn").click(function () {
    owl.trigger("next.owl.carousel");
  });
});

// Animated underline for tabs Start -----------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const tabsContainer = document.querySelector(".crmTabs");
  const tabs = document.querySelectorAll('[data-bs-toggle="tab"]');

  function updateIndicator() {
    const activeTab = document.querySelector(".nav-link.active");
    if (activeTab && tabsContainer) {
      const tabsRect = tabsContainer.getBoundingClientRect();
      const activeRect = activeTab.getBoundingClientRect();

      const scrollLeft = tabsContainer.scrollLeft || 0;
      const left = activeRect.left - tabsRect.left + scrollLeft;
      const width = activeRect.width;

      const style = document.createElement("style");
      style.textContent = `
        .crmTabs::after {
          left: ${left}px !important;
          width: ${width}px !important;
        }
      `;

      const oldStyle = document.getElementById("tab-indicator-style");
      if (oldStyle) oldStyle.remove();

      style.id = "tab-indicator-style";
      document.head.appendChild(style);
    }
  }

  updateIndicator();

  tabs.forEach((tab) => {
    tab.addEventListener("shown.bs.tab", function () {
      if (window.innerWidth <= 768) {
        setTimeout(() => {
          this.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
          setTimeout(updateIndicator, 300);
        }, 100);
      } else {
        updateIndicator();
      }
    });
  });

  window.addEventListener("resize", updateIndicator);

  tabsContainer.addEventListener("scroll", updateIndicator);
});

// scroll to top Start -------------------------------------------------------
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Floating Popup Start -------------------------------------------------

const popup = document.getElementById("floatingPopup");
let isPopupClosed = false;

function closePopup() {
  if (popup) {
    popup.classList.remove("show");
    isPopupClosed = true;
  }
}

function handleScroll() {
  if (!popup || isPopupClosed) {
    return;
  }

  const firstSection = document.querySelector("section:first-of-type, .first-section, #hero");
  const lastSection = document.querySelector("footer");

  if (!firstSection || !lastSection) {
    return;
  }

  const firstSectionBottom = firstSection.offsetTop + firstSection.offsetHeight;
  const lastSectionTop = lastSection.offsetTop;
  const scrollPosition = window.pageYOffset + window.innerHeight;
  const currentScrollTop = window.pageYOffset;

  if (currentScrollTop > firstSectionBottom - window.innerHeight / 2) {
    if (scrollPosition >= lastSectionTop + 100) {
      popup.classList.remove("show");
    } else {
      popup.classList.add("show");
    }
  } else {
    popup.classList.remove("show");
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("scroll", handleScroll);
  });
} else {
  window.addEventListener("scroll", handleScroll);
}

document.addEventListener("shown.bs.dropdown", function (e) {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
