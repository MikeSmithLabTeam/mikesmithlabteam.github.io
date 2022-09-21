"use strict";

//DOM elements
const summaryHeading = Array.from(document.querySelectorAll("h3")).find(
  (el) => el.textContent === "Research Summaries"
);

const overlayHeading = document.querySelector('.overlay');

//Fns add details
const addSummary = function (publication) 
{
  if (publication.summary !== null)
  {//Don't create summary if text is missing.
    //Summaries without vids
    if (publication.vid === null) 
    {summaryHeading.insertAdjacentHTML("afterend",
      `<a name="${publication.tag}" id=${publication.tag}></a> 
      <blockquote>
      <div>
        <div class="summary-title">
          <h4>${publication.title}</h4>
        </div>
        <div class="summary-container">
          <a class="summary-imgs"><img src="${publication.img}" alt="${publication.tag}" class="float-left" height="140" width="140" /></a>
          <div class="summary-text">
             <p>${publication.summary}
          </div>
        </div>
        <div class="summary-button">  
          <button class="open-button", id="button-${publication.tag}">Read More</button> 
        </div>
      </div>
      </blockquote>
      `);
    }//Summaries with vids
    else {
        summaryHeading.insertAdjacentHTML("afterend",
        `
        <a name="${publication.tag}" id=${publication.tag}></a> 
        
      <blockquote>
      <div>
        <div class="summary-title">
          <h4>${publication.title}</h4>
        </div>
        <div class="summary-container">
        <p class="summary-imgs"><video controls="controls" autoplay="autoplay muted" loop="loop" width="140" height="140" class="float-left" poster="${publication.img}">
        <source src="${publication.vid}" type="video/mp4" />
        </video></p>
            <div class="summary-text">
              <p>${publication.summary}
            </div>
          </div>
          <div class="summary-button">  
            <button class="open-button", id="button-${publication.tag}">Read More</button> 
          </div>
        </div>
        </blockquote>
        `);      

    }
    if (publication.vid === null){
    overlayHeading.insertAdjacentHTML('afterend',
      `<!-- modal window -->
      
      <div class="modal hidden" id=${publication.tag}>
        <div class="summary-title">
        <button class="close-modal">&times;</button>
          <h2>${publication.title}</h2>
        </div>
        <div class="summary-container">
          <a class="summary-imgs"><img src="${publication.img}" alt="${publication.tag}" class="float-left" height="140" width="140" /></a>
          <div class="summary-text">
             <p>${publication.summary}
             <p>${publication.full}
          </div>
        </div>
        <div>  
            <button class="close-button">Close</button> 
          </div>
      </div>
      
      `
    )}//full with vids
    else{
      overlayHeading.insertAdjacentHTML("afterend",
      `<!-- modal window -->
      <div class="modal hidden" id=${publication.tag}>
        <div class="summary-title">
        <button class="close-modal">&times;</button>
          <h2>${publication.title}</h2>
        </div>
        <hr>
        <div class="summary-container">
          <p class="summary-imgs"><video controls="controls" autoplay="autoplay muted" loop="loop" width="140" height="140" class="float-left" poster="${publication.img}">
          <source src="${publication.vid}" type="video/mp4" />
          </video></p>
        <div class="summary-text">
        <p>${publication.summary}
        <p>${publication.full}
        <br>
        <a href="publications.html#${publication.tag}" class="float-right">Read the paper</a>
        <br>
          </div>
        </div>
        
        <div>  
        
            <button class="close-button"">Close</button> 
          </div>
      </div>
      `); 

    }
     
  };
}

const xhttp3 = new XMLHttpRequest();
xhttp3.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    // Typical action to be performed when the document is ready:
    const response = JSON.parse(xhttp3.responseText);
    response.publications.reverse().forEach((publication) => {
      addSummary(publication);
    });
    
  }
};
xhttp3.open("GET", "resources/publications.json", true);
xhttp3.send();

