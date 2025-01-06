// tokens/config.mjs
import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';

// Register the Tokens Studio transforms with proper DTCG support
register(StyleDictionary, {
  expand: {
    composition: true,
    typography: true,
    shadow: true
  }
});

// Initialize Style Dictionary with the configuration
const sd = new StyleDictionary({
  source: ['src/app/tokens/input/tokens.json'],
  platforms: {
    css: {
      transformGroup: 'tokens-studio',
      buildPath: 'src/styles/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
          options: {
            showFileHeader: true,
            outputReferences: true
          }
        }
      ]
    }
  },
  // Add token studio specific configuration
  tokensStudio: {
    expandTypography: true,
    expandShadow: true,
    expandComposition: true,
    resolveReferences: true
  },
  log: {
    verbosity: 'verbose',
    errors: {
      // Don't throw on missing references
      brokenReferences: 'warn'
    },
    // Downgrade warnings to info level
    warnings: 'info'
  },
  // Explicitly tell Style Dictionary we're using DTCG format
  usesDtcg: true,
  // Add preprocessors for DTCG format
  preprocessors: ['tokens-studio']
});

// Register the CSS variables format
StyleDictionary.registerFormat({
  name: 'css/variables',
  format: function(dictionary) {
    return `:root {
${dictionary.allProperties.map(prop => `  --${prop.name}: ${prop.value};`).join('\n')}
}`
  }
});

await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();