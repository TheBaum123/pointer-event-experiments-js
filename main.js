document.addEventListener("pointerdown", (e) => {
    const dot = document.createElement("div")
    dot.id = e.pointerId
    dot.classList.add("dot")
    doDotShit(dot, e)
    document.body.appendChild(dot)
    console.log(e)
})

document.addEventListener("pointermove", (e) => {
    const dot = document.getElementById(e.pointerId)
    doDotShit(dot, e)
})

document.addEventListener("pointerup", (e) => {
    const dot = document.getElementById(e.pointerId)
    document.body.removeChild(dot)
})

function doDotShit(dot, e) {
    if(dot) {
        
        dot.style.top = e.pageY + "px"
        dot.style.left = e.pageX + "px"
        if(e.pointerType == "touch") { 
            dot.style.height = (e.height + 10) * e.pressure * 2 + "px"
            dot.style.width = (e.width + 10) * e.pressure * 2 + "px"
        }
        if(e.pointerType == "pen") {
            dot.style.height = (Math.abs(e.tiltY) + 10) * e.pressure * 2 + "px"
            dot.style.width = (Math.abs(e.tiltX) + 10) * e.pressure * 2 + "px"
        }
        
    }
}

const screenHeight = document.body.clientHeight
const screenWidth = document.body.clientWidth

let score = 0

const randomInterval = setInterval(() => {
    if(document.getElementById("randomPoint")) {
        const randomPointRect = document.getElementById("randomPoint").getBoundingClientRect()
        const dot = document.getElementById("0")
        const dotRect = dot.getBoundingClientRect()
        var overlap = !(dotRect.right < randomPointRect.left || 
            dotRect.left > randomPointRect.right || 
            dotRect.bottom < randomPointRect.top || 
            dotRect.top > randomPointRect.bottom)
        if(overlap) score++
        if(!overlap) score = 0
        document.body.removeChild(document.getElementById("randomPoint"))
    }
    const randomHeight = (Math.floor(Math.random() * (screenHeight - 100))) + 51
    const randomWidth = (Math.floor(Math.random() * (screenHeight - 100))) + 51
    const randomPoint = document.createElement("div")
    randomPoint.id = "randomPoint"
    randomPoint.classList.add("dot")
    randomPoint.style.top = randomHeight + "px"
    randomPoint.style.left = randomWidth + "px"
    randomPoint.style.height = "2.5vh"
    randomPoint.innerText = score
    document.body.appendChild(randomPoint)
    console.log(randomHeight)
    console.log(randomWidth)
}, 2000);