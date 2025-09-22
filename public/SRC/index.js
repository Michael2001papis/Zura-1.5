// Import utility functions
import { getAssetPath, navigateTo } from './utils.js';

document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("#calculationTable tbody");
    const addRowButton = document.getElementById("addRow");
    const totalWithoutVAT = document.getElementById("totalWithoutVAT");
    const vat = document.getElementById("vat");
    const totalWithVATEl = document.getElementById("totalWithVAT");
  
    function calculateRow(row) {
      const quantity = parseFloat(row.querySelector(".quantity").value) || 0;
      const percent = parseFloat(row.querySelector(".completion-rate").value) || 100;
      const price = parseFloat(row.querySelector(".price-per-unit").value) || 0;
      const totalNoVAT = quantity * (percent / 100) * price;
      const vatAmount = totalNoVAT * 0.18;
      const totalWithVAT = totalNoVAT + vatAmount;
  
      row.querySelector(".total-no-vat").textContent = totalNoVAT.toFixed(2);
      row.querySelector(".vat-amount").textContent = vatAmount.toFixed(2);
      row.querySelector(".total-with-vat").textContent = totalWithVAT.toFixed(2);
      calculateOverallTotal();
    }
  
    function calculateOverallTotal() {
      let sumNoVAT = 0, sumVAT = 0, sumTotal = 0;
      document.querySelectorAll(".total-no-vat").forEach(td => {
        sumNoVAT += parseFloat(td.textContent) || 0;
      });
      document.querySelectorAll(".vat-amount").forEach(td => {
        sumVAT += parseFloat(td.textContent) || 0;
      });
      document.querySelectorAll(".total-with-vat").forEach(td => {
        sumTotal += parseFloat(td.textContent) || 0;
      });
  
      totalWithoutVAT.textContent = sumNoVAT.toFixed(2);
      vat.textContent = sumVAT.toFixed(2);
      totalWithVATEl.textContent = sumTotal.toFixed(2);
    }
  
    function createRow() {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>
          <select class="location">
            <option value="דירה">דירה</option>
            <option value="קומה">קומה</option>
            <option value="בית">בית</option>
            <option value="וילה">וילה</option>
            <option value="משרד">משרד</option>
            <option value="אחר">אחר...</option>
          </select>
          <input type="text" class="custom-location hidden" placeholder="הכנס מיקום">
        </td>
        <td>
          <select class="work-type">
            <option value="הריסה">הריסה</option>
            <option value="בניה">בניה</option>
            <option value="שפכטל">שפכטל</option>
            <option value="צבע">צבע</option>
            <option value="ריצוף">ריצוף</option>
            <option value="טיח">טיח</option>
            <option value="אינסטלציה">אינסטלציה</option>
            <option value="חשמל">חשמל</option>
            <option value="עבודות גבס">עבודות גבס</option>
            <option value="אחר">אחר...</option>
          </select>
          <input type="text" class="custom-work hidden" placeholder="הכנס סוג עבודה">
        </td>
        <td>
          <select class="quantity-type">
            <option value="מ"ר">מ"ר</option>
            <option value="מ"א">מ"א</option>
            <option value="י"ח">י"ח</option>
            <option value="כמות כללית">כמות כללית</option>
          </select>
          <input type="number" class="quantity" min="0" placeholder="הכנס כמות">
        </td>
        <td>
          <select class="completion-rate">
            <option value="100">100%</option>
            <option value="90">90%</option>
            <option value="80">80%</option>
            <option value="70">70%</option>
            <option value="60">60%</option>
            <option value="50">50%</option>
            <option value="40">40%</option>
            <option value="30">30%</option>
          </select>
        </td>
        <td>
          <input type="number" class="price-per-unit" min="0" placeholder="₪">
        </td>
        <td class="total-no-vat">0</td>
        <td class="vat-amount">0</td>
        <td class="total-with-vat">0</td>
        <td><button class="calculate">חשב</button></td>
      `;
      
      // ניהול תצוגת שדות מותאמים בהתאם לבחירה
      row.querySelector(".location").addEventListener("change", function () {
        const customLocation = row.querySelector(".custom-location");
        customLocation.style.display = this.value === "אחר" ? "block" : "none";
      });
      row.querySelector(".work-type").addEventListener("change", function () {
        const customWork = row.querySelector(".custom-work");
        customWork.style.display = this.value === "אחר" ? "block" : "none";
      });
      
      // מאזין לחישוב שורה
      row.querySelector(".calculate").addEventListener("click", function () {
        calculateRow(row);
      });
      
      tableBody.appendChild(row);
    }
  
    // אתחול שורה ראשונה והוספת שורות נוספות בלחיצה על הכפתור
    createRow();
    addRowButton.addEventListener("click", createRow);
  
    // ניהול כפתורי ניווט ופונקציות נוספות
    document.getElementById("printButton").addEventListener("click", () => window.print());
    document.getElementById("homeButton").addEventListener("click", () => {
      navigateTo("Interstitial/index.html");
    });
    document.getElementById("quotationButton").addEventListener("click", () => {
      navigateTo("jobOffer/index.html");
    });
    document.getElementById("resetButton").addEventListener("click", () => {
      if (confirm("האם אתה בטוח שברצונך לאפס את הדף? כל הנתונים יאבדו.")) {
        location.reload();
      }
    });
    document.getElementById("rights").addEventListener("click", () => {
      navigateTo("Developerrights/index.html");
    });
  });

  // אין קוד גלובלי נוסף


