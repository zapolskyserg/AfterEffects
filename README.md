AE Automated Workflow
Автоматична система редагування та рендеру проекту After Effects через JavaScript/Node.js

Опис
Цей репозиторій містить повний комплект інструментів для автоматизованого аналізу структури, модифікації контенту та рендеру відео в проекті After Effects (.aep) на основі JS/ExtendScript та Node.js.

Автоматична заміна текстів, кольорів, відео у прекомпозиціях

Гнучка конфігурація через config.json — параметри, шляхи, контент

Вбудована перевірка/відкриття потрібного .aep проекту

Логування та контроль процесу: всі зміни записуються у звіт

Запуск як через GUI After Effects, так і автоматизовано через Node.js

Структура робочої директорії
text
AfterEffects\
 ├── TZ Collect\
 │ ├── ТЗ JS.aep
│ ├── ((Footage))\
 │ │ └── [Material]\
 │ │ ├── Video 1.mp4
│ │ ├── Video 2.mp4
│ │ └── Video 3.mp4
│ ├── js\
 │ │ ├── analyzeLinks.jsx
│ │ ├── modifyContent.jsx
│ │ ├── renderFinal.jsx
│ │ └── config.json
│ ├── logs\
 │ │ ├── modify_content_log.txt
│ │ └── analysis_log.json
│ └── node\
 │ └── index.js
├── Output\
 └── README.md
Опис кожної папки та файлу
TZ Collect/ТЗ JS.aep
Основний проект After Effects, з яким працюють ваші скрипти.

TZ Collect/((Footage))/[Material]/Video \*.mp4
Всі відео-футиджі для вставки у прекомпозиції (файли відео для автоматичної заміни).

TZ Collect/js/
Тут лежать:

analyzeLinks.jsx — аналіз зв’язків між шарами

modifyContent.jsx — модифікація тексту, кольорів, вставка відео

renderFinal.jsx — автоматичний рендер.

config.json — всі шляхи, параметри, змінюваний контент.

TZ Collect/logs/
Логи виконання скриптів: збережені результати аналізу, журнал змін.

TZ Collect/node/
Node.js-скрипти для автоматичного запуску всіх .jsx файлів через afterfx.exe (Windows).

TZ Collect/Output/
Тут буде зберігатися фінальний згенерований рендер.

README.md
Інструкція до роботи та запуску всіх скриптів і проекту (дивись попередній професійний варіант).

config.json для вашої структури
json
{
"projectFile": "AfterEffects/TZ Collect/ТЗ JS.aep",
"customCompName": "Customize Scene",
"renderCompName": "Render",
"videoLayerNames": ["Video 1", "Video 2", "Video 3"],
"videoFiles": {
"Video 1": "AfterEffects/TZ Collect/((Footage))/[Material]/Video 1.mp4",
"Video 2": "AfterEffects/TZ Collect/((Footage))/[Material]/Video 2.mp4",
"Video 3": "AfterEffects/TZ Collect/((Footage))/[Material]/Video 3.mp4"
},
"outputDir": "e:/lfs_SAIT*ИН/TEST*TASK_for_work/Output",
"textReplacement": "Changed",
"fillColor": [1,0,0,1]
}
README.md (уривок з шляхами)
Всі файли JS-скриптів лежать у AfterEffects/TZ Collect/js/
Відеоматеріали — у AfterEffects/TZ Collect/((Footage))/[Material]/
Проект .aep — у AfterEffects/TZ Collect/

При запуску автоматизації Node.js-скрипт (TZ Collect/node/index.js) бере всі шляхи з config.json і контролює правильний доступ до потрібного .aep та матеріалів.
Вимоги
Adobe After Effects 2025 із дозволеною роботою скриптів (Preferences → Scripting & Expressions)

Node.js (для автоматичного запуску)

Оновлений Windows-путь до проекту та матеріалів у config.json

Налаштування
Скопіюйте репозиторій у робочу директорію поряд із вашим основним .aep проєктом.

Вкажіть правильний шлях до проекту у js/config.json (параметр "projectFile"), а також шляхи до footage-файлів у "videoFiles".

Використання
Варіант 1: Запуск через Node.js
Відкрити термінал у папці node/.

Виконати команду:

text
node index.js
Програма автоматично перевірить правильний .aep, відкриє його та виконає усі етапи автоматизації через скрипти.

Варіант 2: Запуск окремих скриптів вручну
Відкрити .aep проект в After Effects.

Через меню:

text
File → Scripts → Run Script File...
Обрати один із скриптів у папці /js/ (наприклад, modifyContent.jsx).

Журнал змін та результат
Всі дії і зміни (заміна тексту, кольорів, відео у прекомпозиціях) логуються у logs/modify_content_log.txt.

Фінальний рендер зберігається в директорію, прописану в outputDir у config.json.

Професійна гнучкість
Конфігуруйте параметри контенту (тексти, кольори, масштаби) через єдиний config.json.

Автоматично відкривається правильний проект перед виконанням скриптів.

Всі скрипти мають захист від роботи з неправильним проектом та інформують користувача про дії і ризики.

Технічна підтримка
Документація по scripting для After Effects

Контакт для консультацій: @cyberout (Telegram)
