const allTabBtn = document.getElementById("all-tab-btn")
const openTabBtn = document.getElementById("open-tab-btn")
const closedTabBtn = document.getElementById("closed-tab-btn")
const cardContainer = document.getElementById("card-container")
const issueCount = document.getElementById("issueCount")
const spinnerContainer = document.getElementById("loading-spinner")
const issueDetailsModal = document.getElementById("showIssueDetails")
const allTabs = ["all", "open", "closed"]
const allIssues = []



// "id": 3,
// "title": "Update README with installation instructions",
// "description": "The README file needs better installation instructions for new contributors.",
// "status": "closed",
// "labels": [
//     "documentation"
// ],
// "priority": "low",
// "author": "mike_docs",
// "assignee": "sarah_dev",
// "createdAt": "2024-01-10T08:00:00Z",
// "updatedAt": "2024-01-12T16:45:00Z"



// open issue modal
const openIssueModal = async (issueId) => {
    console.log(issueId);
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`
    const res = await fetch(url)
    const data = await res.json()
    const issueDetails = data.data;
    console.log(issueDetails);

    issueDetailsModal.innerHTML = `
            <div class="modal-box">
                <h3 class="text-2xl font-semibold">${issueDetails.title}</h3>
                <div class="flex items-center gap-2 mt-3">
                    <div class="badge badge-success">Opened</div>
                    <i class="fa-solid fa-circle text[#64748B] text-[4px]"></i>
                    <p class="text-[#64748B] text-[12px] leading-3">${issueDetails.author}</p>
                    <i class="fa-solid fa-circle text[#64748B] text-[4px]"></i>
                    <p class="text-[#64748B] text-[12px] leading-3">${issueDetails.createdAt}</p>
                </div>

                <!-- labels -->
                ${showLabels(issueDetails.labels)}


                <p class="text-[#64748B] mt-6">${issueDetails.description}</p>
                <div class="mt-6 grid grid-cols-2 bg-[#F8FAFC] p-5 rounded-lg shadow">
                    <div>
                        <p class="text-[#64748B]">Assignee:</p>
                        <p class="font-semibold">${issueDetails.assignee}</p>
                    </div>
                    <div>
                        <p class="text-[#64748B]">Priority:</p>
                        <div class="badge ${showPriorityStyle(issueDetails.priority)} rounded-full">${issueDetails.priority}</div>
                    </div>
                </div>
            </div>
            <form method="dialog" class="modal-backdrop">
                
                <button>close</button>
            </form>
    `


    issueDetailsModal.showModal()

}



// shw loading spinner
const showLoadingSpinner = () => {
    spinnerContainer.classList.remove("hidden")
    spinnerContainer.classList.add("flex")

}
// hide loading spinner
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
        card.addEventListener("click", () => {
            openIssueModal(issue.id)
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
function updateIssueCount() {
    issueCount.innerText = cardContainer.children.length

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



const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn")

searchBtn.addEventListener("click", async()=>{
    allTabs.forEach(item => {
        const singleTab = document.getElementById(item);
        singleTab.classList.remove("btn-primary")
    });
    const searchValue = searchInput.value
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`
    const res = await fetch(url)
    const data = await res.json()
    displayIssue(data.data);
    searchInput.value = ' '
})




loadAllIssue()  
