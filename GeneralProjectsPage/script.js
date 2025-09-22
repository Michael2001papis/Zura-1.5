// פונקציה להצגת פרויקטים נוספים
function showMoreProjects() {
    const moreProjectsButton = document.getElementById('more-projects');
    const projectGallery = document.querySelector('.project-gallery');
  
    // בדיקה האם פרויקטים נוספים כבר נטענו
    if (moreProjectsButton.dataset.loaded !== "true") {
      moreProjectsButton.textContent = "טוען פרויקטים נוספים...";
      moreProjectsButton.disabled = true;
      
      // סימולציה של טעינה (ניתן להחליף בקריאה ל-API)
      setTimeout(() => {
        // מערכים של תמונות לפני ואחרי
        const additionalProjects = [
          {
            before: "../Poto/before/Bedroom-5.jpg",
            after: "../Poto/after/Bedroom-5.jpg",
            title: "חדר שינה 5",
            description: "שיפוץ מלא"
          },
          {
            before: "../Poto/before/Bedroom-6.jpg",
            after: "../Poto/after/Bedroom-6.jpg",
            title: "חדר שינה 6",
            description: "שיפוץ מלא"
          },
          {
            before: "../Poto/before/kitchen-2.jpg",
            after: "../Poto/after/kitchen.jpg",
            title: "מטבח 2",
            description: "שיפוץ מלא"
          },
          {
            before: "../Poto/before/kitchen-3.jpg",
            after: "../Poto/after/kitchen.jpg",
            title: "מטבח 3",
            description: "שיפוץ מלא"
          }
        ];
      
        // יצירת פרויקטים נוספים
        additionalProjects.forEach((projectData, index) => {
          setTimeout(() => {
            const project = document.createElement('div');
            project.className = "project";
            project.style.opacity = "0";
            project.style.transform = "translateY(30px)";
            
            project.innerHTML = `
              <img src="${projectData.before}" class="before" alt="${projectData.title} - לפני">
              <img src="${projectData.after}" class="after" alt="${projectData.title} - אחרי">
              <div class="project-overlay">
                <h3>${projectData.title}</h3>
                <p>${projectData.description}</p>
              </div>
            `;
            
            projectGallery.appendChild(project);
            
            // אנימציה של כניסה
            setTimeout(() => {
              project.style.transition = "all 0.6s ease";
              project.style.opacity = "1";
              project.style.transform = "translateY(0)";
            }, 100);
          }, index * 200);
        });
      
        moreProjectsButton.textContent = "הצג פחות פרויקטים";
        moreProjectsButton.dataset.loaded = "true";
        moreProjectsButton.disabled = false;
      }, 1000);
      
    } else {
      // הסרת הפרויקטים הנוספים
      const projects = projectGallery.querySelectorAll('.project');
      const additionalProjects = Array.from(projects).slice(-4); // 4 הפרויקטים האחרונים
      
      additionalProjects.forEach((project, index) => {
        setTimeout(() => {
          project.style.transition = "all 0.4s ease";
          project.style.opacity = "0";
          project.style.transform = "translateY(-30px)";
          
          setTimeout(() => {
            if (project.parentNode) {
              projectGallery.removeChild(project);
            }
          }, 400);
        }, index * 100);
      });
      
      moreProjectsButton.textContent = "הצג עוד פרויקטים";
      moreProjectsButton.dataset.loaded = "false";
    }
  }

// הוספת אפקטי אינטראקציה נוספים
document.addEventListener('DOMContentLoaded', function() {
  // אנימציה של כניסת הפרויקטים הראשונים
  const initialProjects = document.querySelectorAll('.project');
  initialProjects.forEach((project, index) => {
    project.style.opacity = "0";
    project.style.transform = "translateY(50px)";
    
    setTimeout(() => {
      project.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
      project.style.opacity = "1";
      project.style.transform = "translateY(0)";
    }, index * 200);
  });
  
  // הוספת אפקט לחיצה לפרויקטים
  const projects = document.querySelectorAll('.project');
  projects.forEach(project => {
    project.addEventListener('click', function() {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });
});

// הוספת מאזין לכפתור
document.getElementById("more-projects").addEventListener("click", showMoreProjects);
  