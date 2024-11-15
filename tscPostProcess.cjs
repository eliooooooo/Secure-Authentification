const fs = require('fs');
const path = require('path');

console.log('Post-process en cours...');

// Fonction pour remplacer les chaînes de caractères dans un fichier
function replaceInFile(filePath, replacements) {
    let content = fs.readFileSync(filePath, 'utf8');
    for (const [searchValue, replaceValue] of Object.entries(replacements)) {
        console.log(`Remplacement de ${searchValue} par ${replaceValue} dans ${filePath}`);
        const escapedSearchValue = searchValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        content = content.replace(new RegExp(escapedSearchValue, 'g'), replaceValue);
    }
    fs.writeFileSync(filePath, content, 'utf8');
}

// Fonction pour traiter tous les fichiers dans un répertoire
function processDirectory(directory, replacements) {
    fs.readdirSync(directory).forEach(file => {
        const fullPath = path.join(directory, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            processDirectory(fullPath, replacements);
        } else if (fullPath.endsWith('.js')) {
            replaceInFile(fullPath, replacements);
        }
    });
}

// Répertoire de sortie de `tsc`
const outDir = path.join(__dirname, 'dist');

// Remplacements à effectuer
const replacements = {
    "import * as openPgpKey from './openPgpKey';": "import * as openPgpKey from './openPgpKey.js';",
    "import * as openpgp from 'openpgp';": "import * as openpgp from '../node_modules/openpgp/dist/openpgp.js';",
};

// Traiter le répertoire de sortie
processDirectory(outDir, replacements);

console.log('Post-process terminé.');