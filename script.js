// To add a university: copy one block and change the values
var universities = [
  {
    name:    "Arizona State University",
    state:   "Arizona",
    city:    "Tempe, Arizona",
    fee:     "~$68,000 / year",
    website: "https://www.asu.edu",
    color:   "#3608a3",
    photo:   "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    courses: ["Computer Science", "Business", "Data Science", "Education", "Law"],
    tags:    ["Public", "Research Uni", "Est. 1885"]
  },
  {
    name:    "University of Texas at Arlington",
    state:   "Texas",
    city:    "Arlington, Texas",
    fee:     "~$60,000 / year",
    website: "https://www.uta.edu",
    color:   "#185880",
    photo:   "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&q=80",
    courses: ["Data Science", "Business", "Engineering", "Nursing", "Computer Science"],
    tags:    ["Public", "UT System", "Est. 1895"]
  },
  {
    name:    "University of Illinois Chicago",
    state:   "Illinois",
    city:    "Chicago, Illinois",
    fee:     "~$65,000 / year",
    website: "https://www.uic.edu",
    color:   "#d50032",
    photo:   "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=800&q=80",
    courses: ["Medicine", "Computer Science", "Pharmacy", "Business", "Engineering"],
    tags:    ["Public", "Research Uni", "Est. 1965"]
  },
  {
    name:    "University of North Texas",
    state:   "Texas",
    city:    "Denton, Texas",
    fee:     "~$69,000 / year",
    website: "https://www.unt.edu",
    color:   "#00853e",
    photo:   "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&q=80",
    courses: ["Music", "Engineering", "Data Science", "Arts & Design", "Education"],
    tags:    ["Public", "Arts & Science", "Est. 1890"]
  }
];

// Builds and displays university cards on the page
function showCards(list) {
  var grid = document.getElementById("uni-grid");
  grid.innerHTML = "";

  // If nothing matches, show the no-result message
  if (list.length === 0) {
    document.getElementById("no-result").style.display = "block";
    return;
  }
  document.getElementById("no-result").style.display = "none";

  // Loop through each university and build a card
  for (var i = 0; i < list.length; i++) {
    var u = list[i];

    // Build course list items
    var coursesHTML = "";
    for (var j = 0; j < u.courses.length; j++) {
      coursesHTML += "<li>" + u.courses[j] + "</li>";
    }

    // Build tag badges
    var tagsHTML = "";
    for (var k = 0; k < u.tags.length; k++) {
      tagsHTML += '<span class="tag">' + u.tags[k] + "</span>";
    }

    // Create the card and fill it with content
    var card = document.createElement("div");
    card.className = "uni-card";
    card.innerHTML =
      '<div class="photo-wrapper">' +
        '<img class="uni-photo" src="' + u.photo + '" alt="' + u.name + '" />' +
        '<span class="state-badge" style="background-color:' + u.color + ';">' + u.state + "</span>" +
      "</div>" +
      '<div class="uni-info">' +
        "<h3>" + u.name + "</h3>" +
        '<p class="uni-location">📍 ' + u.city + "</p>" +
        '<p class="uni-fee">💰 ' + u.fee + "</p>" +
        '<hr class="uni-divider" />' +
        '<p class="courses-label">Available Courses</p>' +
        '<ul class="courses-list">' + coursesHTML + "</ul>" +
        '<div class="tag-row">' + tagsHTML + "</div>" +
        '<a href="' + u.website + '" target="_blank" class="visit-btn">Visit Website →</a>' +
      "</div>";

    grid.appendChild(card);
  }

  animateCards(); // fade in the cards
}

// Show all cards when page loads
showCards(universities);

// Filters universities when Search button is clicked

document.getElementById("search-btn").addEventListener("click", function () {
  var typedName    = document.getElementById("search-name").value.toLowerCase();
  var pickedState  = document.getElementById("search-state").value;
  var pickedCourse = document.getElementById("search-course").value;

  // Keep only universities that match all 3 filters
  var results = [];
  for (var i = 0; i < universities.length; i++) {
    var u = universities[i];
    var nameOK   = u.name.toLowerCase().includes(typedName);
    var stateOK  = pickedState  === "" || u.state === pickedState;
    var courseOK = pickedCourse === "" || u.courses.includes(pickedCourse);
    if (nameOK && stateOK && courseOK) results.push(u);
  }

  showCards(results);
  document.getElementById("universities").scrollIntoView({ behavior: "smooth" });
});

// Search also works when user presses Enter
document.getElementById("search-name").addEventListener("keydown", function (e) {
  if (e.key === "Enter") document.getElementById("search-btn").click();
});

// Validates the form and shows a success message

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault(); // stop page from refreshing

  var name  = document.getElementById("c-name").value.trim();
  var email = document.getElementById("c-email").value.trim();
  var phone = document.getElementById("c-phone").value.trim();
  var uni   = document.getElementById("c-uni").value;
  var msg   = document.getElementById("c-msg").value.trim();


  // Show success message and clear the form
  document.getElementById("form-success").style.display = "block";
  document.getElementById("c-name").value  = "";
  document.getElementById("c-email").value = "";
  document.getElementById("c-phone").value = "";
  document.getElementById("c-uni").value   = "";
  document.getElementById("c-msg").value   = "";

  // Hide success message after 5 seconds
  setTimeout(function () {
    document.getElementById("form-success").style.display = "none";
  }, 5000);
});

// Cards and steps fade in when they appear on screen

function animateCards() {
  var cards = document.querySelectorAll(".uni-card");

  // Start invisible and moved down
  cards.forEach(function (card) {
    card.style.opacity    = "0";
    card.style.transform  = "translateY(25px)";
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  // When card enters screen, make it visible
  var watcher = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = "1";
        entry.target.style.transform = "translateY(0)";
        watcher.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Each card appears 120ms after the previous one
  cards.forEach(function (card, i) {
    setTimeout(function () { watcher.observe(card); }, i * 120);
  });
}

// Same animation for How It Works steps
var steps = document.querySelectorAll(".step");
steps.forEach(function (step) {
  step.style.opacity    = "0";
  step.style.transform  = "translateY(20px)";
  step.style.transition = "opacity 0.5s ease, transform 0.5s ease";
});

var stepWatcher = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = "1";
      entry.target.style.transform = "translateY(0)";
      stepWatcher.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

steps.forEach(function (step, i) {
  setTimeout(function () { stepWatcher.observe(step); }, i * 100);
});
