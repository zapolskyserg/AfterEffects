// Аналіз зв’язків між Render та Customize Scene
var configFile = File("js/config.json");
configFile.open("r");
var config = JSON.parse(configFile.read());
configFile.close();

var project = app.project;
var renderComp = project.item(project.items.length);
for (var i = 1; i <= project.items.length; i++) {
    var item = project.item(i);
    if (item instanceof CompItem && item.name === config.renderCompName) {
        renderComp = item;
        break;
    }
}

var links = [];
for (var i = 1; i <= renderComp.layers.length; i++) {
    var layer = renderComp.layer(i);
    for (var j = 1; j <= layer.property("ADBE Effect Parade").numProperties; j++) {
        var effect = layer.property("ADBE Effect Parade").property(j);
        if (effect.expression && effect.expression.indexOf(config.customCompName) !== -1) {
            links.push({
                layer: layer.name,
                effect: effect.name,
                expression: effect.expression
            });
        }
    }
}

var outFile = File("logs/analysis_log.json");
outFile.open("w");
outFile.write(JSON.stringify(links, null, 2));
outFile.close();

$.writeln("Analysis complete. Links saved to logs/analysis_log.json");
