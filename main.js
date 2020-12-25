
for (let i = 0; i < 200; i ++) {
    let div = document.createElement("div");
    div.className = "divs";
    div.innerHTML = i
    document.querySelector(".grid").appendChild(div);
}