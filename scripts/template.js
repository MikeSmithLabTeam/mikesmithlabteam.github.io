"use strict";

//DOM elements
const p_tag = Array.from(document.querySelectorAll("p")).find(el => el.className === "thumbs");
p_tag.insertAdjacentHTML("afterbegin", `<div class="loaded"></div>`);

const thumbnail = document.querySelector(".thumbs");
thumbnail.addEventListener('click',function(){
  const summary_blocks = document.getElementsByClassName("summary");
  [...summary_blocks].forEach(function(block){
    console.log(block.classList);
    if (block.classList.contains("hide-summary")){
      block.classList.remove("hide-summary");
       }
      })
})

//Fns add details
const addThumb = function (publication, index) {
    p_tag.insertAdjacentHTML("afterbegin", `<a href="researchsummary.html#${publication.tag}"><img src="${publication.img}" alt="${publication.tag}" height="75" width="75" /></a>` 	
  );

};

const xhttp2 = new XMLHttpRequest();
xhttp2.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    // Typical action to be performed when the document is ready:
    const response = JSON.parse(xhttp2.responseText);
    response.publications.reverse().forEach((publication, index) => { addThumb(publication, index + 1); });
  }
};
xhttp2.open("GET", "resources/publications.json", true);
xhttp2.send();

 

  