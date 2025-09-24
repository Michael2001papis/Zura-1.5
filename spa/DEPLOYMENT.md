# 🚀 הוראות Deployment ל-GitHub Pages

## 📋 שלבים להפעלת האתר

### 1. **הגדרת GitHub Pages**
1. לך ל-repository שלך ב-GitHub
2. לחץ על **Settings** (הגדרות)
3. גלול למטה ל-**Pages** (עמודים)
4. תחת **Source** בחר **GitHub Actions**

### 2. **הפעלת Workflow**
1. לך ל-**Actions** tab ב-repository
2. בחר את ה-workflow **Simple Deploy to GitHub Pages**
3. לחץ על **Run workflow**
4. בחר את ה-branch (main/master)
5. לחץ על **Run workflow**

### 3. **בדיקת Deployment**
1. אחרי שה-workflow מסתיים בהצלחה
2. לך ל-**Settings** > **Pages**
3. תראה את ה-URL של האתר
4. האתר יהיה זמין ב: `https://your-username.github.io/your-repo-name`

## 🔧 פתרון בעיות

### אם האתר לא עולה:
1. **בדוק את ה-Actions** - וודא שה-workflow רץ בהצלחה
2. **בדוק את ה-Permissions** - וודא שיש הרשאות ל-GitHub Pages
3. **בדוק את ה-Source** - וודא שה-Source מוגדר ל-GitHub Actions

### אם יש שגיאות ב-build:
1. **בדוק את ה-logs** ב-Actions tab
2. **וודא שה-dependencies מותקנים** נכון
3. **בדוק שה-build עובד מקומית** עם `npm run build`

## 📁 קבצים חשובים

- `.github/workflows/simple-deploy.yml` - Workflow פשוט
- `.github/workflows/vite-deploy.yml` - Workflow עם Vite
- `.github/workflows/pages.yml` - Workflow מתקדם
- `public/.nojekyll` - מונע מ-Jekyll לעבד את הקבצים
- `public/404.html` - עמוד 404 מותאם אישית

## 🎯 URLs של האתר

אחרי ה-deployment, האתר יהיה זמין ב:
- `https://michael2001papis.github.io/Zura-1.5/`
- או `https://your-username.github.io/your-repo-name/`

## ⚡ טיפים

1. **השתמש ב-Simple Deploy** - זה ה-workflow הכי פשוט ויציב
2. **בדוק את ה-logs** אם יש בעיות
3. **המתן כמה דקות** אחרי ה-push לראות את השינויים
4. **נקה את ה-cache** של הדפדפן אם האתר לא מתעדכן

## 🆘 תמיכה

אם יש בעיות:
1. בדוק את ה-logs ב-GitHub Actions
2. וודא שה-Permissions מוגדרים נכון
3. נסה לרוץ את ה-build מקומית
4. בדוק שה-URL נכון
