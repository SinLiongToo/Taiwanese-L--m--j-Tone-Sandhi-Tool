const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'lmj tone sandhi tool.html');
const destPath = path.join(__dirname, 'blogger_embed.html');

try {
    let html = fs.readFileSync(srcPath, 'utf8');
    
    // Escape HTML characters for srcdoc
    let escaped = html
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
        
    let embed = `<!-- Taiwanese Lô-má-jī Tone Sandhi Trainer Blogger Embed -->\n<iframe srcdoc="${escaped}" style="width: 100%; min-height: 980px; border: none; border-radius: 24px; box-shadow: 0 10px 35px rgba(0,0,0,0.08);" scrolling="auto"></iframe>\n`;
    
    fs.writeFileSync(destPath, embed, 'utf8');
    console.log('Successfully generated blogger_embed.html');
} catch (err) {
    console.error('Error generating blogger embed:', err);
    process.exit(1);
}
