/* ghost-model */

const ghostModel = document.getElementById("ghost-model");
const sections = Array.from(document.querySelectorAll("section"));

const shiftPositions = [0, -20, 0, 25];
const cameraOrbits = [
  [90, 90],
  [-45, 90],
  [-180, 0],
  [45, 90]
];

const sectionOffsets = sections.map(section => section.offsetTop);
const lastSectionIndex = sections.length - 1;

const interpolate = (start, end, progress) => start + (end - start) * progress;

const getScrollProgress = (scrollY) => {
  for (let i = 0; i < lastSectionIndex; i++) {
    if (scrollY >= sectionOffsets[i] && scrollY < sectionOffsets[i + 1]) {
      return (
        i +
        (scrollY - sectionOffsets[i]) /
          (sectionOffsets[i + 1] - sectionOffsets[i])
      );
    }
  }
  return lastSectionIndex;
};

window.addEventListener("scroll", () => {
  const scrollProgress = getScrollProgress(window.scrollY);
  const sectionIndex = Math.floor(scrollProgress);
  const sectionProgress = scrollProgress - sectionIndex;

  const currentShift = interpolate(
    shiftPositions[sectionIndex],
    shiftPositions[sectionIndex + 1] ?? shiftPositions[sectionIndex],
    sectionProgress
  );

  const currentOrbit = cameraOrbits[sectionIndex].map((val, i) =>
    interpolate(
      val,
      cameraOrbits[sectionIndex + 1]?.[i] ?? val,
      sectionProgress
    )
  );

  ghostModel.style.transform = `translateX(${currentShift}%)`;
  ghostModel.setAttribute(
    "camera-orbit",
    `${currentOrbit[0]}deg ${currentOrbit[1]}deg`
  );
});

/* firefly-model */
const firefly = document.getElementById("firefly");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const progress = Math.min(scrollY / maxScroll, 1); // 0 to 1

  // Size grows from 40px to 300px
  const startSize = 40;
  const maxSize = 300;
  const currentSize = startSize + progress * (maxSize - startSize);

  // Firefly flies up and right from mushroom
  const flyDistance = 300;
  const offsetX = progress * flyDistance;
  const offsetY = -progress * flyDistance; // upward

  firefly.style.width = `${currentSize}px`;
  firefly.style.height = `${currentSize}px`;

  firefly.style.transform = `
    translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))
    scale(${0.3 + progress * 0.7})
  `;
});


/* Indicator */

let tabs = document.querySelectorAll('.tab');
let indicator = document.querySelector(".indicator");
const all = document.querySelectorAll(".indicator");
const e_commerce = document.querySelectorAll("e_commerce");
const landing = document.querySelectorAll("landing");
const business = document.querySelectorAll("business");

indicator.style.width = tabs[0].getBoundingClientRect().width + "px";
indicator.style.left = tabs[0].getBoundingClientRect().left - tabs[0].parentElement.getBoundingClientRect().left + "px";

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        indicator.style.width = tab.getBoundingClientRect().width + "px";
        indicator.style.left = tab.getBoundingClientRect().left - tab.
        parentElement.getBoundingClientRect().left + "px";

        tabs.forEach(t => t.classList.remove("text-whiteColor"));
        tab.classList.add("text-whiteColor");

        const tabval = tab.getAttribute("data-tabs");

        all.forEach(item => {
            item.style.display = "none"
        });

        if(tabval == "e_commerce") {
            e_commerce.forEach(item => {
            item.style.display = "block"
        });

        } else if(tabval == "business") {
            business.forEach(item => {
            item.style.display = "block"
        });
    } else if(tabval == "landing") {
            landing.forEach(item => {
            item.style.display = "block"
        });
    } else {
        all.forEach(item => {
            item.style.display = "block"
        });
    }
    })
});