function showMoreProjects() {
    const moreProjectsButton = document.getElementById('more-projects');
    const projectGallery = document.querySelector('.project-gallery');
  
    // בדיקה האם פרויקטים נוספים כבר נטענו
    if (moreProjectsButton.dataset.loaded !== "true") {
      moreProjectsButton.textContent = "טוען פרויקטים נוספים...";
      
      // סימולציה של טעינה (ניתן להחליף בקריאה ל-API)
      setTimeout(() => {
        // יצירת שני פרויקטים נוספים
        for (let i = 0; i < 2; i++) {
          const project = document.createElement('div');
          project.className = "project";
          project.innerHTML = `
            <img src="before_new${i}.jpg" class="before" alt="לפני">
            <img src="after_new${i}.jpg" class="after" alt="אחרי">
          `;
          projectGallery.appendChild(project);
        }
        moreProjectsButton.textContent = "הצג פחות פרויקטים";
        moreProjectsButton.dataset.loaded = "true";
      }, 1500);
    } else {
      // הסרת הפרויקטים הנוספים (הנחה: שני הפרויקטים האחרונים)
      const projects = projectGallery.querySelectorAll('.project');
      for (let i = projects.length - 1; i >= projects.length - 2; i--) {
        projectGallery.removeChild(projects[i]);
      }
      moreProjectsButton.textContent = "הצג עוד פרויקטים";
      moreProjectsButton.dataset.loaded = "false";
    }
  }
  
  document.getElementById("more-projects").addEventListener("click", showMoreProjects);
  