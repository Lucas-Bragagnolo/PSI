
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.btn-check');
    const courses = document.querySelectorAll('.owl-carousel .item');

    filterButtons.forEach(button => {
        button.addEventListener('change', function() {
            const filter = this.nextElementSibling.textContent;
            
            courses.forEach(course => {
                const courseType = course.querySelector('.tipoCursada, .tipoCursada2').textContent;
                if (filter === 'Todos' || courseType.includes(filter)) {
                    course.style.display = '';
                } else {
                    course.style.display = 'none';
                }
            });
        });
    });
});

