let headings: NodeListOf<HTMLHeadingElement> = document.querySelectorAll(
  "h1, h2, h3, h4, h5, h6"
);
for (let i = 0; i < headings.length; i++) {
  console.log(
    `${headings[i].textContent?.trim()} ${headings[i].tagName}, ${headings[i]}`
  );
}