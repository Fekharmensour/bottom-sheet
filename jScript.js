const showBottomModal =document.querySelector(".show-bottom")
const bottm_sheet =document.querySelector(".bottom-sheet")
const sheetOverlay =bottm_sheet.querySelector(".sheet-ovelay")
const drag_icon =bottm_sheet.querySelector(".drag-icon")
const sheet_Content =bottm_sheet.querySelector(".content")

let isDragging=false , startY , startHeight;

const show_btnSheet=()=>{
    bottm_sheet.classList.add("show")
    UpdatSheetheight(40)
    document.body.style.overflowY="hiddng"
}

const remove_btnSheet=()=>{
    bottm_sheet.classList.remove("show")
    document.body.style.overflowY="auto"
}

const UpdatSheetheight = (height)=>{
    sheet_Content.style.height= `${height}vh`;
    bottm_sheet.classList.toggle("fullscreen", height === 100);
}

const dragging=(e)=>{
    if(!isDragging)return;
    const delta =startY - (e.pageY || e.touches?.[0].pageY);
    const  newHeight =startHeight + delta / window.innerHeight * 100
    UpdatSheetheight(newHeight)
}

const dragStar=(e)=>{
    isDragging=true;
    startY=e.pageY || e.touches?.[0].pageY;
    startHeight=parseInt(sheet_Content.style.height)
    bottm_sheet.classList.add("dragging")
}

const dragStop=()=>{
    isDragging=false;
    bottm_sheet.classList.remove("dragging")
    const seetheight =parseInt(sheet_Content.style.height)
    seetheight < 30 ? remove_btnSheet() :seetheight > 70 ? UpdatSheetheight(100) : UpdatSheetheight(50);
}
showBottomModal.addEventListener("click",show_btnSheet)

sheetOverlay.addEventListener("click",remove_btnSheet)

document.addEventListener("mouseup",dragStop)
drag_icon.addEventListener("mousedown",dragStar)
document.addEventListener("mousemove",dragging)

document.addEventListener("touchend",dragStop)
drag_icon.addEventListener("touchstart",dragStar)
document.addEventListener("touchmove",dragging)