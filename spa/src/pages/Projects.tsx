import React, { useState } from 'react'

const Projects: React.FC = () => {
  const [showMore, setShowMore] = useState(false)

  const initialProjects = [
    { before: "/Poto/before/Bedroom.jpg", after: "/Poto/after/Bedroom.jpg", title: "חדר שינה", desc: "שיפוץ מלא" },
    { before: "/Poto/before/kitchen.jpg", after: "/Poto/after/kitchen.jpg", title: "מטבח", desc: "שיפוץ מלא" },
    { before: "/Poto/before/Bedroom-2.jpg", after: "/Poto/after/Bedroom-2.jpg", title: "חדר שינה 2", desc: "שיפוץ מלא" },
    { before: "/Poto/before/Bedroom-3.jpg", after: "/Poto/after/Bedroom-3.jpg", title: "חדר שינה 3", desc: "שיפוץ מלא" },
    { before: "/Poto/before/Deep-wall.jpg", after: "/Poto/after/Deep-wall.jpg", title: "קיר עמוק", desc: "שיפוץ מלא" },
    { before: "/Poto/before/Bedroom-4.jpg", after: "/Poto/after/Bedroom-4.jpg", title: "חדר שינה 4", desc: "שיפוץ מלא" }
  ]

  const additionalProjects = [
    { before: "/Poto/before/Bedroom-5.jpg", after: "/Poto/after/Bedroom-5.jpg", title: "חדר שינה 5", desc: "שיפוץ מלא" },
    { before: "/Poto/before/Bedroom-6.jpg", after: "/Poto/after/Bedroom-6.jpg", title: "חדר שינה 6", desc: "שיפוץ מלא" },
    { before: "/Poto/before/kitchen-2.jpg", after: "/Poto/after/kitchen.jpg", title: "מטבח 2", desc: "שיפוץ מלא" },
    { before: "/Poto/before/kitchen-3.jpg", after: "/Poto/after/kitchen.jpg", title: "מטבח 3", desc: "שיפוץ מלא" }
  ]

  const allProjects = showMore ? [...initialProjects, ...additionalProjects] : initialProjects

  return (
    <div className="container">
      <div className="projects-header">
        <h1>📸 פרויקטים שלנו</h1>
        <p>צפה בעבודות המקצועיות שלנו - לפני ואחרי השיפוץ</p>
      </div>
      
      <div className="projects-stats">
        <div className="stat-item">
          <span className="stat-number">50+</span>
          <span className="stat-label">פרויקטים הושלמו</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">100%</span>
          <span className="stat-label">לקוחות מרוצים</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">5+</span>
          <span className="stat-label">שנות ניסיון</span>
        </div>
      </div>
      
      <div className="project-gallery">
        {allProjects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-images">
              <div className="image-container before">
                <img src={project.before} alt={`${project.title} - לפני`} />
                <div className="image-label">לפני</div>
              </div>
              <div className="image-container after">
                <img src={project.after} alt={`${project.title} - אחרי`} />
                <div className="image-label">אחרי</div>
              </div>
            </div>
            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              <div className="project-tags">
                <span className="tag">שיפוץ מלא</span>
                <span className="tag">עיצוב מודרני</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="projects-actions">
        <button 
          className="btn toggle-btn" 
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "👆 הצג פחות פרויקטים" : "👇 הצג עוד פרויקטים"}
        </button>
        <button className="btn contact-btn">
          💬 צור קשר לפרויקט דומה
        </button>
      </div>
    </div>
  )
}

export default Projects
