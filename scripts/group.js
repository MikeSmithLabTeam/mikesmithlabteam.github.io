"use strict";

//DOM elements
const currentMembers = Array.from(document.querySelectorAll("h3")).find(
  (el) => el.textContent === "Group members"
);
const pastMembers = Array.from(document.querySelectorAll("h3")).find(
  (el) => el.textContent === "Past members"
);

const colabs = Array.from(document.querySelectorAll("h3")).find(
  (el) => el.textContent === "Collaborators and Research Groups"
);



//Fns add details
const addCurrentMember = function (member, index) 
{
  if(member.webpage === null)
  { 
    {currentMembers.insertAdjacentHTML("afterend",
      `
      <blockquote>
      <div>
        <div class="summary-title">
          <h4>${member.name}</h4>
        </div>
        <div class="summary-container">
          <a class="summary-imgs"><img src="${member.img}" alt="${member.name}" class="float-left" height="140" /></a>
          <div class="summary-text">
            <p>${member.blurb}
          </div>
        </div>
        <br>
        <div class="email">
        <a href="mailto:${member.email}" class=float-right>E-mail</a>
        </div>    
      </div>
      </blockquote>
      `);
    }
  }
  else {
    {currentMembers.insertAdjacentHTML("afterend",
      `
      <blockquote>
      <div>
        <div class="summary-title">
          <h4>${member.name}</h4>
        </div>
        <div class="summary-container">
          <a href = ${member.webpage} class="summary-imgs"><img src="${member.img}" alt="${member.name}" class="float-left" height="140" /></a>
          <div class="summary-text">
            <p>${member.blurb}
          </div>
        </div>
        <div class="email">
        <a href="mailto:${member.email}">E-mail</a>
        </div>    
      </div>
      </blockquote>
      `);
    }
  };
}


const addPastMember = function(member, index){
  pastMembers.insertAdjacentHTML("afterend",
      `
      <blockquote>
      <div>
        <div class="summary-title">
          <h4>${member.name}</h4>
        </div>
        <div class="summary-container">
          <a class="summary-imgs"><img src="${member.img}" alt="${member.name}" class="float-left" height="140" /></a>
          <div class="summary-text">
            <p>${member.blurb}
          </div>
        </div>   
      </div>
      </blockquote>
      `);
};



const xhttp4 = new XMLHttpRequest();
xhttp4.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    // Typical action to be performed when the document is ready:
    const response = JSON.parse(xhttp4.responseText);
    console.log(response.current);
    
    response.past.reverse().forEach((member, index) => {
      addPastMember(member, index + 1);
    });

    response.current.reverse().forEach((member, index) => {
      addCurrentMember(member, index + 1);
    });
    
  }
};
xhttp4.open("GET", "resources/group.json", true);
xhttp4.send();

