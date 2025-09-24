// Application Constants
export const APP_CONFIG = {
  name: 'G.R. Solutions',
  version: '1.5.0',
  description: 'מערכת ניהול הצעות מחיר ושיפוצים',
  author: 'Michael Papismedov',
  email: 'Zurapapismedov@gmail.com',
  phone: '054-582-0008',
  address: 'גולדברג הנדבן 14, ראשון לציון',
  website: 'https://gr-solutions.co.il'
} as const;

// Business Information
export const BUSINESS_INFO = {
  name: 'G.R. Solutions',
  address: 'גולדברג הנדבן 14, ראשון לציון',
  phone: '054-582-0008',
  email: 'Zurapapismedov@gmail.com',
  workingHours: {
    sundayToThursday: '08:00 - 18:00',
    friday: '08:00 - 14:00',
    saturday: 'סגור'
  },
  vatRate: 0.18,
  currency: '₪',
  language: 'he'
} as const;

// Statistics
export const BUSINESS_STATS = {
  completedProjects: 50,
  satisfiedClients: 100,
  yearsExperience: 5,
  averageRating: 5.0
} as const;

// Quote Configuration
export const QUOTE_CONFIG = {
  defaultLocation: 'דירה',
  defaultWorkType: 'הריסה',
  defaultQuantity: 0,
  defaultPercent: 100,
  defaultPrice: 0,
  vatRate: 0.18,
  maxRows: 100,
  minRows: 1
} as const;

// Location Options
export const LOCATION_OPTIONS = [
  { value: 'דירה', label: '🏠 דירה' },
  { value: 'בית', label: '🏡 בית פרטי' },
  { value: 'משרד', label: '🏢 משרד' },
  { value: 'חנות', label: '🏪 חנות' },
  { value: 'מחסן', label: '🏭 מחסן' },
  { value: 'מקלט', label: '🏠 מקלט' },
  { value: 'גג', label: '🏠 גג' },
  { value: 'מרפסת', label: '🏠 מרפסת' }
] as const;

// Work Type Options
export const WORK_TYPE_OPTIONS = [
  { value: 'הריסה', label: '🔨 הריסה' },
  { value: 'בניה', label: '🏗️ בניה' },
  { value: 'צבע', label: '🎨 צבע' },
  { value: 'ריצוף', label: '🔲 ריצוף' },
  { value: 'אינסטלציה', label: '🚿 אינסטלציה' },
  { value: 'חשמל', label: '⚡ חשמל' },
  { value: 'גבס', label: '🧱 גבס' },
  { value: 'אריחים', label: '🔲 אריחים' },
  { value: 'דלתות', label: '🚪 דלתות' },
  { value: 'חלונות', label: '🪟 חלונות' },
  { value: 'תקרות', label: '🏠 תקרות' },
  { value: 'קירות', label: '🧱 קירות' }
] as const;

// Percent Options
export const PERCENT_OPTIONS = [
  { value: 100, label: '100%' },
  { value: 95, label: '95%' },
  { value: 90, label: '90%' },
  { value: 85, label: '85%' },
  { value: 80, label: '80%' },
  { value: 75, label: '75%' },
  { value: 70, label: '70%' },
  { value: 65, label: '65%' },
  { value: 60, label: '60%' },
  { value: 55, label: '55%' },
  { value: 50, label: '50%' }
] as const;

// Project Categories
export const PROJECT_CATEGORIES = [
  'bedroom',
  'kitchen', 
  'living-room',
  'bathroom',
  'office',
  'other'
] as const;

// Navigation Items
export const NAVIGATION_ITEMS = [
  { path: '/', label: '🏠 בית', icon: '🏠' },
  { path: '/projects', label: '📸 פרויקטים', icon: '📸' },
  { path: '/quote', label: '💰 הצעת מחיר', icon: '💰' },
  { path: '/invoice', label: '🧾 חשבונית', icon: '🧾' },
  { path: '/contact', label: '📞 צור קשר', icon: '📞' },
  { path: '/rights', label: '⚖️ זכויות', icon: '⚖️' }
] as const;

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'אירעה שגיאה לא צפויה. אנא נסה שוב.',
  NETWORK: 'שגיאת רשת. אנא בדוק את החיבור לאינטרנט.',
  VALIDATION: 'אנא מלא את כל השדות הנדרשים.',
  AUTHENTICATION: 'שגיאה בהתחברות. אנא בדוק את פרטי ההתחברות.',
  PERMISSION: 'אין לך הרשאה לבצע פעולה זו.',
  NOT_FOUND: 'הדף המבוקש לא נמצא.',
  SERVER_ERROR: 'שגיאת שרת. אנא נסה שוב מאוחר יותר.',
  TIMEOUT: 'הפעולה ארכה יותר מדי זמן. אנא נסה שוב.',
  STORAGE_ERROR: 'שגיאה בשמירת הנתונים.',
  LOAD_ERROR: 'שגיאה בטעינת הנתונים.'
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  SAVED: 'הנתונים נשמרו בהצלחה!',
  UPDATED: 'הנתונים עודכנו בהצלחה!',
  DELETED: 'הפריט נמחק בהצלחה!',
  SENT: 'ההודעה נשלחה בהצלחה!',
  LOGGED_IN: 'התחברת בהצלחה!',
  LOGGED_OUT: 'התנתקת בהצלחה!',
  COPIED: 'הטקסט הועתק ללוח!',
  PRINTED: 'הדפסה הושלמה בהצלחה!'
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^0[0-9]{1,2}-?[0-9]{7}$/,
  NAME: /^[א-ת\s]{2,50}$/,
  ADDRESS: /^[א-ת0-9\s\-,.]{5,100}$/,
  PRICE: /^\d+(\.\d{1,2})?$/,
  QUANTITY: /^\d+(\.\d{1,2})?$/
} as const;

// API Endpoints (for future use)
export const API_ENDPOINTS = {
  QUOTES: '/api/quotes',
  CLIENTS: '/api/clients',
  PROJECTS: '/api/projects',
  AUTH: '/api/auth',
  UPLOAD: '/api/upload'
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  QUOTE_DATA: 'quoteData',
  CLIENT_INFO: 'clientInfo',
  AUTH_DATA: 'authData',
  THEME: 'theme',
  LANGUAGE: 'language',
  SETTINGS: 'settings'
} as const;

// Theme Configuration
export const THEME_CONFIG = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto'
} as const;

// Animation Durations
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000
} as const;

// Breakpoints
export const BREAKPOINTS = {
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1200,
  XXL: 1400
} as const;

// Z-Index Values
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070
} as const;

// File Upload Configuration
export const FILE_UPLOAD_CONFIG = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  MAX_FILES: 10
} as const;

// Pagination Configuration
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100],
  MAX_VISIBLE_PAGES: 5
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'DD/MM/YYYY',
  API: 'YYYY-MM-DD',
  DATETIME: 'DD/MM/YYYY HH:mm',
  TIME: 'HH:mm'
} as const;

// Currency Configuration
export const CURRENCY_CONFIG = {
  SYMBOL: '₪',
  POSITION: 'after',
  DECIMAL_PLACES: 2,
  THOUSAND_SEPARATOR: ',',
  DECIMAL_SEPARATOR: '.'
} as const;

// Performance Configuration
export const PERFORMANCE_CONFIG = {
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 100,
  LAZY_LOAD_THRESHOLD: 0.1,
  VIRTUAL_SCROLL_ITEM_HEIGHT: 50,
  CACHE_DURATION: 5 * 60 * 1000 // 5 minutes
} as const;

// Accessibility Configuration
export const A11Y_CONFIG = {
  SKIP_LINK_TEXT: 'דלג לתוכן הראשי',
  LOADING_TEXT: 'טוען...',
  ERROR_TEXT: 'שגיאה',
  SUCCESS_TEXT: 'הצלחה',
  CLOSE_TEXT: 'סגור',
  MENU_TEXT: 'תפריט',
  BACK_TEXT: 'חזור',
  NEXT_TEXT: 'הבא',
  PREVIOUS_TEXT: 'הקודם'
} as const;
