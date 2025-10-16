export function toggleColorScheme() {
  const toColorScheme = localStorage.theme === "light" ? "dark" : "light";
  setLocalStorageColorScheme(toColorScheme);
  toggleDarkClass();
};

export function initializeColorScheme() {
  if (!("theme" in localStorage)) {
    localStorage.theme = "light";
  }
  toggleDarkClass();
}

function toggleDarkClass() {
  document.documentElement.classList.toggle(
    "dark",
    localStorage.theme === "dark"
  );
}

function setLocalStorageColorScheme(scheme) {
  localStorage.theme = scheme === "dark" ? "dark" : "light";
};
