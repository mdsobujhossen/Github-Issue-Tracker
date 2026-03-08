const allTabBtn = document.getElementById("all-tab-btn")
const openTabBtn = document.getElementById("open-tab-btn")
const closedTabBtn = document.getElementById("closed-tab-btn")
const cardContainer = document.getElementById("card-container")
const issueCount = document.getElementById("issueCount")
const spinnerContainer = document.getElementById("loading-spinner")
const allTabs = ["all", "open", "closed"]
const allIssues = []


const showLoadingSpinner = () => {
    spinnerContainer.classList.remove("hidden")
    spinnerContainer.classList.add("flex")
    
}
const hideLoadingSpinner = () => {
    spinnerContainer.classList.add("hidden")
}

// priority style fucntion
const showPriorityStyle = (priority) => {
    if (priority == "high") {
        return "badge-secondary"
    }
    else if (priority == "medium") {
        return "badge-warning"
    }
    else if (priority == "low") {
        return "badge-primary"
    }
}

// show labels
const showLabels = (arr) => {
    const labelsContainer = document.createElement("div")
    labelsContainer.className = "mt-4 flex flex-wrap gap-2"
    arr.forEach(item => {

        if (item == "bug") {
            const labelDiv = document.createElement("div");
            labelDiv.className = "badge badge-soft badge-warning rounded-full bg-[#FEECEC] text-[#EF4444] py-3 border border-[#FECACA]"
            labelDiv.innerHTML = `
            <img src="./assets/BugDroid.png" alt=""> Bug
            `
            labelsContainer.append(labelDiv)
        }
        else if (item == "help wanted") {
            const labelDiv = document.createElement("div");
            labelDiv.className = "badge badge-soft badge-warning rounded-full bg-[#FFF8DB] text-[#D97706] py-3 border border-[#FDE68A]"
            labelDiv.innerHTML = `
            <img class="w-3" src="./assets/Lifebuoy.png" alt=""> Help Wanted
            `
            labelsContainer.append(labelDiv);
        }
        else if (item == "enhancement") {
            const labelDiv = document.createElement("div");
            labelDiv.className = "badge badge-soft badge-success rounded-full bg-[#DEFCE8] text-[#00A96E] py-3 border border-[#BBF7D0]"
            labelDiv.innerHTML = `
            <img class="w-3" src="./assets/Sparkle.png" alt=""> enhancement
            `
            labelsContainer.append(labelDiv)
        }
        else if (item == "documentation") {
            const labelDiv = document.createElement("div");
            labelDiv.className = "badge badge-soft badge-success rounded-full bg-[#DEFCE8]/50 text-[#00A96E]/50 py-3 border border-[#BBF7D0]/50"
            labelDiv.innerHTML = `
            <img class="w-3" src="./assets/Sparkle.png" alt=""> ${item}
            `
            labelsContainer.append(labelDiv)
        }
    });
    return labelsContainer.outerHTML
}


// load all issue
const loadAllIssue = async () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    const res = await fetch(url)
    const data = await res.json()
    displayIssue(data.data);
    loadFilterissue(data.data);

}



const loadFilterissue = (allIssue) => {
    allIssue.forEach(issue => {
        allIssues.push(issue)
    });
}






// object
//     "id": 1,
//     "title": "Fix navigation menu on mobile devices",
//     "description": "The navigation menu doesn't collapse properly on mobile
//                      devices. Need to fix the responsive behavior.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "help wanted"
//     ],
//     "priority": "high",
//     "author": "john_doe",
//     "assignee": "jane_smith",
//     "createdAt": "2024-01-15T10:30:00Z",
//     "updatedAt": "2024-01-15T10:30:00Z"
// 

const displayIssue = (allIssue) => {
    showLoadingSpinner()
    cardContainer.innerHTML = ''
    allIssue.forEach(issue => {
        const card = document.createElement("div")
        card.addEventListener("click", () =>{
            showIssueDetails.showModal()
        })
        card.className = `issue-card border-t-4 ${issue.status === "open" ? "border-[#00A96E]" : "border-[#A855F7]"}  rounded-sm bg-white shadow py-4 flex flex-col justify-between `
        card.innerHTML = `
        <!-- status top -->
                    <div class="flex justify-between px-3 mb-3">
                        <img src=${issue.status === "open" ? "./assets/Open-Status.png" : "./assets/closed-status.png"} alt="">
                        <div class="badge badge-soft ${showPriorityStyle(issue.priority)} rounded-full shadow">${issue.priority}</div>
                    </div>
                    <!-- info middle -->
                    <div class="px-3 space-y-2">
                        <h2 class="text-[#1F2937] text-[14px] font-semibold  line-clamp-2">${issue.title}</h2>
                        <p class="text-[#64748B] text-[12px] line-clamp-2">${issue.description}</p>

                        <!-- labels -->
                        ${showLabels(issue.labels)}
                    </div>

                    <!-- bottom created info -->
                    <div class="border-t border-gray-300 mt-4 px-3 pt-3 space-y-1">
                        <p class="text-[#64748B] text-[12px]">${issue.author}</p>
                        <p class="text-[#64748B] text-[12px]">${issue.createdAt}</p>
                        
                    </div>
        `
        cardContainer.append(card)
    });
    hideLoadingSpinner()
    updateIssueCount()

}

// update counter
function updateIssueCount () {
    issueCount.innerText = cardContainer.children.length
    console.log(allIssues);
    
}



// tab selection
const selectTab = (tab) => {
    allTabs.forEach(item => {
        const singleTab = document.getElementById(item);
        singleTab.classList.remove("btn-primary")
    });
    const currentTab = document.getElementById(tab)
    currentTab.classList.add("btn-primary")


    // show card with tab selection
    if (tab == "all") {
        displayIssue(allIssues)
    }
    else if (tab == "open") {
        const openIssue = allIssues.filter(issue => issue.status == "open")
        displayIssue(openIssue)
    }
    else if (tab == "closed") {
        const closedIssue = allIssues.filter(issue => issue.status == "closed")
        displayIssue(closedIssue)
    }
}



loadAllIssue()  
