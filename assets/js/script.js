document.addEventListener("DOMContentLoaded", function() {
    // First IntersectionObserver for chapters
    const chapters = document.querySelectorAll('.text > div > p > mark');
    const imageContainer = document.querySelector('.images');
    const chapterDescriptions = {
        venus: "The Venus of Willendorf",
        venus_head: "Close-ups of the head of the Venus of Willendorf",
        traces: "Oldest known imprints of textiles",
        madonna: "Madonna dell’Umiltà, c. 1353",
        hons: "Chicken knit manual",
        criminals: "The accused and their sweaters ",
        lisa: "Let the people rule!-sweater by Lisa Anne Aurbach",
        // Add more descriptions for other chapters as needed
    };
    let currentVisibleChapter = null;

    // Function to handle the intersection observer callback for chapters
    function handleChapterIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentChapter = entry.target.id;
                const imagePath = `assets/images/${currentChapter}.png`;
                const description = chapterDescriptions[currentChapter];

                // Create image element
                const image = document.createElement('img');
                image.src = imagePath;
                image.alt = `${currentChapter} image`;

                // Create image description element
                const descriptionElement = document.createElement('p');
                descriptionElement.classList.add('description');
                descriptionElement.textContent = description;

                // Clear previous content
                imageContainer.innerHTML = '';

                // Append image and description
                imageContainer.appendChild(image);
                imageContainer.appendChild(descriptionElement);

                currentVisibleChapter = currentChapter;
            } else if (entry.target.id === currentVisibleChapter) {
                imageContainer.innerHTML = '';
                currentVisibleChapter = null;
            }
        });
    }

    // Function to set observer threshold based on screen size for chapters
    function setChapterObserverThreshold() {
        const screenWidth = window.innerWidth;
        const threshold = screenWidth < 779 ? 0.5 : 0.9; // Adjust threshold based on screen width
        console.log("Chapter observer threshold set to:", threshold);
        return threshold;
    }

    // Initialize IntersectionObserver for chapters with dynamically determined threshold
    const chapterObserver = new IntersectionObserver(handleChapterIntersection, { threshold: setChapterObserverThreshold() });

    // Observe chapters
    chapters.forEach(chapter => {
        chapterObserver.observe(chapter);
    });

    // Update threshold when the window is resized for chapters
    window.addEventListener('resize', () => {
        chapterObserver.disconnect(); // Disconnect the observer before updating threshold
        chapterObserver.thresholds = [setChapterObserverThreshold()]; // Update the threshold
        chapters.forEach(chapter => {
            chapterObserver.observe(chapter); // Re-observe chapters with updated threshold
        });
    });

    // Second IntersectionObserver for footnotes

    const footnotes = document.querySelectorAll('.text div a[href^="#fn"]');
const footnotesContainer = document.querySelector('.footnotes');

const footnoteObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        const footnoteId = entry.target.getAttribute('href').substring(1);
        const displayedFootnote = footnotesContainer.querySelector('#displayed-' + footnoteId);

        if (entry.isIntersecting) {
            if (!displayedFootnote) {
                const footnoteText = document.getElementById(footnoteId).textContent;
                // Create a new <p> element and give it the class "footnote-content"
                const newFootnote = document.createElement('p');
                newFootnote.id = 'displayed-' + footnoteId;
                newFootnote.classList.add('footnote-content');
                newFootnote.textContent = footnoteText;
                footnotesContainer.appendChild(newFootnote);
            }
        } else {
            if (displayedFootnote) {
                displayedFootnote.remove();
            }
        }
    });
}, { threshold: 0.5 });

// Iterate through each footnote link and set up event listeners
footnotes.forEach(function(footnote) {
    footnote.addEventListener('mouseenter', function() {
        const footnoteId = footnote.getAttribute('href').substring(1);
        const displayedFootnote = footnotesContainer.querySelector('#displayed-' + footnoteId);
        if (displayedFootnote) {
            displayedFootnote.style.color = 'rgb(200, 230, 255)'; // Change color to red on hover
        }
    });

    footnote.addEventListener('mouseleave', function() {
        const footnoteId = footnote.getAttribute('href').substring(1);
        const displayedFootnote = footnotesContainer.querySelector('#displayed-' + footnoteId);
        if (displayedFootnote) {
            displayedFootnote.style.color = ''; // Reset color on mouse leave
        }
    });

    // Observe the footnote for intersection
    footnoteObserver.observe(footnote);
});

// IntersectionObserver for .text div
const textDiv = document.querySelector('.text');
const textObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        console.log("Intersection ratio:", entry.intersectionRatio);
        if (entry.isIntersecting) {
            // If the div is fully or partially visible
            textDiv.classList.add('overflow-scroll');
        } else {
            // If the div is not visible
            textDiv.classList.remove('overflow-scroll');
        }
    });
}, {
    root: null, // Use the viewport as the root
    rootMargin: '0px', // No additional margin
    threshold: 1 // Fully visible
});

textObserver.observe(textDiv);
});