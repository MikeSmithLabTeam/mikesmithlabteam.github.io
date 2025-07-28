"use strict";

//DOM elements
const publicationHeading = Array.from(document.querySelectorAll("h2")).find(el => el.textContent === "Publications");

//Fns add details
const addPub = function (publication, index) {
  publicationHeading.insertAdjacentHTML(
    "afterend",
    `<a Name = "${publication.tag}"></a>
    <b>${index}. ${publication.title}</b>
    <br>${publication.authors.map((name, index) =>
      index === 0 ? name : "&nbsp;" + name
    )} &nbsp; 
    ${publication.journal}	${publication.volume}, 
    ${publication.pages} (${publication.year})<br>
    <a href=https://mikesmithlabteam.github.io/${publication.pdf} target="_blank"><strong>pdf</strong></a>
    <a href=${publication.web} target="_blank">&nbsp;<strong>web</strong></a> 
    <br>
    `
  );

};

const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    // Typical action to be performed when the document is ready:
    const response = JSON.parse(xhttp.responseText);
    response.publications.reverse().forEach((publication, index) => {
      addPub(publication, index + 1);
    });
  }
};
xhttp.open("GET", "resources/publications.json", true);
xhttp.send();
