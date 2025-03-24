function showMoreProjects() {
    const moreProjectsButton = document.getElementById('more-projects');
    const projectGallery = document.querySelector('.project-gallery');
  
    // בדיקה האם פרויקטים נוספים כבר נטענו
    if (moreProjectsButton.dataset.loaded !== "true") {
      moreProjectsButton.textContent = "טוען פרויקטים נוספים...";
      
      // סימולציה של טעינה (ניתן להחליף בקריאה ל-API)
      setTimeout(() => {
        // מערכים של תמונות לפני ואחרי
        const beforeImages = [
          "../Poto/before/Bedroom-4.jpg",
          "../Poto/before/Bedroom-5.jpg",
          "../Poto/before/Deep-wall.jpg",
          "../Poto/before/Bedroom-6.jpg"
        ];
      
        const afterImages = [
          "../Poto/after/Bedroom-4.jpg",
          "../Poto/after/Bedroom-5.jpg",
          "../Poto/after/Deep-wall.jpg",
          "../Poto/after/Bedroom-6.jpg"
        ];
      
        // יצירת פרויקטים נוספים לפי כמות התמונות
        for (let i = 0; i < beforeImages.length; i++) {
          const project = document.createElement('div');
          project.className = "project";
          project.innerHTML = `
            <img src="${beforeImages[i]}" class="before" alt="לפני">
            <img src="${afterImages[i]}" class="after" alt="אחרי">
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
  