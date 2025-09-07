
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import type { ResumeData } from './types';

export function generatePdf(resumeData: ResumeData) {
  const doc = new jsPDF('p', 'pt', 'a4');
  const {
    personalDetails: pd,
    summary,
    experience,
    education,
    projects,
    skills,
    name: resumeName
  } = resumeData;

  const page = {
    width: doc.internal.pageSize.getWidth(),
    height: doc.internal.pageSize.getHeight(),
    margins: {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40,
    },
    contentWidth: 0,
  };
  page.contentWidth = page.width - page.margins.left - page.margins.right;

  let yPos = page.margins.top;

  const fontSizes = {
    name: 24,
    sectionHeader: 11,
    subHeader: 12,
    body: 10,
    small: 9,
  };

  const colors = {
      primary: '#408080',
      text: '#333333',
      muted: '#666666',
      link: '#007bff'
  };

  doc.setTextColor(colors.text);

  // --- Header ---
  if (pd.name) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(fontSizes.name);
    doc.text(pd.name, page.width / 2, yPos, { align: 'center' });
    yPos += doc.getTextDimensions(pd.name).h - 5;
  }
  
  const getUrlUsername = (url: string) => {
    if (!url || !url.startsWith('http')) return '';
    try {
        const path = new URL(url).pathname;
        return path.split('/').filter(Boolean).pop() || '';
    } catch {
        return '';
    }
  }

  const contactItems: { text: string; url?: string }[] = [];
  if (pd.location) contactItems.push({ text: pd.location });
  if (pd.email) contactItems.push({ text: pd.email, url: `mailto:${pd.email}` });
  if (pd.phone) contactItems.push({ text: pd.phone, url: `tel:${pd.phone}` });
  if (pd.website) contactItems.push({ text: 'Portfolio', url: pd.website });
  if (pd.linkedin) contactItems.push({ text: getUrlUsername(pd.linkedin) || 'LinkedIn', url: pd.linkedin });
  if (pd.github) contactItems.push({ text: getUrlUsername(pd.github) || 'GitHub', url: pd.github });

  
  if (contactItems.length > 0) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(fontSizes.small);
    doc.setTextColor(colors.muted);

    const separator = ' | ';
    const separatorWidth = doc.getTextWidth(separator);
    
    const itemsWithWidths = contactItems.map(item => ({...item, width: doc.getTextWidth(item.text)}));
    const totalWidth = itemsWithWidths.reduce((acc, item) => acc + item.width, 0) + separatorWidth * (contactItems.length - 1);
    
    let currentX = (page.width - totalWidth) / 2;
    const itemHeight = doc.getTextDimensions('A').h;

    itemsWithWidths.forEach((item, index) => {
        const isLink = !!item.url;
        doc.setTextColor(isLink ? colors.link : colors.muted);
        doc.text(item.text, currentX, yPos);
        
        if (isLink) {
            doc.link(currentX, yPos - itemHeight, item.width, itemHeight, { url: item.url! });
        }
        
        currentX += item.width;

        if (index < contactItems.length - 1) {
            doc.setTextColor(colors.muted);
            doc.text(separator, currentX, yPos);
            currentX += separatorWidth;
        }
    });
    
    yPos += itemHeight + 15;
  }
  
  const drawSection = (title: string, contentFn: () => void) => {
    if (yPos > page.height - page.margins.bottom - 50) { // Check for page break
        doc.addPage();
        yPos = page.margins.top;
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(fontSizes.sectionHeader);
    doc.setTextColor(colors.primary);
    doc.text(title.toUpperCase(), page.margins.left, yPos);
    yPos += 8;
    doc.setDrawColor(colors.primary);
    doc.line(page.margins.left, yPos, page.margins.left + page.contentWidth, yPos);
    yPos += 15;
    doc.setTextColor(colors.text);
    contentFn();
    yPos += 10; // Spacing after section
  };

  // --- Summary ---
  if (summary) {
    drawSection('Summary', () => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(fontSizes.body);
      const splitText = doc.splitTextToSize(summary, page.contentWidth);
      doc.text(splitText, page.margins.left, yPos);
      yPos += doc.getTextDimensions(splitText).h;
    });
  }

  // --- Experience ---
  if (experience && experience.length > 0) {
    drawSection('Experience', () => {
      experience.forEach(exp => {
        if (yPos > page.height - page.margins.bottom - 40) { // Check for page break
            doc.addPage();
            yPos = page.margins.top;
        }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(fontSizes.subHeader);
        doc.text(exp.role, page.margins.left, yPos);
        
        const dateText = `${exp.startDate} - ${exp.endDate}`;
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(colors.muted);
        doc.text(dateText, page.width - page.margins.right, yPos, { align: 'right' });
        doc.setTextColor(colors.text);

        yPos += doc.getTextDimensions(exp.role).h + 2;
        
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(fontSizes.body);
        doc.text(exp.company, page.margins.left, yPos);
        yPos += doc.getTextDimensions(exp.company).h + 5;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(fontSizes.body);
        
        const descLines = exp.description.split('\n').filter(line => line.trim() !== '');
        
        descLines.forEach((line: string) => {
            const prefix = '- ';
            const textLines = doc.splitTextToSize(line.replace(/^- /, ''), page.contentWidth - 15);
            doc.text(prefix, page.margins.left, yPos);
            doc.text(textLines, page.margins.left + 15, yPos);
            yPos += doc.getTextDimensions(textLines).h + 2;
        });

        yPos += 10;
      });
    });
  }

  // --- Education ---
  if (education && education.length > 0) {
    drawSection('Education', () => {
        education.forEach(edu => {
        if (yPos > page.height - page.margins.bottom - 40) { // Check for page break
            doc.addPage();
            yPos = page.margins.top;
        }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(fontSizes.subHeader);
        doc.text(edu.degree, page.margins.left, yPos);
        const dateText = `${edu.startDate} - ${edu.endDate}`;
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(colors.muted);
        doc.text(dateText, page.width - page.margins.right, yPos, { align: 'right' });
        doc.setTextColor(colors.text);
        yPos += doc.getTextDimensions(edu.degree).h + 2;

        doc.setFont('helvetica', 'italic');
        doc.setFontSize(fontSizes.body);
        doc.text(edu.institution, page.margins.left, yPos);
        yPos += doc.getTextDimensions(edu.institution).h + 10;
      });
    });
  }
  
  // --- Skills ---
  if (skills && skills.length > 0) {
      drawSection('Skills', () => {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(fontSizes.body);
          const skillsText = skills.map(s => s.name).join(', ');
          const splitText = doc.splitTextToSize(skillsText, page.contentWidth);
          doc.text(splitText, page.margins.left, yPos);
          yPos += doc.getTextDimensions(splitText).h;
      });
  }

  doc.save(`${resumeName || 'resume'}.pdf`);
}
