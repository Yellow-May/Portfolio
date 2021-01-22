"use strict";
const navBtn = document.getElementById("navBtn");
const nav = document.getElementById("nav");
const navBar = nav === null || nav === void 0 ? void 0 : nav.parentElement;
const homeSection = document.querySelector(".home");
const skillSection = document.querySelector(".skills");
const projectSection = document.querySelector(".projects");
const homeBtn = document.getElementById("home");
const skillBtn = document.getElementById("skills");
const projectBtn = document.getElementById("projects");
const contactBtn = document.getElementById("contact");
const openNav = ({ navBtn, nav, navBar }) => {
    navBtn.classList.add("opened");
    nav.style.top = "0";
    navBar.style.position = "fixed";
};
const closeNav = ({ navBtn, nav, navBar }) => {
    navBtn.classList.remove("opened");
    nav.style.top = "-100vh";
    navBar.style.position = "relative";
};
const navBtnNavigation = ({ navBtn, nav, navBar, section }) => {
    if (navBtn === null || navBtn === void 0 ? void 0 : navBtn.classList.contains("opened"))
        closeNav({ navBtn, nav, navBar });
    window.scrollTo(0, section ? section : 0);
};
if (navBtn &&
    nav &&
    navBar &&
    homeSection &&
    skillSection &&
    projectSection &&
    homeBtn &&
    skillBtn &&
    projectBtn &&
    contactBtn) {
    navBtn.addEventListener("click", () => {
        navBtn.classList.contains("opened")
            ? closeNav({ navBtn, nav, navBar })
            : openNav({ navBtn, nav, navBar });
    });
    homeBtn.addEventListener("click", () => {
        navBtnNavigation({ navBtn, nav, navBar, section: 0 });
    });
    skillBtn.addEventListener("click", () => {
        navBtnNavigation({
            navBtn,
            nav,
            navBar,
            section: homeSection.clientHeight,
        });
    });
    projectBtn.addEventListener("click", () => {
        navBtnNavigation({
            navBtn,
            nav,
            navBar,
            section: homeSection.clientHeight + skillSection.clientHeight,
        });
    });
    contactBtn.addEventListener("click", () => {
        navBtnNavigation({
            navBtn,
            nav,
            navBar,
            section: homeSection.clientHeight +
                skillSection.clientHeight +
                projectSection.clientHeight,
        });
    });
}
const moreBtn = document.getElementById("moreBtn");
const moreDiv = document.getElementById("more");
if (moreBtn && moreDiv) {
    moreBtn.addEventListener("click", () => {
        moreDiv.classList.toggle("active");
    });
}
const backToTopBtn = document.getElementById("backToTop");
if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo(0, 0);
    });
}
const techs = document.querySelector(".techs");
const cards = techs === null || techs === void 0 ? void 0 : techs.querySelectorAll(".card");
const refreshBtn = document.getElementById("refreshTechs");
if (cards && refreshBtn) {
    cards.forEach(card => card.addEventListener("click", () => {
        cards.forEach(cardS => {
            if (cardS === card)
                cardS.classList.add("open");
            else
                cardS.classList.add("close");
            refreshBtn.style.display = "block";
        });
    }));
    refreshBtn.addEventListener("click", () => {
        cards.forEach(card => {
            if (card.classList.contains("open"))
                card.classList.remove("open");
            else
                card.classList.remove("close");
            refreshBtn.style.display = "none";
        });
    });
}
const messageForm = document.getElementById("message");
const email = document.getElementById("userEmail");
const modalDiv = document.getElementById("modalMessage");
const modalMessage = modalDiv === null || modalDiv === void 0 ? void 0 : modalDiv.querySelector("p");
const modalBtn = modalDiv === null || modalDiv === void 0 ? void 0 : modalDiv.querySelector("button");
if (messageForm && modalDiv && modalBtn && modalMessage) {
    const success = () => {
        messageForm.reset();
        modalDiv.style.top = "0";
        modalMessage.innerHTML =
            "Thank you for contacting me, will be sure to get back to you if neccessary.";
    };
    const error = (messageText) => {
        messageForm.reset();
        modalDiv.style.top = "0";
        modalMessage.innerHTML = messageText;
    };
    const ajaxCall = (method, url, data, success, error) => {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== XMLHttpRequest.DONE)
                return;
            if (xhr.status === 200) {
                success();
            }
            else {
                error("Oops! There was a problem.");
            }
        };
        xhr.send(data);
    };
    messageForm.addEventListener("submit", e => {
        e.preventDefault();
        const data = new FormData(messageForm);
        const res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (res.test(email.value)) {
            ajaxCall(messageForm.method, messageForm.action, data, success, error);
        }
        else
            error("Invalid Email address!, please check again");
    });
    modalBtn.addEventListener("click", () => {
        modalDiv.style.top = "-100%";
    });
}
