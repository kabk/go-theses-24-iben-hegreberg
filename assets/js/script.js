document.addEventListener("DOMContentLoaded", function() {
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
                            // Create a new <p> element and give it the class "footnote-content"
                            var newFootnote = document.createElement('p');
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
        
            footnotes.forEach(function(footnote) {
                observer.observe(footnote);
            });
        });

        