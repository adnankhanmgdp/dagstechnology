(function () {
  var language = localStorage.getItem("language") || "en";

  function setLanguageFlag(language) {
    var headerLangImg = document.getElementById("header-lang-img");
    if (headerLangImg) {
      switch (language) {
        case "en":
          headerLangImg.src = "assets/images/flags/us.jpg";
          break;
        case "sp":
          headerLangImg.src = "assets/images/flags/spain.jpg";
          break;
        case "gr":
          headerLangImg.src = "assets/images/flags/germany.jpg";
          break;
        case "it":
          headerLangImg.src = "assets/images/flags/italy.jpg";
          break;
        case "ru":
          headerLangImg.src = "assets/images/flags/russia.jpg";
          break;
        default:
          headerLangImg.src = "assets/images/flags/us.jpg";
      }
    }
  }

  function resetActiveLinks() {
    var topnavMenuContent = document.getElementById("topnav-menu-content");
    var links = topnavMenuContent.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
      var parentClass = links[i].parentElement.getAttribute("class");
      if (parentClass === "nav-item dropdown active") {
        links[i].parentElement.classList.remove("active");
        if (links[i].nextElementSibling !== null) {
          links[i].nextElementSibling.classList.remove("show");
        }
      }
    }
  }
  resetActiveLinks();

  function handleModeSwitching(id) {
    var lightModeSwitch = document.getElementById("light-mode-switch");
    var darkModeSwitch = document.getElementById("dark-mode-switch");
    var rtlModeSwitch = document.getElementById("rtl-mode-switch");
    var darkRtlModeSwitch = document.getElementById("dark-rtl-mode-switch");

    if (lightModeSwitch.checked && id === "light-mode-switch") {
      document.documentElement.removeAttribute("dir");
      darkModeSwitch.checked = false;
      rtlModeSwitch.checked = false;
      darkRtlModeSwitch.checked = false;
      document.documentElement.setAttribute("data-bs-theme", "light");
      sessionStorage.setItem("is_visited", "light-mode-switch");
    } else if (darkModeSwitch.checked && id === "dark-mode-switch") {
      document.documentElement.removeAttribute("dir");
      lightModeSwitch.checked = false;
      rtlModeSwitch.checked = false;
      darkRtlModeSwitch.checked = false;
      document.documentElement.setAttribute("data-bs-theme", "dark");
      sessionStorage.setItem("is_visited", "dark-mode-switch");
    } else if (rtlModeSwitch.checked && id === "rtl-mode-switch") {
      lightModeSwitch.checked = false;
      darkModeSwitch.checked = false;
      darkRtlModeSwitch.checked = false;
      document.documentElement.setAttribute("dir", "rtl");
      document.documentElement.setAttribute("data-bs-theme", "light");
      sessionStorage.setItem("is_visited", "rtl-mode-switch");
    } else if (darkRtlModeSwitch.checked && id === "dark-rtl-mode-switch") {
      lightModeSwitch.checked = false;
      rtlModeSwitch.checked = false;
      darkModeSwitch.checked = false;
      document.documentElement.setAttribute("dir", "rtl");
      document.documentElement.setAttribute("data-bs-theme", "dark");
      sessionStorage.setItem("is_visited", "dark-rtl-mode-switch");
    }
  }

  function handleFullscreenChange() {
    if (
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      console.log("pressed");
      document.body.classList.remove("fullscreen-enable");
    }
  }
  handleFullscreenChange();

  // Add event listeners
  document.getElementById("side-menu").metisMenu();
  document
    .getElementById("vertical-menu-btn")
    .addEventListener("click", function (e) {
      e.preventDefault();
      document.body.classList.toggle("sidebar-enable");
      if (window.innerWidth >= 992) {
        document.body.classList.toggle("vertical-collpsed");
      } else {
        document.body.classList.remove("vertical-collpsed");
      }
    });

  // Other event listeners...

  // Initialize language and other settings
  setLanguageFlag(language);
  if (!localStorage.getItem("language")) {
    setLanguageFlag("en");
  }

  // Language switch handler
  var languageButtons = document.querySelectorAll(".language");
  languageButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var lang = this.getAttribute("data-lang");
      localStorage.setItem("language", lang);
      setLanguageFlag(lang);
      // Reload page or update content with new language
    });
  });

  // Event listeners for mode switches
  document
    .getElementById("light-mode-switch")
    .addEventListener("change", function () {
      handleModeSwitching("light-mode-switch");
    });
  document
    .getElementById("dark-mode-switch")
    .addEventListener("change", function () {
      handleModeSwitching("dark-mode-switch");
    });
  document
    .getElementById("rtl-mode-switch")
    .addEventListener("change", function () {
      handleModeSwitching("rtl-mode-switch");
    });
  document
    .getElementById("dark-rtl-mode-switch")
    .addEventListener("change", function () {
      handleModeSwitching("dark-rtl-mode-switch");
    });

  // Other event listeners...
})();
