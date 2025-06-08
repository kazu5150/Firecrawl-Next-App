export function exportToJSON(data: any): void {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  downloadFile(blob, 'scraped-data.json');
}

export function exportToMarkdown(data: any): void {
  let markdown = '# Scraped Content\n\n';
  
  if (Array.isArray(data)) {
    data.forEach((item, index) => {
      markdown += `## Page ${index + 1}\n\n`;
      markdown += `**URL:** ${item.metadata?.sourceURL || item.url || 'Unknown'}\n\n`;
      markdown += `**Title:** ${item.metadata?.title || 'Untitled'}\n\n`;
      if (item.metadata?.description) {
        markdown += `**Description:** ${item.metadata.description}\n\n`;
      }
      markdown += '### Content\n\n';
      markdown += item.markdown || item.content || 'No content available';
      markdown += '\n\n---\n\n';
    });
  } else {
    markdown += `**URL:** ${data.metadata?.sourceURL || data.url || 'Unknown'}\n\n`;
    markdown += `**Title:** ${data.metadata?.title || 'Untitled'}\n\n`;
    if (data.metadata?.description) {
      markdown += `**Description:** ${data.metadata.description}\n\n`;
    }
    markdown += '### Content\n\n';
    markdown += data.markdown || data.content || 'No content available';
  }
  
  const blob = new Blob([markdown], { type: 'text/markdown' });
  downloadFile(blob, 'scraped-content.md');
}

export function exportToCSV(data: any): void {
  const items = Array.isArray(data) ? data : [data];
  
  const headers = ['URL', 'Title', 'Description', 'Content Preview'];
  const rows = items.map(item => [
    item.metadata?.sourceURL || item.url || '',
    item.metadata?.title || '',
    item.metadata?.description || '',
    (item.markdown || item.content || '').substring(0, 200).replace(/\n/g, ' ') + '...'
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  downloadFile(blob, 'scraped-data.csv');
}

function downloadFile(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}