function toggleAnimation(event) {
    var element = event.currentTarget.closest('.mic');
    var container = element.closest('.section').querySelector('.container_spans'); // Find .container_spans in the current section

    // Toggle the 'animating' class on the .mic element
    element.classList.toggle('animating');
    
    // Toggle the 'visible' class on .container_spans based on whether 'animating' is present or not
    if (element.classList.contains('animating')) {
        container.classList.remove('visible'); // Hide .container_spans when animation starts
    } else {
        container.classList.add('visible'); // Show .container_spans when animation ends
    }
}
