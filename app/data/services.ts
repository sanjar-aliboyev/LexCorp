
import { Building2, FileText, Scale, Home, ShieldAlert, Gavel } from 'lucide-react';

export const SERVICES_DATA = [
  {
    id: 'corporate',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069',
    titles: {
      EN: "Corporate Law & Business Support",
      RU: "Корпоративное право и бизнес",
      UZ: "Korporativ xizmatlar"
    },
    subServices: {
      EN: ['Company Registration', 'Corporate Governance', 'M&A Transactions', 'Contract Management'],
      RU: ['Регистрация компаний', 'Корпоративное управление', 'M&A сделки', 'Управление договорами'],
      UZ: ['Kompaniyalarni ro‘yxatdan o‘tkazish', 'Korporativ boshqaruv', 'Sherikchilik bitimlari', 'Shartnomalar nazorati']
    }
  },
  {
    id: 'consulting',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2070',
    titles: {
      EN: "Consulting & Legal Opinions",
      RU: "Консалтинг и правовые заключения",
      UZ: "Konsalting xizmatlari"
    },
    subServices: {
      EN: ['Legal Opinions', 'Strategic Consulting', 'Contract Advisory', 'Risk Assessment'],
      RU: ['Правовые заключения', 'Стратегический консалтинг', 'Договорной анализ', 'Оценка рисков'],
      UZ: ['Yuridik xulosalar', 'Strategik masalalar', 'Muzokaralarda ko‘mak', 'Risk tahlili']
    }
  },
  {
    id: 'litigation',
    icon: Scale,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=2070',
    titles: {
      EN: "Litigation & Dispute Resolution",
      RU: "Судебные споры",
      UZ: "Sud ishlari va nizolar"
    },
    subServices: {
      EN: ['Commercial Litigation', 'Contract Disputes', 'Debt Recovery', 'Enforcement Proceedings'],
      RU: ['Коммерческие споры', 'Договорные споры', 'Взыскание долгов', 'Исполнительное производство'],
      UZ: ['Iqtisodiy nizolar', 'Shartnoma nizolari', 'Qarzdorlikni undirish', 'Ijro ishlari va boshqalar']
    }
  },
  {
    id: 'civil',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059ee971?auto=format&fit=crop&q=80&w=2073',
    titles: {
      EN: "Civil, Property & Family Law",
      RU: "Гражданское, семейное и имущественное право",
      UZ: "Mulkiy va nomulkiy ishlar"
    },
    subServices: {
      EN: ['Real Estate Disputes', 'Property Claims', 'Family Assets', 'Civil Representation'],
      RU: ['Споры недвижимости', 'Имущественные иски', 'Семейные активы', 'Судебное представительство'],
      UZ: ['Mulkni rasmiylashtirish', 'Mulkiy nizolarda yordam', 'Intellektual mulk', 'Sud va organlarda vakillik']
    }
  },
  {
    id: 'risk',
    icon: ShieldAlert,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=2071',
    titles: {
      EN: "Business Risk & Legal Protection",
      RU: "Бизнес-риски и защита",
      UZ: "Biznes xavfsizligi"
    },
    subServices: {
      EN: ['Legal Compliance', 'Risk Management', 'Due Diligence', 'Crisis Support'],
      RU: ['Правовое соответствие', 'Управление рисками', 'Due diligence', 'Кризисная поддержка'],
      UZ: ['Komplayens nazorati', 'IT va kiber huquq', 'Due Diligence', 'Risk menejmenti']
    }
  },
  {
    id: 'criminal',
    icon: Gavel,
    image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=2070',
    titles: {
      EN: "White-Collar Criminal Defense",
      RU: "Защита по экономическим преступлениям",
      UZ: "Jinoyat ishlari bo‘yicha himoya"
    },
    subServices: {
      EN: ['Economic Crimes', 'Fraud Defense', 'Tax Offenses', 'Executive Protection'],
      RU: ['Экономические преступления', 'Защита от мошенничества', 'Налоговые правонарушения', 'Защита в правоохранительных органах'],
      UZ: ['Iqtisodiy va kiber jinoyatlar', 'Firibgarlikka oid ishlar', 'Soliq masalalari', 'Huquqni muhofaza qiluvchi organlarda himoya']
    }
  }
];
