// Додаємо Render у рендер-чергу й запускаємо рендер
var configFile = File("js/config.json");
configFile.open("r");
var config = JSON.parse(configFile.read());
configFile.close();

var project = app.project;
var renderComp;

for (var i = 1; i <= project.items.length; i++) {
    var item = project.item(i);
    if (item instanceof CompItem && item.name === config.renderCompName) {
        renderComp = item;
        break;
    }
}

if (renderComp) {
    var rq = app.project.renderQueue.items.add(renderComp);
    rq.outputModule(1).file = File(config.outputDir + "/final_render.mp4");
    rq.outputModule(1).applyTemplate(config.renderSettings.format);
    app.project.renderQueue.queueInAME(true); // Запуск через Media Encoder
    $.writeln("Render started to " + config.outputDir);
} else {
    $.writeln("Render composition not found!");
}
