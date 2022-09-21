let modals;
let overlay;
let btnCloseModal;
let btnOpenModal;

waitDynamicContentLoad = function () {
  //Have to wait for dynamic content to load before adding event listeners
  btnOpenModal = document.querySelectorAll(".open-button");
  btnCloseModal = document.querySelectorAll(".close-modal");
  btnCloseBtns = document.querySelectorAll(".close-button");

  if (btnOpenModal.length) {
    //Scroll to appropriate section of page - relevant if clicked on thumbnail on different page
    const openModal = function () 
    {     
        overlay.classList.remove("hidden");
        modals.forEach((modal) => 
        {
          if ('button-' + modal.id == this.id)
          {
            //Find the correct modal window and make it visible.  
            modal.classList.remove('hidden');
          };
            
        });
    };

    const closeModal = function (){
      overlay.classList.add("hidden");
      modals.forEach((modal)=>
      {
        if (!modal.classList.contains('hidden'))
        {
           modal.classList.add("hidden");
        };
      });
    };

    modals = document.querySelectorAll(".modal");
    overlay = document.querySelector(".overlay");

    btnOpenModal.forEach((btn, i) => btn.addEventListener("click", openModal));
    btnCloseModal.forEach((btn, i) => btn.addEventListener("click", closeModal));
    btnCloseBtns.forEach((btn,i) => btn.addEventListener("click",closeModal));
    overlay.addEventListener("click", closeModal);

  
  const queryString = window.location.href;
    if (queryString.includes('#'))
    {
      window.location.href = queryString;
    }
  } 
  else 
  {
    setTimeout(waitDynamicContentLoad, 500); // try again in 300 milliseconds
  }
};

waitDynamicContentLoad();
