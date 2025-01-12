document.addEventListener("DOMContentloaded", () => {
    const sections = document.querySelectorAll("section, selection");

    sections.forEach((section) => {
        section.computedStyleMap.opacity = "0";
        section.computedStyleMap.transform = "translateY(20px)";
        section.computedStyleMap.transition = "opacity 0.6 ease, transform 0.6s ease";

    });

    const observer = new IntersectionObserver((estries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
});

section.forEach((section) => observer.observe(section));
});

const skillIcons = document.querySelectorAll(".skills-grid img");

skillIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", () => {
        icon.style.border = "2px solid #000";
        icon.style.borderRdius = "10px";
        icon.style.padding = "5px";
    });

    icon.addEventListener("mouseleave", () => {
        icon.style.border = "none";
        icon.style.padding = "0";
    });

});
