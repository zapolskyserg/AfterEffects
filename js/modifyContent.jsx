// --- MODIFY-CONTENT.JSX ---

function readJSON(filePath) {
    var file = File(filePath);
    file.open("r");
    var str = file.read();
    file.close();
    return JSON.parse(str);
}
function writeLog(logData, path) {
    var file = File(path);
    file.open("w");
    file.write(logData);
    file.close();
}
var config = readJSON("js/config.json");
var projectFile = File(config.projectFile);

// Якщо відкрито не той .aep — відкриваємо необхідний проект
if (app.project.file == null || app.project.file.fsName !== projectFile.fsName) {
    var confirmOpen = confirm("Відкрито не той проект!\nПотрібно відкрити: "+projectFile.fsName+"\nВідкрити його зараз? (Усі незбережені зміни буде втрачено)");
    if (confirmOpen) {
        app.open(projectFile);
    } else {
        alert("Cкрипт зупинено. Відкрийте правильний проект.");
        throw new Error("Wrong project opened");
    }
}

var logArr = [];
app.beginUndoGroup("Modify Content");

// Заміна тексту з форматуванням
for (var i = 1; i <= app.project.items.length; i++) {
    var item = app.project.item(i);
    if (item instanceof CompItem && item.name === config.customCompName) {
        for (var j = 1; j <= item.layers.length; j++) {
            var layer = item.layer(j);
            if (layer instanceof TextLayer) {
                var oldTextProp = layer.property("Source Text").value;
                var newTextDoc = oldTextProp.constructor === TextDocument
                  ? oldTextProp : new TextDocument(oldTextProp);
                newTextDoc.text = config.textReplacement;
                layer.property("Source Text").setValue(newTextDoc);
                logArr.push("TextLayer: " + layer.name + " -> " + config.textReplacement);
            }
            // Fill/Color Control
            for (var k = 1; k <= layer.effect.numProperties; k++) {
                var effect = layer.effect.property(k);
                if (effect.matchName === "ADBE Fill" || effect.matchName === "ADBE Color Control") {
                    effect.property("Color").setValue(config.fillColor || [1,0,0,1]);
                    logArr.push("Color set for layer: " + layer.name);
                }
            }
        }
    }
}

// Заміна відео по назвах прекомпозицій
for (var i = 1; i <= app.project.items.length; i++) {
    var item = app.project.item(i);
    if (item instanceof CompItem && config.videoLayerNames.indexOf(item.name) !== -1) {
        // Видалення старого footage
        for (var j = item.layers.length; j >= 1; j--) {
            var lyr = item.layer(j);
            if (lyr.source && lyr.source instanceof FootageItem) {
                lyr.remove();
                logArr.push("Removed old footage in " + item.name);
            }
        }
        var videoPath = config.videoFiles[item.name];
        var videoItem = app.project.importFile(new ImportOptions(File(videoPath)));
        var footageLayer = item.layers.add(videoItem);
        // Масштабування
        var wComp = item.width, hComp = item.height, wVid = videoItem.width, hVid = videoItem.height;
        var scaleW = wComp/wVid*100, scaleH = hComp/hVid*100;
        var scale = Math.max(scaleW, scaleH);
        footageLayer.property("Scale").setValue([scale, scale]);
        footageLayer.property("Position").setValue([wComp/2,hComp/2]);
        logArr.push("Inserted new footage '"+videoPath+"' and fit to comp in " + item.name);
    }
}

app.endUndoGroup();
writeLog(logArr.join("\n"), "logs/modify_content_log.txt");
alert("Content modification complete! (See logs/modify_content_log.txt)");
