// Get the elements
const dragArea = document.querySelector('.drag-area');
const fileInput = document.getElementById('file-input');
const browseBtn = document.getElementById('browse-btn');

// Add event listeners
dragArea.addEventListener('dragover', (e) => {
  e.preventDefault(); // Prevent default behavior
  dragArea.classList.add('active'); // Add active class
});

dragArea.addEventListener('dragleave', () => {
  dragArea.classList.remove('active'); // Remove active class
});

dragArea.addEventListener('drop', (e) => {
  e.preventDefault(); // Prevent default behavior
  dragArea.classList.remove('active'); // Remove active class

  // Get the dropped file
  const file = e.dataTransfer.files[0];

  // Do something with the file (e.g., upload it)
  console.log(file);
});

// Add event listener to browse button
browseBtn.addEventListener('click', () => {
  fileInput.click(); // Simulate click on file input
});

// Add event listener to file input
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];

  // Do something with the file (e.g., upload it)
  console.log(file);
});
const fileUploadLink = document.querySelector('a[href="#fileInput"]');

// Add an event listener to the link
fileUploadLink.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent default link behavior

  // Get the .drag section
  const fileUploadSection = document.getElementById('fileInput');

  // Scroll to the .drag section
  fileUploadSection.scrollIntoView({
    behavior: 'smooth', // Add a smooth scrolling effect
  });
});
function scrollToFileUploadSection() {
  const fileUploadSection = document.getElementById('fileInput');
  fileUploadSection.scrollIntoView({ behavior: 'smooth' });
}

document.querySelectorAll('a[href="#about-section"]').forEach(link => {
  link.addEventListener('click', scrollToAboutSection());
});

function scrollToAboutSection() {
  document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' });
}