document.addEventListener("DOMContentLoaded", function() {
            const chapters = document.querySelectorAll('.text > div > p > mark');
            const imageContainer = document.querySelector('.images');
            const chapterDescriptions = {
                venus: "The Venus of Willendorf",
                Mother: "Extract from The Great Mother archetype",
                Traces: "Earliest trace of man-made textile",
                // Add more descriptions for other chapters as needed
            };
            let currentVisibleChapter = null;

            const observer = new IntersectionObserver(entries => {
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
                        descriptionElement.classList.add('description'); // Add the class 'hello' to the description element
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
            
            }, { threshold: 0.9 });

            chapters.forEach(chapter => {
                observer.observe(chapter);
            });
        });

document.addEventListener("DOMContentLoaded", function() {
    var footnotes = document.querySelectorAll('text a[href^="#fn"]');
    var footnotesContainer = document.querySelector('.footnotes');

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            var footnoteId = entry.target.getAttribute('href').substring(1);
            var displayedFootnote = footnotesContainer.querySelector('#displayed-' + footnoteId);

            if (entry.isIntersecting) {
                if (!displayedFootnote) {
                    var footnoteText = document.getElementById(footnoteId).textContent;
                    footnotesContainer.innerHTML += '<p id="displayed-' + footnoteId + '">' + footnoteText + '</p>';
                }
            } else {
                if (displayedFootnote) {
                    displayedFootnote.remove();
                }
            }
        });
    }, { threshold: 0.5 });

    footnotes.forEach(function(footnote) {
        observer.observe(footnote);
    });
});