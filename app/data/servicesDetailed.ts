import { Building2, FileText, Scale, Home, ShieldAlert, Gavel } from 'lucide-react';

export interface ServiceItem {
  name: {
    UZ: string;
    RU: string;
    EN: string;
  };
  details: {
    UZ: string[];
    RU: string[];
    EN: string[];
  };
}

export interface ServiceCategory {
  id: string;
  icon: typeof Building2;
  title: {
    UZ: string;
    RU: string;
    EN: string;
  };
  subtitle: {
    UZ: string;
    RU: string;
    EN: string;
  };
  items: ServiceItem[];
}

export const SERVICES_DETAILED: ServiceCategory[] = [
  {
    id: 'corporate',
    icon: Building2,
    title: {
      UZ: "Biznesni qo'llab quvvatlash",
      RU: "Поддержка бизнеса",
      EN: "Business Support"
    },
    subtitle: {
      UZ: "Biznesingizni yuridik jihatdan himoya qilish",
      RU: "Юридическая защита вашего бизнеса",
      EN: "Legal protection for your business"
    },
    items: [
      {
        name: {
          UZ: "Soliq rejalashtirish",
          RU: "Налоговое планирование",
          EN: "Tax Planning"
        },
        details: {
          UZ: ["Soliq optimizatsiyasi", "Soliq hisobotlari", "Soliq auditi"],
          RU: ["Оптимизация налогов", "Налоговая отчетность", "Налоговый аудит"],
          EN: ["Tax optimization", "Tax reporting", "Tax audit"]
        }
      },
      {
        name: {
          UZ: "Shartnomalar va hujjatlar tuzish",
          RU: "Составление договоров и документов",
          EN: "Contract & Document Drafting"
        },
        details: {
          UZ: ["Shartnomalar loyihalash", "Yuridik hujjatlar tayyorlash", "Shartnomalarni tekshirish"],
          RU: ["Разработка договоров", "Подготовка юридических документов", "Проверка договоров"],
          EN: ["Contract drafting", "Legal document preparation", "Contract review"]
        }
      },
      {
        name: {
          UZ: "Operatsion ishlarda yuridik xizmat",
          RU: "Юридическое сопровождение операций",
          EN: "Legal Support for Operations"
        },
        details: {
          UZ: ["Bitimlarni yuridik qo'llab-quvvatlash", "Operatsion maslahat", "Biznes jarayonlarini optimallashtirish"],
          RU: ["Юридическое сопровождение сделок", "Операционные консультации", "Оптимизация бизнес-процессов"],
          EN: ["Legal support for transactions", "Operational consulting", "Business process optimization"]
        }
      },
      {
        name: {
          UZ: "Soliq va bojxona protseduralari",
          RU: "Налоговые и таможенные процедуры",
          EN: "Tax & Customs Procedures"
        },
        details: {
          UZ: ["Soliq protseduralarini yuritish", "Bojxona rasmiylashtiruvi", "(No)rezidentlar bilan bitimlarda yuridik yordam"],
          RU: ["Сопровождение налоговых процедур", "Таможенное оформление", "Юридическая помощь в сделках с (не)резидентами"],
          EN: ["Tax procedure support", "Customs clearance", "Legal assistance in transactions with (non-)residents"]
        }
      },
      {
        name: {
          UZ: "Korxonalarni ro'yxatdan o'tkazish",
          RU: "Регистрация предприятий",
          EN: "Company Registration"
        },
        details: {
          UZ: ["Korxonani ro'yxatdan o'tkazish", "Korxonani qayta tashkil etish", "Korxonani tugatish"],
          RU: ["Регистрация предприятия", "Реорганизация предприятия", "Ликвидация предприятия"],
          EN: ["Company registration", "Company reorganization", "Company liquidation"]
        }
      },
      {
        name: {
          UZ: "Litsenziya olishda yuridik yordam",
          RU: "Юридическая помощь в получении лицензий",
          EN: "Legal Assistance for Licensing"
        },
        details: {
          UZ: ["Tadbirkorlik faoliyati uchun litsenziyalar", "Ruxsatnomalar olish", "Litsenziyalarni yangilash"],
          RU: ["Лицензии на предпринимательскую деятельность", "Получение разрешений", "Продление лицензий"],
          EN: ["Business activity licenses", "Obtaining permits", "License renewal"]
        }
      },
      {
        name: {
          UZ: "Investitsiya loyihalarini yuritish",
          RU: "Сопровождение инвестиционных проектов",
          EN: "Investment Project Support"
        },
        details: {
          UZ: ["Investitsiya loyihalarini yuridik qo'llab-quvvatlash", "Investorlarni jalb qilishda muzokaralarda qatnashish", "Investitsiya shartnomalarini tuzish"],
          RU: ["Юридическое сопровождение инвестпроектов", "Участие в переговорах по привлечению инвесторов", "Составление инвестиционных договоров"],
          EN: ["Legal support for investment projects", "Participation in investor attraction negotiations", "Investment contract drafting"]
        }
      },
      {
        name: {
          UZ: "Xorijiy kompaniyalarni akkreditatsiya qilish",
          RU: "Аккредитация иностранных компаний",
          EN: "Foreign Company Accreditation"
        },
        details: {
          UZ: ["Savdo Uyi ro'yxatdan o'tkazish", "Savdo Uyini ro'yxatdan o'tkazish", "Savdo Uyi faoliyatini yuritish"],
          RU: ["Регистрация Торгового Дома", "Регистрация представительства", "Сопровождение деятельности Торгового Дома"],
          EN: ["Trading House registration", "Representative office registration", "Trading House operations support"]
        }
      }
    ]
  },
  {
    id: 'consulting',
    icon: FileText,
    title: {
      UZ: "Konsalting Xizmatlari",
      RU: "Консалтинговые услуги",
      EN: "Consulting Services"
    },
    subtitle: {
      UZ: "Professional yuridik maslahatlar",
      RU: "Профессиональные юридические консультации",
      EN: "Professional legal consultations"
    },
    items: [
      {
        name: {
          UZ: "Yuridik hujjatlarni tarjima qilish",
          RU: "Перевод юридических документов",
          EN: "Legal Document Translation"
        },
        details: {
          UZ: ["Shartnomalar tarjimasi", "Da'vo arizalari tarjimasi", "Sud qarorlari tarjimasi"],
          RU: ["Перевод договоров", "Перевод исковых заявлений", "Перевод судебных решений"],
          EN: ["Contract translation", "Lawsuit translation", "Court decision translation"]
        }
      },
      {
        name: {
          UZ: "Normativ-huquqiy hujjatlar tarjimasi",
          RU: "Перевод нормативно-правовых актов",
          EN: "Regulatory Document Translation"
        },
        details: {
          UZ: ["Qonunlar tarjimasi", "Qarorlar tarjimasi", "Nizomlar tarjimasi"],
          RU: ["Перевод законов", "Перевод постановлений", "Перевод положений"],
          EN: ["Laws translation", "Resolutions translation", "Regulations translation"]
        }
      },
      {
        name: {
          UZ: "Ustav va notarial hujjatlar rasmiylashtirilishida maslahatlar",
          RU: "Консультации по уставам и нотариальным документам",
          EN: "Charter & Notarial Document Consultations"
        },
        details: {
          UZ: ["Ustavlar rasmiylashtiruvi", "Notarial hujjatlar", "Bitimlar rasmiylashtiruvi"],
          RU: ["Оформление уставов", "Нотариальные документы", "Оформление сделок"],
          EN: ["Charter formalization", "Notarial documents", "Transaction formalization"]
        }
      },
      {
        name: {
          UZ: "Jinoyat ishlari bo'yicha himoya",
          RU: "Защита по уголовным делам",
          EN: "Criminal Case Defense"
        },
        details: {
          UZ: ["Jinoyat ishlari bo'yicha maslahat", "Tergov jarayonida yordam", "Sud jarayonida vakillik"],
          RU: ["Консультации по уголовным делам", "Помощь в ходе следствия", "Представительство в суде"],
          EN: ["Criminal case consultations", "Investigation assistance", "Court representation"]
        }
      },
      {
        name: {
          UZ: "Huquqiy strategiya",
          RU: "Правовая стратегия",
          EN: "Legal Strategy"
        },
        details: {
          UZ: ["Huquqiy strategiya ishlab chiqish", "Risk tahlili", "Huquqiy rejalashtirish"],
          RU: ["Разработка правовой стратегии", "Анализ рисков", "Правовое планирование"],
          EN: ["Legal strategy development", "Risk analysis", "Legal planning"]
        }
      },
      {
        name: {
          UZ: "Korxonani tashkil etish va qayta tashkil etish bo'yicha maslahatlar",
          RU: "Консультации по организации и реорганизации предприятий",
          EN: "Company Formation & Reorganization Consultations"
        },
        details: {
          UZ: ["Korxonani tashkil etish", "Qayta tashkil etish", "Qo'shib yuborish va boshqalar"],
          RU: ["Создание предприятия", "Реорганизация", "Слияние и прочее"],
          EN: ["Company formation", "Reorganization", "Mergers and more"]
        }
      },
      {
        name: {
          UZ: "Yuridik sohaning barcha sohalari bo'yicha konsalting",
          RU: "Консалтинг по всем отраслям права",
          EN: "Consulting in All Legal Areas"
        },
        details: {
          UZ: ["Fuqarolik huquqi", "Iqtisodiy huquq", "Ma'muriy huquq"],
          RU: ["Гражданское право", "Экономическое право", "Административное право"],
          EN: ["Civil law", "Economic law", "Administrative law"]
        }
      }
    ]
  },
  {
    id: 'litigation',
    icon: Scale,
    title: {
      UZ: "Sud ishlari va nizolarni hal qilish",
      RU: "Судебные дела и разрешение споров",
      EN: "Litigation & Dispute Resolution"
    },
    subtitle: {
      UZ: "Sudda manfaatlaringizni himoya qilish",
      RU: "Защита ваших интересов в суде",
      EN: "Protecting your interests in court"
    },
    items: [
      {
        name: {
          UZ: "Shartnomaviy nizolar",
          RU: "Договорные споры",
          EN: "Contract Disputes"
        },
        details: {
          UZ: ["Majburiy shartnomani tuzishda kelishmovchiliklar", "Shartnomani o'zgartirish yoki bekor qilish", "Bitimni haqiqiy emas deb topish", "Majburiyatlar bajarilmaganligi"],
          RU: ["Споры о заключении обязательного договора", "Изменение или расторжение договора", "Признание сделки недействительной", "Неисполнение обязательств"],
          EN: ["Disputes on mandatory contract conclusion", "Contract modification or termination", "Invalidation of transactions", "Non-performance of obligations"]
        }
      },
      {
        name: {
          UZ: "Mulkiy nizolar",
          RU: "Имущественные споры",
          EN: "Property Disputes"
        },
        details: {
          UZ: ["Mulk huquqini tan olish — Iqtisodiy sud, Fuqarolik sudida", "Mol-mulkni g'ayriqonuniy egalikdan talab qilish", "Mulk huquqlari buzilishi", "O'zboshimchalik bilan egallab olingan yer uchastkasini qaytarish"],
          RU: ["Признание права собственности — в Экономическом, Гражданском суде", "Истребование имущества из незаконного владения", "Нарушение прав собственности", "Возврат самовольно занятого земельного участка"],
          EN: ["Property rights recognition — Economic, Civil court", "Recovery of property from illegal possession", "Property rights violations", "Return of illegally occupied land plot"]
        }
      },
      {
        name: {
          UZ: "Mehnat nizolari",
          RU: "Трудовые споры",
          EN: "Labor Disputes"
        },
        details: {
          UZ: ["Ishga tiklash bo'yicha yuridik yordam", "Ish haqi undirish bo'yicha yuridik yordam", "Mehnat shartnomasini bekor qilish"],
          RU: ["Восстановление на работе", "Взыскание заработной платы", "Расторжение трудового договора"],
          EN: ["Job reinstatement assistance", "Wage recovery assistance", "Employment contract termination"]
        }
      },
      {
        name: {
          UZ: "Yer nizolari",
          RU: "Земельные споры",
          EN: "Land Disputes"
        },
        details: {
          UZ: ["Yer huquqlarini tan olish bo'yicha nizolar", "Yer chegaralari nizolari"],
          RU: ["Споры о признании земельных прав", "Споры о границах земельных участков"],
          EN: ["Land rights recognition disputes", "Land boundary disputes"]
        }
      },
      {
        name: {
          UZ: "Davlat organlari qarorlari bo'yicha nizolar",
          RU: "Споры по решениям государственных органов",
          EN: "Disputes on Government Decisions"
        },
        details: {
          UZ: ["Mahalliy hokimiyat qarorlari ustidan shikoyat", "Davlat boshqaruvi organlari qarorlari ustidan shikoyat", "Mansabdor shaxslar harakatlari ustidan shikoyat", "Idoraviy normativ-huquqiy hujjatlar ustidan shikoyat"],
          RU: ["Обжалование решений местных органов власти", "Обжалование решений органов госуправления", "Обжалование действий должностных лиц", "Обжалование ведомственных НПА"],
          EN: ["Appeals against local authority decisions", "Appeals against government body decisions", "Appeals against official actions", "Appeals against departmental regulations"]
        }
      },
      {
        name: {
          UZ: "Ro'yxatga olish bilan bog'liq nizolar",
          RU: "Споры, связанные с регистрацией",
          EN: "Registration-Related Disputes"
        },
        details: {
          UZ: ["Davlat ro'yxatidan o'tkazishni rad etish ustidan shikoyat", "Ro'yxatdan o'tkazishdan bo'yin tovlash ustidan shikoyat"],
          RU: ["Обжалование отказа в государственной регистрации", "Обжалование уклонения от регистрации"],
          EN: ["Appeals against state registration refusal", "Appeals against registration evasion"]
        }
      },
      {
        name: {
          UZ: "Notarial va FHDYO nizolari",
          RU: "Нотариальные споры и споры с ЗАГСом",
          EN: "Notarial & Civil Registry Disputes"
        },
        details: {
          UZ: ["Notarial harakatni rad etish ustidan shikoyat", "FHDYO ro'yxatga olishni rad etish ustidan shikoyat", "Notarius/FHDYO mansabdor shaxsi harakatlari ustidan shikoyat"],
          RU: ["Обжалование отказа в нотариальном действии", "Обжалование отказа в регистрации ЗАГСом", "Обжалование действий нотариуса/должностного лица ЗАГСа"],
          EN: ["Appeals against notarial action refusal", "Appeals against civil registry refusal", "Appeals against notary/registry official actions"]
        }
      },
      {
        name: {
          UZ: "Investitsiya nizolari",
          RU: "Инвестиционные споры",
          EN: "Investment Disputes"
        },
        details: {
          UZ: ["Investor va ma'muriy organlar o'rtasidagi nizolar", "Investitsiya shartnomasi shartlariga rioya"],
          RU: ["Споры между инвестором и административными органами", "Соблюдение условий инвестиционного договора"],
          EN: ["Disputes between investors and administrative bodies", "Compliance with investment contract terms"]
        }
      },
      {
        name: {
          UZ: "Raqobat nizolari",
          RU: "Споры о конкуренции",
          EN: "Competition Disputes"
        },
        details: {
          UZ: ["Tovar bozorida raqobat nizolari", "Moliya bozorida raqobat nizolari", "Monopoliyaga qarshi organ bilan nizolar"],
          RU: ["Споры о конкуренции на товарном рынке", "Споры о конкуренции на финансовом рынке", "Споры с антимонопольным органом"],
          EN: ["Competition disputes in commodity market", "Competition disputes in financial market", "Disputes with antitrust authority"]
        }
      },
      {
        name: {
          UZ: "Chet davlat sudi qarorlarining O'zbekistonda tan olinishi",
          RU: "Признание решений иностранных судов в Узбекистане",
          EN: "Foreign Court Decision Recognition in Uzbekistan"
        },
        details: {
          UZ: ["Chet davlat sudi qarorini O'zbekistonda tan olish", "Chet davlat arbitraji qarorini O'zbekistonda tan olish"],
          RU: ["Признание решения иностранного суда в Узбекистане", "Признание решения иностранного арбитража в Узбекистане"],
          EN: ["Foreign court decision recognition in Uzbekistan", "Foreign arbitration award recognition in Uzbekistan"]
        }
      },
      {
        name: {
          UZ: "Tashkilotlar qarorlari ustidan nizolar",
          RU: "Споры по решениям организаций",
          EN: "Disputes on Organizational Decisions"
        },
        details: {
          UZ: ["Korxona, muassasa qarorlari ustidan shikoyat", "Jamoat birlashmalari qarorlari ustidan shikoyat"],
          RU: ["Обжалование решений предприятий, учреждений", "Обжалование решений общественных объединений"],
          EN: ["Appeals against enterprise/institution decisions", "Appeals against public association decisions"]
        }
      }
    ]
  },
  {
    id: 'civil',
    icon: Home,
    title: {
      UZ: "Fuqarolik, mulk va oila huquqi",
      RU: "Гражданское, имущественное и семейное право",
      EN: "Civil, Property & Family Law"
    },
    subtitle: {
      UZ: "Shaxsiy huquqlar va mulkni himoya qilish",
      RU: "Защита личных прав и имущества",
      EN: "Protecting personal rights and property"
    },
    items: [
      {
        name: {
          UZ: "Ma'naviy zarar uchun tovon",
          RU: "Возмещение морального вреда",
          EN: "Moral Damage Compensation"
        },
        details: {
          UZ: ["Ma'naviy zarar uchun kompensatsiya", "Sha'n-sharaf himoyasi", "Obro'-e'tibor himoyasi"],
          RU: ["Возмещение морального вреда", "Защита чести и достоинства", "Защита деловой репутации"],
          EN: ["Moral damage compensation", "Honor and dignity protection", "Business reputation protection"]
        }
      },
      {
        name: {
          UZ: "Moddiy zarar uchun tovon",
          RU: "Возмещение материального вреда",
          EN: "Material Damage Compensation"
        },
        details: {
          UZ: ["Moddiy zarar kompensatsiyasi", "Yo'qotilgan daromad", "Mulk zarari"],
          RU: ["Возмещение материального вреда", "Упущенная выгода", "Имущественный ущерб"],
          EN: ["Material damage compensation", "Lost income", "Property damage"]
        }
      },
      {
        name: {
          UZ: "Yuqori xavfli manbalardan zarar",
          RU: "Компенсация вреда от источника повышенной опасности",
          EN: "High-Risk Source Damage Compensation"
        },
        details: {
          UZ: ["YTH natijasida zarar", "Mexanizmlar, qurilish", "Kimyoviy moddalar, elektr toki"],
          RU: ["ДТП", "Механизмы, строительство", "Химикаты, электричество"],
          EN: ["Traffic accidents", "Machinery, construction", "Chemicals, electricity"]
        }
      },
      {
        name: {
          UZ: "Noqonuniy ta'qib uchun kompensatsiya",
          RU: "Компенсация при незаконном преследовании",
          EN: "Unlawful Prosecution Compensation"
        },
        details: {
          UZ: ["Noqonuniy hukm uchun", "Noqonuniy jinoiy javobgarlikka tortish", "Noqonuniy hibsga olish", "Noqonuniy qamoqqa olish"],
          RU: ["При незаконном осуждении", "При незаконном привлечении к уголовной ответственности", "При незаконном заключении под стражу", "При незаконном аресте"],
          EN: ["Unlawful conviction", "Unlawful criminal prosecution", "Unlawful detention", "Unlawful arrest"]
        }
      },
      {
        name: {
          UZ: "Iste'molchilar huquqlarini himoya qilish",
          RU: "Защита прав потребителей",
          EN: "Consumer Rights Protection"
        },
        details: {
          UZ: ["Tovar haqida to'g'ri ma'lumot olish huquqi", "Tovarni erkin tanlash huquqi", "Tovar sifati va xavfsizligi huquqi", "Sifatsiz tovardan zarar uchun tovon"],
          RU: ["Право на достоверную информацию о товаре", "Право на свободный выбор товара", "Право на надлежащее качество и безопасность товара", "Возмещение убытков от некачественного товара"],
          EN: ["Right to accurate product information", "Right to free product choice", "Right to proper quality and safety", "Compensation for defective product damages"]
        }
      },
      {
        name: {
          UZ: "Intellektual mulk huquqlari",
          RU: "Интеллектуальная собственность",
          EN: "Intellectual Property Rights"
        },
        details: {
          UZ: ["Intellektual mulk huquqini tan olish", "Huquqlar buzilganda holatni tiklash", "Intellektual huquqlarga tajovuz qilishni to'xtatish", "Muallifga ma'naviy zarar uchun tovon"],
          RU: ["Признание права на интеллектуальную собственность", "Восстановление положения при нарушении прав", "Пресечение действий, посягающих на права", "Возмещение морального вреда автору"],
          EN: ["IP rights recognition", "Position restoration upon rights violation", "Stopping IP infringement actions", "Moral damage compensation to author"]
        }
      }
    ]
  },
  {
    id: 'risk',
    icon: ShieldAlert,
    title: {
      UZ: "Biznes xavfsizligi va huquqiy himoya",
      RU: "Бизнес-риски и правовая защита",
      EN: "Business Risk & Legal Protection"
    },
    subtitle: {
      UZ: "Xavflarni boshqarish va oldini olish",
      RU: "Управление и предотвращение рисков",
      EN: "Risk management and prevention"
    },
    items: [
      {
        name: {
          UZ: "Huquqiy muvofiqlik (Compliance)",
          RU: "Юридический комплаенс",
          EN: "Legal Compliance"
        },
        details: {
          UZ: ["Qonunchilikka muvofiqlikni tekshirish", "Ichki tartib-qoidalarni ishlab chiqish", "Regulyativ talablarga rioya"],
          RU: ["Проверка соответствия законодательству", "Разработка внутренних регламентов", "Соблюдение регуляторных требований"],
          EN: ["Legislation compliance check", "Internal regulations development", "Regulatory requirements compliance"]
        }
      },
      {
        name: {
          UZ: "Risk menejment",
          RU: "Управление рисками",
          EN: "Risk Management"
        },
        details: {
          UZ: ["Huquqiy risklarni aniqlash", "Risk baholash", "Riskni kamaytirish strategiyalari"],
          RU: ["Выявление правовых рисков", "Оценка рисков", "Стратегии снижения рисков"],
          EN: ["Legal risk identification", "Risk assessment", "Risk mitigation strategies"]
        }
      },
      {
        name: {
          UZ: "Due Diligence",
          RU: "Due Diligence",
          EN: "Due Diligence"
        },
        details: {
          UZ: ["Yuridik ekspertiza", "Kompaniyani tekshirish", "Bitimlar oldidan tahlil"],
          RU: ["Юридическая экспертиза", "Проверка компании", "Анализ перед сделками"],
          EN: ["Legal expertise", "Company verification", "Pre-transaction analysis"]
        }
      },
      {
        name: {
          UZ: "Inqiroz sharoitida yordam",
          RU: "Кризисная поддержка",
          EN: "Crisis Support"
        },
        details: {
          UZ: ["Favqulodda vaziyatlarda yordam", "Inqiroz boshqaruvi", "Tezkor yuridik yordam"],
          RU: ["Помощь в чрезвычайных ситуациях", "Кризисное управление", "Срочная юридическая помощь"],
          EN: ["Emergency assistance", "Crisis management", "Urgent legal assistance"]
        }
      }
    ]
  },
  {
    id: 'criminal',
    icon: Gavel,
    title: {
      UZ: "Iqtisodiy jinoyatlar bo'yicha himoya",
      RU: "Защита по экономическим преступлениям",
      EN: "White-Collar Criminal Defense"
    },
    subtitle: {
      UZ: "Biznes va shaxsiy himoya",
      RU: "Защита бизнеса и личности",
      EN: "Business and personal defense"
    },
    items: [
      {
        name: {
          UZ: "Tadbirkorlik faoliyatini yuridik himoya qilish",
          RU: "Юридическая защита предпринимательской деятельности",
          EN: "Legal Protection of Business Activities"
        },
        details: {
          UZ: ["Jinoyat ishi yoki tergovda ishonch bildiruvchi manfaatlarini himoya qilish", "Korxonaga nisbatan taftish tayinlanganda mijoz manfaatida qatnashish", "Protsessual harakatlar olib borilganda yuridik yordam"],
          RU: ["Защита интересов доверителя в уголовном деле или следствии", "Участие в интересах клиента при проверках предприятия", "Юридическая помощь при процессуальных действиях"],
          EN: ["Protecting client interests in criminal cases or investigations", "Participation in client interest during company audits", "Legal assistance during procedural actions"]
        }
      },
      {
        name: {
          UZ: "Noqonuniy hukm qilinganlikda himoya",
          RU: "Защита при незаконном осуждении",
          EN: "Defense Against Unlawful Conviction"
        },
        details: {
          UZ: ["Noqonuniy hukm qilinganda himoya", "Noqonuniy jinoiy javobgarlikka tortilganda himoya"],
          RU: ["Защита при незаконном осуждении", "Защита при незаконном привлечении к уголовной ответственности"],
          EN: ["Defense against unlawful conviction", "Defense against unlawful criminal prosecution"]
        }
      },
      {
        name: {
          UZ: "Noqonuniy hibsga olinganlikda himoya",
          RU: "Защита при незаконном задержании",
          EN: "Defense Against Unlawful Detention"
        },
        details: {
          UZ: ["Noqonuniy hibsga olinganlikda himoya", "Noqonuniy qamoqqa olinganlikda himoya"],
          RU: ["Защита при незаконном заключении под стражу", "Защита при незаконном аресте"],
          EN: ["Defense against unlawful detention", "Defense against unlawful arrest"]
        }
      },
      {
        name: {
          UZ: "Jinoyat huquqi bo'yicha maslahatlar",
          RU: "Консультации по уголовному праву",
          EN: "Criminal Law Consultations"
        },
        details: {
          UZ: ["Jinoyat ishlari bo'yicha maslahat", "Tergov jarayonida yuridik yordam", "Huquqiy strategiya ishlab chiqish"],
          RU: ["Консультации по уголовным делам", "Юридическая помощь в ходе следствия", "Разработка правовой стратегии"],
          EN: ["Criminal case consultations", "Legal assistance during investigation", "Legal strategy development"]
        }
      }
    ]
  }
];
