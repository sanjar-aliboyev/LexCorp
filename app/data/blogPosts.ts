// app/data/blogPosts.ts
type BlogPostContent = {
  category: string;
  title: string;
  excerpt: string;
  body: string; // Added body field
};

type BlogPost = {
  slug: string;
  image: string;
  date: string; // YYYY-MM-DD
  author: string; // Added author field
  content: {
    UZ: BlogPostContent;
    RU: BlogPostContent;
    EN: BlogPostContent;
  };
};

export const blogPosts: BlogPost[] = [
  {
    slug: "tadbirkorlik-subyektlarini-tekshirishdagi-yangi-tartiblar",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
    date: "2025-12-24",
    author: "ProLex Team", // Placeholder author
    content: {
      UZ: {
        category: "Iqtisodiy ishlar",
        title: "Tadbirkorlik subyektlarini tekshirishdagi yangi tartiblar",
        excerpt: "2025-yildan boshlab soliq va boshqa nazorat organlari tomonidan o'tkaziladigan tekshiruvlarda biznes ombudsman ishtiroki majburiy etib belgilandi.",
        body: `
          <h3>Kirish</h3>
          <p>Ushbu maqolada 2025-yildan boshlab tadbirkorlik subyektlarini tekshirishda joriy etiladigan yangi tartiblar batafsil yoritilgan.</p>
          <blockquote>
            "Biznes ombudsman ishtiroki majburiy etib belgilandi, bu esa tadbirkorlarning huquqlarini yanada ishonchli himoya qilishga xizmat qiladi."
          </blockquote>
          <h3>Asosiy o'zgarishlar</h3>
          <ul>
            <li>Tekshiruvlar faqat aniq belgilangan asoslarga ko'ra amalga oshiriladi.</li>
            <li>Tekshiruv jarayonida biznes ombudsman vakilining ishtiroki ta'minlanadi.</li>
            <li>Tadbirkorlar tekshiruv natijalari bo'yicha e'tiroz bildirish huquqiga ega bo'ladilar.</li>
          </ul>
          <h3>Xulosa</h3>
          <p>Yangi tartiblar tadbirkorlik muhitini yaxshilash va investorlar ishonchini oshirishga qaratilgan.</p>
        `
      },
      RU: {
        category: "Экономические дела",
        title: "Новые процедуры проверки субъектов предпринимательства",
        excerpt: "С 2025 года участие бизнес-омбудсмена в проверках, проводимых налоговыми и другими органами, стало обязательным.",
        body: `
          <h3>Введение</h3>
          <p>В данной статье подробно освещаются новые процедуры проверки субъектов предпринимательства, которые будут введены с 2025 года.</p>
          <blockquote>
            "Участие бизнес-омбудсмена становится обязательным, что будет способствовать более надежной защите прав предпринимателей."
          </blockquote>
          <h3>Основные изменения</h3>
          <ul>
            <li>Проверки будут проводиться только на строго определенных основаниях.</li>
            <li>В процессе проверки будет обеспечено участие представителя бизнес-омбудсмена.</li>
            <li>Предприниматели получат право оспаривать результаты проверок.</li>
          </ul>
          <h3>Заключение</h3>
          <p>Новые процедуры направлены на улучшение предпринимательской среды и повышение доверия инвесторов.</p>
        `
      },
      EN: {
        category: "Economic Cases",
        title: "New Procedures for Auditing Business Entities",
        excerpt: "From 2025, the participation of the business ombudsman in inspections conducted by tax and other control bodies has become mandatory.",
        body: `
          <h3>Introduction</h3>
          <p>This article details the new procedures for auditing business entities that will be introduced from 2025.</p>
          <blockquote>
            "The participation of the business ombudsman has been made mandatory, which will serve to more reliably protect the rights of entrepreneurs."
          </blockquote>
          <h3>Key Changes</h3>
          <ul>
            <li>Audits will be conducted only on clearly defined grounds.</li>
            <li>The participation of a business ombudsman representative will be ensured during the audit process.</li>
            <li>Entrepreneurs will have the right to object to the audit results.</li>
          </ul>
          <h3>Conclusion</h3>
          <p>The new procedures are aimed at improving the business environment and increasing investor confidence.</p>
        `
      }
    }
  },
  {
    slug: "jinoyat-ishlarida-advokat-ishtirokining-ahamiyati",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
    date: "2025-12-22",
    author: "ProLex Team",
    content: {
      UZ: {
        category: "Jinoyat ishlari",
        title: "Jinoyat ishlarida advokat ishtirokining ahamiyati",
        excerpt: "Dastlabki tergov bosqichida advokatning to'g'ri strategiyasi kelajakdagi sud hukmiga qanday ta'sir qiladi? Real keyslar tahlili.",
        body: `
          <h3>Kirish</h3>
          <p>Jinoyat ishlarida advokatning dastlabki tergov bosqichidan boshlab ishtirok etishi muhim ahamiyatga ega. Bu maqolada advokatning rolini tahlil qilamiz.</p>
          <blockquote>
            "Advokatning to'g'ri strategiyasi adolatli sud jarayonini ta'minlashda hal qiluvchi rol o'ynaydi."
          </blockquote>
          <h3>Advokatning asosiy vazifalari</h3>
          <ul>
            <li>Mijozning huquqlarini himoya qilish va ularni tushuntirish.</li>
            <li>Tergov harakatlarida ishtirok etish va qonuniylikni nazorat qilish.</li>
            <li>Dalillarni to'plash va himoya strategiyasini ishlab chiqish.</li>
          </ul>
          <h3>Xulosa</h3>
          <p>Malakali advokatning o'z vaqtida aralashuvi mijozning manfaatlarini maksimal darajada himoya qilishga yordam beradi.</p>
        `
      },
      RU: {
        category: "Уголовные дела",
        title: "Важность участия адвоката в уголовных делах",
        excerpt: "Как правильная стратегия адвоката на стадии предварительного следствия влияет на будущий приговор суда? Анализ реальных кейсов.",
        body: `
          <h3>Введение</h3>
          <p>Участие адвоката в уголовных делах с самого начала предварительного следствия имеет решающее значение. В этой статье мы анализируем роль адвоката.</p>
          <blockquote>
            "Правильная стратегия адвоката играет ключевую роль в обеспечении справедливого судебного разбирательства."
          </blockquote>
          <h3>Основные задачи адвоката</h3>
          <ul>
            <li>Защита прав клиента и их разъяснение.</li>
            <li>Участие в следственных действиях и контроль за законностью.</li>
            <li>Сбор доказательств и разработка стратегии защиты.</li>
          </ul>
          <h3>Заключение</h3>
          <p>Своевременное вмешательство квалифицированного адвоката помогает максимально защитить интересы клиента.</p>
        `
      },
      EN: {
        category: "Criminal Cases",
        title: "The Importance of Defense Attorney in Criminal Cases",
        excerpt: "How does the right strategy at the preliminary investigation stage affect the future court verdict? Analysis of real cases.",
        body: `
          <h3>Introduction</h3>
          <p>The participation of a defense attorney in criminal cases from the very beginning of the preliminary investigation is of crucial importance. In this article, we analyze the role of the attorney.</p>
          <blockquote>
            "The right strategy of a lawyer plays a decisive role in ensuring a fair trial."
          </blockquote>
          <h3>Main responsibilities of a lawyer</h3>
          <ul>
            <li>Protecting and explaining the client's rights.</li>
            <li>Participating in investigative actions and controlling legality.</li>
            <li>Collecting evidence and developing a defense strategy.</li>
          </ul>
          <h3>Conclusion</h3>
          <p>Timely intervention by a qualified attorney helps to protect the client's interests to the maximum extent possible.</p>
        `
      }
    }
  },
  {
    slug: "mchj-tassischilari-ortasidagi-nizolarni-hal-qilish",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
    date: "2025-12-20",
    author: "ProLex Team",
    content: {
      UZ: {
        category: "Korporativ huquq",
        title: "MChJ ta'sischilari o'rtasidagi nizolarni hal qilish",
        excerpt: "Ustav kapitalini taqsimlash va dividend to'lash bo'yicha kelishmovchiliklar yuzaga kelganda qanday huquqiy choralar ko'rish kerak?",
        body: `
          <h3>Kirish</h3>
          <p>MChJ ta'sischilari o'rtasida turli nizolar kelib chiqishi mumkin. Ushbu maqola bunday nizolarni hal qilish yo'llarini o'rganadi.</p>
          <blockquote>
            "Ta'sischilar o'rtasidagi kelishmovchiliklarni o'z vaqtida hal qilish kompaniyaning barqaror rivojlanishini ta'minlaydi."
          </blockquote>
          <h3>Nizolarni hal qilish mexanizmlari</h3>
          <ul>
            <li>Ichki korporativ hujjatlar (ustav) orqali hal qilish.</li>
            <li>Muzokaralar va mediatsiya.</li>
            <li>Sud tartibida nizoni ko'rib chiqish.</li>
          </ul>
          <h3>Xulosa</h3>
          <p>Huquqiy maslahat va to'g'ri strategiya MChJ ta'sischilari o'rtasidagi nizolarni samarali hal qilishga yordam beradi.</p>
        `
      },
      RU: {
        category: "Корпоративное право", 
        title: "Разрешение споров между учредителями ООО", 
        excerpt: "Правовые меры при разногласиях по распределению дивидендов.",
        body: `
          <h3>Введение</h3>
          <p>Между учредителями ООО могут возникать различные споры. В этой статье рассматриваются способы их разрешения.</p>
          <blockquote>
            "Своевременное разрешение разногласий между учредителями обеспечивает стабильное развитие компании."
          </blockquote>
          <h3>Механизмы разрешения споров</h3>
          <ul>
            <li>Разрешение через внутренние корпоративные документы (устав).</li>
            <li>Переговоры и медиация.</li>
            <li>Рассмотрение спора в судебном порядке.</li>
          </ul>
          <h3>Заключение</h3>
          <p>Юридическая консультация и правильная стратегия помогают эффективно разрешать споры между учредителями ООО.</p>
        `
      },
      EN: {
        category: "Corporate Law", 
        title: "Resolving Disputes Between LLC Founders", 
        excerpt: "Legal measures for disagreements regarding dividend distribution.",
        body: `
          <h3>Introduction</h3>
          <p>Various disputes can arise between LLC founders. This article explores ways to resolve such disputes.</p>
          <blockquote>
            "Timely resolution of disagreements between founders ensures the stable development of the company."
          </blockquote>
          <h3>Mechanisms for dispute resolution</h3>
          <ul>
            <li>Resolution through internal corporate documents (charter).</li>
            <li>Negotiation and mediation.</li>
            <li>Judicial resolution of the dispute.</li>
          </ul>
          <h3>Conclusion</h3>
          <p>Legal advice and a correct strategy help to effectively resolve disputes between LLC founders.</p>
        `
      }
    }
  },
  {
    slug: "qqs-tolovchilari-uchun-2025-yilgi-ozgarishlar",
    image: "https://images.unsplash.com/photo-1554224155-9727b5394036?auto=format&fit=crop&q=80&w=800",
    date: "2025-12-18",
    author: "ProLex Team",
    content: {
      UZ: {
        category: "Soliq masalalari",
        title: "QQS to'lovchilari uchun 2025-yilgi o'zgarishlar",
        excerpt: "Yangi Soliq Kodeksi tahririda QQS to'lovchilariga beriladigan imtiyozlar va hisobot topshirish muddatlari o'zgardi.",
        body: `
          <h3>Kirish</h3>
          <p>2025-yilda QQS to'lovchilari uchun Soliq Kodeksiga kiritilgan muhim o'zgarishlar haqida ma'lumot beriladi.</p>
          <blockquote>
            "Yangi imtiyozlar va hisobot topshirish muddatlari tadbirkorlik subyektlariga qulaylik yaratadi."
          </blockquote>
          <h3>Asosiy yangiliklar</h3>
          <ul>
            <li>QQS bo'yicha yangi imtiyozlar.</li>
            <li>Hisobotlarni topshirishning o'zgargan muddatlari.</li>
            <li>Soliq yukini kamaytirish bo'yicha tavsiyalar.</li>
          </ul>
          <h3>Xulosa</h3>
          <p>Ushbu o'zgarishlar soliq siyosatining yanada samarali bo'lishiga xizmat qiladi.</p>
        `
      },
      RU: {
        category: "Налоговые вопросы",
        title: "Изменения для плательщиков НДС в 2025 году",
        excerpt: "В новой редакции Налогового кодекса изменены льготы для плательщиков НДС и сроки сдачи отчетности.",
        body: `
          <h3>Введение</h3>
          <p>Информация о важных изменениях в Налоговом кодексе для плательщиков НДС, введенных в 2025 году.</p>
          <blockquote>
            "Новые льготы и сроки сдачи отчетности создадут удобства для субъектов предпринимательства."
          </blockquote>
          <h3>Основные новшества</h3>
          <ul>
            <li>Новые льготы по НДС.</li>
            <li>Измененные сроки сдачи отчетности.</li>
            <li>Рекомендации по снижению налоговой нагрузки.</li>
          </ul>
          <h3>Заключение</h3>
          <p>Эти изменения послужат более эффективной налоговой политике.</p>
        `
      },
      EN: {
        category: "Tax Issues",
        title: "Changes for VAT payers in 2025",
        excerpt: "The new version of the Tax Code has changed the benefits for VAT payers and the deadlines for submitting reports.",
        body: `
          <h3>Introduction</h3>
          <p>Information on important changes to the Tax Code for VAT payers introduced in 2025.</p>
          <blockquote>
            "New benefits and reporting deadlines will create convenience for business entities."
          </blockquote>
          <h3>Key innovations</h3>
          <ul>
            <li>New VAT benefits.</li>
            <li>Changed reporting deadlines.</li>
            <li>Recommendations for reducing the tax burden.</li>
          </ul>
          <h3>Conclusion</h3>
          <p>These changes will contribute to a more effective tax policy.</p>
        `
      }
    }
  },
  {
    slug: "xodimni-ishdan-boshatishda-eng-kop-yol-qoyiladigan-xatolar",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800",
    date: "2025-12-15",
    author: "ProLex Team",
    content: {
      UZ: {
        category: "Mehnat huquqi",
        title: "Xodimni ishdan bo'shatishda eng ko'p yo'l qo'yiladigan xatolar",
        excerpt: "Mehnat shartnomasini bekor qilishda ish beruvchi qanday qoidalarga amal qilishi shart? Noqonuniy bo'shatish oqibatlari.",
        body: `
          <h3>Kirish</h3>
          <p>Xodimni ishdan bo'shatish jarayoni murakkab bo'lib, ko'plab huquqiy xatolar yuzaga kelishi mumkin.</p>
          <blockquote>
            "Ish beruvchi tomonidan yo'l qo'yilgan xatolar noqonuniy ishdan bo'shatishga olib kelishi va moliyaviy oqibatlarga sabab bo'lishi mumkin."
          </blockquote>
          <h3>Tarqalgan xatolar</h3>
          <ul>
            <li>Mehnat shartnomasini bekor qilish tartibiga rioya qilmaslik.</li>
            <li>Asossiz sabablar bilan ishdan bo'shatish.</li>
            <li>Xodimga to'lovlarni o'z vaqtida amalga oshirmaslik.</li>
          </ul>
          <h3>Xulosa</h3>
          <p>Mehnat huquqi bo'yicha mutaxassis maslahati xavflarni minimallashtirishga yordam beradi.</p>
        `
      },
      RU: {
        category: "Трудовое право",
        title: "Самые частые ошибки при увольнении сотрудника",
        excerpt: "Какие правила должен соблюдать работодатель при расторжении трудового договора? Последствия незаконного увольнения.",
        body: `
          <h3>Введение</h3>
          <p>Процесс увольнения сотрудника является сложным, и в нем может возникнуть множество юридических ошибок.</p>
          <blockquote>
            "Ошибки работодателя могут привести к незаконному увольнению и повлечь финансовые последствия."
          </blockquote>
          <h3>Распространенные ошибки</h3>
          <ul>
            <li>Несоблюдение процедуры расторжения трудового договора.</li>
            <li>Увольнение по необоснованным причинам.</li>
            <li>Несвоевременная выплата сотруднику.</li>
          </ul>
          <h3>Заключение</h3>
          <p>Консультация специалиста по трудовому праву поможет минимизировать риски.</p>
        `
      },
      EN: {
        category: "Labor Law",
        title: "The most common mistakes when dismissing an employee",
        excerpt: "What rules must an employer follow when terminating an employment contract? Consequences of illegal dismissal.",
        body: `
          <h3>Introduction</h3>
          <p>The process of dismissing an employee is complex, and many legal errors can arise.</p>
          <blockquote>
            "Errors made by the employer can lead to wrongful dismissal and have financial consequences."
          </blockquote>
          <h3>Common mistakes</h3>
          <ul>
            <li>Failure to comply with the procedure for terminating an employment contract.</li>
            <li>Dismissal for unsubstantiated reasons.</li>
            <li>Failure to make timely payments to the employee.</li>
          </ul>
          <h3>Conclusion</h3>
          <p>Consulting a labor law specialist helps minimize risks.</p>
        `
      }
    }
  },
  {
    slug: "it-park-rezidentlari-uchun-soliq-imtiyozlari",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    date: "2025-12-10",
    author: "ProLex Team",
    content: {
      UZ: {
        category: "IT va Internet huquqi",
        title: "IT Park rezidentlari uchun soliq imtiyozlari",
        excerpt: "Dasturiy ta'minot ishlab chiquvchilar uchun qanday imtiyozlar mavjud va rezidentlik maqomini qanday olish mumkin?",
        body: `
          <h3>Kirish</h3>
          <p>IT Park rezidentlari uchun soliq imtiyozlari O'zbekistonda IT sohasini rivojlantirishga qaratilgan muhim chora hisoblanadi.</p>
          <blockquote>
            "IT Park rezidentligi maqomi sezilarli soliq imtiyozlarini taqdim etadi."
          </blockquote>
          <h3>Imtiyozlar va ularni olish tartibi</h3>
          <ul>
            <li>Soliq stavkalarining kamaytirilishi.</li>
            <li>Rezidentlik maqomini olish uchun talablar.</li>
            <li>Imtiyozlardan samarali foydalanish bo'yicha tavsiyalar.</li>
          </ul>
          <h3>Xulosa</h3>
          <p>IT Park imtiyozlari kompaniyalarga o'sish va innovatsiyalarni joriy etish uchun keng imkoniyatlar yaratadi.</p>
        `
      },
      RU: {
        category: "IT и Интернет право",
        title: "Налоговые льготы для резидентов IT Park",
        excerpt: "Какие льготы доступны для разработчиков программного обеспечения и как получить статус резидента?",
        body: `
          <h3>Введение</h3>
          <p>Налоговые льготы для резидентов IT Park являются важной мерой, направленной на развитие IT-сферы в Узбекистане.</p>
          <blockquote>
            "Статус резидента IT Park предоставляет значительные налоговые льготы."
          </blockquote>
          <h3>Льготы и порядок их получения</h3>
          <ul>
            <li>Снижение налоговых ставок.</li>
            <li>Требования для получения статуса резидента.</li>
            <li>Рекомендации по эффективному использованию льгот.</li>
          </ul>
          <h3>Заключение</h3>
          <p>Льготы IT Park создают широкие возможности для роста и внедрения инноваций компаниями.</p>
        `
      },
      EN: {
        category: "IT & Internet Law",
        title: "Tax incentives for IT Park residents",
        excerpt: "What benefits are available for software developers and how to obtain resident status?",
        body: `
          <h3>Introduction</h3>
          <p>Tax incentives for IT Park residents are an important measure aimed at developing the IT sector in Uzbekistan.</p>
          <blockquote>
            "Tax incentives for IT Park residents are an important measure aimed at developing the IT sector in Uzbekistan."
          </blockquote>
          <h3>Benefits and application procedure</h3>
          <ul>
            <li>Reduced tax rates.</li>
            <li>Requirements for obtaining resident status.</li>
            <li>Recommendations for effective use of benefits.</li>
          </ul>
          <h3>Conclusion</h3>
          <p>IT Park benefits create broad opportunities for companies to grow and innovate.</p>
        `
      }
    }
  }
];
