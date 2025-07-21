"use strict";

//DOM elements
const filter_buttons = Array.from(document.querySelectorAll("div")).find(
  (el) => el.id === "myBtnContainer"
);
const summaryHeading = Array.from(document.querySelectorAll("div")).find(
  (el) => el.id === "start"
);
const overlayHeading = document.querySelector(".overlay");


//Add filter buttons

//filters.keywords.forEach()

const filterfunction = function(keyword){
  console.log(keyword);
}

//Fns add details
const addButton = function(keyword){
  filter_buttons.insertAdjacentHTML("afterbegin", `<button class="filterbtn" id=filter${keyword}> ${keyword}</button>`)
  

}

filter_buttons.addEventListener('click',function(){
  //remove active from current
  const current = document.getElementById("myBtnContainer");
  for (const child of current.children) {
    child.classList.remove("current");
  }
  
  //Add active to clicked button.
  const active_btn = document.getElementById(event.target.id);
  active_btn.className += " current";
   
  const summary_blocks = document.getElementsByClassName("summary");
  [...summary_blocks].forEach(function(block){
    if (!block.getAttribute('keywords').includes(event.target.id.replace("filter",""))){
      console.log()
      block.classList.add("hide-summary");
    }else{
      block.classList.remove("hide-summary");
    }  })
})

const addSummary = function (publication) {
  if (publication.summary !== null) {
    //Don't create summary if text is missing.
    //Summaries without vids
    if (publication.vid === null) {
      summaryHeading.insertAdjacentHTML(
        "afterend",
        `<a name="${publication.tag}" id=${publication.tag}></a> 
      <blockquote class="summary" keywords=${publication.keywords}>
      <div>
        <div class="summary-title">
          <h3>${publication.title}</h3>
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
      `
      );
    } //Summaries with vids
    else {
      summaryHeading.insertAdjacentHTML(
        "afterend",
        `
        <a name="${publication.tag}" id=${publication.tag}></a> 
        
      <blockquote class="summary" keywords=${publication.keywords}>
      <div>
        <div class="summary-title">
          <h3>${publication.title}</h3>
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
        `
      );
    }
    if (publication.vid === null) {
      overlayHeading.insertAdjacentHTML(
        "afterend",
        `<!-- modal window -->
      
      <div class="modal hidden" id=${publication.tag}>
        <div class="summary-title">
        <button class="close-modal">&times;</button>
          <h3>${publication.title}</h3>
        </div>
        <div class="summary-container">
          <a class="summary-imgs"><img src="${publication.img}" alt="${publication.tag}" class="float-left" height="140" width="140" /></a>
          <div class="summary-text">
             <p>${publication.summary}</p>
             <br>
             <p>${publication.full}</p>
             <br>
             <a href="publications.html#${publication.tag}" class="float-right">Read the paper</a>
             <br>
          </div>
        </div>
        <div>  
            <button class="close-button">Close</button> 
        </div>
      </div>
      
      `
      );
    } //full with vids
    else {
      overlayHeading.insertAdjacentHTML(
        "afterend",
        `<!-- modal window -->
      <div class="modal hidden" id=${publication.tag}>
        <div class="summary-title">
        <button class="close-modal">&times;</button>
          <h3>${publication.title}</h3>
        </div>
        <div class="summary-container">
          <p class="summary-imgs"><video controls="controls" autoplay="autoplay muted" loop="loop" width="140" height="140" class="float-left" poster="${publication.img}">
          <source src="${publication.vid}" type="video/mp4" />
          </video></p>
        <div class="summary-text">
        <p>${publication.summary}</p>
        <br>
        <p>${publication.full}</p>
        <br>
        <a href="publications.html#${publication.tag}" class="float-right">Read the paper</a>
        <br>
          </div>
        </div>
        
        <div>  
        
            <button class="close-button"">Close</button> 
          </div>
      </div>
      `
      );
    }
  }
};


//Fetch jsons and execute functions
const xhttp4 = new XMLHttpRequest();
xhttp4.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    // Typical action to be performed when the document is ready:
    const response = JSON.parse(xhttp4.responseText);
    //response.keywords.reverse().forEach((keyword) => {
      //addButton(keyword);
    //});
  }
};






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


xhttp4.open("GET", "resources/filters.json", true);
xhttp4.send();