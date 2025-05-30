const header = document.querySelector('#header-container');
const footer = document.querySelector('#footer-container');

async function loadComponent(url, container) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    container.innerHTML = text;
  } catch (error) {
    console.error(`Error loading component from ${url}:`, error);
  }
}

loadComponent('/components/header.html', header);
loadComponent('/components/footer.html', footer);
