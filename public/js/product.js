const hideAudio = document.querySelector(".hide-audio")
const visibleAudio = document.querySelector(".visible-audio")

visibleAudio.addEventListener("click",()=>{
    hideAudio.classList.toggle("active-audio")
    if(hideAudio.classList.contains("active-audio")){
        visibleAudio.innerHTML = "Show Less..."
    }else{
        visibleAudio.innerHTML = "View More..."
    }
})