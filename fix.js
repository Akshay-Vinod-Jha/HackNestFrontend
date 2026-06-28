const fs = require('fs');
const path = 'E:/PersonalProjects/pict_final_year/spring_boot_project/frontend/src/pages/teams/MyTeamsPage.jsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/className="([^"]*)clay-card([^"]*)"/g, 'className="$1bg-white rounded-3xl shadow-sm border border-gray-100$2"');
content = content.replace(/style=\{\{\s*color:\s*'var\(--clay-text-primary\)'\s*\}\}/g, 'className="text-gray-900"');
content = content.replace(/style=\{\{\s*color:\s*'var\(--clay-text-muted\)'\s*\}\}/g, 'className="text-gray-500"');
content = content.replace(/style=\{\{\s*color:\s*'var\(--clay-primary\)'\s*\}\}/g, 'className="text-blue-600"');
content = content.replace(/style=\{\{\s*color:\s*'var\(--clay-success\)'\s*\}\}/g, 'className="text-green-500"');
content = content.replace(/style=\{\{\s*background:\s*'var\(--clay-primary-light\)'\s*\}\}/g, 'className="bg-blue-50"');
content = content.replace(/className="clay-button clay-button-secondary/g, 'className="bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl');
content = content.replace(/className="clay-icon-button"/g, 'className="p-2 bg-gray-50 text-gray-500 hover:bg-gray-100 rounded-xl"');
content = content.replace(/className="clay-badge"/g, 'className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs font-bold"');

fs.writeFileSync(path, content, 'utf8');
