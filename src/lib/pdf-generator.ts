
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
      muted: '#666666'
  };

  doc.setTextColor(colors.text);

  // --- Header ---
  if (pd.name) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(fontSizes.name);
    doc.text(pd.name, page.width / 2, yPos, { align: 'center' });
    yPos += doc.getTextDimensions(pd.name).h;
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

  const contactItems = [
      pd.location,
      pd.email,
      pd.phone,
      pd.website ? `Portfolio` : undefined,
      pd.linkedin ? `LinkedIn` : undefined,
      pd.github ? `GitHub` : undefined
  ].filter((item): item is string => !!item);
  
  if (contactItems.length > 0) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(fontSizes.small);
    doc.setTextColor(colors.muted);

    const separator = ' | ';
    const separatorWidth = doc.getTextWidth(separator);
    const totalWidth = contactItems.reduce((acc, item) => acc + doc.getTextWidth(item), 0) + separatorWidth * (contactItems.length - 1);
    
    let currentX = (page.width - totalWidth) / 2;

    contactItems.forEach((item, index) => {
        const itemWidth = doc.getTextWidth(item);
        const itemHeight = doc.getTextDimensions(item).h;

        let isLink = false;
        let url = '';
        let displayItem = item;

        if (item === 'Portfolio' && pd.website) {
            isLink = true;
            url = pd.website;
        } else if (item === 'LinkedIn' && pd.linkedin) {
            isLink = true;
            url = pd.linkedin;
            displayItem = getUrlUsername(url) || 'LinkedIn';
        } else if (item === 'GitHub' && pd.github) {
            isLink = true;
            url = pd.github;
            displayItem = getUrlUsername(url) || 'GitHub';
        } else if (item.includes('@') && item === pd.email) {
            isLink = true;
            url = `mailto:${pd.email}`;
        }
        
        doc.setTextColor(isLink ? '#007bff' : colors.muted);
        doc.text(displayItem, currentX, yPos);
        
        if (isLink) {
            doc.link(currentX, yPos - itemHeight, doc.getTextWidth(displayItem), itemHeight, { url });
        }
        
        currentX += doc.getTextWidth(displayItem);

        if (index < contactItems.length - 1) {
            doc.setTextColor(colors.muted);
            doc.text(separator, currentX, yPos);
            currentX += separatorWidth;
        }
    });
    
    yPos += doc.getTextDimensions('A').h + 15;
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
        const descLines = doc.splitTextToSize(exp.description, page.contentWidth - 15); // Indent
        
        descLines.forEach((line: string, index: number) => {
            const prefix = line.startsWith('-') ? '' : '- ';
            const textLines = doc.splitTextToSize(prefix + line.replace(/^- /, ''), page.contentWidth - 15);
            doc.text(textLines, page.margins.left + 15, yPos);
            yPos += doc.getTextDimensions(textLines).h;
        });

        yPos += 10;
      });
    });
  }

  // --- Education ---
  if (education && education.length > 0) {
    drawSection('Education', () => {
        education.forEach(edu => {
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
