const fs = require('fs');
const path = require('path');

// __dirname points to src/app/(supacharger)/(plugins)/_registry
const pluginsDir = path.resolve(__dirname, '..');
const outputFile = path.join(__dirname, 'plugin-registry.ts');

function getPluginFolders() {
  return fs.readdirSync(pluginsDir).filter(folder => {
    if (folder === '_registry') return false;

    const folderPath = path.join(pluginsDir, folder);
    const isDirectory = fs.statSync(folderPath).isDirectory();

    // Check for any index.* file (e.g., index.js, index.jsx, index.ts, index.tsx)
    const hasIndexFile = fs.readdirSync(folderPath).some(file => /^index\..+$/.test(file));

    // Check for config.js file (CommonJS export)
    const hasConfig = fs.existsSync(path.join(folderPath, 'config.js'));

    return isDirectory && hasIndexFile && hasConfig;
  });
}

function checkDependencies(plugin, config) {
  // DEPENDENCIES is an object in your config, convert to array of keys or empty array
  const dependencies = config.SC_PLUGIN_CONFIG.DEPENDENCIES
    ? Object.keys(config.SC_PLUGIN_CONFIG.DEPENDENCIES)
    : [];

  dependencies.forEach(dep => {
    const depPath = path.join(pluginsDir, dep);
    const depExists = fs.existsSync(depPath) && fs.statSync(depPath).isDirectory();

    if (!depExists) {
      console.error(`  [!] Missing dependency folder: '${dep}' (required by '${plugin}')`);
      return;
    }

    const hasIndex = fs.readdirSync(depPath).some(file => /^index\..+$/.test(file));
    const hasConfig = fs.existsSync(path.join(depPath, 'config.js'));

    if (!hasIndex) console.error(`  [!] Missing index.* file in dependency: '${dep}' (required by '${plugin}')`);
    if (!hasConfig) console.error(`  [!] Missing config.js in dependency: '${dep}' (required by '${plugin}')`);
  });
}

function generateRegistry() {
  const plugins = getPluginFolders();
  let enabledCount = 0;

  // Generate imports and exports strings for the registry file
  const imports = plugins.map((plugin, i) =>
    `import Plugin${i} from '../${plugin}';\n` +
    `import { SC_PLUGIN_CONFIG as Config${i} } from '../${plugin}/config';`
  ).join('\n');

  const exports = `export const plugins = [\n${
    plugins.map((_, i) =>
      `  { name: Config${i}.PLUGIN_NAME, enabled: Config${i}.PLUGIN_ENABLED, component: Plugin${i} }`
    ).join(',\n')
  }\n];\n`;

  fs.writeFileSync(outputFile, `${imports}\n\n${exports}`);

  // Debug output
  console.log('\nPlugin scan results:');
  plugins.forEach(plugin => {
    try {
      const config = require(path.join(pluginsDir, plugin, 'config.js'));
      const enabled = config.SC_PLUGIN_CONFIG.PLUGIN_ENABLED;
      const name = config.SC_PLUGIN_CONFIG.PLUGIN_NAME || plugin;

      // Check dependencies first
      checkDependencies(plugin, config);

      const status = enabled ? '\x1b[32mENABLED\x1b[0m' : '\x1b[31mDISABLED\x1b[0m';
      console.log(`  - ${name}: ${status}`);

      if (enabled) enabledCount++;
    } catch (err) {
      console.error(`  [!] Failed to load config for '${plugin}': ${err.message}`);
    }
  });

  // Enabled plugins summary
  if (enabledCount > 0) {
    console.log('\n\x1b[32mEnabled plugins included in build:\x1b[0m');
    plugins.forEach(plugin => {
      const config = require(path.join(pluginsDir, plugin, 'config.js'));
      if (config.SC_PLUGIN_CONFIG.PLUGIN_ENABLED) {
        console.log(`  \x1b[32m\u2022 ${config.SC_PLUGIN_CONFIG.PLUGIN_NAME}\x1b[0m`);
      }
    });
  } else {
    console.log('\nNo plugins are enabled.');
  }

  console.log(`\nRegistry generated with ${plugins.length} plugins (${enabledCount} enabled).\n`);
}

generateRegistry();
