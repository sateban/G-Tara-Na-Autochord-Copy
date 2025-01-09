function showSection(section) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(s => s.style.display = 'none');

    // Show the selected section
    const selectedSection = document.getElementById('section' + section);
    selectedSection.style.display = 'block';
}