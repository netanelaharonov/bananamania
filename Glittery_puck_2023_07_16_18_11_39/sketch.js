// הגדרת קבועים לפריסה
const TITLE_HEIGHT_RATIO = 1 / 12; // גובה הכותרת ביחס לגובה המסך
const TITLE_MARGIN_RATIO = 1 / 20; // הרווח מעל הכותרת ביחס לגובה המסך
const LINE_HEIGHT_RATIO = 1 / 20; // גובה שורת הטקסט ביחס לגובה המסך
const LINE_MARGIN_RATIO = 1 / 40; // הרווח בין שורות הטקסט ביחס לגובה המסך
const FOOTER_HEIGHT_RATIO = 1 / 12; // גובה הכותרת התחתונה ביחס לגובה המסך
const FOOTER_MARGIN_RATIO = 1 / 60; // הרווח מתחת לכותרת התחתונה ביחס לגובה המסך

// הגדרת הקלפים
let cards = [
  {name: "BANK", min: 190, max: 200},
  {name: "LOAN", min: 210, max: 240},
  {name: "BOND", min: 250, max: 330},
  {name: "PACT", min: 200, max: 380},
  {name: "PAY", min: 450, max: 450},
  {name: "INVENTOR", min: 300, max: 500},
  {name: "FEE", min: 50, max: 600},
  {name: "INVESTOR", min: 10, max: 750},
  {name: "Explorer", min: 0, max: 900},
  {name: "STARTUP", min: 0, max: 1000}
];

// אתחול הסכום
let sum = 0;

// הגדרת הקנבס
function setup() {
  createCanvas(windowWidth, windowHeight); // יצירת קנבס בגודל המסך
  textSize(height * LINE_HEIGHT_RATIO); // הגדרת גודל הטקסט לגובה שורת הטקסט
  textAlign(CENTER, CENTER); // הגדרת מיקום הטקסט למרכז
  noStroke(); // הסרת הקווים מסביב לטקסט
}

// ציור המסך
function draw() {
  background(128, 0, 128); // צביעת הרקע בסגול

  // ציור שאר המסך
  drawTitle(); // ציור הכותרת
  drawCards(); // ציור הקלפים
  drawFooter(); // ציור הכותרת התחתונה
}

// ציור הכותרת
function drawTitle() {
  fill(255); // הגדרת צבע הטקסט ללבן
  textSize(height * TITLE_HEIGHT_RATIO); // הגדרת גובה הטקסט לגובה הכותרת
  text("Choose your cards", width / 2, height * TITLE_MARGIN_RATIO + height * TITLE_HEIGHT_RATIO / 2); // ציור הטקסט של הכותרת במרכז המסך
  textSize(height * LINE_HEIGHT_RATIO); // החזרת גובה הטקסט לגובה שורת הטקסט
}

// ציור הקלפים
function drawCards() {
  for (let i = 0; i < cards.length; i++) { // לולאה עבור כל אחד מהקלפים
    let y = height * TITLE_MARGIN_RATIO + height * TITLE_HEIGHT_RATIO + height * LINE_MARGIN_RATIO * 2 + i * (height * LINE_HEIGHT_RATIO + height * LINE_MARGIN_RATIO); // הגדרת מיקום הטקסט של הקלף
    fill(cards[i].selected ? color(255, 255, 0) : color(255)); // הגדרת צבע הטקסט לצהוב אם הקלף נבחר, אחרת לבן
    text(cards[i].name + " " + (cards[i].selected ? (cards[i].countdown > 0 ? cards[i].countdown.toFixed(0) : cards[i].value) : cards[i].min + "-" + cards[i].max), width / 2, y); // ציור הטקסט של הקלף
    if (cards[i].selected && cards[i].countdown > 0) { // אם הקלף נבחר והספירה לאחור עדיין לא הסתיימה
      cards[i].countdown -= 1 / frameRate(); // הפחתת הספירה לאחור בהתאם לקצב הפריימים
      if (cards[i].countdown <= 0) { // אם הספירה לאחור הסתיימה
        cards[i].countdown = 0; // איפוס הספירה לאחור
        cards[i].value = round(random(cards[i].min, cards[i].max)); // הגרלת ערך חדש לקלף
        sum += cards[i].value; // הוספת הערך של הקלף לסכום
      }
    }
  }
}

// ציור הכותרת התחתונה
function drawFooter() {
  fill(255); // הגדרת צבע הטקסט ללבן
  textSize(height * FOOTER_HEIGHT_RATIO); // הגדרת גובה הטקסט לגובה הכותרת התחתונה
  text("Sum " + sum, width / 2, height - height * FOOTER_MARGIN_RATIO - height * FOOTER_HEIGHT_RATIO / 2); // ציור הטקסט של הכותרת התחתונה במרכז המסך
  textSize(height * LINE_HEIGHT_RATIO); // החזרת גובה הטקסט לגובה שורת הטקסט
}

// טיפול באירועים של מסך מגע
function touchStarted() {
  for (let i = 0; i < cards.length; i++) { // לולאה עבור כל אחד מהקלפים
    let y = height * TITLE_MARGIN_RATIO + height * TITLE_HEIGHT_RATIO + height * LINE_MARGIN_RATIO * 2 + i * (height * LINE_HEIGHT_RATIO + height * LINE_MARGIN_RATIO); // הגדרת מיקום הטקסט של הקלף
    if (abs(mouseY - y) < height * LINE_HEIGHT_RATIO / 2) { // אם המסך נוגע במיקום של הקלף
      toggleCard(cards[i]); // שינוי מצב הקלף
      break;
    }
  }
}

// שינוי מצב קלף
function toggleCard(card) {
  if (card.selected) { // אם הקלף נבחר
    sum -= card.value; // הפחתת הערך של הקלף מהסכום
    card.selected = false; // הקלף לא נבחר יותר
    card.countdown = 0; // איפוס הספירה לאחור
  } else { // אם הקלף לא נבחר
    card.countdown = 3; // התחלת ספירה לאחור מ-3
    card.selected = true; // הקלף נבחר
  }
}
