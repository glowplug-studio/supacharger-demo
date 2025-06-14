const fs = require('fs');
const path = require('path');

// __dirname points to src/app/(supacharger)/(plugins)/_registry
const pluginsDir = path.resolve(__dirname, '..');
const outputFile = path.join(__dirname, 'plugin-registry.ts');

// Clear the registry file immediately on script start
fs.writeFileSync(outputFile, '', 'utf8');

/**
 * Get all valid plugin folders:
 * - Exclude '_registry' folder
 * - Exclude hidden files/folders (starting with '.')
 * - Only directories with index.* file and _config/config.js file
 */
function getPluginFolders() {
  return fs.readdirSync(pluginsDir).filter(folder => {
    if (folder === '_registry') return false;
    if (folder.startsWith('.')) return false; // skip hidden files/folders like .DS_Store

    const folderPath = path.join(pluginsDir, folder);

    // Skip if not a directory
    if (!fs.statSync(folderPath).isDirectory()) return false;

    // Check for index.* file (index.js, index.ts, etc.)
    const hasIndexFile = fs.readdirSync(folderPath).some(file => /^index\..+$/.test(file));

    // Check for config.js inside _config folder
    const configPath = path.join(folderPath, '_config', 'config.js');
    const hasConfig = fs.existsSync(configPath);

    return hasIndexFile && hasConfig;
  });
}

/**
 * Check dependencies listed in SC_PLUGIN_CONFIG.DEPENDENCIES
 * Logs errors if dependencies are missing or incomplete
 */
function checkDependencies(plugin, config) {
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
    const hasConfig = fs.existsSync(path.join(depPath, '_config', 'config.js'));

    if (!hasIndex) console.error(`  [!] Missing index.* file in dependency: '${dep}' (required by '${plugin}')`);
    if (!hasConfig) console.error(`  [!] Missing _config/config.js in dependency: '${dep}' (required by '${plugin}')`);
  });
}

/**
 * Generate the plugin registry file with imports and exports
 * Also logs plugin statuses and dependency issues
 */
function generateRegistry() {
  const plugins = getPluginFolders();
  let enabledCount = 0;

  if (plugins.length === 0) {
      // Write a valid empty plugins export so imports don't break
      fs.writeFileSync(
        outputFile,
        `// This file is auto-generated. No plugins found.\n\n` +
        `export interface Plugin {\n` +
        `  name: string;\n` +
        `  enabled: boolean;\n` +
        `  component: React.ComponentType<any>;\n` +
        `}\n\n` +
        `export const plugins: Plugin[] = [];\n`,
        'utf8'
      );
    console.log('No valid plugins found.');
    return;
  }

  // Generate import statements for plugins and their configs
  const imports = plugins.map((plugin, i) =>
    `import Plugin${i} from '../${plugin}';\n` +
    `import { SC_PLUGIN_CONFIG as Config${i} } from '../${plugin}/_config/config';`
  ).join('\n');

  // Generate export array with plugin info
  const exports = `export const plugins = [\n${
    plugins.map((_, i) =>
      `  { name: Config${i}.PLUGIN_NAME, enabled: Config${i}.PLUGIN_ENABLED, component: Plugin${i} }`
    ).join(',\n')
  }\n];\n`;

  // Write the registry file with new content
  fs.writeFileSync(outputFile, `${imports}\n\n${exports}`);

  // Log plugin scan results
  console.log('\nPlugin scan results:');
  plugins.forEach(plugin => {
    try {
      const config = require(path.join(pluginsDir, plugin, '_config', 'config.js'));
      const enabled = config.SC_PLUGIN_CONFIG.PLUGIN_ENABLED;
      const name = config.SC_PLUGIN_CONFIG.PLUGIN_NAME || plugin;

      // Check dependencies for this plugin
      checkDependencies(plugin, config);

      const status = enabled ? '\x1b[32mENABLED\x1b[0m' : '\x1b[31mDISABLED\x1b[0m';
      console.log(`  - ${name}: ${status}`);

      if (enabled) enabledCount++;
    } catch (err) {
      console.error(`  [!] Failed to load config for '${plugin}': ${err.message}`);
    }
  });

  // Summary of enabled plugins
  if (enabledCount > 0) {
    console.log('\n\x1b[32mEnabled plugins included in build:\x1b[0m');
    plugins.forEach(plugin => {
      try {
        const config = require(path.join(pluginsDir, plugin, '_config', 'config.js'));
        if (config.SC_PLUGIN_CONFIG.PLUGIN_ENABLED) {
          console.log(`  \x1b[32m\u2022 ${config.SC_PLUGIN_CONFIG.PLUGIN_NAME}\x1b[0m`);
        }
      } catch {
        // Ignore errors here, already logged above
      }
    });
  } else {
    console.log('\nNo plugins are enabled.');
  }

  console.log(`\nRegistry generated with ${plugins.length} plugins (${enabledCount} enabled).\n`);
}

generateRegistry();
