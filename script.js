// Handle tab navigation
function showForm() {
  document.getElementById('form-section').style.display = 'block';
  document.getElementById('timeline-section').style.display = 'none';
}

function showTimeline() {
  document.getElementById('form-section').style.display = 'none';
  document.getElementById('timeline-section').style.display = 'block';
  renderTimeline();
}

// Retrieve existing learning data from localStorage or set an empty array
let learningData = JSON.parse(localStorage.getItem('learningData')) || [];

// Function to handle form submission
document.getElementById('learning-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get input values
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const when = document.getElementById('when').value;
  const how = document.getElementById('how').value;
  const where = document.getElementById('where').value;
  const withWho = document.getElementById('withWho').value;
  const labels = document.getElementById('labels').value;

  // Create new learning item
  const newLearning = { title, description, when, how, where, withWho, labels };
  learningData.push(newLearning);

  // Save updated data to localStorage
  localStorage.setItem('learningData', JSON.stringify(learningData));

  // Clear form fields
  document.getElementById('learning-form').reset();

  alert('Learning activity added!');
});

// Function to render timeline
function renderTimeline() {
  const timeline = document.getElementById('timeline');
  timeline.innerHTML = ''; // Clear existing content

  // Sort learnings by date
  learningData.sort((a, b) => new Date(a.when) - new Date(b.when));

  // Group learnings by year
  const groupedByYear = learningData.reduce((acc, learning) => {
    const year = new Date(learning.when).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(learning);
    return acc;
  }, {});

  // Render each year group
  for (const year in groupedByYear) {
    // Create year header
    const yearHeader = document.createElement('div');
    yearHeader.classList.add('year-header');
    yearHeader.textContent = year;
    timeline.appendChild(yearHeader);

    // Render each learning under the year header
    groupedByYear[year].forEach(learning => {
      const timelineItem = document.createElement('div');
      timelineItem.classList.add('timeline-item');
      
      const date = document.createElement('div');
      date.classList.add('date');
      date.textContent = new Date(learning.when).toLocaleDateString('en-US', {
        day: '2-digit', month: 'short'
      });
      
      const title = document.createElement('div');
      title.classList.add('title');
      title.textContent = learning.title;

      const description = document.createElement('div');
      description.classList.add('description');
      description.textContent = learning.description; // Displaying the description
      
      const dot = document.createElement('div');
      dot.classList.add('timeline-dot');
      
      timelineItem.appendChild(dot);
      timelineItem.appendChild(date);
      timelineItem.appendChild(title);
      timelineItem.appendChild(description);
      
      timelineItem.onclick = () => showPopup(learning.how, learning.where, learning.withWho, learning.labels);
      
      timeline.appendChild(timelineItem);
    });
  }
}

// Function to show popup with additional details
function showPopup(how, where, withWho, labels) {
  const popup = document.getElementById('popup');
  const popupContent = document.getElementById('popup-content');
  popupContent.innerHTML = `
    <p><strong>How:</strong> ${how}</p>
    <p><strong>Where:</strong> ${where}</p>
    <p><strong>With Who:</strong> ${withWho}</p>
    <p><strong>Labels:</strong> ${labels}</p>
  `;
  popup.style.display = 'block';
}

// Function to close popup
function closePopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'none';
}
