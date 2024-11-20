import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('YOUR_API_KEY');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

function formatResponse(text: string): string {
  // Handle bullet points without asterisks
  const lines = text.split('\n');
  let formattedText = '';
  let inList = false;

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('*')) {
      inList = true;
      formattedText += '• ' + trimmedLine.substring(1).trim() + '\n';
    } else if (trimmedLine.startsWith('-')) {
      inList = true;
      formattedText += '• ' + trimmedLine.substring(1).trim() + '\n';
    } else {
      if (inList && trimmedLine !== '') {
        formattedText += '\n';
        inList = false;
      }
      formattedText += line + '\n';
    }
  }

  // Handle table format
  if (formattedText.includes('|')) {
    const tableLines = formattedText.trim().split('\n');
    if (tableLines.some(line => line.includes('|'))) {
      return tableLines.map(line => 
        line.replace(/^\||\|$/g, '').split('|')
          .map(cell => cell.trim())
          .join(' | ')
      ).join('\n');
    }
  }

  return formattedText.trim();
}

export async function getAIResponse(message: string) {
  try {
    const result = await model.generateContent(message);
    const response = await result.response;
    return formatResponse(response.text());
  } catch (error) {
    console.error('Error getting AI response:', error);
    return 'Sorry, I encountered an error. Please try again.';
  }
}